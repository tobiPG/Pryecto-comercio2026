"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Anima como grupo (usa junto a <Reveal.Item>) */
  as?: "div" | "section";
}

/**
 * Envuelve una sección/elemento y lo revela con fade + translate
 * al entrar en el viewport.
 */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const Comp = as === "section" ? motion.section : motion.div;

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      // Framer Motion calcula el estilo "hidden" distinto en servidor vs.
      // cliente para elementos con whileInView (el cliente espera a saber
      // si el elemento ya está en el viewport). Es un mismatch cosmético
      // y conocido de la librería; no afecta el resultado visual final.
      suppressHydrationWarning
    >
      {children}
    </Comp>
  );
}
