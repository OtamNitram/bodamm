import { externalLinks } from "../config/links";
import { isDeadlinePassed } from "../lib/deadline";
import RsvpForm from "./RsvpForm";
import RsvpDeadlineMessage from "./RsvpDeadlineMessage";
import asistenciaFloral from "../assets/images/asistencia-floral.webp";

export default function Asistencia() {
  const deadlinePassed = isDeadlinePassed();

  return (
    <section
      id="asistencia"
      className="relative py-12 md:py-24 bg-brand-linen overflow-hidden"
    >
      {/* Decorative Floral Pattern - Right side per Figma v2: left-[739px] on 1200px frame, opacity-20, vertically centered */}
      <img
        src={asistenciaFloral.src}
        alt=""
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-[30%] w-[662px] h-[923px] opacity-20 pointer-events-none"
        loading="lazy"
      />

      <div className="container mx-auto px-4 md:px-12 relative z-10 flex flex-col items-center gap-12">
        {/* Title */}
        <div className="text-center flex flex-col items-center gap-2">
          <h2 className="font-['Dancing_Script'] font-bold text-[36px] lg:text-[56px] text-brand-navy leading-normal tracking-[0.02em]">
            Confirmación de Asistencia
          </h2>
          <p className="text-[16px] lg:text-[18px] text-brand-terracotta">
            Tenés tiempo hasta el 25 de marzo
          </p>
        </div>

        {/* Form or Deadline Message */}
        {deadlinePassed ? <RsvpDeadlineMessage /> : <RsvpForm />}

        {/* Contact section per Figma v2 */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="font-lato font-semibold text-[16px] lg:text-[18px] text-brand-navy">
            ¿Algo que nos quieras avisar?
          </h3>
          <p className="text-[16px] lg:text-[18px] text-brand-navy">
            Contactanos directamente
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a
              href={externalLinks.contact.martinWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-[200px] min-h-[40px] px-4 py-2 rounded-[12px] font-semibold text-[14px] border border-brand-darkGreen text-brand-darkGreen bg-brand-linen hover:bg-brand-darkGreen/10 transition-colors"
            >
              WhatsApp a Martín
            </a>
            <a
              href={externalLinks.contact.marianaWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-[200px] min-h-[40px] px-4 py-2 rounded-[12px] font-semibold text-[14px] border border-brand-darkGreen text-brand-darkGreen bg-brand-linen hover:bg-brand-darkGreen/10 transition-colors"
            >
              WhatsApp a Mariana
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
