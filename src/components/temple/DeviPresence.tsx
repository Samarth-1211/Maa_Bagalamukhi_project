import mandirExterior from "@/assets/mandir-exterior.webp";

/**
 * Static ambient page background.
 * Keeps the spiritual tone without a fixed autoplay video or scroll-linked transforms.
 */

export function DeviPresence() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-sanctum" />
      <img
        src={mandirExterior}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.14]"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,193,7,0.1),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.28),rgba(0,0,0,0.64))]" />
    </div>
  );
}
