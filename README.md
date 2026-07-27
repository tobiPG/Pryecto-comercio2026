# Lueur Jewelry — Tienda en línea

Sitio de e-commerce para **Lueur Jewelry, S.R.L.**, joyería familiar de Santo Domingo, República Dominicana (fundada en 2018). Construido con Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion y Lenis.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** + componentes estilo shadcn/ui
- **Framer Motion** para todas las animaciones, incluyendo las tarjetas de producto y el destacado del hero, que giran en 3D (auto-rotación + arrastre con el mouse/dedo)
- **Lenis** para smooth-scroll
- **Openverse** (openverse.org) para las fotos de producto — buscador de imágenes con licencia Creative Commons, **sin necesidad de API key**

## 1. Instalación

Necesitas [Node.js](https://nodejs.org) 18 o superior.

```bash
npm install
```

## 2. Correr en local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador. No necesitas configurar ninguna variable de entorno: las fotos de producto se traen automáticamente.

## 3. Sobre las fotos de producto (importante antes de vender de verdad)

Cada producto tiene una `imageKeyword` (ver `src/lib/products.ts`) que se busca automáticamente en [Openverse](https://openverse.org), un buscador de fotos con licencia Creative Commons de uso comercial permitido. Esto te da fotos reales y variadas sin pedirte ninguna clave.

⚠️ **Estas fotos son de stock (licencia CC) y sirven como placeholder realista mientras no tienes fotografía propia.** Antes de lanzar la tienda de verdad:
- Reemplázalas por fotos reales de tus joyas (instrucciones abajo).
- Si decides quedarte con alguna foto de Openverse, revisa su licencia: varias exigen atribución al autor (Openverse te da ese dato en el campo `attribution` de su API).

Si la API de Openverse falla o no encuentra nada para una keyword, el sitio muestra automáticamente una imagen de respaldo local (`/public/placeholder-jewelry.svg`) — el sitio nunca se ve roto.

## 4. Reemplazar las imágenes por fotos reales de tus joyas

Cuando tengas fotos propias de cada pieza, tienes dos opciones (ambas en `src/lib/product-images.ts`):

**Opción A — Subir el archivo a `/public`:**
1. Coloca la foto en `public/products/nombre-de-la-pieza.jpg`.
2. Abre `src/lib/product-images.ts` y agrega una línea al objeto `MANUAL_OVERRIDES`:
   ```ts
   export const MANUAL_OVERRIDES: Record<string, string> = {
     "solitario-aurora": "/products/solitario-aurora.jpg",
   };
   ```
   El `id` (`"solitario-aurora"`) debe coincidir con el `id` del producto en `src/lib/products.ts`.

**Opción B — Usar una URL externa:**
- Igual que arriba, pero pega la URL completa de la imagen en vez de una ruta local. No necesitas configurar nada más: las imágenes externas se sirven directamente (sin optimización de next/image), así que funcionan con cualquier dominio.

## 5. Editar el catálogo

Todo el catálogo vive en `src/lib/products.ts`: nombre, categoría, precio (en RD$), la palabra clave (`imageKeyword`) usada para buscar la foto, y flags opcionales `featured`, `isNew` y `bestseller`. Solo un producto debe tener `bestseller: true` — es el que se muestra en grande en el hero. Agregar un producto nuevo es tan simple como añadir un objeto más al arreglo.

## 6. Datos de contacto de ejemplo

El teléfono, WhatsApp, correo y dirección en la sección de Contacto son de ejemplo y están marcados con **(REEMPLAZAR)** directamente en la página. Edítalos en `src/components/contact.tsx`.

El formulario de contacto valida los campos en el navegador, pero el envío está simulado (no hay backend conectado todavía). Para conectarlo de verdad, la forma más rápida es un servicio como [Formspree](https://formspree.io) o [Resend](https://resend.com): reemplaza la función `handleSubmit` en `src/components/contact-form.tsx` por un `fetch` a su endpoint.

## 7. Desplegar en Vercel (gratis)

1. Sube este proyecto a un repositorio de GitHub (o GitLab/Bitbucket).
2. Entra a [vercel.com](https://vercel.com) e inicia sesión (puedes usar tu cuenta de GitHub).
3. Haz clic en **"Add New..." → "Project"** e importa el repositorio.
4. Haz clic en **"Deploy"** (no hace falta configurar ninguna variable de entorno). En un par de minutos Vercel te dará una URL pública gratuita (algo como `lueur-jewelry.vercel.app`).
5. Opcional: en **Settings → Domains** puedes conectar un dominio propio (ej. `lueurjewelry.do`).

Cada vez que hagas `git push` a la rama principal, Vercel vuelve a desplegar el sitio automáticamente.

## Estructura del proyecto

```
src/
  app/            Páginas, layout, metadata, sitemap
  components/     Componentes de UI y secciones del sitio
    providers/    Contexto de carrito, tema y smooth-scroll
    ui/           Componentes base (botón, input, etc.)
  lib/            Catálogo, formato de moneda, integración de fotos (Openverse)
  types/          Tipos de TypeScript compartidos
public/           Imágenes estáticas (incluye el placeholder de respaldo)
```

## Comandos disponibles

| Comando           | Descripción                          |
| ------------------ | ------------------------------------ |
| `npm run dev`       | Servidor de desarrollo               |
| `npm run build`     | Build de producción                  |
| `npm run start`     | Sirve el build de producción         |
| `npm run lint`      | Revisa el código con ESLint          |
