import Button from "./Button";
import { externalLinks } from "../config/links";
import { isDeadlinePassed } from "../lib/deadline";
import RsvpForm from "./RsvpForm";
import RsvpDeadlineMessage from "./RsvpDeadlineMessage";

export default function Asistencia() {
  const deadlinePassed = isDeadlinePassed();

  return (
    <section id="asistencia" className="relative py-12 md:py-24">
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

        {/* Contacto Directo */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="font-['Dancing_Script'] font-bold text-[24px] lg:text-[28px] text-brand-navy">
            Contacto Directo
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button
              href={externalLinks.contact.martinWhatsappUrl}
              className="w-[257px] min-h-[40px]"
            >
              WhatsApp a Martín
            </Button>
            <Button
              href={externalLinks.contact.marianaWhatsappUrl}
              className="w-[257px] min-h-[40px]"
            >
              WhatsApp a Mariana
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
