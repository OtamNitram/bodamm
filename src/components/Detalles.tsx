import { externalLinks } from "../config/links";
import patternRight from "../assets/images/pattern-right.webp";
import iconCalendar from "../assets/images/icon-calendar.svg";
import iconLocation from "../assets/images/icon-location.svg";
import iconDresscode from "../assets/images/icon-dresscode.svg";

export default function Detalles() {
  return (
    <section
      id="detalles"
      className="relative py-14 md:py-20 lg:py-24 bg-brand-linen overflow-hidden"
    >
      {/* Decorative Pattern - Only visible on larger screens */}
      <div className="hidden lg:block absolute right-0 top-[-529px] w-[736px] h-[1026px] opacity-20">
        <img
          src={patternRight.src}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <h2 className="font-['Dancing_Script'] text-[36px] md:text-[43px] lg:text-[56px] text-brand-navy text-center mb-8 md:mb-10 lg:mb-12">
          Los detalles del Evento
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-8 lg:mb-12">
          {/* Details Column - Stacked on mobile/tablet, left column on desktop */}
          <div className="flex-1 space-y-6">
            {/* Cuándo */}
            <div className="bg-[rgba(198,87,42,0.03)] border border-[rgba(198,87,42,0.5)] rounded-[20px] p-4 flex gap-4 md:gap-6 items-center h-[185px]">
              <div className="w-[60px] h-[60px] md:w-20 md:h-20 flex-shrink-0">
                <img src={iconCalendar.src} alt="" className="w-full h-full" />
              </div>
              <div className="flex-1">
                <h3 className="text-[24px] md:text-[29px] lg:text-[28px] font-semibold text-brand-navy mb-2">
                  Cuándo
                </h3>
                <p className="text-[18px] font-bold text-brand-navy">
                  Sábado 25 de Abril de 2026
                </p>
                <p className="text-[16px] md:text-[19px] lg:text-[18px] text-brand-navy">
                  Las puertas abren a las 20:30hs.
                </p>
                <p className="text-[16px] md:text-[19px] lg:text-[18px] text-brand-navy">
                  La ceremonia comienza a las 21hs.
                </p>
              </div>
            </div>

            {/* Dónde */}
            <div className="bg-[rgba(198,87,42,0.03)] border border-[rgba(198,87,42,0.5)] rounded-[20px] p-4 flex gap-4 md:gap-6 items-center h-[185px]">
              <div className="w-[60px] h-[49.26px] md:w-20 md:h-[65.68px] flex-shrink-0">
                <img src={iconLocation.src} alt="" className="w-full h-full" />
              </div>
              <div className="flex-1">
                <h3 className="text-[24px] md:text-[29px] lg:text-[28px] font-semibold text-brand-navy mb-2">
                  Dónde
                </h3>
                <p className="text-[18px] font-bold text-brand-navy">
                  Bodega Spinoglio
                </p>
                <p className="text-[16px] md:text-[19px] lg:text-[18px] text-brand-navy">
                  Av. Don Pedro de Mendoza 8238
                </p>
                <p className="text-[16px] md:text-[19px] lg:text-[18px] text-brand-navy">
                  Montevideo, Departamento de Montevideo
                </p>
              </div>
            </div>

            {/* Dress Code */}
            <div className="bg-[rgba(198,87,42,0.03)] border border-[rgba(198,87,42,0.5)] rounded-[20px] p-4 flex gap-4 md:gap-6 items-center h-[185px]">
              <div className="w-[60px] h-[60px] md:w-20 md:h-20 flex-shrink-0">
                <img src={iconDresscode.src} alt="" className="w-full h-full" />
              </div>
              <div className="flex-1">
                <h3 className="text-[24px] md:text-[29px] lg:text-[28px] font-semibold text-brand-navy mb-2">
                  Dress Code
                </h3>
                <p className="text-[18px] font-bold text-brand-navy">Formal</p>
                <p className="text-[16px] md:text-[19px] lg:text-[18px] text-brand-navy">
                  Queremos que nos des tu mejor versión.
                </p>
                <p className="text-[16px] md:text-[19px] lg:text-[18px] text-brand-navy">
                  Pero ojo: no es una salida a un boliche.
                </p>
              </div>
            </div>
          </div>

          {/* Map Column - Below details on mobile/tablet, right column on desktop */}
          <div className="flex-1">
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
