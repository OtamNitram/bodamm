import graciasBg from "../assets/images/gracias-bg.webp";

export default function Gracias() {
  return (
    <section id="gracias" className="relative h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={graciasBg.src}
          alt="Gracias background"
          loading="lazy"
          className="absolute h-full w-[237%] md:w-full md:h-[135%] left-[-55%] md:left-0 top-0 md:top-[-12.45%] object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" />
      </div>

      <div className="absolute right-4 md:right-12 top-[341px] md:bottom-[163px] md:top-auto z-10 text-right w-[240px] md:w-[438px]">
        <h2 className="font-['Dancing_Script'] font-bold text-[36px] md:text-[56px] text-brand-linen mb-[8px] leading-normal tracking-[1.12px]">
          Simplemente gracias
        </h2>
        <div className="text-[16px] md:text-[18px] text-brand-linen mb-[16px] leading-normal">
          <p className="mb-0">
            Por acompañarnos en el día más lindo de nuestras vidas
          </p>
          <p>(sí, en la foto teníamos 20 años)</p>
        </div>
        <a
          href="#hero"
          className="text-[18px] text-brand-darkGreen underline hover:text-brand-eucalyptus transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </section>
  );
}
