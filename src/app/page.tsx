import { Hero } from "@/components/hero";
import { Collection } from "@/components/collection";
import { About } from "@/components/about";
import { Values } from "@/components/values";
import { Contact } from "@/components/contact";
import { getBestsellerProduct } from "@/lib/products";
import { getImageForProduct } from "@/lib/product-images";

export default async function Home() {
  const bestsellerProduct = getBestsellerProduct();
  const bestsellerImage = await getImageForProduct(
    bestsellerProduct.id,
    bestsellerProduct.imageKeyword,
  );

  return (
    <>
      <Hero bestseller={{ product: bestsellerProduct, image: bestsellerImage }} />
      <Collection />
      <About />
      <Values />
      <Contact />
    </>
  );
}
