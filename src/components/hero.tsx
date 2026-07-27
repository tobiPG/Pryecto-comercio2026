"use client";

import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/magnetic-button";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/format";

// El anillo 3D solo se renderiza en cliente (WebGL)
const HeroRing3D = dynamic(() => import("@/components/hero-ring-3d"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-br from-accent/20 to-transparent" />
  ),
});

interface HeroProps {
  bestseller: {
    product: Product;
    image: string;
  };
}

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero({ bestseller }: HeroProps) {
  const { addItem } = useCart();
  const { product, image } = bestseller;

  return (
    <section
      id="inicio"
      className="mesh-gradient relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <div className="relative z-[1] mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-8 md:px-10">
        {/* Texto principal */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="order-2 md:order-1"
        >
          <motion.span
            variants={item}
            className="mb-6 inline-block rounded-full border border-surface-border px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-accent"
          >
            Santo Domingo · Desde 2018
          </motion.span>

          <motion.h1
            variants={item}
            className="text-balance text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Joyería que
            <br />
            <span className="text-accent">captura la luz.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-pretty text-lg text-muted-foreground"
          >
            Piezas en oro 18k y plata 925, diseñadas y curadas a mano por un
            negocio familiar dominicano. Cada joya, un destello propio.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <MagneticButton>
              <Button asChild size="default">
                <a href="#coleccion">Ver colección</a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button asChild variant="outline" size="default">
                <a href="#contacto">Pieza personalizada</a>
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-14 flex gap-10 text-sm text-muted-foreground"
          >
            <div>
              <p className="text-2xl font-medium text-foreground">18k / 925</p>
              <p>Oro y plata certificados</p>
            </div>
            <div>
              <p className="text-2xl font-medium text-foreground">100%</p>
              <p>Atención personalizada</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Producto más vendido, en 3D giratorio */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative order-1 mx-auto w-full max-w-sm md:order-2"
        >
          <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl" />

          <span className="absolute left-0 top-0 z-10 rounded-full border border-accent/60 bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
            Más vendido
          </span>

          <div className="aspect-square w-full">
            <HeroRing3D />
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-lg font-medium text-foreground">{product.name}</p>
              <p className="text-accent">{formatPrice(product.price)}</p>
            </div>
            <button
              type="button"
              onClick={() => addItem(product, image)}
              aria-label={`Añadir ${product.name} al carrito`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <Plus size={18} />
            </button>
          </div>

          <p className="pointer-events-none mt-2 text-center text-xs text-muted-foreground">
            Arrastra para girar
          </p>
        </motion.div>
      </div>
    </section>
  );
}
