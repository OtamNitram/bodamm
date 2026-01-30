import heroBg from "../assets/images/hero-bg.webp";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[688px] md:h-[728px] bg-brand-linen overflow-hidden w-full"
    >
      {/* Background Image Frame - positioned at top:73px with rounded corners per Figma */}
      <div className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 top-[73px] w-[862px] md:w-full h-[615px] md:h-[655px] overflow-hidden rounded-[20px] md:rounded-none">
        <img
          src={heroBg.src}
          alt="Wedding hero background"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" />
      </div>

      {/* Save the date! - Positioned per Figma: top-161px on mobile */}
      <p className="absolute left-4 md:left-[110px] top-[161px] md:top-[287px] z-10 font-['Lato'] font-medium text-brand-linen text-[40px] tracking-[1.6px] leading-normal">
        Save the date!
      </p>

      {/* Names and Date - Positioned at bottom per Figma: top-479px on mobile */}
      <div className="absolute left-4 md:left-[110px] top-[420px] md:top-[405px] z-10">
        <p className="font-['Dancing_Script'] font-bold text-brand-linen text-[44px] md:text-[60px] leading-[1.2] tracking-[1.2px]">
          Mariana & Martín
        </p>
        <p className="font-['Dancing_Script'] font-bold text-brand-linen text-[40px] md:text-[56px] leading-[1.2] tracking-[1.12px] whitespace-nowrap">
          25 de abril de 2026
        </p>
      </div>
    </section>
  );
}
