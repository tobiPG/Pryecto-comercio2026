import { CheckCircle2, Clock, MapPin, Phone, Smartphone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import {
  AmexIcon,
  ApplePayIcon,
  GooglePayIcon,
  MastercardIcon,
  PayPalIcon,
  VisaIcon,
} from "@/components/payment-icons";

const CARD_PAYMENT_METHODS = [
  {
    title: "Tarjetas de crédito",
    detail: "Visa, Mastercard y American Express",
    badges: [VisaIcon, MastercardIcon, AmexIcon],
  },
  {
    title: "Tarjetas de débito",
    detail: "Visa y Mastercard",
    badges: [VisaIcon, MastercardIcon],
  },
  {
    title: "Apple Pay",
    detail: "Paga desde tu iPhone o Apple Watch",
    badges: [ApplePayIcon],
  },
  {
    title: "Google Pay",
    detail: "Paga desde tu cuenta de Google",
    badges: [GooglePayIcon],
  },
  {
    title: "PayPal",
    detail: "Sin compartir los datos de tu tarjeta",
    badges: [PayPalIcon],
  },
];

export function Contact() {
  return (
    <section id="contacto" className="mesh-gradient relative overflow-hidden px-6 py-28 md:px-10">
      <div className="relative z-[1] mx-auto max-w-7xl">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-accent">
            Contacto
          </span>
          <h2 className="mt-3 max-w-xl text-4xl font-medium tracking-tight sm:text-5xl">
            Hablemos de tu próxima joya
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Escríbenos, visítanos o pide tu pieza personalizada. Respondemos
            siempre nosotros mismos.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="flex flex-col gap-10 lg:col-span-2">
            <Reveal delay={0.05}>
              <ul className="flex flex-col gap-5 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 shrink-0 text-accent" size={18} />
                  <span className="text-muted-foreground">
                    Av. Winston Churchill esq. Gustavo Mejía Ricart, Plaza
                    Acrópolis, Local 204, Piantini, Santo Domingo 10148
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 shrink-0 text-accent" size={18} />
                  <span className="text-muted-foreground">
                    +1 (809) 555-0147 (WhatsApp)
                  </span>
                </li>
                <li className="flex gap-3">
                  <Smartphone className="mt-0.5 shrink-0 text-accent" size={18} />
                  <span className="text-muted-foreground">hola@lueurjewelry.do</span>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 shrink-0 text-accent" size={18} />
                  <span className="text-muted-foreground">
                    Lunes a sábado, 9:00 a.m. – 6:00 p.m.
                  </span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <h3 className="mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                Métodos de pago
              </h3>

              {/* Nota: solo se muestran a modo informativo, no procesan pagos reales */}
              <div className="flex flex-col gap-3">
                {CARD_PAYMENT_METHODS.map((method) => (
                  <div
                    key={method.title}
                    className="glass flex items-center gap-3 rounded-xl p-3.5"
                  >
                    <div className="flex shrink-0 -space-x-2">
                      {method.badges.map((Badge, i) => (
                        <Badge key={i} className="h-7 w-11 rounded-md shadow-sm" />
                      ))}
                    </div>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 text-sm font-medium">
                        {method.title}
                        <CheckCircle2 size={13} className="shrink-0 text-accent" />
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {method.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
