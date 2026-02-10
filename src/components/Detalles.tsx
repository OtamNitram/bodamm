import { externalLinks } from "../config/links";
import iconCalendar from "../assets/images/icon-calendar.svg";
import iconLocation from "../assets/images/icon-location.svg";
import iconDresscode from "../assets/images/icon-dresscode.svg";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Detalles() {
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const card1Ref = useScrollReveal<HTMLDivElement>({ delay: 100 });
  const card2Ref = useScrollReveal<HTMLDivElement>({ delay: 200 });
  const card3Ref = useScrollReveal<HTMLDivElement>({ delay: 300 });
  const mapRef = useScrollReveal<HTMLDivElement>({ delay: 200 });

  return (
    <section
      id="detalles"
      className="relative py-14 md:py-24 bg-brand-linen overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <h2
          ref={titleRef}
          className="font-['Dancing_Script'] font-bold text-[36px] lg:text-[56px] text-brand-navy text-center mb-8 md:mb-10 lg:mb-12 tracking-[0.02em]"
        >
          Los detalles del Evento
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-8 lg:mb-12">
          {/* Details Column - Stacked on mobile/tablet, left column on desktop */}
          <div className="flex-1 space-y-6">
            {/* Cuándo */}
            <div
              ref={card1Ref}
              className="bg-[rgba(255,255,255,0.2)] border border-[rgba(10,52,40,0.2)] rounded-[20px] p-4 flex gap-4 md:gap-6 items-center h-[185px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-[60px] h-[60px] md:w-20 md:h-20 flex-shrink-0">
                <img src={iconCalendar.src} alt="" className="w-full h-full" />
              </div>
              <div className="flex-1">
                <h3 className="text-[24px] lg:text-[28px] font-semibold text-brand-navy mb-2">
                  Cuándo
                </h3>
                <p className="text-[18px] font-bold text-brand-navy">
                  Sábado 25 de Abril de 2026
                </p>
                <p className="text-[16px] lg:text-[18px] text-brand-navy">
                  Las puertas abren a las 20:30hs.
                </p>
                <p className="text-[16px] lg:text-[18px] text-brand-navy">
                  La ceremonia comienza a las 21hs.
                </p>
              </div>
            </div>

            {/* Dónde */}
            <div
              ref={card2Ref}
              className="bg-[rgba(255,255,255,0.2)] border border-[rgba(10,52,40,0.2)] rounded-[20px] p-4 flex gap-4 md:gap-6 items-center h-[185px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-[60px] h-[49.26px] md:w-20 md:h-[65.68px] flex-shrink-0">
                <img src={iconLocation.src} alt="" className="w-full h-full" />
              </div>
              <div className="flex-1">
                <h3 className="text-[24px] lg:text-[28px] font-semibold text-brand-navy mb-2">
                  Dónde
                </h3>
                <p className="text-[18px] font-bold text-brand-navy">
                  Bodega Spinoglio
                </p>
                <p className="text-[16px] lg:text-[18px] text-brand-navy">
                  Av. Don Pedro de Mendoza 8238
                </p>
                <p className="text-[16px] lg:text-[18px] text-brand-navy">
                  Montevideo, Departamento de Montevideo
                </p>
              </div>
            </div>

            {/* Dress Code */}
            <div
              ref={card3Ref}
              className="bg-[rgba(255,255,255,0.2)] border border-[rgba(10,52,40,0.2)] rounded-[20px] p-4 flex gap-4 md:gap-6 items-center h-[185px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-[60px] h-[60px] md:w-20 md:h-20 flex-shrink-0">
                <img src={iconDresscode.src} alt="" className="w-full h-full" />
              </div>
              <div className="flex-1">
                <h3 className="text-[24px] lg:text-[28px] font-semibold text-brand-navy mb-2">
                  Dress Code
                </h3>
                <p className="text-[18px] font-bold text-brand-navy">Formal</p>
                <p className="text-[16px] lg:text-[18px] text-brand-navy">
                  Queremos que nos des tu mejor versión.
                </p>
                <p className="text-[16px] lg:text-[18px] text-brand-navy">
                  Pero ojo: no es una salida a un boliche.
                </p>
              </div>
            </div>
          </div>

          {/* Map Column - Below details on mobile/tablet, right column on desktop */}
          <div ref={mapRef} className="flex-1">
            <div className="w-full h-[400px] md:h-[602px] rounded-[20px] overflow-hidden">
              <iframe
                src={externalLinks.maps.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación del evento"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
