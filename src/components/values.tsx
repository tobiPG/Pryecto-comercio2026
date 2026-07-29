import { Gem, Ruler, Truck, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { GlowCard } from "@/components/ui/spotlight-card";

const VALUES = [
  {
    icon: Gem,
    title: "Materiales certificados",
    description: "Trabajamos únicamente con oro 18k y plata 925 de origen verificado.",
  },
  {
    icon: Ruler,
    title: "Diseño a medida",
    description: "Creamos piezas personalizadas adaptadas a tu historia y presupuesto.",
  },
  {
    icon: Truck,
    title: "Envío a todo el país",
    description: "Hacemos llegar tu joya a cualquier provincia de República Dominicana.",
  },
  {
    icon: Users,
    title: "Atención personalizada",
    description: "Un equipo pequeño y cercano que te acompaña antes y después de comprar.",
  },
];

export function Values() {
  return (
    <section className="mesh-gradient relative overflow-hidden px-6 py-28 md:px-10">
      <div className="relative z-[1] mx-auto max-w-7xl">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-accent">
            Nuestros valores
          </span>
          <h2 className="mt-3 max-w-xl text-4xl font-medium tracking-tight sm:text-5xl">
            Lo que nos hace Lueur
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.1}>
              <GlowCard
                glowColor="orange"
                customSize
                className="group h-full w-full transition-transform duration-500 hover:-translate-y-1.5"
              >
                <value.icon
                  className="mb-5 text-accent transition-transform duration-500 group-hover:scale-110"
                  size={28}
                  strokeWidth={1.5}
                />
                <h3 className="mb-2 text-lg font-medium">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
