import { downloadICS } from "../lib/calendar";

interface RsvpSuccessMessageProps {
  onReset: () => void;
}

export default function RsvpSuccessMessage({
  onReset,
}: RsvpSuccessMessageProps) {
  return (
    <div className="bg-white/20 border border-brand-darkGreen/20 rounded-xl max-w-[800px] w-full px-6 md:px-8 py-8 flex flex-col items-center gap-6 text-center">
      <div className="w-16 h-16 rounded-full bg-brand-eucalyptus/10 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-brand-eucalyptus"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h3 className="font-['Dancing_Script'] font-bold text-[28px] lg:text-[36px] text-brand-navy">
        ¡Confirmación recibida!
      </h3>

      <p className="text-[16px] lg:text-[18px] text-brand-darkGreen/80 max-w-[400px]">
        Gracias por confirmar tu asistencia. ¡Nos vemos el 25 de abril!
      </p>

      <button
        type="button"
        onClick={downloadICS}
        className="inline-flex items-center justify-center gap-2 w-[200px] px-4 py-2 min-h-[40px] rounded-[12px] font-semibold text-[14px] bg-brand-darkGreen text-brand-linen hover:bg-brand-eucalyptus transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Agregar al calendario
      </button>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center justify-center w-[200px] px-4 py-2 min-h-[40px] rounded-[12px] font-semibold text-[14px] border border-brand-darkGreen text-brand-darkGreen hover:bg-brand-darkGreen/10 transition-colors duration-200"
      >
        Modificar confirmación
      </button>
    </div>
  );
}
