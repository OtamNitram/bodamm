export type ZoneCategory = "Montevideo" | "Ciudad de la Costa" | "Otro";

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

export const ciudadDeLaCostaLocalities: ZoneOption[] = [
  { label: "Barra de Carrasco", value: "Barra de Carrasco" },
  { label: "Parque Carrasco", value: "Parque Carrasco" },
  { label: "San José de Carrasco", value: "San José de Carrasco" },
  { label: "Shangrilá", value: "Shangrilá" },
  { label: "Solymar", value: "Solymar" },
  { label: "Lomas de Solymar", value: "Lomas de Solymar" },
  { label: "Colinas de Solymar", value: "Colinas de Solymar" },
  { label: "Médanos de Solymar", value: "Médanos de Solymar" },
  { label: "Lagomar", value: "Lagomar" },
  { label: "El Pinar", value: "El Pinar" },
  {
    label: "Otra zona de Ciudad de la Costa",
    value: "Otra zona de Ciudad de la Costa",
  },
];

export function getOptionsForZone(zone: ZoneCategory): ZoneOption[] {
  switch (zone) {
    case "Montevideo":
      return montevideoBarrios;
    case "Ciudad de la Costa":
      return ciudadDeLaCostaLocalities;
    default:
      return [];
  }
}
