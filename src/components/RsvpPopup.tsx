import { useState, useEffect } from "react";

const STORAGE_KEY = "rsvp-popup-dismissed";

export default function RsvpPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  const accept = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);

    const section = document.getElementById("asistencia");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[380px] z-40 animate-slide-up"
      role="dialog"
      aria-label="Confirmar asistencia"
    >
      <div className="bg-brand-linen border border-brand-darkGreen/20 rounded-xl shadow-2xl p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[16px] font-semibold text-brand-navy font-lato leading-snug">
            ¿Viniste a confirmar asistencia?
          </p>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Cerrar"
            className="shrink-0 text-brand-darkGreen/40 hover:text-brand-darkGreen transition-colors p-1"
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={accept}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 min-h-[40px] rounded-xl font-semibold text-[14px] bg-brand-darkGreen text-brand-linen hover:bg-brand-eucalyptus transition-colors duration-200"
          >
            Sí, llevame
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 min-h-[40px] rounded-xl font-semibold text-[14px] border-2 border-brand-darkGreen/30 text-brand-darkGreen hover:bg-brand-darkGreen/5 transition-colors duration-200"
          >
            No, gracias
          </button>
        </div>
      </div>
    </div>
  );
}
