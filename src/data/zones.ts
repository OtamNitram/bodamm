export type ZoneCategory = "Montevideo" | "Costa de Oro" | "Otro";

export interface ZoneOption {
  label: string;
  value: string;
}

export const montevideoBarrios: ZoneOption[] = [
  { label: "Aguada", value: "Aguada" },
  { label: "Buceo", value: "Buceo" },
  { label: "Carrasco", value: "Carrasco" },
  { label: "Centro", value: "Centro" },
  { label: "Ciudad Vieja", value: "Ciudad Vieja" },
  { label: "Cordón", value: "Cordón" },
  { label: "La Blanqueada", value: "La Blanqueada" },
  { label: "Malvín", value: "Malvín" },
  { label: "Malvín Norte", value: "Malvín Norte" },
  { label: "Maroñas", value: "Maroñas" },
  { label: "Palermo", value: "Palermo" },
  { label: "Parque Batlle", value: "Parque Batlle" },
  { label: "Parque Rodó", value: "Parque Rodó" },
  { label: "Pocitos", value: "Pocitos" },
  { label: "Prado", value: "Prado" },
  { label: "Punta Carretas", value: "Punta Carretas" },
  { label: "Sayago", value: "Sayago" },
  { label: "Tres Cruces", value: "Tres Cruces" },
  { label: "Unión", value: "Unión" },
  { label: "Otro barrio", value: "Otro barrio" },
];

export const costaDeOroCities: ZoneOption[] = [
  { label: "Atlántida", value: "Atlántida" },
  { label: "Barra de Carrasco", value: "Barra de Carrasco" },
  { label: "Ciudad de la Costa", value: "Ciudad de la Costa" },
  { label: "El Pinar", value: "El Pinar" },
  { label: "Lagomar", value: "Lagomar" },
  { label: "Las Toscas", value: "Las Toscas" },
  { label: "Marindia", value: "Marindia" },
  { label: "Neptunia", value: "Neptunia" },
  { label: "Parque del Plata", value: "Parque del Plata" },
  { label: "Pinamar", value: "Pinamar" },
  { label: "Salinas", value: "Salinas" },
  { label: "San José de Carrasco", value: "San José de Carrasco" },
  { label: "Shangrilá", value: "Shangrilá" },
  { label: "Solymar", value: "Solymar" },
  { label: "Otra ciudad", value: "Otra ciudad" },
];

export function getOptionsForZone(zone: ZoneCategory): ZoneOption[] {
  switch (zone) {
    case "Montevideo":
      return montevideoBarrios;
    case "Costa de Oro":
      return costaDeOroCities;
    default:
      return [];
  }
}
