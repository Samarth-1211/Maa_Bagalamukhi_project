import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

import {
  Flame,
  ShieldCheck,
  Scale,
  Briefcase,
  Orbit,
  HeartPulse,
  Swords,
  BookOpen,
  Droplets,
  Sparkles,
  Coins,
  Baby,
  HeartHandshake,
  Hexagon,
  Sun,
  Moon,
  Crown,
  Skull,
  Gem,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

import sanctum from "@/assets/mandir-sanctum.jpg";
import havan from "@/assets/havan.jpg";
import aarti from "@/assets/aarti-diyas.jpg";
import yantra from "@/assets/yantra.png";

export const Route = createFileRoute("/puja")({
  component: PujasPage,
});

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

type Puja = {
  title: string;
  what: string;
  problem: string;
  how: string;
  icon: LucideIcon;
};

type Chapter = {
  label: string;
  heading: string;
  intro: string;
  pujas: Puja[];
};

const chapters: Chapter[] = [
  {
    label: "Chapter One",
    heading: "माँ बगलामुखी की मूल साधनाएँ",
    intro:
      "माँ पीताम्बरा की दिव्य आराधना से जुड़ी प्राचीन एवं सिद्ध पूजाएँ।",
    pujas: [
      {
        title: "माँ बगलामुखी महापूजा",
        what:
          "पूर्ण वैदिक एवं तांत्रिक पद्धति से संपन्न होने वाली प्रमुख साधना।",
        problem:
          "शत्रु बाधा, मानसिक अशांति एवं कार्य में रुकावट।",
        how:
          "हल्दी, पीत वस्त्र, बीज मंत्र जाप एवं विशेष हवन के साथ।",
        icon: Flame,
      },
      {
        title: "विशेष बगलामुखी अनुष्ठान",
        what:
          "3, 5, 7 एवं 11 दिवसीय शक्तिशाली संकल्प साधना।",
        problem:
          "कोर्ट केस, कार्य सिद्धि एवं शत्रु शमन।",
        how:
          "गोपनीय बीज मंत्र जाप, यज्ञ एवं रात्रि साधना।",
        icon: ShieldCheck,
      },
      {
        title: "बगलामुखी महामंत्र जाप",
        what:
          "माँ के मूल बीज मंत्रों का शक्तिशाली जाप।",
        problem:
          "भय, नकारात्मक ऊर्जा एवं आत्मविश्वास की कमी।",
        how:
          "रुद्राक्ष माला एवं दशांश हवन के साथ।",
        icon: BookOpen,
      },
    ],
  },

  {
    label: "Chapter Two",
    heading: "विजय एवं बाधा निवारण",
    intro:
      "जीवन संघर्षों, शत्रुओं एवं ग्रह दोषों से रक्षा हेतु विशेष अनुष्ठान।",
    pujas: [
      {
        title: "कोर्ट केस विजय पूजा",
        what:
          "न्यायालय संबंधी विजय हेतु विशेष अनुष्ठान।",
        problem:
          "मुकदमे में पराजय का भय।",
        how:
          "विजय मंत्र जाप एवं विशेष हल्दी हवन।",
        icon: Scale,
      },
      {
        title: "व्यवसाय वृद्धि पूजा",
        what:
          "व्यापार में स्थिरता एवं आर्थिक वृद्धि।",
        problem:
          "आर्थिक रुकावट एवं व्यापारिक हानि।",
        how:
          "लक्ष्मी-कुबेर पूजन एवं श्री यंत्र साधना।",
        icon: Briefcase,
      },
      {
        title: "तंत्र बाधा निवारण पूजा",
        what:
          "नकारात्मक तंत्र प्रभावों की शांति।",
        problem:
          "भय, बुरी ऊर्जा एवं मानसिक दबाव।",
        how:
          "सिद्ध मंत्र जाप एवं रक्षा कवच हवन।",
        icon: Skull,
      },
    ],
  },

  {
    label: "Chapter Three",
    heading: "आरोग्य एवं पारिवारिक सुख",
    intro:
      "स्वास्थ्य, विवाह एवं संतान सुख हेतु दिव्य वैदिक अनुष्ठान।",
    pujas: [
      {
        title: "महामृत्युंजय जाप",
        what:
          "भगवान शिव के महामृत्युंजय मंत्र का जाप।",
        problem:
          "रोग, भय एवं स्वास्थ्य संकट।",
        how:
          "1.25 लाख जाप एवं रुद्राभिषेक।",
        icon: HeartPulse,
      },
      {
        title: "रुद्राभिषेक पूजा",
        what:
          "शिवलिंग पर पंचामृत अभिषेक।",
        problem:
          "ग्रह पीड़ा एवं पारिवारिक तनाव।",
        how:
          "रुद्र सूक्त एवं बेलपत्र अर्पण।",
        icon: Droplets,
      },
      {
        title: "संतान प्राप्ति पूजा",
        what:
          "संतान सुख हेतु वैदिक पूजन।",
        problem:
          "वंश वृद्धि में बाधा।",
        how:
          "संतान गोपाल मंत्र एवं हवन।",
        icon: Baby,
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                BACKGROUND                                  */
/* -------------------------------------------------------------------------- */

function SacredBackground() {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        
        {/* HAVAN IMAGE */}
        <img
          src={havan}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
  
        {/* CHAKRA 1 */}
        <motion.img
          src={yantra}
          alt=""
          animate={{ rotate: 360 }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 opacity-20"
        />
  
        {/* CHAKRA 2 */}
        <motion.img
          src={yantra}
          alt=""
          animate={{ rotate: -360 }}
          transition={{
            duration: 180,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 opacity-10"
        />
  
        {/* GOLD GLOW */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,0,0.15),transparent_70%)]" />
  
        {/* DARK LAYER */}
        <div className="absolute inset-0 bg-black/45" />
      </div>
    );
  }

/* -------------------------------------------------------------------------- */
/*                                  EMBERS                                    */
/* -------------------------------------------------------------------------- */

function Embers({ count = 30 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 11) % 100;

        return (
          <motion.span
            key={i}
            initial={{
              y: 0,
              opacity: 0,
            }}
            animate={{
              y: -1200,
              opacity: [0, 1, 0],
              x: [0, i % 2 === 0 ? 30 : -30],
            }}
            transition={{
              duration: 10 + (i % 10),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear",
            }}
            className="absolute bottom-0 h-1.5 w-1.5 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(255,200,0,0.9)]"
            style={{
              left: `${left}%`,
            }}
          />
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  CARD                                      */
/* -------------------------------------------------------------------------- */

function PujaCard({
  puja,
  index,
}: {
  puja: Puja;
  index: number;
}) {
  const Icon = puja.icon;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 80,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -10,
      }}
      className="group relative overflow-hidden rounded-[2rem] border border-yellow-500/20 bg-white/5 p-7 backdrop-blur-xl transition-all duration-500 hover:border-yellow-400/40 hover:bg-yellow-500/[0.08]"
    >
      {/* glow */}
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-yellow-400/10 blur-3xl transition-all duration-700 group-hover:bg-yellow-400/20" />

      {/* rotating symbol */}
      <motion.img
        src={yantra}
        alt=""
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -right-12 -top-12 h-36 w-36 opacity-20"
      />

      <div className="relative z-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-500 text-black shadow-[0_0_40px_rgba(255,210,0,0.4)]">
          <Icon className="h-7 w-7" />
        </div>

        <h3 className="font-deva text-2xl leading-tight text-white">
          {puja.title}
        </h3>

        <div className="mt-6 space-y-5">
          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.3em] text-yellow-300">
              What
            </div>

            <p className="font-deva leading-relaxed text-white/80">
              {puja.what}
            </p>
          </div>

          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.3em] text-orange-300">
              Problem
            </div>

            <p className="font-deva leading-relaxed text-white/80">
              {puja.problem}
            </p>
          </div>

          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.3em] text-yellow-100">
              Ritual Process
            </div>

            <p className="font-deva leading-relaxed text-white/80">
              {puja.how}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*                                CHAPTER                                     */
/* -------------------------------------------------------------------------- */

function ChapterSection({
  chapter,
  image,
}: {
  chapter: Chapter;
  image: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [120, -120]),
    {
      stiffness: 100,
      damping: 30,
    }
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32"
    >
      {/* background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover opacity-15"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#090304] via-[#120607]/90 to-[#070304]" />

      {/* chakra */}
      <motion.img
        src={yantra}
        alt=""
        animate={{ rotate: 360 }}
        transition={{
          duration: 180,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 -z-10 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
          }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <div className="mb-5 text-xs uppercase tracking-[0.5em] text-yellow-300">
            {chapter.label}
          </div>

          <h2 className="font-deva text-5xl leading-tight text-white md:text-6xl">
            {chapter.heading}
          </h2>

          <p className="mt-7 font-deva text-lg leading-relaxed text-white/75">
            {chapter.intro}
          </p>
        </motion.div>

        {/* cards */}
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {chapter.pujas.map((puja, index) => (
            <PujaCard
              key={puja.title}
              puja={puja}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

function PujasPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const chapterImages = [sanctum, havan, aarti];

  return (
    <main className="relative overflow-hidden bg-[#070304] text-white">
      <SacredBackground />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        {/* image */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <img
            src={sanctum}
            alt=""
            className="h-full w-full object-cover"
          />

          <motion.img
            src={havan}
            alt=""
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen"
          />

          <div className="absolute inset-0 bg-black/65" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,190,50,0.2),transparent_60%)]" />
        </motion.div>

        {/* divine light */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[20%] top-[-10%] h-[140%] w-[20%] rotate-12 bg-yellow-300/10 blur-3xl" />

          <div className="absolute right-[10%] top-[-10%] h-[140%] w-[20%] -rotate-12 bg-orange-300/10 blur-3xl" />
        </div>

        <Embers />

        {/* content */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="mb-6 inline-flex items-center gap-4 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-6 py-3 backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-yellow-300" />

            <span className="text-xs uppercase tracking-[0.4em] text-yellow-200">
              The Sacred Rituals
            </span>
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
            className="font-deva text-6xl leading-tight text-white md:text-8xl"
          >
            समस्त पूजा
            <br />
            एवं अनुष्ठान
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.5,
            }}
            className="mx-auto mt-10 max-w-3xl font-deva text-xl leading-relaxed text-white/80"
          >
            माँ पीताम्बरा बगलामुखी मंदिर में संपन्न होने वाले
            दिव्य अनुष्ठान, महायज्ञ, हवन एवं विशेष साधनाएँ।
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1,
            }}
            className="mt-14 flex flex-wrap items-center justify-center gap-5"
          >
            <Link
              to="/vishkanya_puja"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 px-10 py-5 font-semibold text-black shadow-[0_0_40px_rgba(255,200,0,0.35)] transition-all duration-300 hover:scale-105"
            >
              पूजा प्रारंभ करें

              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/know-mandir"
              className="rounded-full border border-white/15 bg-white/5 px-10 py-5 font-semibold text-white backdrop-blur-md transition hover:border-yellow-300/40 hover:bg-yellow-300/10"
            >
              मंदिर के बारे में
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CHAPTERS */}
      {chapters.map((chapter, idx) => (
        <ChapterSection
          key={chapter.label}
          chapter={chapter}
          image={chapterImages[idx % chapterImages.length]}
        />
      ))}

      {/* GURU SECTION */}
      <section className="relative overflow-hidden py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,190,40,0.12),transparent_65%)]" />

        <motion.img
          src={yantra}
          alt=""
          animate={{ rotate: -360 }}
          transition={{
            duration: 220,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-1/2 top-1/2 -z-10 h-[90vh] w-[90vh] -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
        />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
            }}
          >
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-yellow-300/20 bg-yellow-300/10 backdrop-blur-xl">
              <Crown className="h-10 w-10 text-yellow-300" />
            </div>

            <div className="mb-5 text-xs uppercase tracking-[0.5em] text-yellow-300">
              Divine Guidance
            </div>

            <h2 className="font-deva text-5xl leading-tight text-white md:text-6xl">
              परम पूज्य संत
              <br />
              स्वामी श्री विजयानंद पुरी जी महाराज
            </h2>

            <p className="mx-auto mt-8 max-w-3xl font-deva text-xl leading-relaxed text-white/75">
              समस्त अनुष्ठान गुरुदेव के दिव्य मार्गदर्शन में
              सिद्ध विद्वानों एवं योगियों द्वारा संपन्न किए जाते हैं।
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden pb-32 pt-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-[3rem] border border-yellow-400/20 bg-white/5 px-8 py-20 backdrop-blur-xl md:px-16">
            <motion.img
              src={yantra}
              alt=""
              animate={{ rotate: 360 }}
              transition={{
                duration: 200,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute right-[-10%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 opacity-20"
            />

            <div className="relative z-10 text-center">
              <div className="mb-4 text-xs uppercase tracking-[0.5em] text-yellow-300">
                Sacred Sankalp
              </div>

              <h2 className="font-deva text-5xl leading-tight text-white">
                अपनी पूजा हेतु
                <br />
                संकल्प लें
              </h2>

              <p className="mx-auto mt-8 max-w-2xl font-deva text-lg leading-relaxed text-white/75">
                अपनी समस्या के अनुसार उचित पूजा का चयन करें
                एवं माँ बगलामुखी की कृपा प्राप्त करें।
              </p>

              <div className="mt-12 flex flex-wrap justify-center gap-5">
                <Link
                  to="/vishkanya_puja"
                  className="rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 px-10 py-5 font-semibold text-black shadow-[0_0_40px_rgba(255,200,0,0.35)] transition hover:scale-105"
                >
                  विशेष पूजा
                </Link>

                <Link
                  to="/"
                  className="rounded-full border border-white/15 bg-white/5 px-10 py-5 font-semibold text-white backdrop-blur-md transition hover:border-yellow-300/40"
                >
                  मुख्य पृष्ठ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}