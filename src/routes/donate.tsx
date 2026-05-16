import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { ArrowLeft, Copy, Check, Smartphone, Heart, Flame, Flower2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/donate")({
  component: DonatePage,
  head: () => ({
    meta: [
      { title: "दान करें · माँ पीतांबरा बगलामुखी मंदिर, उज्जैन" },
      {
        name: "description",
        content:
          "माँ पीतांबरा बगलामुखी मंदिर, उज्जैन के लिए ऑनलाइन दान करें — UPI / PhonePe / QR के माध्यम से सेवा अर्पित करें।",
      },
    ],
  }),
});

// Temple UPI details — replace with the real handle when available
const UPI_ID = "9016807833@ybl";
const PAYEE_NAME = "Vijayanand Puri Ji Maharaj - Maa Pitambara Baglamukhi Mandir ";

const sevaOptions = [
  { amount: 51, label: "दीप सेवा", desc: "एक दीप माँ के चरणों में अर्पण", icon: Flame },
  { amount: 251, label: "पुष्प सेवा", desc: "गेंदा व कमल पुष्प माला", icon: Flower2 },
  { amount: 1100, label: "भोग सेवा", desc: "माँ को भोग व प्रसाद वितरण", icon: Heart },
  { amount: 5100, label: "महायज्ञ सेवा", desc: "हवन व विशेष पूजा में सहभागिता", icon: Sparkles },
];

function buildUpiUrl(amount?: number) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: PAYEE_NAME,
    cu: "INR",
    tn: "Mandir Seva Donation",
  });
  if (amount && amount > 0) params.set("am", String(amount));
  return `upi://pay?${params.toString()}`;
}

function DonatePage() {
  const [selected, setSelected] = useState<number | null>(251);
  const [custom, setCustom] = useState("");
  const [copied, setCopied] = useState(false);

  const amount = custom ? Number(custom) : selected ?? 0;
  const upiUrl = buildUpiUrl(amount);

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient glow + yantra backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.75 0.21 50 / 0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, oklch(0.55 0.22 28 / 0.18) 0%, transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 slow-spin opacity-[0.06]"
        style={{
          width: 900,
          height: 900,
          background:
            "conic-gradient(from 0deg, var(--gold) 0deg, transparent 30deg, var(--gold) 60deg, transparent 90deg, var(--gold) 120deg, transparent 150deg, var(--gold) 180deg, transparent 210deg, var(--gold) 240deg, transparent 270deg, var(--gold) 300deg, transparent 330deg)",
          borderRadius: "50%",
        }}
      />


      {/* hero heading */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">
     
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="gold-shimmer text-glow mt-4 text-4xl leading-[1.45] sm:text-5xl md:text-6xl"
          style={{ fontFamily: '"Tiro Devanagari Sanskrit", serif' }}
        >
          माँ के चरणों में अपनी सेवा अर्पित करें
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mx-auto mt-5 max-w-2xl text-base text-ivory/75 sm:text-lg"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          आपका हर योगदान मंदिर की सेवा, दैनिक पूजा, अन्न-दान और निर्माण कार्य में लगाया जाता है।
          एक दीप, एक पुष्प, एक भोग — सब माँ को प्रिय है।
        </motion.p>
      </section>

      {/* main grid */}
      <section className="relative z-10 mx-auto mt-14 grid max-w-6xl gap-8 px-6 pb-24 lg:grid-cols-[1.1fr_1fr]">
        {/* LEFT — Seva selection */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-2xl border border-gold/20 bg-card/40 p-6 backdrop-blur-sm sm:p-8"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          <h2
            className="text-2xl text-gold"
            style={{ fontFamily: '"Tiro Devanagari Sanskrit", serif' }}
          >
            सेवा चुनें
          </h2>
          <p
            className="mt-1 text-sm text-ivory/60"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Choose a seva or enter your own offering
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2">
            {sevaOptions.map(({ amount: amt, label, desc, icon: Icon }) => {
              const active = selected === amt && !custom;
              return (
                <button
                  key={amt}
                  onClick={() => {
                    setSelected(amt);
                    setCustom("");
                  }}
                  className={`group relative overflow-hidden rounded-xl border p-4 text-left transition-all ${
                    active
                      ? "border-gold bg-gold/10"
                      : "border-gold/15 bg-background/40 hover:border-gold/40 hover:bg-gold/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon
                      className={`h-5 w-5 ${active ? "text-gold" : "text-gold/60"}`}
                    />
                    <span
                      className={`text-lg ${active ? "text-gold-glow text-glow" : "text-ivory/90"}`}
                      style={{ fontFamily: '"Cinzel", serif' }}
                    >
                      ₹{amt}
                    </span>
                  </div>
                  <p
                    className={`mt-3 text-base ${active ? "text-ivory" : "text-ivory/85"}`}
                    style={{ fontFamily: '"Tiro Devanagari Sanskrit", serif' }}
                  >
                    {label}
                  </p>
                  <p
                    className="mt-1 text-xs text-ivory/55"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    {desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* custom amount */}
          <div className="mt-6">
            <label
              className="text-xs uppercase tracking-[0.3em] text-gold/80"
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              अपनी राशि / Custom Amount
            </label>
            <div className="mt-2 flex items-center rounded-xl border border-gold/20 bg-background/50 px-4 py-3 focus-within:border-gold/60">
              <span className="mr-2 text-gold">₹</span>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                placeholder="1108"
                value={custom}
                onChange={(e) => {
                  setCustom(e.target.value);
                  setSelected(null);
                }}
                className="w-full bg-transparent text-lg text-ivory outline-none placeholder:text-ivory/30"
                style={{ fontFamily: '"Cinzel", serif' }}
              />
            </div>
          </div>

          {/* CTA — open in PhonePe / UPI */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={upiUrl}
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 text-base text-maroon transition-transform hover:scale-[1.02]"
              style={{
                background: "var(--gradient-gold)",
                boxShadow: "var(--shadow-glow)",
                fontFamily: '"Cinzel", serif',
                letterSpacing: "0.1em",
              }}
            >
              <Smartphone className="h-5 w-5" />
              PHONEPE / UPI से दान करें
            </a>
            <button
              onClick={copyUpi}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold/30 bg-background/40 px-5 py-4 text-sm text-ivory/90 transition hover:border-gold hover:text-gold"
              style={{ fontFamily: '"Cinzel", serif', letterSpacing: "0.1em" }}
            >
              {copied ? <Check className="h-4 w-4 text-gold" /> : <Copy className="h-4 w-4" />}
              {copied ? "COPIED" : "COPY UPI"}
            </button>
          </div>
          <p
            className="mt-3 text-center text-xs text-ivory/50 sm:text-left"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Opens PhonePe, GPay, Paytm or any UPI app on your phone.
          </p>
        </motion.div>

        {/* RIGHT — QR card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="relative flex flex-col items-center justify-center rounded-2xl border border-gold/20 bg-card/40 p-6 text-center backdrop-blur-sm sm:p-8"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          {/* top label */}
          <p
            className="text-xs uppercase tracking-[0.4em] text-gold/80"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            Scan & Donate
          </p>
          <h3
            className="mt-2 text-2xl text-ivory"
            style={{ fontFamily: '"Tiro Devanagari Sanskrit", serif' }}
          >
            QR कोड स्कैन करें
          </h3>

          {/* QR frame */}
          <motion.div
            key={amount}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="relative mt-6 rounded-2xl bg-ivory p-5"
            style={{
              boxShadow:
                "0 0 0 2px var(--gold), 0 0 40px oklch(0.82 0.16 82 / 0.45), 0 20px 60px oklch(0 0 0 / 0.4)",
            }}
          >
            {/* corner ornaments */}
            <span className="absolute -left-2 -top-2 h-4 w-4 rounded-tl-md border-l-2 border-t-2 border-gold" />
            <span className="absolute -right-2 -top-2 h-4 w-4 rounded-tr-md border-r-2 border-t-2 border-gold" />
            <span className="absolute -bottom-2 -left-2 h-4 w-4 rounded-bl-md border-b-2 border-l-2 border-gold" />
            <span className="absolute -bottom-2 -right-2 h-4 w-4 rounded-br-md border-b-2 border-r-2 border-gold" />

            <QRCodeSVG
              value={upiUrl}
              size={220}
              level="M"
              bgColor="#ffffff"
              fgColor="#2a1410"
            />
          </motion.div>

          <div className="mt-5 space-y-1">
            <p
              className="text-sm text-ivory/70"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              UPI ID
            </p>
            <button
              onClick={copyUpi}
              className="inline-flex items-center gap-2 text-base text-gold hover:text-gold-glow"
              style={{ fontFamily: '"Cinzel", serif', letterSpacing: "0.08em" }}
            >
              {UPI_ID}
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            {amount > 0 && (
              <p
                className="pt-2 text-lg text-gold-glow text-glow"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                ₹ {amount.toLocaleString("en-IN")}
              </p>
            )}
          </div>
        </motion.div>
      </section>

      {/* Seva impact strip */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl border border-gold/15 bg-gradient-to-b from-background/40 to-background/10 p-8 text-center backdrop-blur-sm"
        >
          <p
            className="text-xs uppercase tracking-[0.4em] text-gold/80"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            आपके दान का प्रभाव · Where Your Daan Goes
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              { hi: "नित्य पूजा व आरती", en: "Daily puja, aarti & deepak" },
              { hi: "अन्नदान व प्रसाद", en: "Annadaan & prasad to devotees" },
              { hi: "मंदिर निर्माण व सेवा", en: "Temple construction & upkeep" },
            ].map((b) => (
              <div key={b.hi} className="px-2">
                <p
                  className="text-xl text-ivory"
                  style={{ fontFamily: '"Tiro Devanagari Sanskrit", serif' }}
                >
                  {b.hi}
                </p>
                <p
                  className="mt-1 text-sm text-ivory/55"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  {b.en}
                </p>
              </div>
            ))}
          </div>
          <p
            className="mt-8 text-sm text-ivory/60"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            ॥ दानं परम धर्मः ॥ — Giving is the highest dharma
          </p>
        </motion.div>
      </section>
    </main>
  );
}