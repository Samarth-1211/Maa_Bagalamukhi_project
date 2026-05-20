import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import {
  ChevronDown,
  Sparkles,
  Flame,
  ShieldCheck,
  HeartHandshake,
  Coins,
  Sprout,
  Sun,
  Moon,
  Leaf,
  Orbit,
  ScrollText,
  Brain,
}from "lucide-react";
import dosha from "@/assets/vishkanya-dosha.webp";
import dosha2 from "@/assets/maaPitambraimage_2.webp";
import swamiPuja from "@/assets/swami-puja.webp";
import havan from "@/assets/havan.webp";
import sanctum from "@/assets/maaPitambraimage_2.webp";
import yantra from "@/assets/yantra.webp";

export const Route = createFileRoute("/vishkanya_puja")({
  component: VishkanyaPujaPage,
  head: () => ({
    meta: [
      {
        title:
          "लक्ष्मी विषकन्या दोष निवारण महापूजा — माँ बगलामुखी मंदिर, उज्जैन",
      },
      {
        name: "description",
        content:
          "Discover the sacred Lakshmi Vishkanya Dosh Nivaran Mahapuja — its meaning, the doshas it removes, the rituals involved, and how it is performed only by Param Pujya Sant Swami Shri Vijayanand Puri Ji Maharaj at Maa Baglamukhi Mandir, Ujjain.",
      },
      {
        property: "og:title",
        content: "लक्ष्मी विषकन्या दोष निवारण महापूजा",
      },
      {
        property: "og:description",
        content:
          "A scroll-told story of an ancient remedial mahapuja performed by Sant Swami Shri Vijayanand Puri Ji Maharaj.",
      },
      { property: "og:image", content: dosha },
    ],
  }),
});

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
function VishkanyaPujaPage() {
  return (
    <main className="bg-night-radial text-foreground">
      <Intro />
      <ChapterWhat />
      <ChapterProblems />
      <ChapterRitual />
      <ChapterSwami />
      <Closing />
    </main>
  );
}

/* --------------------------- INTRO --------------------------- */
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
  const yantraRot = useTransform(smooth, [0, 1], [0, 140]);
  const yantraScale = useTransform(smooth, [0, 1], [0.7, 1.15]);

  return (
    <section
      ref={ref}
      className="relative h-[120vh] w-full overflow-hidden bg-night-deep"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-[10vh] h-[130vh]"
      >
        <img
          src={dosha}
          alt="लक्ष्मी विषकन्या दोष निवारण महापूजा"
          className="h-full w-full object-cover opacity-55 blur-[2px] scale-105"
          width={1536}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-deep/60 via-night-deep/40 to-night-deep" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.07_0.015_30/0.9)_85%)]" />
      </motion.div>

      <motion.img
        src={yantra}
        alt=""
        aria-hidden
        style={{ rotate: yantraRot, scale: yantraScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 -ml-[35vmin] -mt-[35vmin] h-[70vmin] w-[70vmin] opacity-25 mix-blend-screen"
      />

      <Embers count={28} />

      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <ChapterLabel n="महापूजा" label="The Sacred Remedy" />
          <h1 className="mt-6 font-deva text-5xl leading-[1.05] sm:text-7xl md:text-[5.5rem] text-gradient-gold">
          <br /> लक्ष्मी विषकन्या
            <br />
            दोष निवारण महापूजा
          </h1>
          <p className="mt-6 max-w-2xl font-display text-lg italic text-gold-soft/90">
            "जहाँ माँ की कृपा है, वहाँ कोई दोष नहीं ठहरता।"
          </p>
          <p className="mt-4 max-w-xl text-base text-foreground/70">
            एक प्राचीन, गुप्त एवं अत्यंत प्रभावशाली अनुष्ठान — जीवन के अदृश्य
            बंधनों को काटने वाला।
          </p>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="mt-14 flex flex-col items-center gap-2 text-gold/70"
          >
            <span className="text-[10px] uppercase tracking-[0.4em]">
              scroll · पढ़िए
            </span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------- WHAT IS THIS PUJA --------------------------- */
function ChapterWhat() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 90 });
  const imgScale = useTransform(smooth, [0, 1], [1.2, 1]);
  const imgY = useTransform(smooth, [0, 1], ["-10%", "10%"]);
  const textY = useTransform(smooth, [0, 1], ["20%", "-20%"]);

  return (
    <section
      ref={ref}
      className="relative grid min-h-screen grid-cols-1 items-center gap-12 overflow-visible border-t border-gold/10 px-6 py-32 md:grid-cols-2 md:px-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,oklch(0.32_0.12_25/0.4),transparent_60%)]" />

      <motion.div style={{ y: textY }} className="relative order-2 max-w-xl md:order-1">
        <ChapterLabel n="अध्याय एक" label="What is this Mahapuja" />
        <h2 className="mt-5 font-deva text-4xl sm:text-5xl leading-[1.35] md:leading-[1.5] tracking-[0.01em] text-gradient-gold">
        यह महापूजा क्या है?
      </h2>
        <p className="mt-8 font-display text-lg leading-[2.1] md:leading-[2.3] text-foreground/80">
          <span className="text-gold">लक्ष्मी विषकन्या दोष निवारण महापूजा</span>{" "}
          माँ पीताम्बरा बगलामुखी मंदिर में संपन्न होने वाला एक अत्यंत दुर्लभ एवं दिव्य साधना है, जो केवल सिद्ध योगियों एवं गुरु परंपरा के सान्निध्य में संपन्न कराया जाता है।
इस अनुष्ठान की प्रमुख विशेषता “सहस्रधारा पात्र अभिषेक” है, जिसमें प्राचीन बावड़ियों एवं पवित्र कुओं के दिव्य जल से साधक का अभिषेक कर आध्यात्मिक शुद्धिकरण एवं दोष निवारण किया जाता है।

        </p>
        <p className="mt-4 leading-relaxed text-foreground/70">
          शास्त्रों में "विषकन्या दोष" उस ऊर्जा को कहा गया है जो स्पर्श मात्र से
          सम्बन्धों, धन एवं स्वास्थ्य पर विष-तुल्य प्रभाव डालती है। यह महापूजा
          उसी विष को अमृत में परिवर्तित करने का संकल्प है।
        </p>
        <p className="mt-4 leading-relaxed text-foreground/70">
        अनुष्ठान से पूर्व साधक की कुंडली, ग्रह स्थिति एवं दोषों का गहन अध्ययन कर विशेष मंत्र, साधना एवं हवन प्रक्रिया निर्धारित की जाती है।मान्यता है कि यह दिव्य साधना केवल लक्ष्मी विषकन्या दोष ही नहीं, बल्कि मंगल दोष, कालसर्प दोष, पितृ दोष, ऋण दोष एवं अन्य अनेक आध्यात्मिक बाधाओं की शांति हेतु भी अत्यंत प्रभावशाली मानी जाती है।
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Pill icon={<Sparkles className="h-3.5 w-3.5" />} label="गुप्त अनुष्ठान" />
          <Pill icon={<Flame className="h-3.5 w-3.5" />} label="वैदिक विधि" />
          <Pill icon={<ShieldCheck className="h-3.5 w-3.5" />} label="दोष निवारण" />
        </div>
      </motion.div>

      <motion.div style={{ y: imgY }} className="relative order-1 md:order-2">
        <motion.div
          style={{ scale: imgScale }}
          className="ring-gold relative aspect-[4/5] overflow-hidden rounded-2xl glow-gold"
        >
          <img
            src={dosha2}
            alt="माँ लक्ष्मी की दिव्य आभा"
            className="h-full w-full object-cover"
            loading="lazy"
            width={1536}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-transparent to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* --------------------------- PROBLEMS IT SOLVES --------------------------- */
function ChapterProblems() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 90 });
  const bgY = useTransform(smooth, [0, 1], ["10%", "-10%"]);
  const headY = useTransform(smooth, [0, 1], ["30%", "-10%"]);

  const problems = [
    {
      icon: <Coins className="h-5 w-5" />,
      title: "लक्ष्मी कृपा एवं आर्थिक स्थिरता",
      body: "धन प्रवाह में वृद्धि, आर्थिक संतुलन एवं जीवन में स्थिरता का अनुभव।",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "विषकन्या दोष शांति",
      body: "लक्ष्मी विषकन्या दोष से उत्पन्न बाधाओं एवं नकारात्मक प्रभावों की शांति।",
    },
    {
      icon: <Flame className="h-5 w-5" />,
      title: "मंगल दोष शांति",
      body: "वैवाहिक विलम्ब, कलह एवं मंगल दोष से जुड़ी समस्याओं का निवारण।",
    },
    {
      icon: <Orbit className="h-5 w-5" />,
      title: "कालसर्प दोष निवारण",
      body: "ग्रह पीड़ाओं, रुकावटों एवं जीवन में बार-बार आने वाली बाधाओं की शांति।",
    },
    {
      icon: <ScrollText className="h-5 w-5" />,
      title: "पितृ दोष शांति",
      body: "पूर्वजों से संबंधित दोषों की शांति एवं पारिवारिक संतुलन की प्राप्ति।",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "नागवाली एवं ऋण दोष मुक्ति",
      body: "ऋण, नागवाली दोष एवं जीवन की आर्थिक-अध्यात्मिक बाधाओं से राहत।",
    },
    {
      icon: <HeartHandshake className="h-5 w-5" />,
      title: "वैवाहिक एवं पारिवारिक सुख",
      body: "दांपत्य जीवन में मधुरता, परिवार में शांति एवं संबंधों में सामंजस्य।",
    },
    {
      icon: <Moon className="h-5 w-5" />,
      title: "नकारात्मक ऊर्जा निवारण",
      body: "घर एवं जीवन से अशुभ ऊर्जा, भय एवं आध्यात्मिक बाधाओं की शांति।",
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: "मानसिक शांति एवं आत्मबल",
      body: "मन की स्थिरता, आत्मविश्वास एवं सकारात्मक ऊर्जा में वृद्धि।",
    },
    {
      icon: <Sun className="h-5 w-5" />,
      title: "जीवन में स्थिरता एवं सफलता",
      body: "कार्य, व्यवसाय एवं व्यक्तिगत जीवन में निरंतर प्रगति एवं सफलता।",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden border-t border-gold/10 py-32"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-[10vh] h-[120vh] opacity-30"
      >
        <img
          src={havan}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-night-deep/80" />
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <motion.div style={{ y: headY }} className="max-w-2xl">
          <ChapterLabel n="अध्याय दो" label="Problems it dissolves" />
          <h2 className="mt-5 font-deva text-4xl leading-[1.5] text-gradient-gold sm:text-5xl">
            यह पूजा कौन - से कष्ट दूर करती है?
          </h2>
          <p className="mt-6 font-display text-lg italic text-foreground/70">
            जब कारण अदृश्य हो — समाधान भी दिव्य ही होता है।
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <ProblemCard key={p.title} index={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemCard({
  icon,
  title,
  body,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
      className="ring-gold group relative rounded-2xl border border-gold/15 bg-night/70 p-6 backdrop-blur-md transition hover:border-gold/40 hover:bg-night/90"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold text-night shadow-glow">
        {icon}
      </div>
      <h3 className="mt-5 font-deva text-xl text-gold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">{body}</p>
    </motion.div>
  );
}

/* --------------------------- HOW IT IS PERFORMED --------------------------- */
function ChapterRitual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 90 });
  const imgScale = useTransform(smooth, [0, 1], [1.15, 1]);

  const steps = [
    {
      n: "१",
      title: "संकल्प एवं शुद्धि",
      body: "साधक का संकल्प, गोत्र-नाम उच्चारण, गंगाजल एवं पंचगव्य से देह तथा स्थान की शुद्धि।",
    },
    {
      n: "२",
      title: "गणेश एवं नवग्रह पूजन",
      body: "विघ्नहर्ता गणेश, मातृका, कलश एवं नवग्रहों का आह्वान — अनुष्ठान की नींव।",
    },
    {
      n: "३",
      title: "माँ बगलामुखी मूल मंत्र जप",
      body: "१,२५,००० बगलामुखी मूल मन्त्र जप — स्तम्भन शक्ति का जागरण, शत्रु-दोष का स्तम्भन।",
    },
    {
      n: "४",
      title: "लक्ष्मी सूक्त एवं श्री सूक्त पाठ",
      body: "अष्टलक्ष्मी आह्वान — धन, सौभाग्य, स्थिरता एवं समृद्धि की कृपा का संचार।",
    },
    {
      n: "५",
      title: "विषकन्या दोष निवारण विशेष होम",
      body: "हल्दी, पीली सरसों, गुग्गुल एवं औषधि-समिधा से विशेष आहुतियाँ — दोष का दहन।",
    },
    {
      n: "६",
      title: "सहस्रधारा अभिषेक एवं पूर्णाहुति",
      body: "माँ का दुग्ध-घृत-मधु से अभिषेक, पूर्णाहुति, आरती एवं प्रसाद वितरण।",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden border-t border-gold/10 px-6 py-32 md:px-16"
    >
      <motion.div
        style={{ scale: imgScale }}
        className="pointer-events-none absolute inset-0 opacity-25"
      >
        <img
          src={sanctum}
          alt=""
          className="h-full w-full object-cover blur-[2px] scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-deep via-night-deep/70 to-night-deep" />
      </motion.div>

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <ChapterLabel n="अध्याय तीन" label="The Ritual unfolds" />
          <h2 className="mt-5 font-deva text-4xl leading-[1.6] text-gradient-gold sm:text-5xl">
            यह महापूजा कैसे की जाती है?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-display text-lg italic text-foreground/70">
            शास्त्रों के अनुसार, चरण-दर-चरण — एक पवित्र यात्रा।
          </p>
        </div>

        <ol className="relative mt-20 space-y-10 pl-14 md:pl-16">      {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: "easeOut" }}
              className="relative min-h-[70px]"
            >
            <span className="absolute left-[-3.2rem] top-1 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-night-deep text-gold shadow-glow md:left-[-3.55rem]">
                <span className="font-deva text-lg">{s.n}</span>
              </span>
              <h3 className="pr-2 font-deva text-xl leading-relaxed text-gold sm:text-2xl">
                {s.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/75 sm:text-base">
                {s.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------- SWAMI JI --------------------------- */
function ChapterSwami() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 90 });
  const imgY = useTransform(smooth, [0, 1], ["10%", "-10%"]);
  const textY = useTransform(smooth, [0, 1], ["25%", "-15%"]);

  return (
    <section
      ref={ref}
      className="relative grid min-h-screen grid-cols-1 items-center gap-14 overflow-hidden border-t border-gold/10 px-6 py-32 md:grid-cols-2 md:px-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,oklch(0.32_0.12_25/0.45),transparent_60%)]" />

      <motion.div style={{ y: imgY }} className="relative">
        <div className="ring-gold relative aspect-[4/5] overflow-hidden rounded-2xl glow-gold">
          <img
            src={swamiPuja}
            alt="परम पूज्य संत स्वामी श्री विजयानंद पुरी जी महाराज द्वारा महापूजा"
            className="h-full w-full object-cover"
            loading="lazy"
            width={1536}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
              आचार्य एवं अनुष्ठान-कर्ता
            </p>
            <p className="mt-2 font-deva text-xl text-gold-glow text-glow">
              परम पूज्य संत स्वामी
              <br />
              श्री विजयानंद पुरी जी महाराज
            </p>
            <p>श्री पंचायती महानिर्वाणीअखाड़ा</p>
          </div>
        </div>
      </motion.div>

      <motion.div style={{ y: textY }} className="relative max-w-xl">
        <ChapterLabel n="अध्याय चार" label="Performed only by" />
        <h2 className="mt-5 font-deva text-4xl leading-[1.5] text-gradient-gold sm:text-5xl">
          केवल पूज्य स्वामी जी के
          <br />
          कर-कमलों से
        </h2>
        <p className="mt-6 font-display text-lg leading-relaxed text-foreground/85">
          यह दिव्य महापूजा माँ बगलामुखी मंदिर, उज्जैन में{" "}
          <span className="text-gold">
            परम पूज्य संत स्वामी श्री विजयानंद पुरी जी महाराज
          </span>{" "}
          के मार्गदर्शन एवं प्रत्यक्ष सान्निध्य में ही सम्पन्न की जाती है।
        </p>
        <p className="mt-4 leading-relaxed text-foreground/70">
          वर्षों की कठोर साधना, गुरु परम्परा एवं सिद्धि के बल पर पूज्य स्वामी जी
          इस गुप्त अनुष्ठान को शास्त्र-सम्मत विधि से सम्पन्न कराते हैं — जिससे
          साधक को पूर्ण फल की प्राप्ति होती है।
        </p>

        <div className="mt-8 space-y-3">
          <Bullet>शास्त्रोक्त वैदिक विधि से अनुष्ठान</Bullet>
          <Bullet>सिद्ध मंत्र-शक्ति का प्रत्यक्ष संचार</Bullet>
          <Bullet>साधक के नाम-गोत्र से व्यक्तिगत संकल्प</Bullet>
          <Bullet>केवल माँ बगलामुखी मंदिर, उज्जैन में</Bullet>
        </div>
      </motion.div>
    </section>
  );
}

/* --------------------------- CLOSING --------------------------- */
function Closing() {
  return (
    <section className="relative overflow-hidden border-t border-gold/10 px-6 py-32 text-center">
      <Embers count={18} />
      <div className="relative mx-auto max-w-3xl">
        <Leaf className="mx-auto h-8 w-8 text-gold/70" />
        <h2 className="mt-6 font-deva text-4xl leading-[1.5] text-gradient-gold sm:text-5xl">
          माँ की कृपा एक बार पुकारिए
        </h2>
        <p className="mt-6 font-display text-lg italic text-foreground/75">
          "जो माँ के द्वार आया, वो खाली नहीं लौटा।"
        </p>
        <p className="mt-4 text-foreground/70">
          अनुष्ठान, मुहूर्त एवं संकल्प की जानकारी हेतु मंदिर परिसर में पधारें
          अथवा संपर्क करें।
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">

  

  {/* CONTACT */}

  <a
  href="tel:09669401930"
    className="
      rounded-full

      border
      border-gold/40

      bg-gold/10

      px-7
      py-3

      text-sm

      text-gold

      backdrop-blur-md

      transition-all
      duration-300

      hover:bg-gold/20
      hover:scale-[1.04]
    "
  >
    संपर्क करें
  </a>

  {/* DONATION */}

  <a
    href="/donate"
    className="
      rounded-full

      bg-[#7a1f10]

      px-7
      py-3

      text-sm

      text-[#ffe7b0]

      shadow-[0_0_25px_rgba(180,70,20,0.25)]

      transition-all
      duration-300

      hover:scale-[1.04]
      hover:bg-[#942b15]
    "
  >
    दान करें
  </a>

  {/* OTHER PUJAS */}

  <a
    href="/puja"
    className="
      rounded-full

      border
      border-gold/30

      px-7
      py-3

      text-sm

      text-gold-soft

      transition-all
      duration-300

      hover:bg-gold/10
      hover:scale-[1.04]
    "
  >
    अन्य पूजाएँ
  </a>

  
</div>
      </div>
    </section>
  );
}

/* --------------------------- helpers --------------------------- */
function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-night/60 px-3 py-1 text-xs text-gold-soft">
      {icon}
      {label}
    </span>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold shadow-[0_0_8px_oklch(0.82_0.14_80/0.9)]" />
      <span className="text-foreground/80">{children}</span>
    </div>
  );
}
