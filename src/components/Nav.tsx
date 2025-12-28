import { useState } from "react";

function Logo() {
  return (
    <div className="relative w-[86px] h-[23px]">
      <div className="absolute inset-[1.86%_54.85%_1.91%_0]">
        <img
          alt="M"
          className="block max-w-none size-full"
          src="https://www.figma.com/api/mcp/asset/7ec5e325-a4d6-4fef-ac48-4b7d56963909"
        />
      </div>
      <div className="absolute inset-[0_0_3.77%_54.85%]">
        <img
          alt="M"
          className="block max-w-none size-full"
          src="https://www.figma.com/api/mcp/asset/7ec5e325-a4d6-4fef-ac48-4b7d56963909"
        />
      </div>
      <div className="absolute flex inset-[21.74%_42.75%_-4.01%_36.28%] items-center justify-center">
        <div className="flex-none h-[17px] rotate-[352.587deg] w-[16px]">
          <img
            alt="&"
            className="block max-w-none size-full"
            src="https://www.figma.com/api/mcp/asset/f5571613-aa23-4f81-8b4c-71df8624e329"
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
      <div className="max-w-[1200px] mx-auto px-12 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Date */}
          <div className="flex items-center gap-8">
            <a href="#hero">
              <Logo />
            </a>
            <p className="text-[12px]">25 de Abril de 2026</p>
          </div>

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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-brand-darkGreen transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
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
          <div className="md:hidden pb-4 pt-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 hover:text-brand-linen/80 transition-colors underline"
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
