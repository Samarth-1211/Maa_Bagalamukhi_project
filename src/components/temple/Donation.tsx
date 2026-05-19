import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";

const amounts = [101, 251, 501, 1100, 2100, 5100];

export function Donation() {
  return (
    <section id="donation" className="relative py-32 px-6 lg:px-10 overflow-hidden">
      {/* sacred backdrop */}
      <div className="absolute inset-0 bg-gradient-dark-gold" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.7_0.18_70/0.35),transparent_60%)]" />
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%3E%3Cpath%20fill%3D%22%23d4a937%22%20fill-opacity%3D%220.18%22%20d%3D%22M20%200l5%2015h15l-12%209%205%2016-13-10-13%2010%205-16-12-9h15z%22%2F%3E%3C%2Fsvg%3E')]" />

      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <span className="text-xs tracking-[0.5em] uppercase text-gold font-display">
            ✦ सेवा एवं सहयोग ✦
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-hindi text-5xl md:text-7xl text-ivory leading-[1.45] md:leading-[1.35] pb-5">
            मंदिर सेवा में
            <br />
            <span
  className="
    text-gradient-gold

    inline-block

    pb-3
    pt-1

    leading-[1.5]

    overflow-visible
  "
>
  अपना योगदान दें
</span>

          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 font-hindi text-lg text-ivory/75 max-w-2xl mx-auto leading-relaxed">
            आपका दान मंदिर के अनुष्ठान, अन्नदान, गौसेवा और भक्तों की सहायता में उपयोग किया जाता है।
            माँ की कृपा सदा आप पर बनी रहे।
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-14 grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-3xl mx-auto">
            {amounts.map((a, i) => (
              <motion.button
                key={a}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="aspect-square rounded-2xl bg-ivory/10 border border-gold/40 backdrop-blur-sm text-ivory hover:bg-gradient-gold hover:text-ink hover:border-transparent transition-colors group"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                <div className="font-display text-xl">₹{a}</div>
                <div className="font-hindi text-[10px] mt-1 opacity-70">दान</div>
              </motion.button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
          to="/donate"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-gold text-ivory font-semibold font-hindi shadow-gold hover:scale-[1.04] transition-transform text-lg"
        >
              <Heart size={20} className="fill-vermillion text-vermillion" />
              अभी दान करें
            </Link>
            <a
              href="#"
              className="px-8 py-5 rounded-full border-2 border-gold/60 text-ivory font-hindi hover:bg-ivory/10 transition-colors"
            >
              सेवा विकल्प देखें
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="mt-10 font-hindi text-xs text-ivory/50 tracking-widest uppercase">
            🔒 सुरक्षित भुगतान •
          </p>
        </Reveal>
      </div>
    </section>
  );
}
