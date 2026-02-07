import graciasBg from "../assets/images/gracias-bg.webp";

export default function Gracias() {
  return (
    <section id="gracias" className="relative h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={graciasBg.src}
          alt="Gracias background"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-[30%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" />
      </div>

      <div className="absolute right-4 md:right-12 bottom-[48px] md:bottom-[163px] z-10 text-right">
        <h2 className="font-['Dancing_Script'] font-bold text-[36px] lg:text-[56px] text-brand-linen mb-[8px] leading-normal tracking-[1.12px] whitespace-nowrap">
          Simplemente gracias
        </h2>
        <div className="w-[240px] md:w-[438px] ml-auto text-[16px] lg:text-[18px] text-brand-linen mb-[16px] leading-normal">
          <p className="mb-0">
            Por acompañarnos en el día más lindo de nuestras vidas
          </p>
          <p>(sí, en la foto teníamos 20 años)</p>
        </div>
        <a
          href="#hero"
          className="text-[16px] lg:text-[18px] text-brand-darkGreen underline hover:text-brand-eucalyptus transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </section>
  );
}
