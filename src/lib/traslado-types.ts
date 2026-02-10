export interface TrasladoSubmitRequest {
  zona: string;
  puntoDePartida: string;
  whatsapp: string;
  nombreCompleto: string;
  honeypot?: string;
}

export interface TrasladoSubmitResponse {
  success: boolean;
  submittedAt: string;
}

export interface TrasladoApiError {
  error: string;
  message: string;
  fields?: string[];
}

export type TrasladoFormStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";
