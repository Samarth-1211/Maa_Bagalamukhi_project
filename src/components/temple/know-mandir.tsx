import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { ChevronDown, MapPin, Flame, Sparkles, Home, Users } from "lucide-react";
import mandirExteriorIntro from "@/assets/mandir-exterior-1.webp";
import mandirExterior from "@/assets/mandir-exterior.webp";
import mandirSanctum from "@/assets/mandir-sanctum.webp";
import havan from "@/assets/havan.webp";
import aartiDiyas from "@/assets/aarti-diyas.webp";
import yantra from "@/assets/yantra.webp";
import pardaCurtain from "@/assets/parda-red.webp";


/* --------------------------- Embers (CSS) --------------------------- */
function Embers({ count = 22 }: { count?: number }) {
  const items = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const left = (i * 41) % 100;
        const size = 2 + (i % 4);
        const delay = (i * 0.6) % 10;
        const duration = 8 + (i % 8);
        const drift = `${(i % 2 === 0 ? 1 : -1) * (10 + (i % 30))}px`;
        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full bg-gold"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              filter: "blur(0.5px)",
              boxShadow: "0 0 8px oklch(0.82 0.14 80 / 0.9)",
              animation: `ember-rise ${duration}s linear ${delay}s infinite`,
              ["--drift" as never]: drift,
            }}
          />
        );
      })}
    </div>
  );
}

/* --------------------------- Diya glyph --------------------------- */
function Diya({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <div className="absolute -inset-6 rounded-full bg-gold/30 blur-2xl animate-flicker" />
      <div className="relative animate-flicker">
        <div className="mx-auto h-6 w-3 rounded-t-full bg-gradient-to-t from-ember to-gold" />
        <div className="mx-auto -mt-1 h-3 w-10 rounded-b-full bg-gradient-to-b from-ember to-maroon shadow-[0_4px_12px_oklch(0.32_0.12_25/0.6)]" />
      </div>
    </div>
  );
}

/* --------------------------- Section heading --------------------------- */
function ChapterLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-gold/80">
      <span className="h-px w-10 bg-gold/50" />
      <span className="text-xs uppercase tracking-[0.4em]">{n}</span>
      <span className="font-display italic text-base">{label}</span>
    </div>
  );
}

/* --------------------------- Page --------------------------- */
function KnowMandirPage() {
  return (
    <main className="bg-night-radial text-foreground">
      <Intro />
      <ChapterOne />
      <ChapterTwo />
      <ChapterThree />
      <ChapterFour />
      <ChapterFive />
    </main>
  );
}

/* --------------------------- INTRO (the hook) --------------------------- */
function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });
  const bgY = useTransform(smooth, [0, 1], ["0%", "30%"]);
  const titleY = useTransform(smooth, [0, 1], ["0%", "-30%"]);
  const titleOpacity = useTransform(smooth, [0, 0.7, 1], [1, 1, 0]);
  const yantraRot = useTransform(smooth, [0, 1], [0, 120]);
  const yantraScale = useTransform(smooth, [0, 1], [0.7, 1.1]);

  return (
    <section
      ref={ref}
      className="relative h-[120vh] w-full overflow-hidden bg-night-deep"
    >
      {/* parallax bg */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-[10vh] h-[130vh]"
      >
        <img
          src={mandirExteriorIntro}
          alt="माँ पीताम्बरा बगलामुखी मंदिर का बाहरी दृश्य"
          className="h-full w-full object-cover opacity-60"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-deep/60 via-night-deep/40 to-night-deep" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.07_0.015_30/0.9)_85%)]" />
      </motion.div>

      {/* rotating yantra */}
      <motion.img
        src={yantra}
        alt=""
        aria-hidden
        style={{ rotate: yantraRot, scale: yantraScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 -ml-[35vmin] -mt-[35vmin] h-[70vmin] w-[70vmin] opacity-20 mix-blend-screen"
      />

      <Embers count={26} />

      {/* sticky type */}
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 flex flex-col items-center text-center"
        >
         
          <h1 className="mt-6 font-deva text-5xl leading-[1.5] sm:text-7xl md:text-8xl text-gradient-gold">
            जानिए माँ के
            <br />
            दिव्य धाम को
          </h1>
          <p className="mt-6 max-w-xl text-base text-gold-soft/90 sm:text-lg">
            हर दीप एक प्रार्थना है, हर मन्त्र एक आशीर्वाद।
            <br />
            <span className="font-display italic text-gold/70">
              Scroll gently — let the story unfold.
            </span>
          </p>

          <Diya className="mt-10" />

          {/* scroll cue */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="mt-12 flex flex-col items-center gap-2 text-gold/70"
          >
            <span className="text-[10px] uppercase tracking-[0.4em]">scroll · आगे</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------- CHAPTER 1: where it stands --------------------------- */
function ChapterOne() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 90,
  });

  const imgScale = useTransform(
    smooth,
    [0, 1],
    [1.2, 1]
  );

  const imgY = useTransform(
    smooth,
    [0, 1],
    ["-10%", "10%"]
  );

  const textY = useTransform(
    smooth,
    [0, 1],
    ["20%", "-20%"]
  );

  return (
    <section
      ref={ref}
      className="
        relative

        grid
        min-h-screen
        grid-cols-1

        items-center
        gap-16

        overflow-hidden

        border-t
        border-gold/10

        px-6
        py-32

        md:grid-cols-2
        md:px-16
      "
    >
      {/* BACKGROUND AURA */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,oklch(0.32_0.12_25/0.4),transparent_60%)]" />

      {/* -------------------------------------------------------------------------- */}
      {/*                               LEFT IMAGE                                    */}
      {/* -------------------------------------------------------------------------- */}

      <motion.div
        style={{ y: imgY }}
        className="relative"
      >
        <motion.div
          style={{ scale: imgScale }}
          className="
            ring-gold

            relative

            aspect-[4/5]

            overflow-hidden

            rounded-3xl

            glow-gold
          "
        >
          <img
            src={mandirExterior}
            alt="मंदिर का बाहरी दृश्य"
            className="
              h-full
              w-full
              object-cover
            "
            loading="lazy"
            width={1920}
            height={1080}
          />

          {/* IMAGE OVERLAY */}

          <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-transparent to-transparent" />
        </motion.div>

        {/* FLOATING ADDRESS CARD */}

        <div
          className="
            absolute

            -bottom-6
            -right-2

            hidden
            md:block
          "
        >
          <div
            className="
              rounded-2xl

              border
              border-gold/20

              bg-night/80

              px-6
              py-4

              backdrop-blur-xl

              shadow-[0_0_30px_rgba(255,180,0,0.08)]
            "
          >
            <p
              className="
                flex
                items-center
                gap-2

                text-xs

                leading-[1.9]

                text-gold-soft
              "
            >
              <MapPin className="h-3.5 w-3.5" />

              मुरलीपुरा · बड़नगर मेन रोड · उज्जैन
            </p>
          </div>
        </div>
      </motion.div>

      {/* -------------------------------------------------------------------------- */}
      {/*                              RIGHT CONTENT                                  */}
      {/* -------------------------------------------------------------------------- */}

      <motion.div
        style={{ y: textY }}
        className="relative max-w-xl"
      >
        <ChapterLabel
          label="A Sacred Address"
        />

        {/* TITLE */}

        <h2
          className="
            mt-5

            font-deva

            text-4xl
            sm:text-5xl

            leading-[1.5]

            overflow-visible

            text-gradient-gold
          "
        >
          जहाँ माँ का धाम है
        </h2>

        {/* DESCRIPTION */}

        <p
          className="
            mt-6

            font-display

            text-lg

            leading-[2.15]

            text-foreground/80

            overflow-visible
          "
        >
          मध्यप्रदेश की पावन नगरी{" "}
          <span className="text-gold">
            उज्जैन
          </span>{" "}
          में, मुरलीपुरा बड़नगर मेन रोड पर
          स्थित यह दिव्य सिद्धपीठ —
          जहाँ पहुँचते ही मन शांत हो जाता है।
        </p>

        {/* STATS */}

        <div className="mt-8 grid grid-cols-2 gap-4">
          <Stat
            k="3 KM"
            v="महाकालेश्वर से दूरी"
          />

          <Stat
            k="सिद्ध"
            v="साधना पीठ"
          />
        </div>

        {/* -------------------------------------------------------------------------- */}
        {/*                               MAP CARD                                      */}
        {/* -------------------------------------------------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ once: true }}
          className="
            mt-10

            overflow-hidden

            rounded-3xl

            border
            border-gold/15

            bg-night/70

            backdrop-blur-xl

            shadow-[0_0_40px_rgba(255,180,0,0.08)]
          "
        >
          {/* MAP */}

          <div className="relative h-[240px] overflow-hidden">

            <iframe
              src="https://www.google.com/maps?q=Maa+Pitambara+Bagalamukhi+Mandir+Ujjain&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="
                absolute
                inset-0

                h-full
                w-full

                border-0
              "
            />

            {/* MAP OVERLAY */}

            <div
              className="
                absolute
                inset-0

                bg-gradient-to-t
                from-night-deep/80
                via-transparent
                to-transparent
              "
            />

            {/* LOCATION BADGE */}

            <div
              className="
                absolute

                left-4
                top-4

                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-gold/20

                bg-night/70

                px-4
                py-2

                backdrop-blur-md
              "
            >
              <MapPin className="h-4 w-4 text-gold" />

              <span
                className="
                  text-[10px]

                  uppercase

                  tracking-[0.25em]

                  text-gold
                "
                style={{
                  fontFamily: '"Cinzel", serif',
                }}
              >
                Ujjain · Madhya Pradesh
              </span>
            </div>
          </div>

          {/* MAP CONTENT */}

          <div className="p-6">

            <h3
              className="
                font-deva

                text-2xl

                leading-[1.6]

                overflow-visible

                text-gradient-gold
              "
            >
              मंदिर तक पहुँचें
            </h3>

            <p
              className="
                mt-3

                text-sm

                leading-[2]

                text-foreground/70
              "
            >
              महाकालेश्वर ज्योतिर्लिंग से केवल
              3 किलोमीटर दूर स्थित —
              माँ बगलामुखी सिद्धपीठ तक
              आसानी से पहुँचें।
            </p>

            {/* BUTTON */}

            <a
href="https://www.google.com/maps/dir/?api=1&destination=23.1835725,75.7365154&travelmode=driving"              rel="noopener noreferrer"
              className="
                group

                relative

                mt-6

                inline-flex
                items-center
                gap-3

                overflow-hidden

                rounded-full

                border
                border-[#ffcc70]/40

                bg-gradient-to-r
                from-[#7a1f10]/90
                via-[#b53a14]/90
                to-[#f59e0b]/85

                px-6
                py-3

                text-xs

                uppercase

                tracking-[0.22em]

                text-[#fff4d6]

                transition-all
                duration-500

                hover:scale-[1.04]

                hover:shadow-[0_0_30px_rgba(255,170,60,0.35)]
              "
              style={{
                fontFamily: '"Cinzel", serif',
              }}
            >
              <div
                className="
                  absolute
                  inset-0

                  opacity-30

                  blur-xl
                "
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,180,60,0.45), transparent 70%)",
                }}
              />

              <MapPin className="relative z-10 h-4 w-4" />

              <span className="relative z-10">
                Get Directions
              </span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="ring-gold rounded-xl bg-night/60 px-5 py-4 backdrop-blur">
      <div className="font-display text-2xl text-gold">{k}</div>
      <div className="mt-1 text-xs text-foreground/60">{v}</div>
    </div>
  );
}

/* --------------------------- CHAPTER 2: the deity reveal --------------------------- */
/* --------------------------- CHAPTER 2: the deity reveal --------------------------- */

function ChapterTwo() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 85,
  });

  /* -------------------------------------------------------------------------- */
  /*                            CURTAIN ANIMATION                               */
  /* -------------------------------------------------------------------------- */

  const leftX = useTransform(
    smooth,
    [0.12, 0.55],
    ["0%", "-110%"]
  );

  const rightX = useTransform(
    smooth,
    [0.12, 0.55],
    ["0%", "110%"]
  );

  const curtainOpacity = useTransform(
    smooth,
    [0, 0.18, 0.5],
    [1, 1, 0.15]
  );

  /* -------------------------------------------------------------------------- */
  /*                      TEXT APPEARS HALFWAY OPEN                             */
  /* -------------------------------------------------------------------------- */

  const captionOpacity = useTransform(
    smooth,
    [0.26, 0.46],
    [0, 1]
  );

  const captionY = useTransform(
    smooth,
    [0.26, 0.46],
    [80, 0]
  );

  /* -------------------------------------------------------------------------- */
  /*                           IMAGE CINEMATICS                                 */
  /* -------------------------------------------------------------------------- */

  const imgScale = useTransform(
    smooth,
    [0, 1],
    [1.08, 1.18]
  );

  const imgOpacity = useTransform(
    smooth,
    [0, 0.3, 1],
    [0.95, 0.92, 1]
  );

  const imgDim = useTransform(
    smooth,
    [0, 0.5, 1],
    [0.55, 0.35, 0.15]
  );

  return (
    <section
      ref={ref}
      className="
        relative
        h-[120vh]

        overflow-hidden

        border-t
        border-gold/10
      "
    >
      <div
        className="
          sticky
          top-0

          flex
          h-screen
          w-full

          items-center
          justify-center

          overflow-hidden
        "
      >

        {/* -------------------------------------------------------------------------- */}
        {/*                              SANCTUM IMAGE                                  */}
        {/* -------------------------------------------------------------------------- */}

        <motion.img
          src={mandirSanctum}
          alt="माँ बगलामुखी के दिव्य दर्शन"
          style={{
            scale: imgScale,
            opacity: imgOpacity,
          }}
          className="
            absolute
            inset-0

            h-full
            w-full

            object-cover
          "
          loading="lazy"
          width={1080}
          height={1920}
        />

        {/* -------------------------------------------------------------------------- */}
        {/*                               BASE WASH                                     */}
        {/* -------------------------------------------------------------------------- */}

        <motion.div
          style={{
            opacity: imgDim,
          }}
          className="
            absolute
            inset-0

            bg-night-deep
          "
        />

        {/* -------------------------------------------------------------------------- */}
        {/*                           DIVINE CENTER LIGHT                               */}
        {/* -------------------------------------------------------------------------- */}

        <div
          className="
            pointer-events-none

            absolute
            left-1/2
            top-0

            z-20

            h-full
            w-px

            -translate-x-1/2

            bg-gradient-to-b
            from-transparent
            via-gold/40
            to-transparent
          "
        />

        <div
          className="
            pointer-events-none

            absolute
            left-1/2
            top-1/2

            z-20

            h-[30rem]
            w-[30rem]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-gold/10

            blur-3xl
          "
        />

        {/* -------------------------------------------------------------------------- */}
        {/*                               LEFT CURTAIN                                  */}
        {/* -------------------------------------------------------------------------- */}

        <motion.div
          style={{
            x: leftX,
            opacity: curtainOpacity,
          }}
          className="
            absolute
            inset-y-0
            left-0

            w-1/2

            overflow-hidden

            shadow-[inset_-22px_0_70px_rgba(0,0,0,0.75)]
          "
        >
          <div className="relative h-full w-full">

            <img
              src={pardaCurtain}
              alt=""
              aria-hidden="true"
              className="
                h-full
                w-full

                object-cover
                object-right
              "
            />

            {/* curtain shading */}

            <div
              className="
                absolute
                inset-0

                bg-gradient-to-r
                from-[#5a0000]/95
                via-[#8b0f0f]/90
                to-[#220000]/95
              "
            />

            {/* fabric shine */}

            <div
              className="
                absolute
                inset-0

                bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_30%,rgba(0,0,0,0.22))]
              "
            />
          </div>
        </motion.div>

        {/* -------------------------------------------------------------------------- */}
        {/*                              RIGHT CURTAIN                                  */}
        {/* -------------------------------------------------------------------------- */}

        <motion.div
          style={{
            x: rightX,
            opacity: curtainOpacity,
          }}
          className="
            absolute
            inset-y-0
            right-0

            w-1/2

            overflow-hidden

            shadow-[inset_22px_0_70px_rgba(0,0,0,0.75)]
          "
        >
          <div className="relative h-full w-full">

            <img
              src={pardaCurtain}
              alt=""
              aria-hidden="true"
              className="
                h-full
                w-full

                object-cover
                object-left

                scale-x-[-1]
              "
            />

            {/* curtain shading */}

            <div
              className="
                absolute
                inset-0

                bg-gradient-to-l
                from-[#5a0000]/95
                via-[#8b0f0f]/90
                to-[#220000]/95
              "
            />

            {/* fabric shine */}

            <div
              className="
                absolute
                inset-0

                bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.14),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_30%,rgba(0,0,0,0.22))]
              "
            />
          </div>
        </motion.div>

        {/* -------------------------------------------------------------------------- */}
        {/*                             DIVINE REVEAL TEXT                              */}
        {/* -------------------------------------------------------------------------- */}

        <motion.div
          style={{
            opacity: captionOpacity,
            y: captionY,
          }}
          className="
            relative
            z-30

            max-w-3xl

            px-8

            text-center
          "
        >
          <ChapterLabel
            n="अध्याय दो"
            label="The Divine Reveal"
          />

          {/* MAIN MANTRA */}

          <h2
            className="
              mt-6

              font-deva

              text-5xl
              sm:text-6xl
              md:text-7xl

              leading-[1.55]

              overflow-visible

              text-gradient-gold
            "
          >
            ॥ ॐ ह्लीं बगलामुख्यै नमः ॥
          </h2>

          {/* SUBTEXT */}

          <p
            className="
              mt-7

              font-display

              text-lg
              sm:text-xl

              italic

              leading-[2]

              text-gold-soft
            "
          >
            स्वर्णिम आभा में
            <span className="text-gold">
              {" "}
              माँ बगलामुखी{" "}
            </span>
            के दिव्य दर्शन।
          </p>

          {/* SMALL GLOW LINE */}

          <div
            className="
              mx-auto
              mt-8

              h-px
              w-32

              bg-gradient-to-r
              from-transparent
              via-gold
              to-transparent
            "
          />
        </motion.div>

        {/* -------------------------------------------------------------------------- */}
        {/*                                 EMBERS                                      */}
        {/* -------------------------------------------------------------------------- */}

        <Embers count={18} />
      </div>
    </section>
  );
}/* --------------------------- CHAPTER 3: the unique mahapuja --------------------------- */
function ChapterThree() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 90,
  });

  // parallax movement
  const fireY = useTransform(smooth, [0, 1], ["12%", "-12%"]);

  // section fade
  const sectionOpacity = useTransform(smooth, [0, 0.2], [0, 1]);

  // title movement
  const titleY = useTransform(smooth, [0, 0.35], [100, 0]);

  // glowing divider line
  const lineWidth = useTransform(smooth, [0.2, 0.6], ["0%", "100%"]);

  // cards reveal
  const cardsY = useTransform(smooth, [0.15, 0.5], [120, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity: sectionOpacity }}
      className="relative overflow-hidden border-t border-gold/10 px-6 py-36 md:px-16"
    >
      {/* moving havan background */}
      <motion.img
        src={havan}
        alt=""
        aria-hidden
        style={{
          y: fireY,
          scale: 1.08,
        }}
        className="absolute inset-0 h-[120%] w-full object-cover opacity-30"
        loading="lazy"
        width={1920}
        height={1080}
      />

      {/* dark cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-night-deep via-[#120909]/85 to-night-deep" />

      {/* golden aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,190,0,0.08),transparent_60%)]" />

      {/* floating embers */}
      <Embers count={20} />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* heading */}
        <motion.div style={{ y: titleY }}>
          <ChapterLabel n="अध्याय तीन" label="The Rare Sadhana" />

          <h2 className="mt-6 font-deva  text-4xl sm:text-6xl md:text-7xl  leading-[1.45] md:leading-[1.40] text-gradient-gold sm:text-6xl md:text-7xl">
            लक्ष्मी विषकन्या दोष
            <br />
            निवारण महापूजा
          </h2>

          {/* glowing animated line */}
          <motion.div
            style={{ width: lineWidth }}
            className="mx-auto mt-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_18px_rgba(255,200,0,0.7)]"
          />

          <p className="mx-auto mt-8 max-w-3xl font-display text-lg leading-relaxed text-foreground/80 md:text-xl">
            संपूर्ण भारतवर्ष में यह दिव्य एवं दुर्लभ साधना केवल इसी सिद्धपीठ में
            संपन्न कराई जाती है — सिद्ध योगियों के मार्गदर्शन में।
          </p>
        </motion.div>

        {/* ritual cards */}
        <motion.div
          style={{ y: cardsY }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          <RitualCard
            icon={<Sparkles className="h-5 w-5" />}
            title="कुंडली परीक्षण"
            body="व्यक्तिगत दोष विश्लेषण एवं मार्गदर्शन।"
          />

          <RitualCard
            icon={<Flame className="h-5 w-5" />}
            title="वैदिक आह्वान"
            body="विशेष मन्त्रों से देवी का आह्वान।"
          />

          <RitualCard
            icon={<Diya />}
            title="सहस्रधारा अभिषेक"
            body="हज़ार धाराओं से दिव्य अभिषेक प्रक्रिया।"
          />
        </motion.div>

        {/* know more button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <a
            href="/vishkanya_puja"
            className="
              group relative inline-flex items-center gap-3
              overflow-hidden rounded-full
              border border-gold/40
              bg-gradient-to-r from-[#3d0505] via-[#7a1111] to-[#3d0505]
              px-8 py-4
              font-display text-lg text-gold
              shadow-[0_0_30px_rgba(255,180,0,0.18)]
              transition-all duration-500
              hover:scale-105
              hover:border-gold
              hover:shadow-[0_0_45px_rgba(255,180,0,0.35)]
            "
          >
            {/* moving shine */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

            <span className="relative z-10">
              अधिक जानें
            </span>

            <span className="relative z-10 text-sm opacity-70">
              Know More →
            </span>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* --------------------------- RITUAL CARD --------------------------- */
function RitualCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      className="
        ring-gold group relative overflow-hidden rounded-3xl
        border border-gold/10
        bg-night/70
        p-7 text-left
        backdrop-blur-xl
        transition-all duration-500
        hover:border-gold/40
        hover:bg-night/90
        hover:shadow-[0_0_40px_rgba(255,180,0,0.12)]
      "
    >
      {/* glowing aura */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/10 blur-3xl transition-all duration-500 group-hover:bg-gold/20" />

      {/* border glow */}
      <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-gold/20" />

      <div className="relative z-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold shadow-[0_0_15px_rgba(255,200,0,0.2)]">
          {icon}
        </div>

        <h3 className="mt-5 font-deva text-2xl text-gold">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-foreground/70">
          {body}
        </p>
      </div>
    </motion.div>
  );
}

/* --------------------------- CHAPTER 4: guru parampara --------------------------- */
function ChapterFour() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 90 });
  const aartiScale = useTransform(smooth, [0, 1], [1.15, 1]);
  const card1Y = useTransform(smooth, [0, 1], [80, -40]);
  const card2Y = useTransform(smooth, [0, 1], [140, -10]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-gold/10"
    >
      <motion.img
        src={aartiDiyas}
        alt=""
        aria-hidden
        style={{ scale: aartiScale }}
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        loading="lazy"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night-deep via-night-deep/80 to-night-deep" />

      <div className="relative mx-auto max-w-6xl px-6 py-32 md:px-16">
        <div className="max-w-xl">
          <ChapterLabel n="अध्याय चार" label="The Lineage" />
          <h2 className="mt-5 font-deva text-4xl leading-tight text-gradient-gold sm:text-5xl">
            गुरु परंपरा
          </h2>
          <p className="mt-6 font-display text-lg leading-relaxed text-foreground/80">
            वैदिक एवं तांत्रिक साधनाओं की दिव्य विरासत — पीठाधीश्वर के सान्निध्य में
            निरंतर प्रवाहित।
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            style={{ y: card1Y }}
            className="ring-gold rounded-2xl bg-night/80 p-8 backdrop-blur"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-gold/70">
              पीठाधीश्वर
            </div>
            <h3 className="mt-3 font-deva text-2xl text-gold">
              परम पूज्य संत स्वामी श्री विजयानंद पुरी जी महाराज
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70">
            श्री पंचायती महानिर्वाणीअखाड़ा
            </p>
          </motion.div>

          <motion.div
            style={{ y: card2Y }}
            className="ring-gold rounded-2xl bg-night/80 p-8 backdrop-blur"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-gold/70">
              मुख्य पुजारी
            </div>
            <h3 className="mt-3 font-deva text-2xl text-gold">
              पंडित रवि जी
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70">
              विधि-विधान से समस्त पूजन, अनुष्ठान एवं हवन संपन्न कराते हैं।
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- CHAPTER 5: facilities --------------------------- */
function ChapterFive() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 90 });
  const yPath = useTransform(smooth, [0, 1], [60, -60]);

  const items = [
    {
      icon: <Flame className="h-5 w-5" />,
      title: "विशाल हवनशाला",
      body: "विधिपूर्वक यज्ञ एवं हवन के लिए विस्तृत व्यवस्था।",
    },
    {
      icon: <Home className="h-5 w-5" />,
      title: "संत निवास",
      body: "साधकों एवं श्रद्धालुओं के लिए शांत आवास।",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "नियमित भंडारे",
      body: "धार्मिक आयोजन, विशेष यज्ञ और सेवा कार्य।",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-gold/10 px-6 py-32 md:px-16"
    >
      <div className="mx-auto max-w-5xl text-center">
        <ChapterLabel n="अध्याय पाँच" label="The Sanctuary" />
        <h2 className="mt-5 font-deva text-4xl leading-tight text-gradient-gold sm:text-5xl">
          श्रद्धालुओं के लिए व्यवस्था
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-display text-lg text-foreground/70">
          दूर-दूर से आने वाले भक्तों के लिए शांत एवं आध्यात्मिक वातावरण।
        </p>
      </div>

      <motion.div
        style={{ y: yPath }}
        className="relative mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3"
      >
        {items.map((it, i) => (
          <div
            key={i}
            className="ring-gold rounded-2xl bg-night/70 p-7 text-center backdrop-blur transition hover:bg-night/90"
          >
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
              {it.icon}
            </div>
            <h3 className="mt-4 font-deva text-xl text-gold">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              {it.body}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* --------------------------- CLOSING --------------------------- */


export { KnowMandirPage };
