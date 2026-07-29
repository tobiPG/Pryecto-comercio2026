"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/components/providers/cart-provider";
import { isExternalImage } from "@/lib/product-images";

interface ProductCardProps {
  product: Product;
  image: string;
}

export function ProductCard({ product, image }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 25,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const isCustom = product.id === "pieza-personalizada";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-surface-border bg-surface transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/20"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxNDE0MTYiLz48L3N2Zz4="
          loading="lazy"
          unoptimized={isExternalImage(image)}
        />
        {product.bestseller && (
          <span className="absolute left-3 top-3 rounded-full border border-accent/60 bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
            Más vendido
          </span>
        )}
        {product.isNew && (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
            Nuevo
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-5">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          {product.category}
        </span>
        <h3 className="text-lg font-medium text-foreground">{product.name}</h3>
        {product.description && (
          <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-medium text-accent">
            {isCustom ? "Cotización" : formatPrice(product.price)}
          </span>

          {isCustom ? (
            <a
              href="#contacto"
              className="rounded-full border border-surface-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Consultar
            </a>
          ) : (
            <button
              type="button"
              onClick={() => addItem(product, image)}
              aria-label={`Añadir ${product.name} al carrito`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <Plus size={18} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
