import { Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Briefcase, Flame, Scale, ShieldCheck, Sparkles, Users } from "lucide-react";

import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import havan from "@/assets/havan.webp";
import swamiPuja from "@/assets/swami-puja.webp";

const services = [
  {
    icon: Flame,
    title: "बगलामुखी हवन",
    desc: "विजय, रक्षा और बाधा निवारण के लिए वैदिक विधि से हवन।",
  },
  {
    icon: Scale,
    title: "कानूनी समस्या",
    desc: "वाद-विवाद और न्यायिक मामलों में साहस व अनुकूलता हेतु जप।",
  },
  {
    icon: Briefcase,
    title: "व्यापार बाधा",
    desc: "व्यवसाय की स्थिरता, आर्थिक उन्नति और रुके कार्यों के लिए पूजा।",
  },
  {
    icon: Users,
    title: "परिवार शांति",
    desc: "गृह कलह, मतभेद और अशांति को शांत करने हेतु विशेष अनुष्ठान।",
  },
  {
    icon: Brain,
    title: "मानसिक तनाव",
    desc: "मन की स्थिरता, आत्मबल और सकारात्मक ऊर्जा के लिए मंत्र साधना।",
  },
  {
    icon: ShieldCheck,
    title: "रक्षा कवच",
    desc: "नकारात्मक ऊर्जा, बुरी नजर और भय से आध्यात्मिक संरक्षण।",
  },
];

const steps = ["जन्म विवरण साझा करें", "पंडित जी से मार्गदर्शन लें", "मंदिर या ऑनलाइन पूजा कराएं"];

export function Events() {
  return (
    <section id="events" className="relative overflow-hidden border-y border-gold/10 bg-night px-6 py-28 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(178,55,28,0.22),transparent_34%),radial-gradient(circle_at_80%_42%,rgba(255,202,88,0.12),transparent_36%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 border border-gold/25 bg-card/35 px-4 py-2">
                <Sparkles className="h-4 w-4 text-gold" />
                <span className="font-display text-xs uppercase tracking-[0.36em] text-gold">
                  Puja & Havan
                </span>
              </div>

              <h2 className="mt-7 font-hindi text-4xl leading-[1.28] text-ivory sm:text-5xl md:text-6xl">
                जीवन की बाधाओं के लिए
                <span className="block text-gradient-gold">शास्त्रोक्त समाधान</span>
              </h2>

              <p className="mt-6 max-w-xl font-hindi text-lg leading-loose text-ivory/72">
                माँ बगलामुखी सिद्धपीठ में अनुभवी पुरोहितों द्वारा पूजा, जप और
                हवन भक्त की स्थिति के अनुसार विधिपूर्वक कराए जाते हैं।
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
  <div className="relative space-y-5">

    {steps.map((step, index) => (
      <div
        key={step}
        className="
          group
          relative

          overflow-hidden

          rounded-2xl

          border
          border-gold/20

          bg-card/45

          p-5

          backdrop-blur-md

          transition-all
          duration-500

          hover:border-gold/50
          hover:bg-card/70
          hover:translate-x-1
        "
      >
        {/* glow */}
        <div className="absolute inset-0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,190,80,0.18),transparent_70%)]" />

        <div className="relative z-10 flex items-start gap-5">
          
          {/* number */}
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center

              rounded-full

              border
              border-gold/30

              bg-gradient-to-br
              from-[#5c1208]
              via-[#9d2a12]
              to-[#f0a61b]

              font-display
              text-lg
              text-[#fff2c7]

              shadow-[0_0_25px_rgba(255,180,0,0.28)]
            "
          >
            0{index + 1}
          </div>

          {/* text */}
          <div className="pt-2 font-hindi text-lg leading-relaxed text-ivory/85">
            {step}
          </div>
        </div>
      </div>
    ))}

    {/* CONTACT BOX */}
    <a
      href="tel:+919669401930"
      className="
        group
        relative

        mt-8
        flex
        items-center
        justify-between

        overflow-hidden

        rounded-2xl

        border
        border-[#ffcf70]/40

        bg-gradient-to-r
        from-[#4b0808]
        via-[#8b1111]
        to-[#d97706]

        px-7
        py-5

        shadow-[0_0_45px_rgba(255,170,50,0.22)]

        transition-all
        duration-500

        hover:scale-[1.02]
        hover:shadow-[0_0_70px_rgba(255,190,70,0.4)]
      "
    >
      {/* glow */}
      <div
        className="
          absolute
          inset-0

          opacity-40

          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,200,80,0.35), transparent 70%)",
        }}
      />

      {/* shine */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

      <div className="relative z-10">
        <div className="font-display text-xs uppercase tracking-[0.35em] text-[#ffe6a6]">
          संपर्क करें
        </div>

        <div className="mt-2 font-hindi text-2xl text-[#fff6dc]">
          अभी पंडित जी से बात करें
        </div>

        <div className="mt-1 text-sm text-[#fff0cf]/80">
          कॉल करके तुरंत मार्गदर्शन प्राप्त करें
        </div>
      </div>

      <div
        className="
          relative
          z-10

          flex
          h-14
          w-14
          items-center
          justify-center

          rounded-full

          bg-[#fff3d2]

          text-[#8b1111]

          shadow-[0_0_25px_rgba(255,255,255,0.3)]
        "
      >
        <ArrowRight className="h-6 w-6 rotate-[-45deg]" />
      </div>
    </a>
  </div>
</Reveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.45fr]">
          <Reveal>
            <div className="relative h-full min-h-[460px] overflow-hidden rounded-lg border border-gold/25 bg-card">
              <img src={havan} alt="मंदिर में हवन" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="font-display text-xs uppercase tracking-[0.34em] text-gold">Featured</div>
                <h3 className="mt-3 font-hindi text-3xl leading-snug text-ivory">माँ बगलामुखी महायज्ञ</h3>
                <p className="mt-3 font-hindi text-sm leading-relaxed text-ivory/70">
                  विशेष तिथि, संकल्प और समस्या के अनुसार अनुष्ठान की व्यवस्था।
                </p>
                <Link
                  to="/puja"
                  className="mt-6 inline-flex items-center gap-3 rounded-lg bg-gradient-gold px-5 py-3 font-hindi text-sm font-semibold text-night transition hover:-translate-y-0.5"
                >
                  पूजा सूची देखें
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <StaggerGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" stagger={0.06}>
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <StaggerItem key={service.title}>
  <div
    className="
      group
      h-full

      rounded-2xl

      border
      border-gold/15

      bg-card/55

      p-6

      backdrop-blur-sm

      transition-all
      duration-500

      hover:-translate-y-1
      hover:border-gold/45
      hover:bg-card/75
      hover:shadow-[0_0_35px_rgba(255,180,0,0.12)]
    "
  >
  <div className="flex items-center gap-4">
  <div className="grid h-11 w-11 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold shadow-[0_0_20px_rgba(255,180,0,0.12)]">
    <Icon className="h-5 w-5" />
  </div>
</div>
                    <h3 className="mt-6 font-hindi text-2xl leading-snug text-ivory">{service.title}</h3>
                    <p className="mt-3 font-hindi text-sm leading-relaxed text-ivory/66">{service.desc}</p>
                    </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>

        <Reveal delay={0.18}>
          <div className="mt-10 grid overflow-hidden rounded-lg border border-gold/20 bg-card/45 lg:grid-cols-[0.72fr_1fr]">
            <img src={swamiPuja} alt="मंदिर में पूजा" className="h-72 w-full object-cover lg:h-full" loading="lazy" />
            <div className="p-7 sm:p-9">
              <div className="font-display text-xs uppercase tracking-[0.34em] text-vermillion">Guided by Tradition</div>
              <h3 className="mt-4 font-hindi text-3xl leading-snug text-ivory sm:text-4xl">
                संकल्प से पूर्णाहुति तक पूरी विधि में सहायता।
              </h3>
              <p className="mt-4 max-w-2xl font-hindi text-base leading-loose text-ivory/70">
                भक्त मंदिर आकर या दूरस्थ संकल्प द्वारा पूजा में सम्मिलित हो सकते हैं।
                आवश्यक विवरण और शुभ मुहूर्त के लिए सीधे संपर्क करें।
              </p>
              <a
                href="tel:+919669401930"
                className="mt-7 inline-flex items-center gap-3 rounded-lg border border-gold/40 px-5 py-3 font-hindi text-sm text-gold transition hover:bg-gold/10"
              >
                मार्गदर्शन के लिए कॉल करें
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
