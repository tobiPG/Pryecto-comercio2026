// lucide-react ya no incluye íconos de marcas; usamos SVGs propios y livianos
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M14 9h2.5V6H14c-2 0-3.5 1.5-3.5 3.5V12H8v3h2.5v6h3v-6h2.5l.5-3h-3V9.8c0-.5.2-.8.8-.8Z" />
    </svg>
  );
}

const LINKS = [
  { href: "#coleccion", label: "Colección" },
  { href: "#la-casa", label: "La Casa" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 md:flex-row md:items-start md:justify-between md:px-10">
        <div className="max-w-xs">
          <p className="font-heading text-2xl tracking-[0.15em]">LUEUR</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Alta joyería y accesorios finos, hechos a mano en Santo Domingo
            desde 2018.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">
              Navegación
            </p>
            <ul className="flex flex-col gap-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">
              Síguenos
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram de Lueur Jewelry"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border transition-colors hover:border-accent hover:text-accent"
              >
                <InstagramIcon width={17} height={17} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook de Lueur Jewelry"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border transition-colors hover:border-accent hover:text-accent"
              >
                <FacebookIcon width={17} height={17} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-surface-border px-6 py-6 text-center text-xs text-muted-foreground md:px-10">
        © {year} Lueur Jewelry, S.R.L. Todos los derechos reservados.
      </div>
    </footer>
  );
}
