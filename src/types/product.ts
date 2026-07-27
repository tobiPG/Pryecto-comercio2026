// Categorías del catálogo de Lueur Jewelry
export type ProductCategory =
  | "Anillos de compromiso"
  | "Alianzas"
  | "Cadenas"
  | "Collares"
  | "Pulseras"
  | "Aretes"
  | "Dijes"
  | "Relojes"
  | "Personalizada";

export interface Product {
  /** Identificador único, usado como slug interno */
  id: string;
  /** Nombre comercial de la pieza */
  name: string;
  category: ProductCategory;
  /** Precio en pesos dominicanos (RD$). 0 significa "cotización" */
  price: number;
  /** Palabra clave usada para buscar la foto del producto */
  imageKeyword: string;
  /** Se muestra en la sección de destacados */
  featured?: boolean;
  /** Insignia "Nuevo" en la tarjeta */
  isNew?: boolean;
  /** Producto más vendido: se destaca en el hero */
  bestseller?: boolean;
  /** Breve descripción para tarjeta/detalle */
  description?: string;
}
