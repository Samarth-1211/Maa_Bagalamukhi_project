import { ArrowRight, MapPin, Phone } from "lucide-react";

import mandirPoster from "@/assets/bagalamukhi-poster.webp";
import maaTrishulLogo from "@/assets/maa_trishul_logo.webp";

const highlights = [
  { value: "3 KM", label: "महाकालेश्वर से दूरी" },
  { value: "नित्य", label: "पूजा, हवन और आरती" },
  { value: "सिद्ध", label: "बगलामुखी साधना पीठ" },
];
// --------------------------------------------------------------------------
export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-night text-ivory">
      <div className="absolute inset-0">
        <img
          src={mandirPoster}
          alt="माँ पीताम्बरा बगलामुखी मंदिर"
          className="h-full w-full object-cover object-center"
          width={1280}
          height={720}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,7,4,0.94)_0%,rgba(22,8,5,0.82)_48%,rgba(14,7,4,0.52)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-7xl items-center px-5 pb-16 pt-28 sm:px-6 lg:px-10 lg:pt-32">
        <div className="max-w-3xl">
          

          <h1 className="mt-8 font-hindi text-[3.2rem] leading-[1.7] tracking-normal text-ivory sm:text-7xl lg:text-8xl">
            माँ पीताम्बरा
            <span className="block text-gradient-gold">बगलामुखी मंदिर</span>
          </h1>

          <p className="mt-6 max-w-2xl font-hindi text-lg leading-loose text-ivory/84 md:text-xl">
            उज्जैन में महाकालेश्वर ज्योतिर्लिंग से केवल 3 किलोमीटर दूर, माँ
            बगलामुखी की वैदिक पूजा, हवन, अनुष्ठान और आध्यात्मिक मार्गदर्शन का
            पवित्र धाम।
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#events"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-gold px-6 py-4 font-hindi text-base font-semibold text-night shadow-gold"
            >
              पूजा विकल्प देखें
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="tel:+919669401930"
              className="inline-flex items-center justify-center gap-3 rounded-lg border border-gold/40 bg-night/60 px-6 py-4 font-hindi text-base text-ivory"
            >
              <Phone className="h-4 w-4 text-gold" />
              अभी संपर्क करें
            </a>
          </div>

          <div className="mt-9 grid max-w-2xl grid-cols-3 border border-gold/20 bg-night/55">
            {highlights.map((item) => (
              <div key={item.label} className="border-r border-gold/15 px-3 py-4 last:border-r-0 sm:px-5">
                <div className="font-display text-xl text-gold sm:text-2xl">{item.value}</div>
                <div className="mt-1 font-hindi text-xs leading-relaxed text-ivory/65 sm:text-sm">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 font-hindi text-sm text-ivory/70">
            <MapPin className="h-4 w-4 text-gold" />
            मुरलीपुरा, बड़नगर मेन रोड, उज्जैन, मध्य प्रदेश
          </div>
        </div>
      </div>
    </section>
  );
}
