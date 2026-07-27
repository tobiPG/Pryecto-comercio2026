import type { Product } from "@/types/product";

/**
 * Catálogo inicial de Lueur Jewelry.
 * Los precios están en pesos dominicanos (RD$).
 * `imageKeyword` se usa para buscar la foto del producto (ver
 * src/lib/product-images.ts). Para usar una foto real de la joya,
 * agrega su id a MANUAL_OVERRIDES en ese archivo, o sube la imagen a
 * /public y apunta ahí.
 */
export const products: Product[] = [
  {
    id: "solitario-aurora",
    name: "Solitario Aurora",
    category: "Anillos de compromiso",
    price: 48500,
    imageKeyword: "diamond ring",
    featured: true,
    bestseller: true,
    description: "Solitario clásico en oro 18k con talla brillante.",
  },
  {
    id: "halo-celeste",
    name: "Halo Celeste",
    category: "Anillos de compromiso",
    price: 62000,
    imageKeyword: "engagement ring",
    featured: true,
    description: "Diamante central rodeado de un halo luminoso.",
  },
  {
    id: "alianzas-eternidad",
    name: "Alianzas Eternidad",
    category: "Alianzas",
    price: 39900,
    imageKeyword: "wedding rings",
    description: "Par de alianzas en oro 18k, acabado espejo.",
  },
  {
    id: "alianza-clasica-18k",
    name: "Alianza Clásica 18k",
    category: "Alianzas",
    price: 24500,
    imageKeyword: "gold wedding band",
    description: "Alianza atemporal en oro 18k macizo.",
  },
  {
    id: "cadena-veneciana",
    name: "Cadena Veneciana",
    category: "Cadenas",
    price: 18900,
    imageKeyword: "gold chain necklace",
    isNew: true,
    description: "Eslabón fino veneciano en oro 18k.",
  },
  {
    id: "cadena-cubana",
    name: "Cadena Cubana",
    category: "Cadenas",
    price: 27500,
    imageKeyword: "thick gold chain",
    description: "Eslabón cubano macizo, presencia contemporánea.",
  },
  {
    id: "collar-gota-de-luz",
    name: "Collar Gota de Luz",
    category: "Collares",
    price: 15400,
    imageKeyword: "pendant necklace",
    isNew: true,
    description: "Colgante en forma de gota, oro 18k con piedra turquesa.",
  },
  {
    id: "collar-de-perlas",
    name: "Collar de Perlas",
    category: "Collares",
    price: 21000,
    imageKeyword: "pearl necklace",
    description: "Perlas cultivadas seleccionadas a mano.",
  },
  {
    id: "pulsera-tennis",
    name: "Pulsera Tennis",
    category: "Pulseras",
    price: 33700,
    imageKeyword: "diamond bracelet",
    featured: true,
    description: "Línea continua de diamantes engastados en oro 18k.",
  },
  {
    id: "pulsera-de-dijes",
    name: "Pulsera de Dijes",
    category: "Pulseras",
    price: 12800,
    imageKeyword: "charm bracelet",
    description: "Pulsera personalizable con dijes intercambiables.",
  },
  {
    id: "argollas-de-oro",
    name: "Argollas de Oro",
    category: "Aretes",
    price: 9600,
    imageKeyword: "hoop earrings",
    description: "Argollas medianas en oro 18k, uso diario.",
  },
  {
    id: "aretes-solitario",
    name: "Aretes Solitario",
    category: "Aretes",
    price: 16900,
    imageKeyword: "diamond stud earrings",
    description: "Par de solitarios en oro 18k con diamante.",
  },
  {
    id: "dije-corazon",
    name: "Dije Corazón",
    category: "Dijes",
    price: 6900,
    imageKeyword: "heart pendant",
    description: "Dije en forma de corazón, oro 18k.",
  },
  {
    id: "dije-inicial",
    name: "Dije Inicial",
    category: "Dijes",
    price: 8400,
    imageKeyword: "initial pendant",
    isNew: true,
    description: "Dije con inicial personalizada, ideal para regalo.",
  },
  {
    id: "reloj-dama-clasico",
    name: "Reloj Dama Clásico",
    category: "Relojes",
    price: 29900,
    imageKeyword: "women luxury watch",
    description: "Movimiento de cuarzo suizo, caja bañada en oro.",
  },
  {
    id: "pieza-personalizada",
    name: "Pieza Personalizada",
    category: "Personalizada",
    price: 0,
    imageKeyword: "custom jewelry",
    description: "Diseñamos la joya de tus sueños a tu medida.",
  },
];

export const categories: Product["category"][] = [
  "Anillos de compromiso",
  "Alianzas",
  "Cadenas",
  "Collares",
  "Pulseras",
  "Aretes",
  "Dijes",
  "Relojes",
  "Personalizada",
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Devuelve el producto marcado como más vendido (usado en el hero) */
export function getBestsellerProduct(): Product {
  return products.find((p) => p.bestseller) ?? products[0];
}
