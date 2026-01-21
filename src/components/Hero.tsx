import heroBg from "../assets/images/hero-bg.webp";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[728px] bg-brand-linen overflow-hidden w-full"
    >
      {/* Background Image Frame - positioned at top:73px */}
      <div className="absolute left-0 top-[73px] w-full h-[655px] overflow-hidden">
        <img
          src={heroBg.src}
          alt="Wedding hero background"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" />
      </div>

      {/* Save the date! - Exact Figma positioning */}
      <p className="absolute left-[110px] top-[287px] z-10 font-['Lato'] font-medium text-brand-linen text-[40px] tracking-[1.6px] leading-normal">
        Save the date!
      </p>

      {/* Names and Date - Left aligned */}
      <div className="absolute left-[110px] top-[405px] z-10">
        <p className="font-['Dancing_Script'] font-normal text-brand-linen text-[60px] leading-[1.2]">
          Mariana & Martín
        </p>
        <p className="font-['Dancing_Script'] font-normal text-brand-linen text-[56px] leading-[1.2]">
          25 de abril de 2026
        </p>
      </div>
    </section>
  );
}
