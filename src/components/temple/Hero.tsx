import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

import { useEffect, useRef, useState } from "react";

import {
  ChevronDown,
  MapPin,
} from "lucide-react";

import mandirVideo from "@/assets/mandir-video.mp4";
import diya from "@/assets/diya.webp";
import yantra from "@/assets/yantra.webp";
import petals from "@/assets/petals.webp";

import "../../home_style.css";
import { TempleIntro } from "../../routes/-TrishulIntro";

/* -------------------------------------------------------------------------- */
/*                                  EMBERS                                    */
/* -------------------------------------------------------------------------- */

function Embers() {
  const particles = Array.from({ length: 28 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => {
        const left = (i * 37) % 100;
        const size = 2 + (i % 4);
        const delay = (i * 0.7) % 12;
        const duration = 9 + (i % 7);

        const drift = `${
          (i % 2 === 0 ? 1 : -1) *
          (10 + (i % 30))
        }px`;

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

              boxShadow:
                "0 0 8px oklch(0.82 0.16 82 / 0.9)",

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

/* -------------------------------------------------------------------------- */
/*                                  HERO                                      */
/* -------------------------------------------------------------------------- */

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const [revealed, setRevealed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
  });

  /* -------------------------------------------------------------------------- */
  /*                                TRANSFORMS                                  */
  /* -------------------------------------------------------------------------- */

  const videoOpacity = useTransform(
    smooth,
    [0, 0.15, 0.55, 0.85],
    [0.9, 1, 1, 0.95]
  );

  const videoScale = useTransform(
    smooth,
    [0, 1],
    [1.22, 1.05]
  );

  const veilOpacity = useTransform(
    smooth,
    [0, 0.4, 1],
    [0.12, 0.08, 0.18]
  );

  const titleY = useTransform(
    smooth,
    [0, 1],
    ["0%", "-38%"]
  );

  const titleOpacity = useTransform(
    smooth,
    [0, 0.6, 0.85],
    [1, 1, 0]
  );

  const yantraRotate = useTransform(
    smooth,
    [0, 1],
    [0, 180]
  );

  const yantraScale = useTransform(
    smooth,
    [0, 0.5, 1],
    [0.6, 1.1, 0.8]
  );

  const yantraOpacity = useTransform(
    smooth,
    [0, 0.2, 0.8, 1],
    [0, 0.18, 0.22, 0.05]
  );

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const v = videoRef.current;

    if (!v) return;

    v.muted = true;
    v.playsInline = true;

    v.play().catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setRevealed(true);
    }, 200);

    return () => clearTimeout(t);
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                    JSX                                     */
  /* -------------------------------------------------------------------------- */

  return (
    <section
      ref={ref}
      className="
        relative
        min-h-[115vh]
        overflow-hidden
        bg-background
        text-foreground
      "
      style={{
        fontFamily:
          '"Cormorant Garamond", serif',
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* INTRO */}
        <TempleIntro />

        {/* -------------------------------------------------------------------------- */}
        {/*                                  VIDEO                                      */}
        {/* -------------------------------------------------------------------------- */}

        <motion.div
          className="absolute inset-0"
          style={{
            opacity: videoOpacity,
            scale: videoScale,
          }}
        >
          <video
            ref={videoRef}
            src={mandirVideo}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
            style={{
              filter:
                "saturate(1.08) contrast(1.05)",
            }}
          />
        </motion.div>

        {/* -------------------------------------------------------------------------- */}
        {/*                                  OVERLAY                                    */}
        {/* -------------------------------------------------------------------------- */}

        <motion.div
          className="absolute inset-0"
          style={{
            opacity: veilOpacity,

            background:
              "radial-gradient(ellipse at 30% 40%, oklch(0.55 0.22 28 / 0.35) 0%, transparent 60%), linear-gradient(180deg, oklch(0.14 0.03 40 / 0.68) 0%, oklch(0.14 0.03 40 / 0.35) 45%, oklch(0.14 0.03 40 / 0.96) 100%)",
          }}
        />

        {/* -------------------------------------------------------------------------- */}
        {/*                                  YANTRA                                     */}
        {/* -------------------------------------------------------------------------- */}

        <motion.img
          src={yantra}
          alt=""
          aria-hidden
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            z-[1]
            -translate-x-1/2
            -translate-y-1/2
            select-none
          "
          style={{
            width: "min(95vh, 95vw)",
            opacity: yantraOpacity,
            rotate: yantraRotate,
            scale: yantraScale,
            mixBlendMode: "screen",
          }}
        />

        {/* PETALS */}

        <motion.div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            backgroundImage: `url(${petals})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "screen",
            opacity: 0.55,
          }}
        />

        {/* EMBERS */}

        <Embers />

        {/* VIGNETTE */}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 42%, oklch(0.10 0.02 30 / 0.88) 100%)",
          }}
        />

        {/* -------------------------------------------------------------------------- */}
        {/*                              MAIN HERO CONTENT                              */}
        {/* -------------------------------------------------------------------------- */}

        <motion.div
          className="
            relative
            z-20

            mx-auto

            flex
            h-full
            max-w-7xl
            flex-col

            items-center
            justify-center

            px-6

            text-center

            -translate-y-10
            sm:-translate-y-12
            md:-translate-y-14
            lg:-translate-y-16
          "
          style={{
            y: titleY,
            opacity: titleOpacity,
          }}
        >

          {/* -------------------------------------------------------------------------- */}
          {/*                                 TOP LABEL                                  */}
          {/* -------------------------------------------------------------------------- */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: revealed ? 1 : 0,
              y: revealed ? 0 : 20,
            }}
            transition={{
              delay: 0.6,
              duration: 0.7,
            }}
            className="
              mb-6
              flex
              items-center
              gap-3
            "
          >
            
          </motion.div>

          {/* -------------------------------------------------------------------------- */}
          {/*                                MAIN TITLE                                  */}
          {/* -------------------------------------------------------------------------- */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
              letterSpacing: "0.2em",
            }}
            animate={{
              opacity: revealed ? 1 : 0,
              y: revealed ? 0 : 40,
              letterSpacing: "0.02em",
            }}
            transition={{
              delay: 0.85,
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              text-glow

              leading-[1.5]

              overflow-visible

              pb-4

              translate-y-4
sm:translate-y-5
md:translate-y-6

            "
            style={{
              fontFamily:
                '"Tiro Devanagari Sanskrit", serif',

              fontSize:
                "clamp(3rem, 9vw, 9rem)",
            }}
          >
            <span className="gold-shimmer inline-block">
              माँ पीतांबरा
            </span>
          </motion.h1>

          {/* -------------------------------------------------------------------------- */}
          {/*                               SECOND TITLE                                 */}
          {/* -------------------------------------------------------------------------- */}

          <motion.h2
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: revealed ? 1 : 0,
              y: revealed ? 0 : 30,
            }}
            transition={{
              delay: 1.05,
              duration: 1,
            }}
            className="
              text-ivory
              text-glow

              leading-[1.4]

              overflow-visible

              pb-2
            "
            style={{
              fontFamily:
                '"Tiro Devanagari Sanskrit", serif',

              fontSize:
                "clamp(2rem, 6vw, 6rem)",

              fontStyle: "italic",
            }}
          >
            बगलामुखी मंदिर
          </motion.h2>

          {/* -------------------------------------------------------------------------- */}
          {/*                                 DIVIDER                                    */}
          {/* -------------------------------------------------------------------------- */}

          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              opacity: revealed ? 1 : 0,
              scaleX: revealed ? 1 : 0,
            }}
            transition={{
              delay: 1.2,
              duration: 0.8,
            }}
            className="
              my-7
              flex
              items-center
              gap-4
            "
          >
            <span className="h-px w-24 sm:w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />

            <div className="relative h-5 w-5">
              <span
                className="
                  absolute
                  inset-0
                  rounded-full
                  breathe
                "
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.92 0.14 95) 0%, oklch(0.75 0.21 50) 50%, transparent 80%)",
                }}
              />
            </div>

            <span className="h-px w-24 sm:w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </motion.div>

          {/* -------------------------------------------------------------------------- */}
          {/*                                  ADDRESS                                   */}
          {/* -------------------------------------------------------------------------- */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: revealed ? 1 : 0,
            }}
            transition={{
              delay: 1.35,
              duration: 0.8,
            }}
            className="
              flex
              items-center
              gap-2

              text-[11px]
              sm:text-sm

              text-ivory/80
            "
            style={{
              fontFamily:
                '"Cinzel", serif',

              letterSpacing: "0.18em",
            }}
          >
            <MapPin className="h-3.5 w-3.5 text-gold" />

            <span className="uppercase">
              Badnagar Main Road · Ujjain · M.P.
            </span>
          </motion.div>

          {/* -------------------------------------------------------------------------- */}
          {/*                             DISTANCE BUTTON                                */}
          {/* -------------------------------------------------------------------------- */}

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: revealed ? 1 : 0,
              y: revealed ? 0 : 12,
            }}
            transition={{
              delay: 1.55,
              duration: 0.8,
            }}
            className="mt-5"
          >
            <button
              className="
                group

                relative

                overflow-hidden

                rounded-full

                border
                border-[#ffcc70]/40

                bg-gradient-to-r
                from-[#7a1f10]/90
                via-[#b53a14]/90
                to-[#f59e0b]/85

                px-5
                py-2.5

                text-[10px]
                sm:text-xs

                uppercase

                tracking-[0.25em]

                text-[#fff4d6]

                backdrop-blur-md

                transition-all
                duration-500

                hover:scale-[1.05]

                hover:shadow-[0_0_30px_rgba(255,170,60,0.35)]

                shadow-[0_0_20px_rgba(255,140,40,0.22)]
              "
              style={{
                fontFamily:
                  '"Cinzel", serif',
              }}
            >
              <div
                className="
                  absolute
                  inset-0

                  opacity-40

                  blur-xl
                "
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,180,60,0.45), transparent 70%)",
                }}
              />

              <span className="relative z-10">
                महाकालेश्वर से केवल 3KM दूर
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* -------------------------------------------------------------------------- */}
        {/*                                    DIYA                                    */}
        {/* -------------------------------------------------------------------------- */}

        <motion.div
          className="
            pointer-events-none

            absolute
            bottom-0
            left-1/2

            z-20

            -translate-x-1/2
            translate-y-1/4
          "
        >
          <img
            src={diya}
            alt="दीपक"
            className="
              w-[140px]
              sm:w-[160px]
              md:w-[180px]
            "
          />
        </motion.div>

        {/* -------------------------------------------------------------------------- */}
        {/*                             SCROLL INDICATOR                               */}
        {/* -------------------------------------------------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: revealed ? 0.7 : 0,
          }}
          transition={{
            delay: 1.8,
            duration: 0.6,
          }}
          className="
            absolute
            bottom-8
            left-1/2

            z-30

            flex
            -translate-x-1/2
            flex-col
            items-center
            gap-2

            text-gold
          "
        >
          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.45em]
            "
            style={{
              fontFamily:
                '"Cinzel", serif',
            }}
          >
            scroll · आगे बढ़ें
          </span>

          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>

        {/* -------------------------------------------------------------------------- */}
        {/*                                BOTTOM FADE                                 */}
        {/* -------------------------------------------------------------------------- */}

        <div
          className="
            pointer-events-none

            absolute
            inset-x-0
            bottom-0

            z-[5]

            h-40
          "
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, oklch(0.14 0.03 40) 100%)",
          }}
        />
      </div>
    </section>
  );
}