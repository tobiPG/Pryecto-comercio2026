import type { NextConfig } from "next";

// Las fotos de producto vienen de hosts externos variados (Openverse
// agrega Flickr, Wikimedia, etc.), por eso se sirven con `unoptimized`
// en next/image (ver isExternalImage en src/lib/product-images.ts) en
// vez de mantener una lista fija de dominios permitidos.
const nextConfig: NextConfig = {};

export default nextConfig;
