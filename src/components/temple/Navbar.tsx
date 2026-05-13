import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home", hi: "मुख्य" },
  { href: "#events", label: "Events", hi: "कार्यक्रम" },
  { href: "#donation", label: "Donation", hi: "दान" },
  { href: "#about", label: "About", hi: "परिचय" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = links.map((l) => document.querySelector(l.href));
      sections.forEach((s, i) => {
        if (!s) return;
        const r = (s as HTMLElement).getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) setActive(links[i].href);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-night/70 border-b border-gold/15" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full bg-gradient-gold grid place-items-center shadow-gold">
            <span className="font-display text-ink text-xl font-bold">ॐ</span>
            <span className="absolute inset-0 rounded-full animate-glow-pulse pointer-events-none" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base tracking-[0.25em] text-ivory uppercase">
              Baglamukhi
            </div>
            <div className="font-hindi text-[11px] text-gold/80">श्री बगलामुखी मंदिर</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative px-5 py-2 text-sm font-display tracking-[0.15em] uppercase transition-colors ${
                  isActive ? "text-gold" : "text-ivory/70 hover:text-ivory"
                }`}
              >
                <span>{l.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-1/2 -translate-x-1/2 bottom-1 w-6 h-px bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <a
            href="#donation"
            className="ml-4 px-6 py-2.5 rounded-full bg-vermillion text-ivory text-sm font-hindi tracking-wide shadow-deep hover:scale-[1.04] transition-transform"
          >
            दान करें
          </a>
        </nav>

        <button
          className="md:hidden w-11 h-11 grid place-items-center rounded-full bg-gold/15 text-ivory border border-gold/30"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-night/95 backdrop-blur-xl border-t border-gold/20"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gold/10"
                >
                  <span className="font-display tracking-[0.2em] uppercase text-ivory text-sm">
                    {l.label}
                  </span>
                  <span className="font-hindi text-gold text-sm">{l.hi}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
