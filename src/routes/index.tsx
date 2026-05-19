import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { DeviPresence } from "@/components/temple/DeviPresence";
import { Hero } from "@/components/temple/Hero";

const KnowMandirPage = lazy(() =>
  import("@/components/temple/know-mandir").then((module) => ({
    default: module.KnowMandirPage,
  })),
);
const Events = lazy(() =>
  import("@/components/temple/Events").then((module) => ({ default: module.Events })),
);
const Shankaracharya = lazy(() =>
  import("@/components/temple/Shankaracharya").then((module) => ({
    default: module.Shankaracharya,
  })),
);
const KnowDevi = lazy(() =>
  import("@/components/temple/KnowDevi").then((module) => ({ default: module.KnowDevi })),
);
const Donation = lazy(() =>
  import("@/components/temple/Donation").then((module) => ({ default: module.Donation })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "माँ पीताम्बरा बगलामुखी मंदिर" },
      {
        name: "description",
        content:
          "माँ बगलामुखी मंदिर – पीताम्बरा पीठ |कालसर्प दोष पूजा उज्जैन, बगलामुखी पूजा, मंगल दोष निवारण, नवग्रह शांति पूजा, शत्रु नाशक पूजा एवं पितृ दोष पूजा हेतु विश्वसनीय आध्यात्मिक केंद्र।",
      },
      { property: "og:title", content: "माँ  बगलामुखी मंदिर — पीताम्बरा पीठ" },
      {
        property: "og:description",
        content: "कालसर्प दोष पूजा, बगलामुखी पूजा, नवग्रह शांति एवं दिव्य आध्यात्मिक उपायों हेतु पवित्र आध्यात्मिक धाम।",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <DeviPresence />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <section id="mandir">
            <KnowMandirPage />
          </section>
          <Events />
          <Shankaracharya />
          <KnowDevi />
          <Donation />
        </Suspense>
      </main>
    </div>
  );
}
