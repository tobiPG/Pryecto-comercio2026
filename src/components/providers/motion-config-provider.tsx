"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Centraliza la config de Framer Motion para TODA la app.
 * reducedMotion="never": las animaciones siempre corren completas,
 * sin importar la preferencia prefers-reduced-motion del sistema.
 */
export function MotionConfigProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
