import { products } from "@/lib/products";
import { getImageForProduct } from "@/lib/product-images";
import { CollectionGrid } from "@/components/collection-grid";
import { Reveal } from "@/components/reveal";

/**
 * Sección de colección. Es un Server Component: resuelve la imagen de
 * cada producto (foto real u obtenida automáticamente, o fallback) en
 * el servidor antes de enviar el HTML, así el cliente solo recibe URLs
 * listas para mostrar.
 */
export async function Collection() {
  const productsWithImages = await Promise.all(
    products.map(async (product) => ({
      product,
      image: await getImageForProduct(product.id, product.imageKeyword),
    })),
  );

  return (
    <section id="coleccion" className="mx-auto max-w-7xl px-6 py-28 md:px-10">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.2em] text-accent">
          Catálogo
        </span>
        <h2 className="mt-3 max-w-xl text-4xl font-medium tracking-tight sm:text-5xl">
          Nuestra colección
        </h2>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Cada pieza está hecha con oro 18k o plata 925, seleccionada con el
          mismo cuidado que ponemos en atender a cada cliente.
        </p>
      </Reveal>

      <div className="mt-14">
        <CollectionGrid productsWithImages={productsWithImages} />
      </div>
    </section>
  );
}
