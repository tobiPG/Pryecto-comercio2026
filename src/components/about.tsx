import Image from "next/image";
import { WORKSHOP_IMAGE, isExternalImage } from "@/lib/product-images";
import { Reveal } from "@/components/reveal";

export function About() {
  const image = WORKSHOP_IMAGE;

  return (
    <section id="la-casa" className="mx-auto max-w-7xl px-6 py-28 md:px-10">
      <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-20">
        <Reveal className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
          <Image
            src={image}
            alt="Taller familiar de Lueur Jewelry"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxNDE0MTYiLz48L3N2Zz4="
            unoptimized={isExternalImage(image)}
          />
        </Reveal>

        <Reveal delay={0.15}>
          <span className="text-xs uppercase tracking-[0.2em] text-accent">
            La Casa
          </span>
          <h2 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
            Una historia de familia
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Lueur Jewelry nació en 2018 en Santo Domingo, de la mano de una
              familia dominicana que decidió convertir su pasión por la
              joyería fina en un negocio propio. Desde el primer mostrador,
              la meta fue simple: que cada cliente se sintiera acompañado,
              no solo atendido.
            </p>
            <p>
              Hoy seguimos siendo un negocio familiar y pequeño a propósito.
              Elegimos cada pieza, en oro 18k y plata 925, pensando en que
              dure generaciones — igual que la confianza que hemos construido
              con quienes nos visitan.
            </p>
            <p>
              Dar el salto a la venta en línea es, para nosotros, una forma
              de llevar esa misma cercanía a más hogares dominicanos, sin
              perder el trato personal que nos define.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
