import { Link } from "@tanstack/react-router";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";


import {
  Heart,
  Briefcase,
  Brain,
  Scale,
  ShieldOff,
  Users,
  Coins,
  Sparkles,
  Flame,
  ArrowRight,
} from "lucide-react";

const problems = [
  {
    icon: Users,
    title: "पारिवारिक कलह",
    solution: "बगलामुखी शांति यज्ञ",
    desc: "घर में मधुर वातावरण, आपसी प्रेम एवं पारिवारिक एकता हेतु विशेष अनुष्ठान।",
    glow: "from-orange-500/20 to-yellow-500/10",
  },
  {
    icon: Briefcase,
    title: "व्यापार में बाधा",
    solution: "लक्ष्मी–बगलामुखी पूजा",
    desc: "व्यवसाय में स्थिरता, आर्थिक उन्नति एवं सफलता के लिए सिद्ध साधना।",
    glow: "from-yellow-500/20 to-amber-500/10",
  },
  {
    icon: Brain,
    title: "मानसिक तनाव",
    solution: "ध्यान एवं मंत्र जाप",
    desc: "मानसिक शांति, आत्मबल एवं सकारात्मक ऊर्जा हेतु आध्यात्मिक साधना।",
    glow: "from-red-500/20 to-orange-500/10",
  },
  {
    icon: Scale,
    title: "कानूनी समस्याएँ",
    solution: "विजय बगलामुखी जप",
    desc: "वाद-विवाद, न्यायिक मामलों एवं विरोधियों पर विजय हेतु विशेष मंत्र जाप।",
    glow: "from-yellow-600/20 to-red-500/10",
  },
  {
    icon: ShieldOff,
    title: "नकारात्मक ऊर्जा",
    solution: "रक्षा कवच अनुष्ठान",
    desc: "बुरी नज़र, अभिचार एवं नकारात्मक शक्तियों से दिव्य सुरक्षा।",
    glow: "from-orange-600/20 to-yellow-400/10",
  },

];

export function Events() {
  return (
    <section
      id="events"
      className="relative overflow-hidden py-32 px-6 lg:px-10"
    >
      {/* ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/10 to-transparent" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* heading */}
        <Reveal>
          <div className="mx-auto mb-24 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-card/40 px-5 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-gold" />

              <span className="font-display text-xs uppercase tracking-[0.4em] text-vermillion">
                जीवन समाधान
              </span>
            </div>

            <h2 className="mt-8 font-hindi text-5xl leading-tight text-ivory md:text-7xl">
              हर समस्या का
              <br />
              <span className="text-gradient-gold">
                आध्यात्मिक समाधान
              </span>
            </h2>

            <div className="mx-auto mt-8 w-48 gold-divider" />

            <p className="mx-auto mt-8 max-w-3xl font-hindi text-lg leading-relaxed text-ivory/70">
              माँ बगलामुखी की दिव्य कृपा एवं शास्त्रोक्त साधनाओं द्वारा
              जीवन की अनेक बाधाओं, ग्रह दोषों एवं मानसिक अशांति का समाधान।
            </p>
          </div>
        </Reveal>

        {/* cards */}
        <StaggerGroup
          className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4"
          stagger={0.08}
        >
          {problems.map((p, i) => {
            const Icon = p.icon;

            return (
              <StaggerItem key={i}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-gold/15 bg-card/50 p-7 backdrop-blur-md transition-all duration-700 hover:-translate-y-2 hover:border-gold/40 hover:shadow-sacred">
                  {/* glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${p.glow} opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
                  />

                  {/* top border */}
                  <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-gold transition-transform duration-700 group-hover:scale-x-100" />

                  <div className="relative z-10">
                    {/* icon */}
                    <div className="mb-6 flex items-start justify-between">
                      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-gold shadow-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <Icon
                          className="h-7 w-7 text-ivory"
                          strokeWidth={1.7}
                        />
                      </div>

                      <span className="font-display text-xs uppercase tracking-[0.3em] text-gold/60">
                        समाधान
                      </span>
                    </div>

                    {/* title */}
                    <h3 className="font-hindi text-2xl leading-tight text-ivory">
                      {p.title}
                    </h3>

                    {/* solution */}
                    <div className="mt-4 inline-flex rounded-full border border-vermillion/30 bg-vermillion/10 px-4 py-1 text-sm font-hindi text-vermillion">
                      {p.solution}
                    </div>

                    {/* desc */}
                    <p className="mt-5 font-hindi text-sm leading-relaxed text-ivory/70">
                      {p.desc}
                    </p>

                    {/* button */}
                    <Link
                      to="puja"
                      className="mt-8 inline-flex items-center gap-2 font-hindi text-sm text-gold transition-all duration-300 hover:gap-3 hover:text-vermillion"
                    >
                      पूजा के बारे में जानें

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* bottom banner */}
        <Reveal delay={0.4}>
          <div className="relative mt-24 overflow-hidden rounded-[2rem] border border-gold/20 bg-gradient-to-r from-gold/10 via-card/50 to-vermillion/10 p-10 text-center backdrop-blur-md">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="font-display text-xs uppercase tracking-[0.4em] text-gold">
                माँ की कृपा
              </div>

              <h3 className="mt-5 font-hindi text-4xl leading-tight text-ivory md:text-5xl">
                श्रद्धा से जुड़ें,
                <br />
                साधना से समाधान पाएँ
              </h3>

              <p className="mx-auto mt-6 max-w-2xl font-hindi text-lg leading-relaxed text-ivory/70">
                वैदिक परंपरा एवं सिद्ध साधना द्वारा जीवन में शांति,
                स्थिरता एवं सकारात्मक ऊर्जा का अनुभव करें।
              </p>

              <Link
                to="/puja"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-gold px-10 py-5 font-hindi text-lg text-ivory shadow-gold transition-transform duration-300 hover:scale-[1.04]"
              >
                सभी पूजाएँ देखें

                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}