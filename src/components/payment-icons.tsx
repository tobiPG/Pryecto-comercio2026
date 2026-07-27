// Insignias de métodos de pago. Son SVG propios (lucide-react ya no trae
// íconos de marcas) con los colores reconocibles de cada marca. Son solo
// decorativos: no representan una integración real de pago.

interface IconProps {
  className?: string;
}

export function VisaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-label="Visa" role="img">
      <rect width="48" height="32" rx="6" fill="#1A1F71" />
      <text
        x="24"
        y="21"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontWeight="700"
        fontSize="13"
        fill="#ffffff"
      >
        VISA
      </text>
    </svg>
  );
}

export function MastercardIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-label="Mastercard" role="img">
      <rect width="48" height="32" rx="6" fill="#16171a" />
      <circle cx="20" cy="16" r="9" fill="#EB001B" />
      <circle cx="28" cy="16" r="9" fill="#F79E1B" fillOpacity="0.9" />
      <path
        d="M24 9.5a9 9 0 0 1 0 13 9 9 0 0 1 0-13Z"
        fill="#FF5F00"
      />
    </svg>
  );
}

export function AmexIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-label="American Express" role="img">
      <rect width="48" height="32" rx="6" fill="#2E77BC" />
      <text
        x="24"
        y="19"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="9.5"
        fill="#ffffff"
      >
        AMEX
      </text>
    </svg>
  );
}

export function ApplePayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-label="Apple Pay" role="img">
      <rect width="48" height="32" rx="6" fill="#000000" />
      <g transform="translate(9.5, 9)" fill="#ffffff">
        <path d="M6.5 2.7c.5-.6.8-1.4.7-2.2-.7 0-1.5.5-2 1.1-.4.5-.8 1.3-.7 2.1.8.1 1.5-.4 2-1Z" />
        <path d="M7.2 3.8c-1.1-.1-2 .6-2.6.6s-1.4-.6-2.3-.6C1.1 3.9.1 4.5-.4 5.5c-1 1.8-.3 4.4.8 5.9.5.7 1.1 1.5 1.9 1.5.8 0 1-.5 1.9-.5s1.2.5 2 .5c.8 0 1.4-.7 1.9-1.5.6-.8.8-1.6.9-1.7-.1 0-1.7-.7-1.7-2.5 0-1.6 1.3-2.3 1.3-2.4-.7-1.1-1.8-1.2-2.2-1.3Z" />
      </g>
      <text
        x="27"
        y="20"
        fontFamily="-apple-system, Arial, sans-serif"
        fontWeight="600"
        fontSize="10"
        fill="#ffffff"
      >
        Pay
      </text>
    </svg>
  );
}

export function GooglePayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-label="Google Pay" role="img">
      <rect width="48" height="32" rx="6" fill="#ffffff" stroke="#e0e0e0" />
      <text x="8" y="20" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="11">
        <tspan fill="#4285F4">G</tspan>
        <tspan fill="#EA4335">o</tspan>
        <tspan fill="#FBBC05">o</tspan>
        <tspan fill="#4285F4">g</tspan>
        <tspan fill="#34A853">l</tspan>
        <tspan fill="#EA4335">e</tspan>
        <tspan fill="#5f6368"> Pay</tspan>
      </text>
    </svg>
  );
}

export function PayPalIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-label="PayPal" role="img">
      <rect width="48" height="32" rx="6" fill="#003087" />
      <text
        x="24"
        y="20"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontStyle="italic"
        fontSize="10"
      >
        <tspan fill="#009cde">Pay</tspan>
        <tspan fill="#ffffff">Pal</tspan>
      </text>
    </svg>
  );
}

export function DebitCardIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-label="Tarjeta de débito" role="img">
      <rect width="48" height="32" rx="6" fill="#3a3a3f" />
      <rect x="0" y="8" width="48" height="5" fill="#d8b676" />
      <rect x="6" y="20" width="14" height="3" rx="1.5" fill="#a3a0a0" />
    </svg>
  );
}
