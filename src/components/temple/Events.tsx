import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { Heart, Briefcase, Brain, Scale, ShieldOff, Users, Coins } from "lucide-react";

const problems = [
  {
    icon: Users,
    title: "पारिवारिक कलह",
    solution: "बगलामुखी शांति यज्ञ",
    desc: "घर में मधुर वातावरण और पारिवारिक एकता हेतु विशेष अनुष्ठान।",
  },
  {
    icon: Briefcase,
    title: "व्यापार में बाधा",
    solution: "लक्ष्मी–बगलामुखी पूजा",
    desc: "व्यवसाय में स्थिरता, उन्नति और समृद्धि के लिए सिद्ध पूजा।",
  },
  {
    icon: Brain,
    title: "मानसिक तनाव",
    solution: "ध्यान व मंत्र जाप",
    desc: "मन की शांति, आत्मबल एवं भीतर की स्पष्टता के लिए साधना।",
  },
  {
    icon: Scale,
    title: "कानूनी समस्याएँ",
    solution: "विजय बगलामुखी जप",
    desc: "वाद-विवाद और न्यायिक मामलों में विजय हेतु सिद्ध मंत्र।",
  },
  {
    icon: ShieldOff,
    title: "नकारात्मक ऊर्जा",
    solution: "रक्षा कवच अनुष्ठान",
    desc: "बुरी नज़र और नकारात्मक प्रभावों से दिव्य सुरक्षा।",
  },
  {
    icon: Heart,
    title: "रिश्तों में तनाव",
    solution: "माधुर्य पूजा",
    desc: "संबंधों में प्रेम, समझ और सौहार्द्र पुनः स्थापित करने हेतु।",
  },
  {
    icon: Coins,
    title: "आर्थिक रुकावट",
    solution: "धन आकर्षण साधना",
    desc: "धन के मार्ग खोलने और आर्थिक स्थिरता प्राप्ति हेतु अनुष्ठान।",
  },
];

export function Events() {
  return (
    <section
      id="events"
      className="relative py-32 px-6 lg:px-10 bg-gradient-to-b from-transparent via-gold/10 to-transparent"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-xs tracking-[0.4em] uppercase text-vermillion font-display">
              ✦ जीवन समाधान ✦
            </span>
            <h2 className="mt-5 font-hindi text-5xl md:text-7xl text-ivory leading-tight">
              हर समस्या का <span className="text-gradient-gold">आध्यात्मिक</span> समाधान
            </h2>
            <div className="mt-6 mx-auto w-48 gold-divider" />
            <p className="mt-6 text-ivory/70 font-hindi text-lg">
              जीवन की कठिनाइयों के लिए सदियों से सिद्ध शास्त्रोक्त उपाय, माँ बगलामुखी की कृपा से।
            </p>
          </div>
        </Reveal>

        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={i}>
                <div className="group relative h-full rounded-2xl p-7 bg-card/60 backdrop-blur-sm border border-gold/25 shadow-deep hover:shadow-sacred transition-all duration-700 hover:-translate-y-1.5 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />

                  <div className="flex items-start gap-5 mb-5">
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-gold grid place-items-center shadow-gold group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                      <Icon className="w-6 h-6 text-ivory" strokeWidth={1.6} />
                    </div>
                    <div>
                      <h3 className="font-hindi text-xl text-ivory leading-tight">{p.title}</h3>
                      <div className="mt-1 text-xs tracking-widest uppercase text-vermillion font-display">
                        उपाय
                      </div>
                    </div>
                  </div>

                  <div className="font-hindi text-base font-semibold text-vermillion mb-3">
                    {p.solution}
                  </div>
                  <p className="font-hindi text-sm text-ivory/70 leading-relaxed">{p.desc}</p>

                  <a
                    href="#"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-hindi text-gold-deep hover:text-vermillion transition-colors"
                  >
                    पूजा देखें
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
