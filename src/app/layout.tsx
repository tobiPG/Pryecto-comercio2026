import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/providers/theme-provider";
import { CartProvider } from "@/components/providers/cart-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { MotionConfigProvider } from "@/components/providers/motion-config-provider";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";

// Par tipográfico "Luxury Serif": Cormorant para títulos, Montserrat para cuerpo
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = "https://lueurjewelry.do"; // REEMPLAZAR con el dominio final

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lueur Jewelry — Alta joyería en Santo Domingo",
    template: "%s · Lueur Jewelry",
  },
  description:
    "Joyería fina en oro 18k y plata 925, hecha con atención personalizada por un negocio familiar dominicano desde 2018. Anillos, cadenas, collares, pulseras y piezas a medida.",
  keywords: [
    "joyería Santo Domingo",
    "joyería República Dominicana",
    "oro 18k",
    "plata 925",
    "anillos de compromiso",
    "joyería en línea RD",
  ],
  openGraph: {
    title: "Lueur Jewelry — Alta joyería en Santo Domingo",
    description:
      "Joyería fina en oro 18k y plata 925, hecha a mano por un negocio familiar dominicano desde 2018.",
    url: SITE_URL,
    siteName: "Lueur Jewelry",
    locale: "es_DO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lueur Jewelry — Alta joyería en Santo Domingo",
    description:
      "Joyería fina en oro 18k y plata 925, hecha a mano en Santo Domingo desde 2018.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Evita el parpadeo de tema al cargar (aplica dark/light antes de hidratar) */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <ThemeProvider>
          <MotionConfigProvider>
            <CartProvider>
              <SmoothScrollProvider>
                <Header />
                <CartDrawer />
                <main className="flex-1">{children}</main>
                <Footer />
              </SmoothScrollProvider>
            </CartProvider>
          </MotionConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
