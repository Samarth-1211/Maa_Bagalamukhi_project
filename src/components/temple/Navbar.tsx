import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import maaTrishulLogo from "@/assets/maa_trishul_logo.webp";
import { Link } from "@tanstack/react-router";

const links = [
  { href: "#home", label: "Home", hi: "मुख्य" },
  { href: "#events", label: "Havan/Puja", hi: "कार्यक्रम" },
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

      const sections = links.map((l) =>
        document.querySelector(l.href)
      );

      sections.forEach((s, i) => {
        if (!s) return;

        const r = (
          s as HTMLElement
        ).getBoundingClientRect();

        if (r.top <= 120 && r.bottom >= 120) {
          setActive(links[i].href);
        }
      });
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    onScroll();

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{
        y: -80,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        fixed
        top-0
        inset-x-0
        z-50

        transition-all
        duration-500

        ${
          scrolled
            ? "backdrop-blur-xl bg-night/70 border-b border-gold/15"
            : "bg-transparent"
        }
      `}
    >
      {/* -------------------------------------------------------------------------- */}
      {/*                               NAV CONTAINER                                */}
      {/* -------------------------------------------------------------------------- */}

      <div
        className="
          mx-auto

          max-w-7xl

          h-20

          px-4
          sm:px-6
          lg:px-10

          flex
          items-center
          justify-between
        "
      >

        {/* -------------------------------------------------------------------------- */}
        {/*                                  BRANDING                                  */}
        {/* -------------------------------------------------------------------------- */}

        <a
          href="#home"
          className="
            flex
            items-center

            gap-2
            sm:gap-3

            group

            min-w-0
          "
        >

          {/* -------------------------------------------------------------------------- */}
          {/*                                   LOGO                                     */}
          {/* -------------------------------------------------------------------------- */}

          <a
                href="/"
                className="
                  relative

                  flex
                  items-center
                  justify-center

                  w-10
                  h-10

                  sm:w-12
                  sm:h-12

                  md:w-14
                  md:h-14

                  rounded-full

                  overflow-hidden

                  shadow-gold

                  shrink-0

                  transition-transform
                  duration-300

                  hover:scale-105
                "
              >
                <img
                  src={maaTrishulLogo}
                  alt="माँ बगलामुखी लोगो"
                  className="
                    h-full
                    w-full

                    object-contain

                    scale-[1.02]

                    sm:scale-[1.08]

                    drop-shadow-[0_0_10px_rgba(255,210,120,0.35)]
                  "
                />

  {/* GLOW RING */}

  <span
    className="
      absolute
      inset-0

      rounded-full

      animate-glow-pulse

      pointer-events-none
    "
  />
</a>
          {/* -------------------------------------------------------------------------- */}
          {/*                                   TEXT                                     */}
          {/* -------------------------------------------------------------------------- */}

          <div
            className="
              leading-tight

              min-w-0
            "
          >
            <div
              className="
                font-display

                text-[13px]
                sm:text-base

                tracking-[0.18em]
                sm:tracking-[0.25em]

                text-ivory

                uppercase

                whitespace-nowrap
              "
            >
              Baglamukhi
            </div>

            <div
              className="
                font-hindi

                text-[9px]
                sm:text-[11px]

                text-gold/80

                leading-[1.4]

                overflow-visible
              "
            >
              श्री बगलामुखी मंदिर
            </div>
          </div>
        </a>

        {/* -------------------------------------------------------------------------- */}
        {/*                              DESKTOP NAV                                    */}
        {/* -------------------------------------------------------------------------- */}

        <nav
          className="
            hidden
            md:flex

            items-center
            gap-1
          "
        >
          {links.map((l) => {
            const isActive = active === l.href;

            return (
              <a
                key={l.href}
                href={l.href}
                className={`
                  relative

                  px-5
                  py-2

                  text-sm

                  font-display

                  tracking-[0.15em]

                  uppercase

                  transition-colors

                  ${
                    isActive
                      ? "text-gold"
                      : "text-ivory/70 hover:text-ivory"
                  }
                `}
              >
                <span>{l.label}</span>

                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="
                      absolute

                      left-1/2
                      bottom-1

                      h-px
                      w-6

                      -translate-x-1/2

                      bg-gold
                    "
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            );
          })}

          {/* DONATION BUTTON */}

          <a
            href="#donation"
            className="
              ml-4

              rounded-full

              bg-vermillion

              px-6
              py-2.5

              text-sm

              font-hindi

              tracking-wide

              text-ivory

              shadow-deep

              transition-transform

              hover:scale-[1.04]
            "
          >
            दान करें
          </a>
        </nav>

        {/* -------------------------------------------------------------------------- */}
        {/*                              MOBILE BUTTON                                  */}
        {/* -------------------------------------------------------------------------- */}

        <button
          className="
            md:hidden

            grid
            place-items-center

            w-10
            h-10

            rounded-full

            border
            border-gold/30

            bg-gold/15

            text-ivory
          "
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/*                               MOBILE MENU                                   */}
      {/* -------------------------------------------------------------------------- */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            className="
              md:hidden

              overflow-hidden

              border-t
              border-gold/20

              bg-night/95

              backdrop-blur-xl
            "
          >
            <div
              className="
                flex
                flex-col
                gap-1

                px-6
                py-6
              "
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    items-center
                    justify-between

                    rounded-xl

                    px-4
                    py-3

                    hover:bg-gold/10
                  "
                >
                  <span
                    className="
                      font-display

                      text-sm

                      uppercase

                      tracking-[0.2em]

                      text-ivory
                    "
                  >
                    {l.label}
                  </span>

                  <span
                    className="
                      font-hindi

                      text-sm

                      text-gold
                    "
                  >
                    {l.hi}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}