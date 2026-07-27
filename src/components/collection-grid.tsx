"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types/product";

interface CollectionGridProps {
  productsWithImages: { product: Product; image: string }[];
}

const FILTERS = ["Todas", ...categories] as const;

export function CollectionGrid({ productsWithImages }: CollectionGridProps) {
  const [active, setActive] = useState<string>("Todas");

  const filtered = useMemo(() => {
    if (active === "Todas") return productsWithImages;
    return productsWithImages.filter((p) => p.product.category === active);
  }, [active, productsWithImages]);

  return (
    <div>
      {/* Filtros por categoría */}
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className="relative rounded-full px-4 py-2 text-sm transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={
                  isActive
                    ? "relative z-10 font-medium text-accent-foreground"
                    : "relative z-10 text-muted-foreground hover:text-foreground"
                }
              >
                {filter}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid de productos */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map(({ product, image }) => (
            <ProductCard key={product.id} product={product} image={image} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">
          No hay piezas en esta categoría por ahora.
        </p>
      )}
    </div>
  );
}
