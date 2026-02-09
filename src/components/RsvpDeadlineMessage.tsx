import Button from "./Button";
import { externalLinks } from "../config/links";

export default function RsvpDeadlineMessage() {
  return (
    <div className="bg-white/20 border border-brand-darkGreen/20 rounded-xl max-w-[800px] w-full px-6 md:px-8 py-6 text-center flex flex-col items-center gap-4">
      <p className="text-[18px] lg:text-[20px] font-semibold text-brand-navy">
        El plazo para confirmar asistencia ha vencido.
      </p>
      <p className="text-[16px] text-brand-darkGreen/80">
        Si necesitás hacer cambios, contactanos directamente por WhatsApp.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
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
  );
}
