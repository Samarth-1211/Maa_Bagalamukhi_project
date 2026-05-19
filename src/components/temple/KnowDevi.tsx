import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import devi from "@/assets/mandir-sanctum.webp";

const faqs = [
  {
    q: "माँ बगलामुखी कौन हैं?",
    a: "माँ बगलामुखी दस महाविद्याओं में से एक हैं। वे पीताम्बरा रूप में पूजी जाती हैं और शत्रु–स्तंभन, विजय एवं रक्षा की देवी मानी जाती हैं।",
  },
  {
    q: "पीताम्बरा का क्या अर्थ है?",
    a: "पीताम्बरा का अर्थ है ‘पीले वस्त्र धारण करने वाली’। पीला रंग देवी को अत्यंत प्रिय है — यह ज्ञान, स्थिरता और दिव्यता का प्रतीक है।",
  },
  {
    q: "उपासना का फल क्या है?",
    a: "नियमित उपासना से जीवन में विजय, बाधाओं का नाश, मानसिक स्थिरता, वाक्–सिद्धि एवं सर्व–कार्य में सफलता प्राप्त होती है।",
  },
  {
    q: "क्या कोई भी भक्त पूजा में सम्मिलित हो सकता है?",
    a: "जी हाँ। श्रद्धा और पवित्र मन से कोई भी भक्त मंदिर के अनुष्ठानों में सम्मिलित हो सकता है। ऑनलाइन पंजीकरण भी उपलब्ध है।",
  },
];

export function KnowDevi() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="about" ref={ref} className="relative py-32 px-6 lg:px-10 overflow-visible">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-xs tracking-[0.4em] uppercase text-vermillion font-display">
              ✦ देवी परिचय ✦
            </span>
            <br/>
            <br/>
            <h2 className="mt-8 font-hindi text-5xl md:text-7xl text-ivory leading-[3.5] md:leading-[1.3]   overflow-visible tracking-[0.01em] pb-4 ">
              
            <span className="text-gradient-gold inline-block pb-4">माँ</span> की दिव्य महिमा
            </h2>
            <div className="mt-6 mx-auto w-48 gold-divider" />
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-sacred border-4 border-gold/60">
                <div className="absolute -inset-10 bg-gradient-gold opacity-30 blur-3xl animate-glow-pulse" />
                <motion.img
                  src={devi}
                  alt="Maa Bagalamukhi"
                  width={1280}
                  height={1280}
                  loading="lazy"
                  style={{ y: imgY }}
                  className="relative w-full h-[640px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-10">
            <Reveal>
              <div>
                <h3 className="font-hindi text-3xl md:text-4xl text-vermillion">
                  पीताम्बरा — विजय की देवी
                </h3>
                <p className="mt-5 font-hindi text-lg text-ivory/80 leading-loose">
                  माँ बगलामुखी दस महाविद्याओं की आठवीं शक्ति हैं। उनका स्वरूप सुनहरे प्रकाश में
                  आलोकित है, जो भक्तों को साहस, स्थिरता और सर्वोच्च विजय प्रदान करता है। पीत वस्त्र,
                  पीत पुष्प और पीत आसन — सब उन्हें प्रिय हैं।
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { k: "उद्देश्य", v: "शत्रु स्तंभन व विजय प्राप्ति" },
                  { k: "प्रिय रंग", v: "पीत (Golden Yellow)" },
                  { k: "प्रिय दिवस", v: "मंगलवार एवं गुरुवार" },
                  { k: "मूल मंत्र", v: "ॐ ह्लीं बगलामुखी..." },
                ].map((item) => (
                  <div
                    key={item.k}
                    className="rounded-2xl p-5 bg-card/60 border border-gold/30 backdrop-blur-sm"
                  >
                    <div className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display">
                      {item.k}
                    </div>
                    <div className="font-hindi text-lg text-ivory mt-1">{item.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="pt-4">
                <h4 className="font-hindi text-2xl text-ivory mb-5">
                  सामान्य <span className="text-vermillion">प्रश्नोत्तर</span>
                </h4>
                <Accordion type="single" collapsible className="space-y-3">
                  {faqs.map((f, i) => (
                    <AccordionItem
                      key={i}
                      value={`f-${i}`}
                      className="rounded-2xl border border-gold/30 bg-card/60 backdrop-blur-sm px-5 data-[state=open]:shadow-gold transition-shadow"
                    >
                      <AccordionTrigger className="font-hindi text-lg text-ivory hover:text-vermillion text-left">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="font-hindi text-ivory/75 text-base leading-relaxed">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
