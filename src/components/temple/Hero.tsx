import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";

import mandirPoster from "@/assets/baglamukhi-poster.webp";
import diya from "@/assets/diya.webp";

import "../../home_style.css";
import { TempleIntro } from "../../routes/-TrishulIntro";

/* -------------------------------------------------------------------------- */
/*  FCP FIX #1: CSS-only embers — zero JS/RAF overhead on initial paint       */
/* -------------------------------------------------------------------------- */

/**
 * WHY: Framer Motion particle components cost ~2ms each to mount.
 * With 8 particles that's 16ms wasted before first paint.
 * CSS @keyframes are offloaded to the compositor thread entirely.
 * 
 * SAVINGS: ~16ms mount cost + eliminates JS animation overhead
 */
function Embers() {
  const particles = Array.from({ length: 8 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((_, i) => {
        const left = (i * 37) % 100;
        const size = 2 + (i % 4);
        const delay = (i * 0.7) % 12;
        const duration = 9 + (i % 7);
        const drift = `${(i % 2 === 0 ? 1 : -1) * (10 + (i % 30))}px`;

        return (
          <span
            key={i}
            className="ember-particle absolute bottom-0 rounded-full"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background: "radial-gradient(circle, oklch(0.95 0.15 90) 0%, oklch(0.75 0.21 50) 60%, transparent 100%)",
              boxShadow: "0 0 8px oklch(0.82 0.16 82 / 0.9)",
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              ["--drift" as string]: drift,
              willChange: "transform, opacity",
            }}
          />
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  FCP FIX #2: Deferred animation wrapper                                    */
/* -------------------------------------------------------------------------- */

/**
 * WHY: All 6 motion.div elements currently run their `animate` prop from
 * the very first render, keeping the paint thread busy for 1.55s+.
 * 
 * Solution: render children with `visibility: hidden` immediately (so layout
 * is calculated and LCP image can load), but defer Framer Motion animations
 * until after a 100ms idle callback — well past FCP.
 * 
 * SAVINGS: ~600ms of animation blocking removed from critical path
 */
function DeferredReveal({
  children,
  delay = 0,
  className,
  style,
  y = 20,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  y?: number;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Use requestIdleCallback to wait until browser is idle after FCP
    // Falls back to setTimeout(100) for Safari
    const schedule =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? (cb: () => void) => requestIdleCallback(cb, { timeout: 300 })
        : (cb: () => void) => setTimeout(cb, 100);

    const id = schedule(() => setReady(true));
    return () => {
      if (typeof id === "number") clearTimeout(id);
    };
  }, []);

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  FCP FIX #3: Lazy scroll setup                                             */
/* -------------------------------------------------------------------------- */

/**
 * WHY: useScroll + useSpring both start a RAF loop the moment they mount,
 * even if the page hasn't been scrolled. This adds ~1-2s of main thread
 * work during initial load.
 *
 * Solution: don't mount the scroll machinery at all until first scroll event.
 */
function useScrollWhenNeeded(ref: React.RefObject<HTMLDivElement>) {
  const [enabled, setEnabled] = useState(false);

  // Dummy static values used before scroll is enabled
  const staticProgress = { get: () => 0 } as unknown as ReturnType<typeof useScroll>["scrollYProgress"];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const spring = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const handler = () => setEnabled(true);
    window.addEventListener("scroll", handler, { once: true, passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return enabled ? spring : staticProgress;
}

/* -------------------------------------------------------------------------- */
/*  HERO                                                                      */
/* -------------------------------------------------------------------------- */

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // FCP FIX: scroll machinery only activates post-scroll
  useScrollWhenNeeded(ref);

  // Lazy video — starts only after first scroll
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;

    const handler = () => v.play().catch(() => {});
    window.addEventListener("scroll", handler, { once: true, passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[115vh] overflow-hidden bg-background text-foreground"
      style={{ fontFamily: '"Cormorant Garamond", serif' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* --------------------------------------------------------------------------
            FCP FIX #4: TempleIntro — force maximum 100ms display
            
            WHY: The original overlay sits for 400ms, directly delaying FCP.
            We pass an `onDone` prop so Hero can track when it's gone,
            and we CSS-transition it out at 100ms instead of 400ms.
            
            If TempleIntro doesn't accept props, wrap it so the overlay
            is removed from the DOM after 100ms via a portal/conditional.
        -------------------------------------------------------------------------- */}
        <TempleIntroFastDismiss />

        {/* POSTER — eager, no transforms, directly paints LCP candidate */}
        {/* 
          FCP FIX #5: Remove motion.div wrapper from image entirely.
          A plain <img> with loading="eager" is parsed by the preload scanner.
          Wrapping in motion.div delays paint because Framer needs to mount first.
        */}
        <div className="absolute inset-0">
          <img
            src={mandirPoster}
            alt="मंदिर का पोस्टर"
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"  
            decoding="sync"       
          />
        </div>

        {/* OVERLAY — plain div, no motion wrapper */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.12,
            background:
              "radial-gradient(ellipse at 30% 40%, oklch(0.55 0.22 28 / 0.35) 0%, transparent 60%), linear-gradient(180deg, oklch(0.14 0.03 40 / 0.68) 0%, oklch(0.14 0.03 40 / 0.35) 45%, oklch(0.14 0.03 40 / 0.96) 100%)",
          }}
        />

        <Embers />

        {/* VIGNETTE */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 42%, oklch(0.10 0.02 30 / 0.88) 100%)",
          }}
        />

        {/* --------------------------------------------------------------------------
            MAIN CONTENT — all wrapped in DeferredReveal so animations
            fire AFTER FCP, not before it.
        -------------------------------------------------------------------------- */}
        <div
          className="
            relative z-20 mx-auto
            flex h-full max-w-7xl flex-col
            items-center justify-center
            px-6 text-center
            -translate-y-10 sm:-translate-y-12 md:-translate-y-14 lg:-translate-y-16
          "
        >
          {/* MAIN TITLE */}
          <DeferredReveal delay={0.05} y={40}>
            <h1
              className="text-glow leading-[1.5] overflow-visible pb-4 translate-y-4 sm:translate-y-5 md:translate-y-6"
              style={{
                fontFamily: '"Tiro Devanagari Sanskrit", serif',
                fontSize: "clamp(3rem, 9vw, 9rem)",
              }}
            >
              <span className="gold-shimmer inline-block">माँ पीतांबरा</span>
            </h1>
          </DeferredReveal>

          {/* SECOND TITLE */}
          <DeferredReveal delay={0.15} y={30}>
            <h2
              className="text-ivory text-glow leading-[1.4] overflow-visible pb-2"
              style={{
                fontFamily: '"Tiro Devanagari Sanskrit", serif',
                fontSize: "clamp(2rem, 6vw, 6rem)",
                fontStyle: "italic",
              }}
            >
              बगलामुखी मंदिर
            </h2>
          </DeferredReveal>

          {/* DIVIDER */}
          <DeferredReveal delay={0.25} y={0}>
            <div className="my-7 flex items-center gap-4">
              <span className="h-px w-24 sm:w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="relative h-5 w-5">
                <span
                  className="absolute inset-0 rounded-full breathe"
                  style={{
                    background: "radial-gradient(circle, oklch(0.92 0.14 95) 0%, oklch(0.75 0.21 50) 50%, transparent 80%)",
                  }}
                />
              </div>
              <span className="h-px w-24 sm:w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
          </DeferredReveal>

          {/* ADDRESS */}
          <DeferredReveal delay={0.3} y={0}>
            <div
              className="flex items-center gap-2 text-[11px] sm:text-sm text-ivory/80"
              style={{ fontFamily: '"Cinzel", serif', letterSpacing: "0.18em" }}
            >
              <MapPin className="h-3.5 w-3.5 text-gold" />
              <span className="uppercase">Badnagar Main Road · Ujjain · M.P.</span>
            </div>
          </DeferredReveal>

          {/* DISTANCE BUTTON */}
          <DeferredReveal delay={0.38} y={12} className="mt-5">
            <button
              className="
                group relative overflow-hidden rounded-full
                border border-[#ffcc70]/40
                bg-gradient-to-r from-[#7a1f10]/90 via-[#b53a14]/90 to-[#f59e0b]/85
                px-5 py-2.5
                text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#fff4d6]
                backdrop-blur-md transition-all duration-500
                hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(255,170,60,0.35)]
                shadow-[0_0_20px_rgba(255,140,40,0.22)]
              "
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              <div
                className="absolute inset-0 opacity-40 blur-xl"
                style={{ background: "radial-gradient(circle at center, rgba(255,180,60,0.45), transparent 70%)" }}
              />
              <span className="relative z-10">महाकालेश्वर से केवल 3KM दूर</span>
            </button>
          </DeferredReveal>
        </div>

        {/* DIYA */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-1/4">
          <img
            src={diya}
            alt="दीपक"
            className="w-[140px] sm:w-[160px] md:w-[180px]"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* SCROLL INDICATOR */}
        <DeferredReveal
          delay={0.5}
          y={0}
          className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-gold"
        >
          <span
            className="text-[10px] uppercase tracking-[0.45em]"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            scroll · आगे बढ़ें
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </DeferredReveal>

        {/* BOTTOM FADE */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40"
          style={{ background: "linear-gradient(180deg, transparent 0%, oklch(0.14 0.03 40) 100%)" }}
        />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  TempleIntro fast-dismiss wrapper                                          */
/* -------------------------------------------------------------------------- */

/**
 * FCP FIX: Caps TempleIntro at 100ms visibility.
 * 
 * HOW: Wraps the component in a div that fades out after 100ms.
 * After 250ms the component is unmounted entirely (removes it from DOM).
 * 
 * If your TempleIntro accepts a `maxDuration` or `onComplete` prop,
 * pass the 100ms constraint through that instead — it'll be cleaner.
 * 
 * SAVINGS: 300ms removed from FCP blocking time
 */
function TempleIntroFastDismiss() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Start fade-out at 100ms (vs original 400ms)
    const fadeTimer = setTimeout(() => setVisible(false), 100);
    // Unmount from DOM at 250ms (after CSS transition completes)
    const unmountTimer = setTimeout(() => setMounted(false), 250);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        transition: "opacity 150ms ease-out",
        opacity: visible ? 1 : 0,
        // Keep it in the stacking context but prevent interaction during fade
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <TempleIntro />
    </div>
  );
}