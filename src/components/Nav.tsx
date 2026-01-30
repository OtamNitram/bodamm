import { useState } from "react";
import logoM from "../assets/images/logo-m.svg";
import logoAmpersand from "../assets/images/logo-ampersand.svg";

function Logo() {
  return (
    <div className="relative w-[86px] h-[23px]">
      <div className="absolute inset-[1.86%_54.85%_1.91%_0]">
        <img alt="M" className="block max-w-none size-full" src={logoM.src} />
      </div>
      <div className="absolute inset-[0_0_3.77%_54.85%]">
        <img alt="M" className="block max-w-none size-full" src={logoM.src} />
      </div>
      <div className="absolute flex inset-[21.74%_42.75%_-4.01%_36.28%] items-center justify-center">
        <div className="flex-none h-[17px] rotate-[352.587deg] w-[16px]">
          <img
            alt="&"
            className="block max-w-none size-full"
            src={logoAmpersand.src}
          />
        </div>
      </div>
    </div>
  );
}

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Detalles", href: "#detalles" },
    { label: "Gift List", href: "#gift-list" },
    { label: "Fotos y Temaikenes", href: "#fotos" },
    { label: "Asistencia", href: "#asistencia" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-brand-burgundy text-brand-linen shadow-lg z-50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo - left edge */}
          <a href="#hero" className="flex-shrink-0">
            <Logo />
          </a>

          {/* Date - fills space, left aligned */}
          <p className="flex-grow text-left text-[12px] ml-4">
            25 de Abril de 2026
          </p>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-[18px] underline">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-brand-linen/80 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - right edge */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-brand-darkGreen transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-brand-linen"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-4 bg-brand-burgundy">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block min-h-[48px] flex items-center py-3 text-brand-linen hover:text-brand-linen/80 transition-colors underline"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
