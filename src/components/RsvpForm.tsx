import { useState, useCallback } from "react";
import { useScrollLock } from "../hooks/useScrollLock";
import type {
  Group,
  Guest,
  SearchResponse,
  SubmitResponse,
  ApiError,
} from "../lib/rsvp-types";
import { externalLinks } from "../config/links";
import Button from "./Button";
import RsvpConfirmModal from "./RsvpConfirmModal";
import RsvpSuccessMessage from "./RsvpSuccessMessage";

type FormState =
  | "idle"
  | "searching"
  | "found"
  | "notFound"
  | "confirming"
  | "submitting"
  | "success"
  | "error";

export default function RsvpForm() {
  // Search state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Form state
  const [formState, setFormState] = useState<FormState>("idle");
  const [group, setGroup] = useState<Group | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Per-member state
  const [attendingMap, setAttendingMap] = useState<Record<string, boolean>>({});
  const [lockedAttendingMap, setLockedAttendingMap] = useState<
    Record<string, boolean>
  >({});
  const [dietaryToggleMap, setDietaryToggleMap] = useState<
    Record<string, boolean>
  >({});
  const [dietaryTextMap, setDietaryTextMap] = useState<Record<string, string>>(
    {},
  );

  // Submission result
  const [, setSubmittedAt] = useState<string | null>(null);

  const initMemberState = useCallback((members: Guest[], _groupData: Group) => {
    const attending: Record<string, boolean> = {};
    const dietToggle: Record<string, boolean> = {};
    const dietText: Record<string, string> = {};

    for (const m of members) {
      attending[m.id] = m.attending === true;
      dietToggle[m.id] = m.hasDietaryRestriction || false;
      dietText[m.id] = m.dietaryDescription || "";
    }

    // Lock members that already confirmed (attending === true from API)
    const locked: Record<string, boolean> = {};
    for (const m of members) {
      locked[m.id] = m.attending === true;
    }

    setAttendingMap(attending);
    setLockedAttendingMap(locked);
    setDietaryToggleMap(dietToggle);
    setDietaryTextMap(dietText);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();

    if (!trimmedFirst || !trimmedLast) return;

    setFormState("searching");
    setErrorMessage("");

    try {
      const params = new URLSearchParams({
        firstName: trimmedFirst,
        lastName: trimmedLast,
      });

      const response = await fetch(
        `${externalLinks.rsvp.apiSearchUrl}?${params.toString()}`,
      );

      if (response.status === 410) {
        setFormState("error");
        setErrorMessage(
          "El plazo para confirmar asistencia ha vencido. Contactanos por WhatsApp.",
        );
        return;
      }

      if (!response.ok) {
        const err: ApiError = await response.json();
        setFormState("error");
        setErrorMessage(
          err.message ||
            "Error al buscar invitado. Por favor intentá de nuevo o contactanos por WhatsApp.",
        );
        return;
      }

      const data: SearchResponse = await response.json();

      if (!data.found || !data.group) {
        setFormState("notFound");
        return;
      }

      setGroup(data.group);
      initMemberState(data.group.members, data.group);
      setFormState("found");
    } catch {
      setFormState("error");
      setErrorMessage(
        "Error de conexión. Por favor intentá de nuevo o contactanos por WhatsApp.",
      );
    }
  };

  const handleShowConfirmation = () => {
    if (!group) return;

    // Validate dietary descriptions
    for (const m of group.members) {
      if (
        attendingMap[m.id] &&
        dietaryToggleMap[m.id] &&
        (!dietaryTextMap[m.id] || dietaryTextMap[m.id].trim() === "")
      ) {
        setErrorMessage(
          `Por favor describí la restricción alimentaria de ${m.firstName}.`,
        );
        return;
      }
    }

    setErrorMessage("");
    setFormState("confirming");
  };

  const handleSubmit = async () => {
    if (!group) return;

    setFormState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(externalLinks.rsvp.apiSubmitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId: group.id,
          members: group.members.map((m) => ({
            id: m.id,
            attending: attendingMap[m.id] || false,
            hasDietaryRestriction: dietaryToggleMap[m.id] || false,
            dietaryDescription: dietaryToggleMap[m.id]
              ? dietaryTextMap[m.id] || null
              : null,
          })),
        }),
      });

      if (!response.ok) {
        const err: ApiError = await response.json();
        setFormState("found");
        setErrorMessage(
          err.message ||
            "Error al guardar confirmación. Por favor intentá de nuevo o contactanos por WhatsApp.",
        );
        return;
      }

      const data: SubmitResponse = await response.json();
      setSubmittedAt(data.submittedAt);
      setFormState("success");
      setTimeout(() => {
        document
          .getElementById("asistencia")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      setFormState("found");
      setErrorMessage(
        "Error de conexión. Por favor intentá de nuevo o contactanos por WhatsApp.",
      );
    }
  };

  const handleReset = () => {
    setFormState("idle");
    setFirstName("");
    setLastName("");
    setGroup(null);
    setErrorMessage("");
    setAttendingMap({});
    setLockedAttendingMap({});
    setDietaryToggleMap({});
    setDietaryTextMap({});
    setSubmittedAt(null);
  };

  return (
    <>
      {/* Success message (sibling pattern like TrasladoForm — no scroll jump) */}
      {formState === "success" && <RsvpSuccessMessage onReset={handleReset} />}
      {formState !== "success" && (
        <div className="bg-white/20 border border-brand-darkGreen/20 rounded-xl max-w-[800px] w-full px-4 md:px-8 py-6 flex flex-col gap-8 md:gap-12">
          {/* Search Bar */}
          <div className="flex flex-col gap-4">
            <form onSubmit={handleSearch} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Tu nombre"
                  autoComplete="off"
                  aria-label="Nombre"
                  className="flex-1 bg-[#FFFCF8] border border-brand-darkGreen/20 rounded-lg px-3 py-3 min-h-[48px] text-[16px] text-brand-darkGreen placeholder:text-brand-darkGreen/40 font-lato focus:outline-none focus:ring-2 focus:ring-brand-eucalyptus/50 focus:border-brand-eucalyptus transition-colors"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Tu apellido"
                  autoComplete="off"
                  aria-label="Apellido"
                  className="flex-1 bg-[#FFFCF8] border border-brand-darkGreen/20 rounded-lg px-3 py-3 min-h-[48px] text-[16px] text-brand-darkGreen placeholder:text-brand-darkGreen/40 font-lato focus:outline-none focus:ring-2 focus:ring-brand-eucalyptus/50 focus:border-brand-eucalyptus transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={
                  formState === "searching" ||
                  !firstName.trim() ||
                  !lastName.trim()
                }
                className="w-full sm:w-auto self-center inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[40px] rounded-[12px] font-semibold text-[14px] bg-brand-darkGreen text-brand-linen hover:bg-brand-eucalyptus transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === "searching" ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-brand-linen/30 border-t-brand-linen rounded-full" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    Buscar
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-brand-terracotta/10 border border-brand-terracotta/30 rounded-lg px-4 py-3 text-[15px] text-brand-terracotta text-center">
              {errorMessage}
            </div>
          )}

          {/* Not Found */}
          {formState === "notFound" && (
            <div className="flex flex-col items-center gap-4 text-center py-4">
              <p className="text-[18px] font-semibold text-brand-navy">
                No encontramos tu nombre
              </p>
              <p className="text-[16px] text-brand-darkGreen/80">
                Revisá que hayas escrito tu nombre y apellido correctamente. Si
                el problema persiste, contactanos por WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  href={externalLinks.contact.martinWhatsappUrl}
                  className="min-h-[40px]"
                >
                  WhatsApp a Martín
                </Button>
                <Button
                  href={externalLinks.contact.marianaWhatsappUrl}
                  className="min-h-[40px]"
                >
                  WhatsApp a Mariana
                </Button>
              </div>
            </div>
          )}

          {/* Error with WhatsApp CTA */}
          {formState === "error" && (
            <div className="flex flex-col items-center gap-3 text-center py-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  href={externalLinks.contact.martinWhatsappUrl}
                  className="min-h-[40px]"
                >
                  WhatsApp a Martín
                </Button>
                <Button
                  href={externalLinks.contact.marianaWhatsappUrl}
                  className="min-h-[40px]"
                >
                  WhatsApp a Mariana
                </Button>
              </div>
            </div>
          )}

          {/* Group Members */}
          {(formState === "found" || formState === "submitting") && group && (
            <div className="flex flex-col gap-6">
              {/* Attendance Checkboxes */}
              <div className="flex flex-col gap-4">
                <h4 className="text-[18px] lg:text-[20px] font-semibold text-brand-darkGreen font-lato">
                  Seleccioná quiénes vienen :)
                </h4>
                <div className="flex flex-col gap-5">
                  {group.members.map((member) => (
                    <div key={member.id} className="flex flex-col gap-2">
                      {/* Attendance checkbox */}
                      <label
                        className={`flex items-center gap-2 select-none ${lockedAttendingMap[member.id] ? "opacity-70 cursor-not-allowed" : "cursor-pointer group/checkbox"}`}
                      >
                        <span
                          className={`inline-flex items-center justify-center w-10 h-10 rounded transition-colors ${
                            attendingMap[member.id]
                              ? "text-brand-eucalyptus"
                              : "text-brand-eucalyptus/40"
                          }`}
                        >
                          {attendingMap[member.id] ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="36"
                              height="36"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="36"
                              height="36"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              aria-hidden="true"
                            >
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                            </svg>
                          )}
                        </span>
                        <input
                          type="checkbox"
                          checked={attendingMap[member.id] || false}
                          disabled={lockedAttendingMap[member.id]}
                          onChange={(e) =>
                            setAttendingMap((prev) => ({
                              ...prev,
                              [member.id]: e.target.checked,
                            }))
                          }
                          className="sr-only"
                          aria-label={`${member.firstName} ${member.lastName} asiste`}
                        />
                        <span className="text-[16px] lg:text-[18px] text-brand-darkGreen font-lato group-hover/checkbox:text-brand-eucalyptus transition-colors">
                          {member.firstName} {member.lastName}
                        </span>
                      </label>

                      {/* Dietary restriction toggle + text (only if attending) */}
                      {attendingMap[member.id] && (
                        <div className="ml-12 flex flex-col gap-2">
                          <label className="flex items-center gap-3 cursor-pointer select-none">
                            <span className="text-[14px] lg:text-[15px] text-brand-darkGreen/80 font-lato">
                              ¿Restricción alimentaria?
                            </span>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={
                                dietaryToggleMap[member.id] || false
                              }
                              aria-label={`Restricción alimentaria para ${member.firstName}`}
                              onClick={() =>
                                setDietaryToggleMap((prev) => ({
                                  ...prev,
                                  [member.id]: !prev[member.id],
                                }))
                              }
                              className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-eucalyptus/50 ${
                                dietaryToggleMap[member.id]
                                  ? "bg-brand-eucalyptus"
                                  : "bg-brand-darkGreen/20"
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                  dietaryToggleMap[member.id]
                                    ? "translate-x-5"
                                    : "translate-x-0"
                                }`}
                              />
                            </button>
                          </label>

                          {dietaryToggleMap[member.id] && (
                            <input
                              type="text"
                              value={dietaryTextMap[member.id] || ""}
                              onChange={(e) =>
                                setDietaryTextMap((prev) => ({
                                  ...prev,
                                  [member.id]: e.target.value,
                                }))
                              }
                              placeholder="Ej: celíaco, vegetariano, alergia a frutos secos..."
                              aria-label={`Descripción restricción alimentaria de ${member.firstName}`}
                              className="bg-[#FFFCF8] border border-brand-darkGreen/20 rounded-lg px-3 py-2 text-[14px] text-brand-darkGreen placeholder:text-brand-darkGreen/40 font-lato focus:outline-none focus:ring-2 focus:ring-brand-eucalyptus/50 focus:border-brand-eucalyptus transition-colors max-w-[400px]"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleShowConfirmation}
                  disabled={formState === "submitting"}
                  className="inline-flex items-center justify-center whitespace-nowrap px-6 py-2 min-h-[40px] rounded-[12px] font-semibold text-[14px] bg-brand-darkGreen text-brand-linen hover:bg-brand-eucalyptus transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Yendo no, ¡llegando!
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Fixed overlays — rendered outside form div to avoid parent constraints */}
      {formState === "confirming" && group && (
        <RsvpConfirmModal
          members={group.members}
          attendingMap={attendingMap}
          dietaryToggleMap={dietaryToggleMap}
          dietaryTextMap={dietaryTextMap}
          onConfirm={handleSubmit}
          onCancel={() => setFormState("found")}
        />
      )}
      {formState === "submitting" && <SubmittingOverlay />}
    </>
  );
}

function SubmittingOverlay() {
  useScrollLock();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-brand-linen rounded-xl px-8 py-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="animate-spin inline-block w-8 h-8 border-4 border-brand-eucalyptus/30 border-t-brand-eucalyptus rounded-full" />
        <p className="text-[16px] font-semibold text-brand-navy">
          Enviando confirmación...
        </p>
      </div>
    </div>
  );
}
