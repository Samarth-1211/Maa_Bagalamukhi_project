import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import trishul from "@/assets/trishul.webp";

const INTRO_FLAG_KEY = "templeIntroShown";
const INTRO_EXPIRY_KEY = "templeIntroExpiry";
const EXPIRY_HOURS = 24;

/**
 * Check if intro should be shown based on localStorage
 * Returns true if user hasn't seen it in the last 24h
 */
function shouldShowIntro(): boolean {
  try {
    const expiry = localStorage.getItem(INTRO_EXPIRY_KEY);
    if (!expiry) return true; // First visit

    const expiryTime = parseInt(expiry, 10);
    const now = Date.now();

    // If expiry time has passed, show again
    if (now > expiryTime) {
      return true;
    }

    // Otherwise, skip
    return false;
  } catch {
    // Fallback: if localStorage is blocked, always show (safe default)
    return true;
  }
}

/**
 * Mark intro as shown (for 24h)
 */
function markIntroShown(): void {
  try {
    const expiryTime = Date.now() + EXPIRY_HOURS * 60 * 60 * 1000;
    localStorage.setItem(INTRO_FLAG_KEY, "true");
    localStorage.setItem(INTRO_EXPIRY_KEY, expiryTime.toString());
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

export function TempleIntro() {
  // Initialize state from localStorage (only once on mount)
  const [show, setShow] = useState(() => shouldShowIntro());
  const [hide, setHide] = useState(false);

  // Auto-hide after 400ms (reduced from 900ms for faster UX + lower TBT)
  useEffect(() => {
    if (!show) return; // Skip if not showing

    const timer = setTimeout(() => {
      setHide(true);
      markIntroShown(); // Mark as shown after animation starts
    }, 400);

    return () => clearTimeout(timer);
  }, [show]);

  // Don't render anything if intro shouldn't show
  if (!show) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {!hide && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.5, // Reduced from 0.7s
              ease: "easeInOut",
            },
          }}
        >
          {/* 
            Simplified Aura (removed blur to reduce GPU pressure)
            Blur is expensive on mobile; opacity fade is cleaner.
          */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: [0, 0.4, 0.85],
              scale: [0.9, 1.05, 1.2],
            }}
            transition={{
              duration: 1.6, // Reduced from 2.2s
              ease: "easeOut",
            }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,220,120,0.7) 0%, rgba(255,210,90,0.4) 35%, rgba(255,180,40,0.08) 65%, transparent 90%)",
              // Removed blur: "blur(8px)" — too expensive on mobile
            }}
          />

          {/* 
            Trishul Image (core visual)
            Kept intact as it's the focal point; optimized for webp format + preload
          */}
          <motion.img
            src={trishul}
            alt="Trishul"
            className="absolute left-1/2 z-20 w-[210px] -translate-x-1/2 object-contain"
            initial={{
              y: 180,
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              y: -30,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.4, // Reduced from 1.8s
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              bottom: "-8vh",
              // Simplified shadow: removed double drop-shadow (GPU cost)
              // Use single lighter shadow instead
              filter:
                "drop-shadow(0 0 20px rgba(255,215,0,0.7))",
            }}
          />

          {/* 
            Flash Effect (quick bright pulse)
            Simplified timing; still has impact but faster
          */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 0.9, 0],
            }}
            transition={{
              duration: 1.8, // Reduced from 2.8s
              times: [0, 0.55, 0.75, 1],
              ease: "easeOut",
            }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,230,160,0.9) 0%, rgba(255,210,90,0.3) 40%, transparent 80%)",
              mixBlendMode: "screen",
            }}
          />

          {/* 
            Optional: Add a subtle fade-to-black at the end
            Signals transition to main content
          */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 0.3],
            }}
            transition={{
              duration: 1.8,
              times: [0, 0.6, 1],
            }}
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}