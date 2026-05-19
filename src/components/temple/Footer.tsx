import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/30 bg-gradient-to-b from-transparent to-gold/15 pt-20 pb-10 px-6 lg:px-10">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 md:grid-cols-4">
          {/* LEFT */}
          <div className="md:col-span-2">
            <div className="mb-5 flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-gold shadow-gold">
                <span className="font-display text-2xl text-ink">ॐ</span>
              </div>

              <div>
                <div className="font-display uppercase tracking-[0.28em] text-gold">
                  Maa Bagalamukhi
                </div>

                <div className="font-hindi text-sm text-vermillion">
                  श्री बगलामुखी मंदिर
                </div>
              </div>
            </div>

            <p className="max-w-md font-hindi leading-relaxed text-ivory/70">
              पीताम्बरा माँ के चरणों में एक पवित्र स्थान। श्रद्धा, सेवा एवं
              आध्यात्मिक साधना के लिए सभी भक्तों का हार्दिक स्वागत है।
            </p>

            {/* social icons */}
            <div className="mt-7 flex gap-3">
              {[
                {
                  Icon: Facebook,
                  href: "#",
                },
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/maapitambarabagalamukhimandir",
                },
                {
                  Icon: Youtube,
                  href: "#",
                },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-card/60 text-gold transition-all duration-300 hover:scale-110 hover:bg-gradient-gold hover:text-ivory"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="mb-5 font-display text-sm uppercase tracking-[0.28em] text-gold">
              त्वरित लिंक
            </h4>

            <ul className="space-y-3 font-hindi text-ivory/75">
              <li>
                <a
                  href="#home"
                  className="transition-colors hover:text-vermillion"
                >
                  मुख्य पृष्ठ
                </a>
              </li>

              <li>
                <a
                  href="#events"
                  className="transition-colors hover:text-vermillion"
                >
                  कार्यक्रम
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="transition-colors hover:text-vermillion"
                >
                  देवी परिचय
                </a>
              </li>

              <li>
                <a
                  href="#donation"
                  className="transition-colors hover:text-vermillion"
                >
                  दान
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="mb-5 font-display text-sm uppercase tracking-[0.28em] text-gold">
              सम्पर्क
            </h4>

            <ul className="space-y-4 text-sm text-ivory/75">
              <li className="flex items-start gap-3 font-hindi">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-vermillion"
                />

                <span>
                  श्री बगलामुखी मंदिर,
                  <br />
                  उज्जैन, मध्य प्रदेश
                </span>
              </li>

              <li className="flex items-center gap-3 font-hindi">
                <Phone size={16} className="text-vermillion" />
                +91 9669401930
              </li>

              <li className="flex items-center gap-3 font-hindi">
                <Phone size={16} className="text-vermillion" />
                +91 9016807833
              </li>

              <li className="flex items-center gap-3 font-hindi">
                <Phone size={16} className="text-vermillion" />
                +91 8766436244
              </li>

              <li className="flex items-center gap-3 break-all">
                <Mail size={16} className="shrink-0 text-vermillion" />

                <span className="text-sm">
                  maapitambarabagalamukhimandir@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom strip */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gold/25 pt-8 sm:flex-row">
          <div className="font-hindi text-xs text-ivory/60">
            © {new Date().getFullYear()} श्री बगलामुखी मंदिर • सर्वाधिकार
            सुरक्षित
          </div>

          <div className="font-hindi text-xs tracking-[0.25em] text-vermillion">
            ॐ ह्लीं बगलामुखी सर्वदुष्टानां नमः ॐ
          </div>
        </div>
      </div>
    </footer>
  );
}