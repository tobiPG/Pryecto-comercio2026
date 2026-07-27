"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { isExternalImage } from "@/lib/product-images";
import {
  AmexIcon,
  ApplePayIcon,
  GooglePayIcon,
  MastercardIcon,
  PayPalIcon,
  VisaIcon,
} from "@/components/payment-icons";

const PAYMENT_OPTIONS = [
  { id: "visa", label: "Visa", Icon: VisaIcon },
  { id: "mastercard", label: "Mastercard", Icon: MastercardIcon },
  { id: "amex", label: "American Express", Icon: AmexIcon },
  { id: "apple-pay", label: "Apple Pay", Icon: ApplePayIcon },
  { id: "google-pay", label: "Google Pay", Icon: GooglePayIcon },
  { id: "paypal", label: "PayPal", Icon: PayPalIcon },
];

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, subtotal } =
    useCart();
  const [selectedPayment, setSelectedPayment] = useState("visa");
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  function handleCheckout() {
    // Simulación: no se procesa ningún pago real.
    setPurchaseComplete(true);
  }

  function handleClose(open: boolean) {
    if (!open) {
      closeCart();
      // Da tiempo a que termine la animación de salida antes de resetear la vista
      setTimeout(() => {
        if (purchaseComplete) {
          clearCart();
          setPurchaseComplete(false);
        }
      }, 400);
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-surface-border bg-surface"
              >
                <Dialog.Title className="sr-only">
                  Carrito de compras
                </Dialog.Title>

                <div className="flex items-center justify-between border-b border-surface-border px-6 py-5">
                  <h2 className="flex items-center gap-2 text-lg font-medium">
                    <ShoppingBag size={18} />
                    {purchaseComplete ? "Pedido confirmado" : "Tu carrito"}
                  </h2>
                  <Dialog.Close asChild>
                    <button
                      aria-label="Cerrar carrito"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-accent"
                    >
                      <X size={18} />
                    </button>
                  </Dialog.Close>
                </div>

                {purchaseComplete ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                    >
                      <CheckCircle2 className="text-accent" size={56} strokeWidth={1.5} />
                    </motion.div>
                    <p className="text-xl font-medium">¡Compra exitosa!</p>
                    <p className="text-sm text-muted-foreground">
                      Gracias por tu pedido. Te contactaremos en breve para
                      coordinar la entrega de tu joya.
                    </p>
                    <Dialog.Close asChild>
                      <Button variant="outline" className="mt-2">
                        Seguir explorando
                      </Button>
                    </Dialog.Close>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                      {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground">
                          <ShoppingBag size={32} className="opacity-40" />
                          <p>Tu carrito está vacío.</p>
                        </div>
                      ) : (
                        <ul className="flex flex-col gap-5">
                          <AnimatePresence initial={false}>
                            {items.map((item) => (
                              <motion.li
                                key={item.product.id}
                                layout
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex gap-4 overflow-hidden"
                              >
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-2">
                                  <Image
                                    src={item.image}
                                    alt={item.product.name}
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                    unoptimized={isExternalImage(item.image)}
                                  />
                                </div>

                                <div className="flex flex-1 flex-col gap-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm font-medium">
                                      {item.product.name}
                                    </p>
                                    <button
                                      onClick={() => removeItem(item.product.id)}
                                      aria-label="Eliminar del carrito"
                                      className="text-muted-foreground transition-colors hover:text-red-400"
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  </div>
                                  <p className="text-sm text-accent">
                                    {formatPrice(item.product.price)}
                                  </p>

                                  <div className="mt-1 flex w-fit items-center gap-3 rounded-full border border-surface-border px-2 py-1">
                                    <button
                                      aria-label="Disminuir cantidad"
                                      onClick={() =>
                                        updateQuantity(
                                          item.product.id,
                                          item.quantity - 1,
                                        )
                                      }
                                      className="flex h-5 w-5 items-center justify-center text-muted-foreground hover:text-accent"
                                    >
                                      <Minus size={12} />
                                    </button>
                                    <span className="min-w-[1ch] text-center text-xs">
                                      {item.quantity}
                                    </span>
                                    <button
                                      aria-label="Aumentar cantidad"
                                      onClick={() =>
                                        updateQuantity(
                                          item.product.id,
                                          item.quantity + 1,
                                        )
                                      }
                                      className="flex h-5 w-5 items-center justify-center text-muted-foreground hover:text-accent"
                                    >
                                      <Plus size={12} />
                                    </button>
                                  </div>
                                </div>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </ul>
                      )}
                    </div>

                    {items.length > 0 && (
                      <div className="border-t border-surface-border px-6 py-5">
                        <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                          Método de pago
                        </p>
                        <div className="mb-4 flex flex-wrap gap-2">
                          {PAYMENT_OPTIONS.map(({ id, label, Icon }) => (
                            <button
                              key={id}
                              type="button"
                              aria-label={label}
                              aria-pressed={selectedPayment === id}
                              onClick={() => setSelectedPayment(id)}
                              className={`rounded-md ring-offset-2 ring-offset-surface transition-all ${
                                selectedPayment === id
                                  ? "ring-2 ring-accent"
                                  : "opacity-60 hover:opacity-100"
                              }`}
                            >
                              <Icon className="h-7 w-11 rounded-md" />
                            </button>
                          ))}
                        </div>

                        <div className="mb-4 flex items-center justify-between text-base">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="font-medium text-foreground">
                            {formatPrice(subtotal)}
                          </span>
                        </div>
                        <Button className="w-full" onClick={handleCheckout}>
                          Finalizar compra
                        </Button>
                        <p className="mt-3 text-center text-xs text-muted-foreground">
                          Coordinamos el pago y la entrega contigo directamente.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
