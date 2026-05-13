import { motion, useScroll, useTransform } from "framer-motion";
import maaBackground from "@/assets/bagalamukhi_chakra.mp4";

/**
 * DeviPresence
 * Cinematic sacred background with:
 * - Reduced visibility
 * - Better readability
 * - Rounded immersive layout
 * - Smooth mobile + desktop scaling
 * - Soft spiritual ambience
 */

export function DeviPresence() {
  const { scrollYProgress } = useScroll();

  /* ========================================= */
  /* SCROLL ANIMATIONS */
  /* ========================================= */

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["-1%", "1%", "-1%"]);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  /* Reduced visibility */
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.28, 0.25, 0.22, 0.18]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* ========================================= */}
      {/* SANCTUM BASE BACKGROUND */}
      {/* ========================================= */}

      <div className="absolute inset-0 bg-gradient-sanctum" />

      {/* ========================================= */}
      {/* DIVINE HALO */}
      {/* ========================================= */}

      <div
        className="
          absolute
          top-[-15%]
          left-1/2
          -translate-x-1/2
          w-[140vw]
          h-[85vh]
          rounded-full
          opacity-50
          animate-breathe
        "
        style={{
          background: `
            radial-gradient(
              circle,
              rgba(255,193,7,0.12) 0%,
              rgba(255,152,0,0.07) 25%,
              rgba(255,87,34,0.04) 45%,
              transparent 72%
            )
          `,
        }}
      />

      {/* ========================================= */}
      {/* VIDEO CONTAINER */}
      {/* ========================================= */}

      <div className="absolute inset-0 flex items-center justify-center px-2 md:px-6 overflow-hidden">
        {/* Soft ambient glow */}

        <div
          className="
            absolute
            w-[92%]
            h-[84vh]
            rounded-[4rem]
            blur-3xl
            opacity-20
          "
          style={{
            background: `
              radial-gradient(
                circle,
                rgba(255,193,7,0.12),
                rgba(255,87,34,0.05),
                transparent 75%
              )
            `,
          }}
        />

        {/* ========================================= */}
        {/* SACRED VIDEO */}
        {/* ========================================= */}

        <motion.video
          src={maaBackground}
          aria-hidden
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          style={{
            y,
            x,
            scale,
            opacity,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2

            w-[320%]
            sm:w-[220%]
            md:w-[160%]
            lg:w-[125%]
            xl:w-[105%]
            2xl:w-[95%]

            h-auto
            max-h-[86vh]

            object-cover

            rounded-[2rem]
            md:rounded-[3rem]
            lg:rounded-[4rem]

            overflow-hidden

            brightness-[0.75]
            contrast-[1.02]

            shadow-[0_0_120px_rgba(255,180,0,0.12)]

            animate-float-slow
          "
        />
      </div>

      {/* ========================================= */}
      {/* DARK READABILITY OVERLAY */}
      {/* ========================================= */}

      <div className="absolute inset-0 bg-black/38" />

      {/* ========================================= */}
      {/* SACRED LIGHT TEXTURE */}
      {/* ========================================= */}

      <div
        className="
          absolute
          inset-0
          opacity-20
          mix-blend-screen
        "
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(255,193,7,0.05),
              transparent 30%,
              transparent 70%,
              rgba(255,87,34,0.04)
            )
          `,
        }}
      />

      {/* ========================================= */}
      {/* FLOATING EMBERS */}
      {/* ========================================= */}

      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full blur-sm"
          style={{
            width: `${4 + (i % 4) * 2}px`,
            height: `${4 + (i % 4) * 2}px`,
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            background: i % 2 === 0 ? "rgba(255,193,7,0.35)" : "rgba(255,87,34,0.22)",

            animation: `
              float-slow
              ${12 + (i % 5) * 4}s
              ease-in-out
              ${i * 0.6}s
              infinite
            `,

            opacity: 0.18 + (i % 3) * 0.06,
          }}
        />
      ))}

      {/* ========================================= */}
      {/* VIGNETTE */}
      {/* ========================================= */}

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at center,
              transparent 42%,
              rgba(0,0,0,0.24) 72%,
              rgba(0,0,0,0.55) 100%
            )
          `,
        }}
      />

      {/* ========================================= */}
      {/* FILM GRAIN */}
      {/* ========================================= */}

      <div className="absolute inset-0 vignette opacity-50" />
    </div>
  );
}
