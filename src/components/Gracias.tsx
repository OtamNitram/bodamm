export default function Gracias() {
  return (
    <section id="gracias" className="relative h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://www.figma.com/api/mcp/asset/705397e4-206a-4fc4-b678-a2e4bf312c47"
          alt=""
          className="absolute w-full h-[135%] top-[-12.45%] left-0 object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" />
      </div>

      <div className="absolute right-12 bottom-[163px] z-10 text-right w-[438px]">
        <h2 className="font-['Dancing_Script'] font-normal text-[56px] text-brand-linen mb-[15px] leading-normal">
          Simplemente gracias
        </h2>
        <p className="text-[18px] text-brand-linen mb-[38px] leading-normal">
          Por acompañarnos en el día más lindo de nuestras vidas
        </p>
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
