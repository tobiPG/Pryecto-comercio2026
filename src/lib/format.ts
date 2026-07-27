// Utilidades de formato monetario para Lueur Jewelry (peso dominicano)

// Formateamos solo el número (separador de miles es-DO) y anteponemos
// "RD$ " nosotros mismos: el símbolo que produce Intl para DOP varía
// según el motor ICU del navegador ("$" vs "RD$"), así que no es fiable.
const numberFormatter = new Intl.NumberFormat("es-DO", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Formatea un monto en pesos dominicanos, ej: 48500 -> "RD$ 48,500"
 */
export function formatPrice(amount: number): string {
  return `RD$ ${numberFormatter.format(amount)}`;
}
