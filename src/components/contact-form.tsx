"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormErrors {
  name?: string;
  contact?: string;
  message?: string;
}

/**
 * Formulario de contacto con validación en cliente.
 *
 * Nota: por ahora el envío queda simulado (no hay backend/proveedor de
 * correo conectado). Para conectarlo de verdad, la forma más rápida es
 * un servicio como Formspree o Resend: reemplaza handleSubmit por un
 * fetch a su endpoint. Ver README.md, sección "Conectar el formulario".
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (name.trim().length < 2) {
      newErrors.name = "Ingresa tu nombre completo.";
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());
    const isPhone = /^[+()\d\s-]{7,}$/.test(contact.trim());
    if (!isEmail && !isPhone) {
      newErrors.contact = "Ingresa un correo o teléfono válido.";
    }

    if (message.trim().length < 10) {
      newErrors.message = "Cuéntanos un poco más (mínimo 10 caracteres).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    // TODO: conectar a un servicio real de envío (Formspree, Resend, etc.)
    setStatus("sent");
    setName("");
    setContact("");
    setMessage("");
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass flex flex-col items-center gap-3 rounded-2xl p-10 text-center"
      >
        <CheckCircle2 className="text-accent" size={36} />
        <p className="text-lg font-medium">¡Gracias por escribirnos!</p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Recibimos tu mensaje y te contactaremos pronto.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")} className="mt-2">
          Enviar otro mensaje
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass rounded-2xl p-8">
      <div className="mb-5">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          placeholder="Tu nombre completo"
          aria-invalid={Boolean(errors.name)}
        />
        <AnimatePresence>
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </AnimatePresence>
      </div>

      <div className="mb-5">
        <Label htmlFor="contact">Correo o teléfono</Label>
        <Input
          id="contact"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
            setErrors((prev) => ({ ...prev, contact: undefined }));
          }}
          placeholder="tucorreo@ejemplo.com o (809) 000-0000"
          aria-invalid={Boolean(errors.contact)}
        />
        <AnimatePresence>
          {errors.contact && <ErrorText>{errors.contact}</ErrorText>}
        </AnimatePresence>
      </div>

      <div className="mb-6">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          placeholder="Cuéntanos qué joya tienes en mente..."
          aria-invalid={Boolean(errors.message)}
        />
        <AnimatePresence>
          {errors.message && <ErrorText>{errors.message}</ErrorText>}
        </AnimatePresence>
      </div>

      <Button type="submit" className="w-full">
        Enviar mensaje
      </Button>
    </form>
  );
}

function ErrorText({ children }: { children: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-1.5 text-xs text-red-400"
    >
      {children}
    </motion.p>
  );
}
