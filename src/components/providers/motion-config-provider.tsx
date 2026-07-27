"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Aplica prefers-reduced-motion a TODAS las animaciones de Framer Motion
 * de forma centralizada: si el usuario lo prefiere, las animaciones se
 * resuelven directo a su estado final en vez de transicionar.
 * Evita mezclar lógica condicional de reduceMotion en cada componente,
 * que además puede causar mismatches de hidratación.
 */
export function MotionConfigProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
