import graciasBg from "../assets/images/gracias-bg.webp";

export default function Gracias() {
  return (
    <section id="gracias" className="relative h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={graciasBg.src}
          alt="Gracias background"
          loading="lazy"
          className="absolute w-full h-[135%] top-[-12.45%] left-0 object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" />
      </div>

      <div className="absolute right-4 md:right-12 bottom-[120px] md:bottom-[163px] z-10 text-right w-[300px] md:w-[438px]">
        <h2 className="font-['Dancing_Script'] font-bold text-[36px] md:text-[56px] text-brand-linen mb-[15px] leading-normal tracking-[0.02em]">
          Simplemente gracias
        </h2>
        <div className="text-[16px] md:text-[18px] text-brand-linen mb-[38px] leading-normal">
          <p>Por acompañarnos en el día más lindo de nuestras vidas</p>
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
