/**
 * Fotos reales de producto vía Openverse (openverse.org), el buscador de
 * imágenes con licencia abierta de Creative Commons / WordPress Foundation.
 * No requiere API key: se consulta por la keyword del producto (ver
 * src/lib/products.ts) y se usa la primera foto con licencia de uso
 * comercial permitido.
 *
 * Importante: estas son fotos de stock con licencia Creative Commons
 * (algunas exigen atribución, ver `attribution` en la respuesta de la
 * API) usadas como placeholder realista mientras el negocio no tiene
 * fotografía propia. Antes de vender de verdad, reemplázalas por fotos
 * reales de tus joyas (ver MANUAL_OVERRIDES más abajo y el README).
 *
 * - Si la API falla o no hay resultados, se usa una imagen local de
 *   respaldo para que el sitio nunca se vea roto.
 * - Los resultados se cachean en memoria (por proceso) y además se
 *   aprovecha el cache de `fetch` de Next.js (revalidate 24h).
 */

const OPENVERSE_API_URL = "https://api.openverse.org/v1/images/";
const FALLBACK_IMAGE = "/placeholder-jewelry.svg";

// Cache en memoria para no repetir peticiones durante la misma sesión del servidor
const memoryCache = new Map<string, string>();

/**
 * Fotos curadas a mano por producto (id -> URL). Se revisaron varios
 * resultados de Openverse por producto y se eligió el más fiel a cada
 * pieza, porque el primer resultado automático a veces trae fotos
 * irrelevantes (capturas de pantalla, objetos sin relación, etc.).
 *
 * Cuando el negocio tenga fotografía propia, reemplaza cada entrada por
 * la ruta del archivo real (ej. "/products/solitario-aurora.jpg") o por
 * la URL de tu propia foto.
 */
export const MANUAL_OVERRIDES: Record<string, string> = {
  "solitario-aurora": "https://live.staticflickr.com/8097/8476801743_393abb9f2d_b.jpg",
  "halo-celeste": "https://live.staticflickr.com/135/391255500_d54837c897_b.jpg",
  "alianzas-eternidad": "https://live.staticflickr.com/176/408909320_f752e4f880_b.jpg",
  "alianza-clasica-18k": "https://live.staticflickr.com/65535/48865212506_ef086dbe63_b.jpg",
  "cadena-veneciana": "https://live.staticflickr.com/3205/2755490777_9fd95e0a67_b.jpg",
  "cadena-cubana": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Figarochain.jpeg",
  "collar-gota-de-luz": "https://live.staticflickr.com/4083/5394351114_24cafbf37f_b.jpg",
  "collar-de-perlas": "https://live.staticflickr.com/2101/2474201376_7d0119e671_b.jpg",
  "pulsera-tennis": "https://live.staticflickr.com/4100/5439032378_12df08c95d_b.jpg",
  "pulsera-de-dijes": "https://live.staticflickr.com/5137/5414491162_c91657be7e_b.jpg",
  "argollas-de-oro": "https://live.staticflickr.com/7241/7178430702_4609567c9a_b.jpg",
  "aretes-solitario": "https://live.staticflickr.com/65535/49063420033_530bb89bef.jpg",
  "dije-corazon": "https://live.staticflickr.com/7010/6402743031_f9e9604cc5_b.jpg",
  "dije-inicial": "https://live.staticflickr.com/5009/5348433934_0e8ae7b024_b.jpg",
  "reloj-dama-clasico": "https://live.staticflickr.com/4248/34709247051_c9a0021f99_b.jpg",
  "pieza-personalizada": "https://live.staticflickr.com/5823/23760411172_0be3b757d6_b.jpg",
};

/** Foto curada para la sección "La Casa" (taller familiar) */
export const WORKSHOP_IMAGE =
  "https://live.staticflickr.com/3191/3664835959_55a0586350_b.jpg";

interface OpenverseResult {
  url: string;
}

interface OpenverseSearchResponse {
  result_count: number;
  results: OpenverseResult[];
}

/**
 * Busca en Openverse la mejor foto de uso comercial para una keyword y
 * devuelve su URL directa. Si algo falla, devuelve el placeholder local.
 */
export async function getProductImage(keyword: string): Promise<string> {
  if (memoryCache.has(keyword)) {
    return memoryCache.get(keyword) as string;
  }

  try {
    const params = new URLSearchParams({
      q: keyword,
      license_type: "commercial",
      page_size: "1",
    });

    const response = await fetch(`${OPENVERSE_API_URL}?${params.toString()}`, {
      headers: { Accept: "application/json" },
      // Cache de Next.js: evita repetir la búsqueda por 24h
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      return FALLBACK_IMAGE;
    }

    const data = (await response.json()) as OpenverseSearchResponse;
    const url = data.results?.[0]?.url;

    if (!url) {
      return FALLBACK_IMAGE;
    }

    memoryCache.set(keyword, url);
    return url;
  } catch {
    // Cualquier error de red o de la API cae de vuelta al placeholder
    return FALLBACK_IMAGE;
  }
}

/**
 * Resuelve la imagen final de un producto: prioriza overrides manuales,
 * luego Openverse, y por último el placeholder local.
 */
export async function getImageForProduct(
  productId: string,
  keyword: string,
): Promise<string> {
  if (MANUAL_OVERRIDES[productId]) {
    return MANUAL_OVERRIDES[productId];
  }
  return getProductImage(keyword);
}

/** true si la imagen viene de un host externo (no optimizable por next/image) */
export function isExternalImage(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}
