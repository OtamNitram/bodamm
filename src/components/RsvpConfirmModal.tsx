import type { Guest } from "../lib/rsvp-types";
import { useScrollLock } from "../hooks/useScrollLock";

interface RsvpConfirmModalProps {
  members: Guest[];
  attendingMap: Record<string, boolean>;
  dietaryToggleMap: Record<string, boolean>;
  dietaryTextMap: Record<string, string>;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function RsvpConfirmModal({
  members,
  attendingMap,
  dietaryToggleMap,
  dietaryTextMap,
  onConfirm,
  onCancel,
}: RsvpConfirmModalProps) {
  useScrollLock();

  const attendingMembers = members.filter((m) => attendingMap[m.id]);
  const notAttendingMembers = members.filter((m) => !attendingMap[m.id]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Confirmar asistencia"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onCancel();
      }}
    >
      <div className="bg-brand-linen rounded-xl max-w-[500px] w-full p-6 md:p-8 shadow-xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        <h3 className="font-['Dancing_Script'] font-bold text-[28px] text-brand-navy text-center">
          Confirmar Asistencia
        </h3>

        {/* Attending */}
        {attendingMembers.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-[16px] font-semibold text-brand-darkGreen">
              ✓ Asisten:
            </p>
            <ul className="flex flex-col gap-1 pl-4">
              {attendingMembers.map((m) => (
                <li key={m.id} className="text-[16px] text-brand-darkGreen">
                  <span className="font-semibold">
                    {m.firstName} {m.lastName}
                  </span>
                  {dietaryToggleMap[m.id] && dietaryTextMap[m.id] && (
                    <span className="text-brand-terracotta text-[14px] ml-2">
                      — {dietaryTextMap[m.id]}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Not attending */}
        {notAttendingMembers.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-[16px] font-semibold text-brand-darkGreen/60">
              ✗ No asisten:
            </p>
            <ul className="flex flex-col gap-1 pl-4">
              {notAttendingMembers.map((m) => (
                <li key={m.id} className="text-[16px] text-brand-darkGreen/60">
                  {m.firstName} {m.lastName}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 min-h-[40px] rounded-[12px] font-semibold text-[14px] bg-brand-darkGreen text-brand-linen hover:bg-brand-eucalyptus transition-colors duration-200"
          >
            Confirmar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 min-h-[40px] rounded-[12px] font-semibold text-[14px] border border-brand-darkGreen/30 text-brand-darkGreen hover:bg-brand-darkGreen/5 transition-colors duration-200"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
