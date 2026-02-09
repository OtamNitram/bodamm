const RSVP_DEADLINE = new Date("2026-03-25T23:59:59-03:00");

/**
 * Returns true if the RSVP deadline has passed.
 * Works on both client and server.
 */
export function isDeadlinePassed(): boolean {
  return new Date() > RSVP_DEADLINE;
}

export const DEADLINE_DATE_STRING = "25 de marzo";
