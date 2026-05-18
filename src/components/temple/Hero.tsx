import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";

import mandirPoster from "@/assets/baglamukhi-poster.webp";
import diya from "@/assets/diya.webp";

import "../../home_style.css";
import { TempleIntro } from "../../routes/-TrishulIntro";

/* ============================================================
   CSS INJECTOR — golden glitter & sparkle keyframes
   Injected once into <head> so no runtime overhead per render
   ============================================================ */
const GLITTER_CSS = `
  /* ── Ember drift (existing, unchanged) ─────────────────── */
  @keyframes emberRise {
    0%   { transform: translateY(0)      translateX(0)           scale(1);   opacity: 0; }
    10%  { opacity: 1; }
    80%  { opacity: 0.6; }
    100% { transform: translateY(-100vh) translateX(var(--drift)) scale(0.3); opacity: 0; }
  }
  .ember-particle { animation: emberRise linear infinite; }

  /* ── Glitter pixel: twinkle + float ────────────────────── */
  @keyframes glitterFloat {
    0%   { transform: translateY(0)   translateX(0)              scale(0.4) rotate(0deg);   opacity: 0; }
    15%  { opacity: 1; }
    50%  { transform: translateY(var(--gy)) translateX(var(--gx)) scale(1)   rotate(180deg); opacity: 0.9; }
    85%  { opacity: 0.5; }
    100% { transform: translateY(var(--gy2)) translateX(var(--gx2)) scale(0.2) rotate(360deg); opacity: 0; }
  }
  .glitter-pixel { animation: glitterFloat ease-in-out infinite; }

  /* ── Sparkle star: 4-point cross ───────────────────────── */
  @keyframes sparklePulse {
    0%   { transform: scale(0) rotate(0deg);   opacity: 0; }
    20%  { transform: scale(1) rotate(45deg);  opacity: 1; }
    50%  { transform: scale(1.4) rotate(90deg); opacity: 0.8; }
    80%  { transform: scale(0.8) rotate(135deg); opacity: 0.5; }
    100% { transform: scale(0) rotate(180deg); opacity: 0; }
  }
  .sparkle-star { animation: sparklePulse ease-in-out infinite; }

  /* ── Golden shimmer sweep across title ─────────────────── */
  @keyframes goldSweep {
    0%   { background-position: -200% center; }
    100% { background-position:  300% center; }
  }
  .gold-shimmer {
    background: linear-gradient(
      105deg,
      oklch(0.82 0.14 82)  0%,
      oklch(0.92 0.18 90) 20%,
      oklch(0.98 0.10 95) 35%,
      oklch(1.00 0.00 90) 50%,
      oklch(0.98 0.10 95) 65%,
      oklch(0.92 0.18 90) 80%,
      oklch(0.82 0.14 82) 100%
    );
    background-size: 250% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: goldSweep 4s linear infinite;
  }

  /* ── Glow breathe ──────────────────────────────────────── */
  @keyframes breathe {
    0%, 100% { transform: scale(1);   opacity: 0.7; }
    50%       { transform: scale(1.6); opacity: 1;   }
  }
  .breathe { animation: breathe 2.4s ease-in-out infinite; }

  /* ── Text glow ─────────────────────────────────────────── */
  .text-glow { text-shadow: 0 0 40px oklch(0.82 0.18 82 / 0.55), 0 0 80px oklch(0.75 0.21 50 / 0.3); }
  .text-ivory { color: oklch(0.97 0.02 85); }

  /* ── Halo ring behind title ─────────────────────────────── */
  @keyframes haloSpin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(360deg); }
  }

  /* ── Golden dust cascade ────────────────────────────────── */
  @keyframes dustFall {
    0%   { transform: translateY(-20px) translateX(0)      scale(1);   opacity: 0; }
    10%  { opacity: 0.8; }
    90%  { opacity: 0.4; }
    100% { transform: translateY(110vh) translateX(var(--dx)) scale(0.5); opacity: 0; }
  }
  .dust-particle { animation: dustFall linear infinite; }
`;

function injectGlitterCSS() {
  if (typeof document === "undefined") return;
  if (document.getElementById("hero-glitter-css")) return;
  const style = document.createElement("style");
  style.id = "hero-glitter-css";
  style.textContent = GLITTER_CSS;
  document.head.appendChild(style);
}
injectGlitterCSS();

/* ============================================================
   EMBERS  (original, untouched)
   ============================================================ */
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

/* ============================================================
   GOLDEN GLITTER PIXELS
   Small square/diamond pixels that float and twinkle
   Pure CSS — zero JS per frame
   ============================================================ */
function GoldenGlitter() {
  // 28 glitter pixels spread across the hero
  const pixels = Array.from({ length: 28 });

  const goldPalette = [
    "oklch(0.98 0.12 92)",  // pale champagne
    "oklch(0.95 0.18 88)",  // warm gold
    "oklch(0.90 0.22 80)",  // deep gold
    "oklch(1.00 0.06 95)",  // near-white glint
    "oklch(0.85 0.20 70)",  // amber gold
    "oklch(0.92 0.15 100)", // yellow-gold
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pixels.map((_, i) => {
        const left   = (i * 13 + 7)  % 100;
        const top    = (i * 17 + 11) % 85;
        const size   = 2 + (i % 5);
        const delay  = (i * 0.43) % 8;
        const dur    = 4 + (i % 5);
        const color  = goldPalette[i % goldPalette.length];

        // Random float vectors
        const gx  = `${(i % 2 === 0 ? 1 : -1) * (15 + (i % 40))}px`;
        const gy  = `${-30 - (i % 60)}px`;
        const gx2 = `${(i % 2 === 0 ? -1 : 1) * (5  + (i % 25))}px`;
        const gy2 = `${-80 - (i % 80)}px`;

        // Alternate between diamond and round shapes
        const isDiamond = i % 3 !== 0;

        return (
          <span
            key={i}
            className="glitter-pixel absolute"
            style={{
              left: `${left}%`,
              top:  `${top}%`,
              width:  size,
              height: size,
              background: color,
              boxShadow: `0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color}80`,
              borderRadius: isDiamond ? "1px" : "50%",
              transform: isDiamond ? "rotate(45deg)" : "none",
              animationDelay:    `${delay}s`,
              animationDuration: `${dur}s`,
              ["--gx"  as string]: gx,
              ["--gy"  as string]: gy,
              ["--gx2" as string]: gx2,
              ["--gy2" as string]: gy2,
              willChange: "transform, opacity",
            }}
          />
        );
      })}
    </div>
  );
}

/* ============================================================
   SPARKLE STARS
   4-point CSS star bursts (clip-path polygon)
   ============================================================ */
function SparkleStars() {
  const stars = Array.from({ length: 18 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((_, i) => {
        const left  = (i * 19 + 5)  % 96;
        const top   = (i * 23 + 8)  % 88;
        const size  = 6 + (i % 10);
        const delay = (i * 0.61) % 7;
        const dur   = 2.5 + (i % 3);

        const brightness = i % 4 === 0
          ? "oklch(1.00 0.00 90)"       // pure white flash
          : i % 4 === 1
          ? "oklch(0.97 0.12 92)"       // champagne
          : i % 4 === 2
          ? "oklch(0.90 0.22 80)"       // warm gold
          : "oklch(0.95 0.18 88)";      // mid gold

        return (
          <span
            key={i}
            className="sparkle-star absolute"
            style={{
              left: `${left}%`,
              top:  `${top}%`,
              width:  size,
              height: size,
              // 4-point star via clip-path
              clipPath: "polygon(50% 0%, 55% 45%, 100% 50%, 55% 55%, 50% 100%, 45% 55%, 0% 50%, 45% 45%)",
              background: `radial-gradient(circle, white 0%, ${brightness} 40%, transparent 80%)`,
              filter: `drop-shadow(0 0 ${size / 2}px ${brightness}) drop-shadow(0 0 ${size}px oklch(0.82 0.16 82 / 0.7))`,
              animationDelay:    `${delay}s`,
              animationDuration: `${dur}s`,
              willChange: "transform, opacity",
            }}
          />
        );
      })}
    </div>
  );
}

/* ============================================================
   GOLDEN DUST CASCADE
   Fine falling gold dust from top — adds "divine shower" feel
   ============================================================ */
function GoldenDust() {
  const motes = Array.from({ length: 20 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {motes.map((_, i) => {
        const left = (i * 31 + 3) % 100;
        const size = 1 + (i % 3);
        const delay = (i * 0.55) % 14;
        const dur   = 10 + (i % 8);
        const dx    = `${(i % 2 === 0 ? 1 : -1) * (20 + (i % 50))}px`;

        return (
          <span
            key={i}
            className="dust-particle absolute top-0 rounded-full"
            style={{
              left: `${left}%`,
              width:  size,
              height: size,
              background: "oklch(0.95 0.18 88 / 0.85)",
              boxShadow: "0 0 4px oklch(0.92 0.18 88)",
              animationDelay:    `${delay}s`,
              animationDuration: `${dur}s`,
              ["--dx" as string]: dx,
              willChange: "transform, opacity",
            }}
          />
        );
      })}
    </div>
  );
}

/* ============================================================
   GOLDEN HALO — radial glow ring behind the title area
   ============================================================ */
function GoldenHalo() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      aria-hidden="true"
      style={{ width: "min(85vw, 700px)", height: "min(85vw, 700px)" }}
    >
      {/* Outer soft glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.82 0.18 82 / 0.12) 0%, oklch(0.75 0.21 50 / 0.07) 40%, transparent 70%)",
        }}
      />
      {/* Inner concentrated halo */}
      <div
        className="absolute inset-[15%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.95 0.14 90 / 0.08) 0%, oklch(0.82 0.18 82 / 0.05) 50%, transparent 75%)",
        }}
      />
      {/* Spinning conic ring */}
      <div
        className="absolute inset-[20%] rounded-full opacity-20"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, oklch(0.92 0.18 88 / 0.6) 30deg, transparent 60deg, oklch(0.92 0.18 88 / 0.4) 120deg, transparent 150deg, oklch(0.98 0.10 95 / 0.7) 210deg, transparent 240deg, oklch(0.92 0.18 88 / 0.5) 300deg, transparent 330deg, transparent 360deg)",
          animation: "haloSpin 18s linear infinite",
        }}
      />
    </div>
  );
}

/* ============================================================
   DEFERRED REVEAL  (original, untouched)
   ============================================================ */
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
    const schedule =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? (cb: () => void) => requestIdleCallback(cb, { timeout: 300 })
        : (cb: () => void) => setTimeout(cb, 100);
    const id = schedule(() => setReady(true));
    return () => { if (typeof id === "number") clearTimeout(id); };
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

/* ============================================================
   LAZY SCROLL  (original, untouched)
   ============================================================ */
function useScrollWhenNeeded(ref: React.RefObject<HTMLDivElement>) {
  const [enabled, setEnabled] = useState(false);
  const staticProgress = { get: () => 0 } as unknown as ReturnType<typeof useScroll>["scrollYProgress"];
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const spring = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const handler = () => setEnabled(true);
    window.addEventListener("scroll", handler, { once: true, passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return enabled ? spring : staticProgress;
}

/* ============================================================
   TEMPLE INTRO FAST DISMISS  (original, untouched)
   ============================================================ */
function TempleIntroFastDismiss() {
  const [visible, setVisible]   = useState(true);
  const [mounted, setMounted]   = useState(true);

  useEffect(() => {
    const fadeTimer   = setTimeout(() => setVisible(false), 100);
    const unmountTimer = setTimeout(() => setMounted(false), 250);
    return () => { clearTimeout(fadeTimer); clearTimeout(unmountTimer); };
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        transition: "opacity 150ms ease-out",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <TempleIntro />
    </div>
  );
}

/* ============================================================
   HERO  (main export)
   ============================================================ */
export function Hero() {
  const ref      = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useScrollWhenNeeded(ref);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted       = true;
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

        {/* Temple intro overlay */}
        <TempleIntroFastDismiss />

        {/* ── POSTER ─────────────────────────────────────────────── */}
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

        {/* ── BASE OVERLAY ───────────────────────────────────────── */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.12,
            background:
              "radial-gradient(ellipse at 30% 40%, oklch(0.55 0.22 28 / 0.35) 0%, transparent 60%), linear-gradient(180deg, oklch(0.14 0.03 40 / 0.68) 0%, oklch(0.14 0.03 40 / 0.35) 45%, oklch(0.14 0.03 40 / 0.96) 100%)",
          }}
        />

        {/* ── GOLDEN LUMINOSITY WASH ─────────────────────────────── */}
        {/* Adds a warm divine light across the entire image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, oklch(0.82 0.18 82 / 0.14) 0%, oklch(0.75 0.21 50 / 0.06) 45%, transparent 70%)",
            mixBlendMode: "screen",
          }}
        />

        {/* ── VIGNETTE ───────────────────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 42%, oklch(0.10 0.02 30 / 0.88) 100%)",
          }}
        />

        {/* ── GOLDEN HALO (behind title) ─────────────────────────── */}
        <GoldenHalo />

        {/* ── PARTICLE LAYERS (CSS-only, compositor thread) ─────── */}
        <GoldenDust />
        <Embers />
        <GoldenGlitter />
        <SparkleStars />

        {/* ── MAIN CONTENT ───────────────────────────────────────── */}
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

        {/* ── DIYA ───────────────────────────────────────────────── */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-1/4">
          {/* Golden glow under diya */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: 140,
              height: 140,
              background: "radial-gradient(circle, oklch(0.92 0.22 80 / 0.45) 0%, oklch(0.82 0.18 70 / 0.2) 50%, transparent 75%)",
              filter: "blur(12px)",
              animation: "breathe 2.4s ease-in-out infinite",
            }}
          />
          <img
            src={diya}
            alt="दीपक"
            className="relative z-10 w-[140px] sm:w-[160px] md:w-[180px]"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* ── SCROLL INDICATOR ───────────────────────────────────── */}
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

        {/* ── BOTTOM FADE ────────────────────────────────────────── */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40"
          style={{ background: "linear-gradient(180deg, transparent 0%, oklch(0.14 0.03 40) 100%)" }}
        />
      </div>
    </section>
  );
}