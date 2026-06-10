import { CATEGORIES } from "./categories";

export function fmtPrice(n) {
  return "$\u00A0" + Number(n).toLocaleString("es-CO");
}

export function getCatLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function getCatIcon(id) {
  return CATEGORIES.find((c) => c.id === id)?.icon ?? "📦";
}
