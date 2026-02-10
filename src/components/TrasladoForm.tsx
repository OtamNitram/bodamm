import { useState } from "react";
import type { ZoneCategory } from "../data/zones";
import { getOptionsForZone } from "../data/zones";
import { externalLinks } from "../config/links";
import { isDeadlinePassed } from "../lib/deadline";
import type {
  TrasladoSubmitRequest,
  TrasladoSubmitResponse,
  TrasladoApiError,
  TrasladoFormStatus,
} from "../lib/traslado-types";
import Button from "./Button";
import trasladoBg from "../assets/images/traslado-bg.webp";

const ZONES: ZoneCategory[] = ["Montevideo", "Costa de Oro", "Otro"];

export default function TrasladoForm() {
  const deadlinePassed = isDeadlinePassed();

  const [zona, setZona] = useState<ZoneCategory | null>(null);
  const [puntoDePartida, setPuntoDePartida] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<TrasladoFormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const options = zona ? getOptionsForZone(zona) : [];
  const showDropdown = zona === "Montevideo" || zona === "Costa de Oro";
  const showFreeText = zona === "Otro";

  const canSubmit =
    zona &&
    puntoDePartida.trim() !== "" &&
    whatsapp.trim() !== "" &&
    nombreCompleto.trim() !== "" &&
    status !== "submitting";

  const resetForm = () => {
    setZona(null);
    setPuntoDePartida("");
    setWhatsapp("");
    setNombreCompleto("");
    setHoneypot("");
    setStatus("idle");
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMessage("");

    const payload: TrasladoSubmitRequest = {
      zona,
      puntoDePartida: puntoDePartida.trim(),
      whatsapp: whatsapp.trim(),
      nombreCompleto: nombreCompleto.trim(),
      ...(honeypot ? { honeypot } : {}),
    };

    try {
      const response = await fetch("/.netlify/functions/traslado-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: TrasladoSubmitResponse | TrasladoApiError =
        await response.json();

      if ("error" in data) {
        setStatus("error");
        setErrorMessage(
          data.message ||
            "Error al guardar datos de traslado. Por favor intentá de nuevo o contactanos por WhatsApp.",
        );
        return;
      }

      setStatus("success");
      setTimeout(() => {
        resetForm();
      }, 5000);
    } catch {
      setStatus("error");
      setErrorMessage(
        "Error al guardar datos de traslado. Por favor intentá de nuevo o contactanos por WhatsApp.",
      );
    }
  };

  // Deadline passed view
  if (deadlinePassed) {
    return (
      <section id="traslado" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={trasladoBg.src}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-linen/85" />
        </div>
        <div className="container mx-auto px-4 md:px-12 relative z-10 flex flex-col items-center gap-8 text-center">
          <h2 className="font-['Dancing_Script'] font-bold text-[36px] lg:text-[56px] text-brand-navy leading-normal tracking-[0.02em]">
            Traslado: La Van Comunitaria
          </h2>
          <p className="text-[16px] lg:text-[18px] text-brand-navy max-w-[600px]">
            El plazo para registrar datos de traslado ha vencido. Si necesitás
            coordinarte, contactanos por WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a
              href={externalLinks.contact.martinWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-[257px] min-h-[40px] px-4 py-2 rounded-[12px] font-semibold text-[14px] border border-brand-darkGreen text-brand-darkGreen bg-brand-linen hover:bg-brand-darkGreen/10 transition-colors"
            >
              WhatsApp a Martín
            </a>
            <a
              href={externalLinks.contact.marianaWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-[257px] min-h-[40px] px-4 py-2 rounded-[12px] font-semibold text-[14px] border border-brand-darkGreen text-brand-darkGreen bg-brand-linen hover:bg-brand-darkGreen/10 transition-colors"
            >
              WhatsApp a Mariana
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="traslado" className="relative py-24 overflow-hidden">
      {/* Background with 85% linen overlay */}
      <div className="absolute inset-0">
        <img
          src={trasladoBg.src}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-linen/85" />
      </div>

      <div className="container mx-auto px-4 md:px-12 relative z-10 flex flex-col items-center gap-12">
        {/* Title */}
        <div className="text-center flex flex-col items-center gap-2">
          <h2 className="font-['Dancing_Script'] font-bold text-[36px] lg:text-[56px] text-brand-navy leading-normal tracking-[0.02em]">
            Traslado: La Van Comunitaria
          </h2>
          <p className="text-[16px] lg:text-[18px] text-brand-terracotta">
            Opcional
          </p>
          <p className="text-[16px] lg:text-[18px] text-brand-navy max-w-[800px] text-center">
            Sabemos que la bodega está lejos y queremos que puedas venir a
            comer, tomar y bailar hasta no dar más. Si querés{" "}
            <strong>
              compartir el alquiler de una van con otros invitados
            </strong>{" "}
            de tu zona, <strong>dejanos tus datos.</strong> Te avisaremos
            quiénes están cerca para que se pongan de acuerdo y dividan los
            costos del viaje.
          </p>
        </div>

        {/* Success message */}
        {status === "success" && (
          <div className="bg-brand-eucalyptus/20 border border-brand-eucalyptus rounded-xl px-6 py-4 text-brand-darkGreen text-center max-w-[600px]">
            <p className="font-semibold text-[18px]">¡Datos guardados!</p>
            <p className="text-[14px] mt-1">
              Nos pondremos en contacto para coordinar el traslado.
            </p>
          </div>
        )}

        {/* Form */}
        {status !== "success" && (
          <form
            onSubmit={handleSubmit}
            className="bg-white/20 border border-brand-darkGreen/20 rounded-xl max-w-[800px] w-full px-4 md:px-8 py-6 flex flex-col gap-6"
          >
            {/* Honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* Zone chips */}
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-[16px] text-brand-darkGreen">
                ¿De qué zona salís?
              </label>
              <div className="flex flex-wrap gap-3">
                {ZONES.map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => {
                      setZona(z);
                      setPuntoDePartida("");
                    }}
                    className={`px-4 py-2 rounded-full text-[14px] font-semibold transition-colors border ${
                      zona === z
                        ? "bg-brand-darkGreen text-brand-linen border-brand-darkGreen"
                        : "bg-brand-linen text-brand-darkGreen border-brand-darkGreen/30 hover:border-brand-darkGreen"
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>
            </div>

            {/* Dropdown for Montevideo/Costa de Oro */}
            {showDropdown && (
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-[14px] text-brand-darkGreen">
                  {zona === "Montevideo" ? "Barrio" : "Ciudad"}
                </label>
                <select
                  value={puntoDePartida}
                  onChange={(e) => setPuntoDePartida(e.target.value)}
                  className="bg-[#FFFCF8] border border-brand-darkGreen/20 rounded-lg px-3 py-3 min-h-[48px] text-[16px] text-brand-darkGreen font-lato focus:outline-none focus:ring-2 focus:ring-brand-eucalyptus/50 focus:border-brand-eucalyptus transition-colors"
                >
                  <option value="">Seleccioná tu punto de partida</option>
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Free text for Otro */}
            {showFreeText && (
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-[14px] text-brand-darkGreen">
                  ¿De dónde salís?
                </label>
                <input
                  type="text"
                  value={puntoDePartida}
                  onChange={(e) => setPuntoDePartida(e.target.value)}
                  placeholder="Ej: Pando, Las Piedras..."
                  className="bg-[#FFFCF8] border border-brand-darkGreen/20 rounded-lg px-3 py-3 min-h-[48px] text-[16px] text-brand-darkGreen placeholder:text-brand-darkGreen/40 font-lato focus:outline-none focus:ring-2 focus:ring-brand-eucalyptus/50 focus:border-brand-eucalyptus transition-colors"
                />
              </div>
            )}

            {/* WhatsApp + Full name — side by side per Figma */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-semibold text-[14px] text-brand-darkGreen">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="WhatsApp"
                  className="bg-[#FFFCF8] border border-brand-darkGreen/20 rounded-lg px-3 py-3 min-h-[48px] text-[16px] text-brand-darkGreen placeholder:text-brand-darkGreen/40 font-lato focus:outline-none focus:ring-2 focus:ring-brand-eucalyptus/50 focus:border-brand-eucalyptus transition-colors"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-semibold text-[14px] text-brand-darkGreen">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={nombreCompleto}
                  onChange={(e) => setNombreCompleto(e.target.value)}
                  placeholder="Nombre Completo"
                  className="bg-[#FFFCF8] border border-brand-darkGreen/20 rounded-lg px-3 py-3 min-h-[48px] text-[16px] text-brand-darkGreen placeholder:text-brand-darkGreen/40 font-lato focus:outline-none focus:ring-2 focus:ring-brand-eucalyptus/50 focus:border-brand-eucalyptus transition-colors"
                />
              </div>
            </div>

            {/* Error message */}
            {status === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-800 text-[14px]">
                <p>{errorMessage}</p>
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  <a
                    href={externalLinks.contact.martinWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[12px] font-semibold text-[14px] border border-brand-darkGreen text-brand-darkGreen hover:bg-brand-darkGreen/10 transition-colors"
                  >
                    WhatsApp a Martín
                  </a>
                  <a
                    href={externalLinks.contact.marianaWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[12px] font-semibold text-[14px] border border-brand-darkGreen text-brand-darkGreen hover:bg-brand-darkGreen/10 transition-colors"
                  >
                    WhatsApp a Mariana
                  </a>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className="self-center inline-flex items-center justify-center gap-2 px-8 py-3 min-h-[48px] rounded-xl font-semibold text-[16px] bg-brand-darkGreen text-brand-linen hover:bg-brand-eucalyptus transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Enviando..." : "Enviar Datos"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
