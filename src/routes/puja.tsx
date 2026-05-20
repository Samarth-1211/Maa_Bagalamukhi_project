import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import yantra from "@/assets/yantra.webp";
import photo_gallery_1 from "@/assets/photo_gallery_1.webp";
import photo_gallery_2 from "@/assets/photo_gallery_2.webp";
import photo_gallery_3 from "@/assets/photo_gallery_3.webp";
import photo_gallery_4 from "@/assets/photo_gallery_4.webp";
import photo_gallery_5 from "@/assets/photo_gallery_5.webp";
import photo_gallery_6 from "@/assets/photo_gallery_6.webp";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

import sanctum from "@/assets/bagalamukhi-poster.webp";
import havan from "@/assets/havan.webp";
import aarti from "@/assets/aarti-diyas.webp";
import yantra_circle from "@/assets/yantra.webp";

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
        title: "माँ बगलामुखी दिव्य महायज्ञ",
        what:
          "पूर्ण वैदिक एवं तांत्रिक पद्धति से संपन्न होने वाली प्रमुख साधना।",
        problem:
          "शत्रु बाधा, मानसिक अशांति एवं कार्य में रुकावट।",
        how:
          "हल्दी, पीत वस्त्र, बीज मंत्र जाप एवं विशेष हवन के साथ।",
        icon: Flame,
      },
      {
        title: "विशिष्ट बगलामुखी अनुष्ठान",
        what:
          "3, 5, 7 एवं 11 दिवसीय शक्तिशाली संकल्प साधना।",
        problem:
          "कोर्ट केस, कार्य सिद्धि एवं शत्रु शमन।",
        how:
          "गोपनीय बीज मंत्र जाप, यज्ञ एवं रात्रि साधना।",
        icon: ShieldCheck,
      },
      {
        title: "सिद्ध बगलामुखी महामंत्र जाप",
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

  {
    label: "Chapter Four",
  
    heading: "दोष निवारण महाअनुष्ठान",
  
    intro:
      "जीवन में उपस्थित ग्रह, पितृ, तांत्रिक एवं अदृश्य बाधाओं की शांति हेतु सिद्ध एवं दिव्य अनुष्ठान।",
  
    pujas: [
      {
        title: "सिद्ध कालसर्प दोष महाशांति",
  
        what:
          "राहु-केतु जनित कालसर्प योग की शांति हेतु दिव्य वैदिक एवं तांत्रिक साधना।",
  
        problem:
          "जीवन में लगातार रुकावट, भय, अस्थिरता एवं कार्य असफलता।",
  
        how:
          "नाग पूजन, कालसर्प शांति मंत्र जाप एवं विशेष अग्निहोत्र हवन।",
  
        icon: Orbit,
      },
  
      {
        title: "पितृ कृपा एवं दोष निवारण महायज्ञ",
  
        what:
          "पूर्वजों की शांति एवं पितृ आशीर्वाद प्राप्ति हेतु विशेष वैदिक अनुष्ठान।",
  
        problem:
          "संतान बाधा, आर्थिक कष्ट, पारिवारिक तनाव एवं मानसिक अशांति।",
  
        how:
          "तर्पण, पिंडदान, पितृ सूक्त पाठ एवं श्राद्ध हवन।",
  
        icon: Sun,
      },
  
      {
        title: "लक्ष्मी विषकन्या दोष निवारण महापूजा",
  
        what:
          "अत्यंत दुर्लभ एवं सिद्ध तांत्रिक साधना जो जीवन की नकारात्मक ऊर्जा को शांति प्रदान करती है।",
  
        problem:
          "धन हानि, वैवाहिक बाधा, मानसिक क्लेश एवं अचानक जीवन संकट।",
  
        how:
          "सहस्रधारा अभिषेक, बीज मंत्र साधना एवं विशेष तांत्रिक हवन।",
  
        icon: Gem,
      },
    ],
  },

  {
    label: "Chapter Five",
  
    heading: "ग्रह शांति एवं ज्योतिषीय महाअनुष्ठान",
  
    intro:
      "ग्रह पीड़ा, महादशा, अशुभ योग एवं ज्योतिषीय दोषों की शांति हेतु सिद्ध वैदिक एवं तांत्रिक साधनाएँ।",
  
    pujas: [
      {
        title: "नवग्रह शांति महायज्ञ",
  
        what:
          "नवग्रह संतुलन एवं ग्रह कृपा प्राप्ति हेतु दिव्य वैदिक अनुष्ठान।",
  
        problem:
          "ग्रह पीड़ा, जीवन अस्थिरता एवं कार्यों में बाधा।",
  
        how:
          "नवग्रह बीज मंत्र जाप, यज्ञ एवं विशेष हवन।",
  
        icon: Sun,
      },
  
      {
        title: "शनि पीड़ा निवारण साधना",
  
        what:
          "शनि दोष, साढ़ेसाती एवं ढैय्या शांति हेतु शक्तिशाली पूजा।",
  
        problem:
          "आर्थिक संघर्ष, रुकावट, मानसिक तनाव एवं कर्म बाधा।",
  
        how:
          "तैलाभिषेक, शनि स्तोत्र पाठ एवं तांत्रिक हवन।",
  
        icon: Moon,
      },
  
      {
        title: "राहु-केतु ग्रह शांति महापूजा",
  
        what:
          "राहु एवं केतु ग्रह जनित दोषों की शांति हेतु सिद्ध साधना।",
  
        problem:
          "भ्रम, भय, मानसिक तनाव एवं अचानक संकट।",
  
        how:
          "कालसर्प शांति मंत्र जाप, अभिषेक एवं विशेष अग्निहोत्र।",
  
        icon: Orbit,
      },
    ],
  },

  {
    label: "Chapter Six",
  
    heading: "तंत्र एवं शक्ति महाअनुष्ठान",
  
    intro:
      "माँ पीताम्बरा बगलामुखी की सिद्ध तांत्रिक शक्तियों, गुप्त साधनाओं एवं दिव्य ऊर्जा से जुड़ी विशेष अनुष्ठान प्रक्रियाएँ।",
  
    pujas: [
      {
        title: "दशमहाविद्या सिद्ध साधना",
  
        what:
          "दशमहाविद्याओं की उच्च कोटि तांत्रिक एवं आध्यात्मिक साधना।",
  
        problem:
          "गूढ़ आध्यात्मिक बाधाएँ, भय एवं नकारात्मक ऊर्जा।",
  
        how:
          "गोपनीय बीज मंत्र जाप, रात्रि साधना एवं विशेष हवन।",
  
        icon: Crown,
      },
  
      {
        title: "शत्रु बाधा नाशक महाअनुष्ठान",
  
        what:
          "शत्रु शमन, रक्षा एवं विजय प्राप्ति हेतु शक्तिशाली तांत्रिक साधना।",
  
        problem:
          "विरोधी, कोर्ट केस, मानसिक भय एवं जीवन संघर्ष।",
  
        how:
          "हल्दी हवन, रक्षा कवच साधना एवं बीज मंत्र अनुष्ठान।",
  
        icon: Swords,
      },
  
      {
        title: "देवी शक्ति साधना महायज्ञ",
  
        what:
          "माँ शक्ति की दिव्य कृपा एवं आध्यात्मिक ऊर्जा प्राप्ति हेतु विशेष अनुष्ठान।",
  
        problem:
          "आध्यात्मिक कमजोरी, भय एवं नकारात्मक प्रभाव।",
  
        how:
          "बीज मंत्र जाप, चंडी पाठ एवं दिव्य अग्निहोत्र हवन।",
  
        icon: Sparkles,
      },
    ],
  },

  {
    label: "Chapter Seven",
  
    heading: "धन, व्यापार एवं समृद्धि महाअनुष्ठान",
  
    intro:
      "धन प्राप्ति, व्यापार वृद्धि, आर्थिक उन्नति एवं समृद्ध जीवन हेतु सिद्ध वैदिक एवं तांत्रिक साधनाएँ।",
  
    pujas: [
      {
        title: "महालक्ष्मी धन प्राप्ति महापूजा",
  
        what:
          "माँ महालक्ष्मी की कृपा एवं धन आकर्षण हेतु दिव्य अनुष्ठान।",
  
        problem:
          "धन रुकावट, आर्थिक अस्थिरता एवं आय में बाधा।",
  
        how:
          "श्रीसूक्त पाठ, कनकधारा स्तोत्र एवं विशेष लक्ष्मी हवन।",
  
        icon: Coins,
      },
  
      {
        title: "व्यापार वृद्धि एवं सफलता साधना",
  
        what:
          "व्यवसाय उन्नति एवं कार्य सिद्धि हेतु शक्तिशाली तांत्रिक अनुष्ठान।",
  
        problem:
          "व्यापार हानि, आर्थिक रुकावट एवं कार्य असफलता।",
  
        how:
          "कुबेर पूजन, श्री यंत्र साधना एवं विशेष महायज्ञ।",
  
        icon: Briefcase,
      },
  
      {
        title: "ऋण मुक्ति एवं कर्ज निवारण महायज्ञ",
  
        what:
          "ऋण मुक्ति एवं आर्थिक राहत हेतु दिव्य वैदिक साधना।",
  
        problem:
          "कर्ज, आर्थिक दबाव एवं धन संबंधी तनाव।",
  
        how:
          "ऋणमोचन मंगल स्तोत्र पाठ, हवन एवं अग्निहोत्र अनुष्ठान।",
  
        icon: Gem,
      },
    ],
  },

  {
    label: "Chapter Eight",
  
    heading: "विशेष वैदिक महायज्ञ एवं दिव्य हवन",
  
    intro:
      "प्राचीन वैदिक परंपराओं, दिव्य मंत्रों एवं सिद्ध अनुष्ठान विधियों से संपन्न विशेष यज्ञ, पाठ एवं अग्निहोत्र साधनाएँ।",
  
    pujas: [
      {
        title: "महामृत्युंजय महाअनुष्ठान",
  
        what:
          "भगवान शिव की कृपा, दीर्घायु एवं आरोग्य प्राप्ति हेतु दिव्य साधना।",
  
        problem:
          "रोग, भय, अकाल संकट एवं नकारात्मक ऊर्जा।",
  
        how:
          "1.25 लाख महामृत्युंजय जाप, रुद्राभिषेक एवं विशेष हवन।",
  
        icon: HeartPulse,
      },
  
      {
        title: "दुर्गा सप्तशती चंडी महायज्ञ",
  
        what:
          "माँ दुर्गा की कृपा एवं शक्ति प्राप्ति हेतु दिव्य पाठ एवं साधना।",
  
        problem:
          "भय, बाधा, शत्रु प्रभाव एवं नकारात्मक शक्तियाँ।",
  
        how:
          "नवचंडी पाठ, बीज मंत्र जाप एवं चंडी हवन।",
  
        icon: Flame,
      },
  
      {
        title: "वैदिक हवन एवं अग्निहोत्र महायज्ञ",
  
        what:
          "समस्त वैदिक अग्नि अनुष्ठानों एवं दिव्य यज्ञ प्रक्रियाओं का विशेष आयोजन।",
  
        problem:
          "गृह अशांति, वास्तु दोष एवं आध्यात्मिक बाधाएँ।",
  
        how:
          "वैदिक मंत्रोच्चार, अग्निहोत्र एवं पूर्णाहुति अनुष्ठान।",
  
        icon: Droplets,
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
          src={yantra_circle}
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
            <div className="mb-2 text-sm uppercase tracking-[0.08em] text-yellow-300">
            महापूजा का स्वरूप
            </div>

            <p className="font-deva leading-relaxed text-white/80">
              {puja.what}
            </p>
          </div>

          <div>
            <div className="mb-2 text-ms uppercase tracking-[0.08em] text-orange-300">
            दोष एवं बाधाएँ
            </div>

            <p className="font-deva leading-relaxed text-white/80">
              {puja.problem}
            </p>
          </div>

          <div>
            <div className="mb-2 text-ms uppercase tracking-[0.08em] text-yellow-100">
            वैदिक अनुष्ठान प्रक्रिया
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
const seoPujas = [
  "कालसर्प दोष पूजा उज्जैन",
  "बगलामुखी पूजा उज्जैन",
  "मंगल दोष निवारण",
  "नवग्रह शांति पूजा",
  "शत्रु नाशक पूजा",
  "पितृ दोष पूजा",
  "महामृत्युंजय जाप",
  "राहु-केतु शांति",
  "तंत्र बाधा निवारण",
  "कुंडली दोष निवारण",
  "व्यापार वृद्धि पूजा",
  "धन प्राप्ति पूजा",
];


function SacredMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-yellow-500/20 bg-black/30 backdrop-blur-xl py-5">
      
      {/* glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,190,40,0.12),transparent_70%)]" />

      {/* left fade */}
      <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#070304] to-transparent" />

      {/* right fade */}
      <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#070304] to-transparent" />

      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex w-max items-center gap-6 whitespace-nowrap"
      >
        {[...seoPujas, ...seoPujas].map((text, i) => (
          <div
            key={i}
            className="
              flex
              items-center
              gap-6

              rounded-full

              border
              border-yellow-400/15

              bg-yellow-400/[0.05]

              px-7
              py-3

              shadow-[0_0_30px_rgba(255,190,40,0.08)]

              backdrop-blur-md
            "
          >
            <Sparkles className="h-4 w-4 text-yellow-300" />

            <span
              className="
                font-deva

                text-base
                md:text-lg

                leading-[1.6]

                text-yellow-100
              "
            >
              {text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const galleryImages = [
  {
    image: photo_gallery_1,
    title: "माँ बगलामुखी दिव्य महायज्ञ",
    alt: "माँ बगलामुखी मंदिर उज्जैन का दिव्य श्रृंगार",
  },

  {
    image: photo_gallery_2,
    title: "विशेष हवन एवं अनुष्ठान",
    alt: "बगलामुखी महाहवन उज्जैन",
  },

  {
    image: photo_gallery_3,
    title: "माँ का अलौकिक दरबार",
    alt: "माँ पीताम्बरा बगलामुखी दरबार",
  },

  {
    image: photo_gallery_4,
    title: "रात्रि दिव्य आरती",
    alt: "उज्जैन मंदिर रात्रि आरती",
  },

  {
    image: photo_gallery_5,
    title: "तांत्रिक साधना एवं पूजा",
    alt: "बगलामुखी तांत्रिक साधना",
  },
  {
    image: photo_gallery_6,
    title: "माँ पीताम्बरा का अलौकिक स्वरूप",
    alt: "बगलामुखी तांत्रिक साधना",
  },
];

function SacredGallery() {

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
    },
    [
      Autoplay({
        delay: 4500,
        stopOnInteraction: false,
      }),
    ]
  );

  return (
    <section className="relative overflow-hidden py-36">
      
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,190,40,0.08),transparent_70%)]" />

      {/* rotating yantra */}
      <motion.img
        src={yantra}
        alt=""
        animate={{ rotate: 360 }}
        transition={{
          duration: 220,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          -z-10
          h-[90vh]
          w-[90vh]
          -translate-x-1/2
          -translate-y-1/2
          opacity-[0.03]
        "
      />

      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* heading */}
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
          className="mx-auto mb-24 max-w-3xl text-center overflow-visible"
        >
          <div className="mb-5 text-xs uppercase tracking-[0.45em] text-yellow-300">
            Divine Gallery
          </div>

          <h2
          className="
            font-deva
        
            text-5xl
            md:text-7xl
        
            leading-[1.2]
            md:leading-[1.2]
        
            text-white
          "
        >
          दिव्य दर्शन
          <br />
        
          <span className="
          block
          text-gradient-gold
      
          leading-[1.35]
      
          pt-2
        "
        style={{
          paddingBottom: "0.25em",
        }}>
            गैलरी
          </span>
        </h2>
          <p
            className="
              mx-auto
              mt-8
              max-w-2xl

              font-deva

              text-lg

              leading-[1.9]

              text-white/70
            "
          >
            माँ पीताम्बरा बगलामुखी मंदिर के दिव्य
            अनुष्ठान, आरती, साधना एवं आध्यात्मिक
            वातावरण के अलौकिक दृश्य।
          </p>
        </motion.div>

        {/* masonry gallery */}
        <div className="relative mt-20">

  {/* LEFT */}
  <button
    onClick={() => emblaApi?.scrollPrev()}
    className="
      absolute
      left-2
      top-1/2
      z-30
      hidden
      -translate-y-1/2
      md:flex

      h-14
      w-14

      items-center
      justify-center

      rounded-full

      border
      border-yellow-400/20

      bg-black/40

      backdrop-blur-xl

      transition-all
      duration-300

      hover:scale-110
      hover:bg-yellow-400/10
    "
  >
    <ChevronLeft className="h-6 w-6 text-yellow-200" />
  </button>

  {/* RIGHT */}
  <button
    onClick={() => emblaApi?.scrollNext()}
    className="
      absolute
      right-2
      top-1/2
      z-30
      hidden
      -translate-y-1/2
      md:flex

      h-14
      w-14

      items-center
      justify-center

      rounded-full

      border
      border-yellow-400/20

      bg-black/40

      backdrop-blur-xl

      transition-all
      duration-300

      hover:scale-110
      hover:bg-yellow-400/10
    "
  >
    <ChevronRight className="h-6 w-6 text-yellow-200" />
  </button>

  {/* EMBLA */}
  <div
    ref={emblaRef}
    className="overflow-hidden"
  >
    <div className="flex">
      {galleryImages.map((item, index) => (
        <div
          key={index}
          className="
            min-w-0

            flex-[0_0_90%]
            md:flex-[0_0_60%]
            xl:flex-[0_0_42%]

            px-4
          "
        >
          <motion.div
            whileHover={{
              y: -10,
            }}
            className="
              group
              relative
              overflow-hidden

              rounded-[2.5rem]

              border
              border-yellow-400/15

              bg-white/5

              backdrop-blur-xl
            "
          >
            {/* overlay */}
            <div
              className="
                absolute
                inset-0
                z-10

                bg-gradient-to-t
                from-black/80
                via-black/10
                to-transparent
              "
            />

            {/* image */}
            <motion.img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              whileHover={{
                scale: 1.08,
              }}
              transition={{
                duration: 0.7,
              }}
              className="
                h-[520px]
                w-full
                object-cover
              "
            />

            {/* glow */}
            <div
              className="
                absolute
                -right-10
                -top-10

                h-40
                w-40

                rounded-full

                bg-yellow-300/10

                blur-3xl
              "
            />

            {/* caption */}
            <div
              className="
                absolute
                bottom-0
                left-0
                z-20

                w-full

                p-6
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2

                  rounded-full

                  border
                  border-yellow-300/20

                  bg-yellow-300/10

                  px-4
                  py-2

                  backdrop-blur-md
                "
              >
                <Sparkles className="h-4 w-4 text-yellow-300" />

                <span
                  className="
                    font-deva
                    text-sm
                    leading-[1.6]
                    text-yellow-50
                  "
                >
                  {item.title}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  </div>
</div>
      </div>
    </section>
  );
}



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
            className="absolute inset-0  h-[420px] w-full object-cover opacity-30 mix-blend-screen"
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
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 md:pt-0 text-center">
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
            className="mb-8 mt-6 md:mt-0 inline-flex items-center gap-4 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-6 py-3 backdrop-blur-md"
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
            समस्त पूजा , हवन
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
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 px-10 py-3 font-semibold text-black shadow-[0_0_40px_rgba(255,200,0,0.35)] transition-all duration-300 hover:scale-105"
            >
            लक्ष्मी विषकन्या दोष निवारण महापूजा
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            
          </motion.div>
        </div>
      </section>
      
      {/* SACRED SEO MARQUEE */}
      <SacredMarquee />
      {/* ALL PUJA LIST SECTION */}
      <section className="relative overflow-hidden py-32">
      
        {/* background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,0,0.08),transparent_70%)]" />
      
        {/* rotating yantra */}
        <motion.img
          src={yantra}
          alt=""
          animate={{ rotate: -360 }}
          transition={{
            duration: 220,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            -z-10
            h-[85vh]
            w-[85vh]
            -translate-x-1/2
            -translate-y-1/2
            opacity-[0.04]
          "
        />
      
        <div className="relative mx-auto max-w-7xl px-6">
      
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="mx-auto mb-20 max-w-4xl text-center"
          >
            <div className="mb-5 text-xs uppercase tracking-[0.5em] text-yellow-300">
              Sacred Ritual Collection
            </div>

          
      
            <p
              className="
                mx-auto
                mt-8
                max-w-3xl
                font-deva
                text-lg
                leading-[1.9]
                text-white/70
              "
            >
              माँ पीताम्बरा बगलामुखी मंदिर में संपन्न होने वाली
              सभी दिव्य पूजाएँ, हवन, जाप एवं विशेष साधनाएँ।
            </p>
          </motion.div>
      
          {/* PUJA LIST */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      
            {chapters.flatMap((chapter) => chapter.pujas).map((puja, index) => {
              const Icon = puja.icon;
      
              return (
                <motion.div
                  key={puja.title}
                  initial={{
                    opacity: 0,
                    y: 60,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.03,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[2rem]
      
                    border
                    border-yellow-400/15
      
                    bg-white/5
      
                    px-6
                    py-5
      
                    backdrop-blur-xl
      
                    transition-all
                    duration-500
      
                    hover:border-yellow-300/40
                    hover:bg-yellow-400/[0.06]
                  "
                >
      
                  {/* glow */}
                  <div
                    className="
                      absolute
                      -right-10
                      -top-10
      
                      h-32
                      w-32
      
                      rounded-full
      
                      bg-yellow-300/10
      
                      blur-3xl
                    "
                  />
      
                  <div className="relative z-10 flex items-center gap-4">
      
                    {/* icon */}
                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
      
                        rounded-2xl
      
                        bg-gradient-to-br
                        from-yellow-300
                        to-yellow-500
      
                        text-black
      
                        shadow-[0_0_25px_rgba(255,200,0,0.35)]
                      "
                    >
                      <Icon className="h-6 w-6" />
                    </div>
      
                    {/* title */}
                    <div>
                      <h3
                        className="
                          font-deva
                          text-xl
                          leading-[1.7]
                          text-white
                        "
                      >
                        {puja.title}
                      </h3>
      
                      <div className="mt-1 text-sm text-yellow-200/70">
                        दिव्य वैदिक अनुष्ठान
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
      
          {/* CTA BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-20 text-center"
          >
          <a
          href="tel:+919669401930"
          className="
            inline-flex
            items-center
            gap-3
        
            rounded-full
        
            bg-gradient-to-r
            from-yellow-300
            to-yellow-500
        
            px-10
            py-5
        
            font-semibold
            text-black
        
            shadow-[0_0_40px_rgba(255,200,0,0.35)]
        
            transition-all
            duration-300
        
            hover:scale-105
          "
        >
          संपर्क करें
        
          <ArrowRight className="h-5 w-5" />
        </a>

          </motion.div>
        </div>
      </section>

      {/* SACRED PHOTO GALLERY */}
<SacredGallery />

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
                  to="/donate"
                  className="rounded-full border border-white/15 bg-white/5 px-10 py-5 font-semibold text-white backdrop-blur-md transition hover:border-yellow-300/40"
                >
                  धर्मार्थ सहयोग करें
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}