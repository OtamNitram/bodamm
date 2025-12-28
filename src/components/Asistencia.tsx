import Button from "./Button";
import { externalLinks } from "../config/links";

export default function Asistencia() {
  return (
    <section id="asistencia" className="py-24 bg-brand-linen overflow-hidden">
      <div className="container mx-auto px-12">
        <h2 className="font-['Dancing_Script'] font-normal text-[56px] text-brand-navy text-center mb-12 leading-normal">
          Confirmación de Asistencia
        </h2>

        <div className="flex gap-12 w-full">
          {/* Left Column - Direct Contact */}
          <div className="flex-1 flex flex-col gap-4 items-center text-center">
            <h3 className="text-[28px] font-semibold text-brand-navy mb-0">
              Contactanos directamente
            </h3>
            <p className="text-[18px] text-brand-navy opacity-80 mb-0">
              Promoción no válida para gente de IT
            </p>

            <div className="flex flex-col gap-4 items-center pt-4">
              <Button href={externalLinks.contact.whatsappUrl}>
                Mandale un WhatsApp a Martín
              </Button>
              <Button href={externalLinks.contact.whatsappUrl}>
                Mandale un WhatsApp a Mariana
              </Button>
            </div>
          </div>

          {/* Right Column - QR Code */}
          <div className="flex-1 flex flex-col gap-4 items-center text-center">
            <h3 className="text-[28px] font-semibold text-brand-navy mb-0">
              Escaneá el QR
            </h3>
            <p className="text-[18px] text-brand-navy opacity-80 mb-0">
              Y confirmá directamente en nuestro sofisticado sistema (?)
            </p>

            <div>
              <a href={externalLinks.rsvp.pageUrl}>
                <img
                  src="https://www.figma.com/api/mcp/asset/7f80dd6e-d38b-430b-9d15-02e39cac58c1"
                  alt="QR Code - Confirmar Asistencia"
                  className="w-[200px] h-[200px] mx-auto cursor-pointer hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
