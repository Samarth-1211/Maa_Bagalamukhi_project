import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import shankaracharya from "@/assets/shankaracharya.webp";

export function Shankaracharya() {
  return (
    <section className="relative py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-14 items-center">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            {/* halo */}
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-gold opacity-30 blur-3xl animate-glow-pulse" />
            <div className="relative rounded-[2rem] overflow-hidden border-4 border-gold/60 shadow-gold">
              <motion.img
                src={shankaracharya}
                alt="Shankaracharya"
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full h-[560px] object-cover"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-ivory">
                <div className="text-xs tracking-[0.3em] uppercase text-gold font-display">
                परम पूज्य संत
                </div>
                <div className="font-hindi text-2xl mt-2">स्वामी श्री विजयानंद पुरी जी महाराज</div>
                <div className="text-sm mt-1 text-ivory/70">श्री पंचायती महानिर्वाणीअखाड़ा</div>
              </div>
              {/* corner ornaments */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-gold rounded-tl-2xl" />
              <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-gold rounded-tr-2xl" />
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <span className="text-xs tracking-[0.4em] uppercase text-gold-deep font-display">
              ✦ आध्यात्मिक नेतृत्व ✦
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-hindi text-5xl md:text-6xl text-ivory leading-tight">
            संत परिचय
              <br />
              <span className="text-gradient-gold"></span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 w-32 gold-divider" />
          </Reveal>
          <Reveal delay={0.3}>
            <blockquote className="mt-8 relative pl-8 border-l-4 border-vermillion/70">
              <span className="absolute -left-2 -top-3 text-6xl font-display text-vermillion/30">
                &ldquo;
              </span>
              <p className="font-hindi text-xl md:text-2xl text-ivory/85 leading-relaxed italic">
              साधना केवल अनुष्ठान नहीं, बल्कि आत्मा को दिव्यता से जोड़ने का मार्ग है।
              माँ बगलामुखी की कृपा से प्रत्येक साधक के जीवन में शक्ति, शांति एवं विजय
              का प्रकाश प्रकट हो।
              </p>
            </blockquote>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-8 text-ivory/70 leading-relaxed font-hindi text-lg">
            परम पूज्य संत स्वामी श्री विजयानंद पुरी जी महाराज, श्री पंचायती महानिर्वाणी अखाड़ा की दिव्य गुरु परंपरा से जुड़े एक श्रद्धेय संत एवं साधक हैं। वैदिक एवं तांत्रिक साधनाओं के गहन ज्ञान, 
            माँ बगलामुखी उपासना एवं आध्यात्मिक मार्गदर्शन के लिए भक्तों में विशेष श्रद्धा का केंद्र माने जाते हैं। <br/> 

            गुरु परंपरा एवं सनातन साधना के संरक्षण हेतु समर्पित महाराज श्री, साधकों को आध्यात्मिक शांति, साधना मार्ग एवं देवी उपासना के माध्यम से जीवन में सकारात्मक ऊर्जा एवं स्थिरता का मार्ग प्रदान करते हैं। <br/> 
            
            श्री पंचायती महानिर्वाणी अखाड़ा भारत की प्राचीन एवं प्रतिष्ठित सनातन संन्यासी परंपराओं में से एक माना जाता है, जिसकी आध्यात्मिक विरासत सदियों से धर्म, साधना एवं सनातन संस्कृति के संरक्षण में समर्पित रही है।
          </p>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { n: "500+", l: "वार्षिक अनुष्ठान" },
                { n: "8+", l: "सिद्ध पुरोहित" },
                { n: "108+", l: "वर्ष परम्परा" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="text-center p-5 rounded-2xl bg-gradient-gold/15 border border-gold/30"
                >
                  <div className="font-display text-3xl text-gradient-gold font-bold">{s.n}</div>
                  <div className="font-hindi text-xs text-ivory/70 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
