import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import mandirVideo from "@/assets/mandir-video.mp4";
import diya from "@/assets/diya.png";
import yantra from "@/assets/yantra.png";
import petals from "@/assets/petals.png";
import "../../home_style.css";
import { TempleIntro } from "../../routes/TrishulIntro";
/* ------------------------------------------------------------------ */
/*  Sub-pieces                                                         */
/* ------------------------------------------------------------------ */

function Embers() {
  // Rising golden embers — pure CSS for performance
  const particles = Array.from({ length: 28 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
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
              background:
                "radial-gradient(circle, oklch(0.95 0.15 90) 0%, oklch(0.75 0.21 50) 60%, transparent 100%)",
              boxShadow: "0 0 8px oklch(0.82 0.16 82 / 0.9)",
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              ["--drift" as string]: drift,
            }}
          />
        );
      })}
    </div>
  );
}

function Diya({ className = "", scale = 1 }: { className?: string; scale?: number }) {
  return (
    <div className={`relative ${className}`} style={{ transform: `scale(${scale})` }}>
      {/* glow halo */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4 rounded-full breathe"
        style={{
          width: 220,
          height: 220,
          background:
            "radial-gradient(circle, oklch(0.92 0.14 95 / 0.55) 0%, oklch(0.75 0.21 50 / 0.25) 40%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      <img
        src={diya}
        alt="दीपक"
        className="relative z-10 h-auto w-[180px] flame-flicker"
        style={{ filter: "drop-shadow(0 8px 24px oklch(0.75 0.21 50 / 0.6))" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [revealed, setRevealed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });

  // Cinematic transforms — three-act structure
  const videoOpacity = useTransform(smooth, [0, 0.15, 0.55, 0.85], [0.9, 1, 1, 0.95]);
  const videoScale = useTransform(smooth, [0, 1], [1.25, 1.05]);
  const veilOpacity = useTransform(smooth, [0, 0.4, 1], [0.12, 0.08, 0.18]);

  const titleY = useTransform(smooth, [0, 1], ["0%", "-40%"]);
  const titleOpacity = useTransform(smooth, [0, 0.6, 0.85], [1, 1, 0]);

  const yantraRotate = useTransform(smooth, [0, 1], [0, 180]);
  const yantraScale = useTransform(smooth, [0, 0.5, 1], [0.6, 1.1, 0.8]);
  const yantraOpacity = useTransform(smooth, [0, 0.2, 0.8, 1], [0, 0.18, 0.22, 0.05]);

  const petalsY = useTransform(smooth, [0, 1], ["0%", "60%"]);
  const petalsOpacity = useTransform(smooth, [0, 0.3, 1], [0.4, 0.7, 0.2]);

  // Story chapters that fade in/out as you scroll
  const chapter1 = useTransform(smooth, [0, 0.05, 0.18, 0.25], [0, 1, 1, 0]);
  const chapter2 = useTransform(smooth, [0.22, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
  const chapter3 = useTransform(smooth, [0.55, 0.65, 0.85, 0.95], [0, 1, 1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.play().catch(() => {});
  }, []);

  // intro reveal: gold curtain pulls back
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[110vh] w-full overflow-hidden bg-background text-foreground"
      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
    >
      {/* ============== STICKY CINEMATIC STAGE ============== */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
      <TempleIntro />
        {/* drone footage layer */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: videoOpacity, scale: videoScale }}
        >
          <video
            ref={videoRef}
            src={mandirVideo}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
            style={{ filter: "saturate(1.1) contrast(1.05)" }}
          />
        </motion.div>

        {/* warm color grade veil — gold/maroon, never cold */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: veilOpacity,
            background:
              "radial-gradient(ellipse at 30% 40%, oklch(0.55 0.22 28 / 0.35) 0%, transparent 60%), linear-gradient(180deg, oklch(0.14 0.03 40 / 0.7) 0%, oklch(0.14 0.03 40 / 0.35) 45%, oklch(0.14 0.03 40 / 0.95) 100%)",
          }}
        />

        {/* large rotating yantra behind type */}
        <motion.img
          src={yantra}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 select-none"
          style={{
            width: "min(95vh, 95vw)",
            opacity: yantraOpacity,
            rotate: yantraRotate,
            scale: yantraScale,
            mixBlendMode: "screen",
          }}
        />

        {/* drifting petals */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            opacity: petalsOpacity,
            y: petalsY,
            backgroundImage: `url(${petals})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "screen",
          }}
        />

        {/* embers */}
        <Embers />

        {/* vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, oklch(0.10 0.02 30 / 0.85) 100%)",
          }}
        />


        {/* ============== TYPOGRAPHY STAGE ============== */}
        <motion.div
          className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-12 bg-gold" />
            <span
              className="text-xs uppercase tracking-[0.5em] text-gold"
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              Pitambara Peeth
            </span>
            <span className="h-px w-12 bg-gold" />
          </motion.div>

          {/* main devanagari headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40, letterSpacing: "0.3em" }}
            animate={{
              opacity: revealed ? 1 : 0,
              y: revealed ? 0 : 40,
              letterSpacing: "0.02em",
            }}
            transition={{ delay: 0.85, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-glow mb-2 leading-[0.9]"
            style={{
              fontFamily: '"Tiro Devanagari Sanskrit", serif',
              fontSize: "clamp(3rem, 9vw, 9rem)",
            }}
          >
            <span className="gold-shimmer">माँ पीतांबरा</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 30 }}
            transition={{ delay: 1.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-ivory text-glow"
            style={{
              fontFamily: '"Tiro Devanagari Sanskrit", serif',
              fontSize: "clamp(2rem, 6vw, 6rem)",
              fontStyle: "italic",
            }}
          >
            बगलामुखी मंदिर
          </motion.h2>

          {/* small ornamental divider with diya */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: revealed ? 1 : 0, scaleX: revealed ? 1 : 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="my-8 flex items-center gap-4"
          >
            <span className="h-px w-24 sm:w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="relative h-6 w-6">
              <span
                className="absolute inset-0 rounded-full breathe"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.92 0.14 95) 0%, oklch(0.75 0.21 50) 50%, transparent 80%)",
                  boxShadow: "0 0 24px oklch(0.82 0.16 82 / 0.9)",
                }}
              />
            </div>
            <span className="h-px w-24 sm:w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </motion.div>

          {/* address */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex items-center gap-2 text-sm text-ivory/80"
            style={{ fontFamily: '"Cinzel", serif', letterSpacing: "0.2em" }}
          >
            <MapPin className="h-3.5 w-3.5 text-gold" />
            <span className="uppercase">Badnagar Main Road · Ujjain · M.P.</span>
          </motion.div>

          {/* CTA pair */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              className="group relative overflow-hidden rounded-none px-10 py-4 text-sm uppercase tracking-[0.3em] text-maroon transition-transform hover:scale-[1.02]"
              style={{
                fontFamily: '"Cinzel", serif',
                background:
                  "linear-gradient(135deg, oklch(0.92 0.14 95) 0%, oklch(0.82 0.16 82) 50%, oklch(0.68 0.17 62) 100%)",
                boxShadow:
                  "0 0 0 1px oklch(0.92 0.14 95 / 0.4), 0 10px 40px oklch(0.75 0.21 50 / 0.5)",
              }}
            >
              <span className="relative z-10">दर्शन करें · Darshan</span>
            </button>
            
          </motion.div>
        </motion.div>

        {/* ============== STORYTELLING CHAPTERS (overlay) ============== */}
        <ChapterOverlay opacity={chapter1} align="left">
          <ChapterTitle> श्री महाकालेश्वर मंदिर से केवल 3 किलोमीटर दूर</ChapterTitle>
          <ChapterBody>
           अद्भुत आध्यात्मिक ऊर्जा का केंद्र — माँ बगलामुखी दिव्य पीठ जहाँ भक्तों को मिलता है शरण और शक्ति का आशीर्वाद।
          </ChapterBody>
        </ChapterOverlay>

        <ChapterOverlay opacity={chapter2} align="right">
          <ChapterSmall>अध्याय दो · Chapter Two</ChapterSmall>
          <ChapterTitle>एक दिव्य अध्याय</ChapterTitle>
          <ChapterBody>
            पीताम्बरा बगलामुखी का यह पीठ — साधना, शरण और शक्ति का संगम। प्रत्येक दीप एक प्रार्थना,
            प्रत्येक मन्त्र एक आशीर्वाद।
          </ChapterBody>
        </ChapterOverlay>

        <ChapterOverlay opacity={chapter3} align="center">
          <ChapterSmall>स्वागतम् · Welcome</ChapterSmall>
          <ChapterTitle>आपका स्वागत है</ChapterTitle>
          <ChapterBody>
            बड़नगर मेन रोड, उज्जैन (म.प्र.) — माँ की कृपा सदा आप पर बनी रहे।
          </ChapterBody>
        </ChapterOverlay>

        {/* foreground diya — anchor for the eye */}
        <motion.div
          className="pointer-events-none absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-1/4"
          style={{ opacity: useTransform(smooth, [0, 0.3, 1], [0, 0.9, 0.4]) }}
        >
          <Diya scale={1.2} />
        </motion.div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 0.7 : 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          style={{ opacity: useTransform(smooth, [0, 0.05], [0.7, 0]) }}
          className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-gold"
        >
          <span
            className="text-[10px] uppercase tracking-[0.5em]"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            scroll · आगे बढ़ें
          </span>
          <motion.div
            role="button"
            tabIndex={0}
            aria-label="Scroll to Know Mandir"
            onClick={() => {
              const el = document.getElementById("know-mandir");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const el = document.getElementById("know-mandir");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>

        {/* fade out into next section */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-[5]"
          style={{
            background: "linear-gradient(180deg, transparent 0%, oklch(0.14 0.03 40) 100%)",
          }}
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Chapter helpers                                                    */
/* ------------------------------------------------------------------ */

function ChapterOverlay({
  children,
  opacity,
  align,
}: {
  children: React.ReactNode;
  opacity: MotionValue<number>;
  align: "left" | "right" | "center";
}) {
  const justify =
    align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";
  const textAlign =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  return (
    <motion.div
      style={{ opacity }}
      className={`pointer-events-none absolute inset-0 z-30 mx-auto flex max-w-7xl items-start px-6 sm:px-12 ${justify}`}    >
      <div className={`max-w-xl ${textAlign} pt-[22rem] sm:pt-[26rem]`}>{children}</div>
    </motion.div>
  );
}

function ChapterSmall({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-3 text-[10px] uppercase tracking-[0.5em] text-gold"
      style={{ fontFamily: '"Cinzel", serif' }}
    >
      {children}
    </div>
  );
}
function ChapterTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mb-4 text-glow"
      style={{
        fontFamily: '"Tiro Devanagari Sanskrit", serif',
        fontSize: "clamp(1.75rem, 4vw, 3.25rem)",
        lineHeight: 1.1,
        color: "oklch(0.97 0.02 85)",
      }}
    >
      {children}
    </h3>
  );
}
function ChapterBody({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-base leading-relaxed text-ivory/85 sm:text-lg"
      style={{ fontFamily: '"Tiro Devanagari Sanskrit", serif' }}
    >
      {children}
    </p>
  );
}
