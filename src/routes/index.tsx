import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/temple/SmoothScroll";
import { DeviPresence } from "@/components/temple/DeviPresence";
import { Navbar } from "@/components/temple/Navbar";
import { Hero } from "@/components/temple/Hero";
import { Events } from "@/components/temple/Events";
import { KnowMandirPage } from "@/components/temple/know-mandir";
import { Shankaracharya } from "@/components/temple/Shankaracharya";
import { KnowDevi } from "@/components/temple/KnowDevi";
import { Donation } from "@/components/temple/Donation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "श्री बगलामुखी मंदिर — Maa Baglamukhi Temple" },
      {
        name: "description",
        content:
          "Maa Baglamukhi Temple — Pitambara Peeth. A sacred premium digital sanctuary for darshan, events, donation and spiritual remedies.",
      },
      { property: "og:title", content: "Maa Baglamukhi Temple — पीताम्बरा पीठ" },
      {
        property: "og:description",
        content: "Darshan, events, priests and divine remedies of Maa Baglamukhi.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <SmoothScroll />
      <DeviPresence />
      <Navbar />
      <main>
        <Hero />
        <KnowMandirPage />
        <Events />
        <Shankaracharya />
        <KnowDevi />
        <Donation />
      </main>
    </div>
  );
}
