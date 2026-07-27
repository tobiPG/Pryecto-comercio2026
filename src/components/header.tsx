"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/providers/cart-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "#coleccion", label: "Colección" },
  { href: "#la-casa", label: "La Casa" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass shadow-lg shadow-black/5" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <a
          href="#inicio"
          className="font-heading text-2xl tracking-[0.15em] text-foreground"
        >
          LUEUR
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={openCart}
            aria-label="Abrir carrito"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-surface-border text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ShoppingBag size={17} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border text-foreground md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-surface-border glass md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-2 py-3 text-base text-foreground transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
