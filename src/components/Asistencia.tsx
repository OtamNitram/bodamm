import Button from "./Button";
import { externalLinks } from "../config/links";

export default function Asistencia() {
  return (
    <section id="asistencia" className="relative py-24">
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-['Dancing_Script'] font-bold text-[36px] lg:text-[56px] text-brand-navy leading-normal tracking-[0.02em] mb-2">
            Confirmación de Asistencia
          </h2>
          <p className="text-[16px] lg:text-[18px] text-brand-terracotta">
            Tenés tiempo hasta el 25 de marzo
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full">
          {/* Left Column - Direct Contact */}
          <div className="flex-1 flex flex-col gap-4 items-center text-center">
            <h3 className="text-[24px] lg:text-[28px] font-semibold text-brand-navy mb-0">
              Contactanos directamente
            </h3>
            <p className="text-[16px] lg:text-[18px] text-brand-navy opacity-80 mb-0">
              Promoción no válida para gente de IT
            </p>

            <div className="flex flex-col gap-4 items-center pt-4">
              <Button
                href={externalLinks.contact.whatsappUrl}
                className="w-[257px] min-h-[40px]"
              >
                Mandale un WhatsApp a Martín
              </Button>
              <Button
                href={externalLinks.contact.whatsappUrl}
                className="w-[257px] min-h-[40px]"
              >
                Mandale un WhatsApp a Mariana
              </Button>
            </div>
          </div>

          {/* Right Column - QR Code */}
          <div className="flex-1 flex flex-col gap-4 items-center text-center">
            <h3 className="text-[24px] lg:text-[28px] font-semibold text-brand-navy mb-0">
              Escaneá el QR
            </h3>
            <p className="text-[16px] lg:text-[18px] text-brand-navy opacity-80 mb-0">
              Y confirmá directamente en nuestro sofisticado sistema (?)
            </p>

            <div>
              <a href={externalLinks.rsvp.pageUrl}>
                <img
                  src="/qr-codes/rsvp-qr.png"
                  alt="QR Code - Confirmar Asistencia"
                  className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] mx-auto cursor-pointer hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
            <p className="text-[16px] lg:text-[18px] text-brand-navy">
              Si no funciona, hacé click en{" "}
              <a
                href={externalLinks.rsvp.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-darkGreen underline hover:text-brand-eucalyptus"
              >
                este link
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
