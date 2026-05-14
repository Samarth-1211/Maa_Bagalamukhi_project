import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import trishul from "@/assets/trishul.png";

export function TempleIntro() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          className="fixed inset-0 z-[99999] overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.7,
              ease: "easeInOut",
            },
          }}
        >
          {/* Golden Aura */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.35, 0.9],
              scale: [0.8, 1.1, 1.5],
            }}
            transition={{
              duration: 2.2,
              ease: "easeOut",
            }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,220,120,0.75) 0%, rgba(255,210,90,0.45) 30%, rgba(255,180,40,0.12) 55%, transparent 80%)",
              filter: "blur(24px)",
            }}
          />

          {/* Trishul */}
          <motion.img
            src={trishul}
            alt="Trishul"
            className="absolute left-1/2 z-20 w-[210px] -translate-x-1/2 object-contain"
            initial={{
              y: 500,
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              y: -120,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              bottom: "-8vh",
              filter:
                "drop-shadow(0 0 25px rgba(255,215,0,0.9)) drop-shadow(0 0 90px rgba(255,193,7,0.8))",
            }}
          />

          {/* Flash */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 1, 0],
            }}
            transition={{
              duration: 2.8,
              times: [0, 0.65, 0.82, 1],
            }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,230,160,0.95) 0%, rgba(255,210,90,0.45) 35%, transparent 75%)",
              mixBlendMode: "screen",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}