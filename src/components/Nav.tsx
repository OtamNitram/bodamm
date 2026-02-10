import { useState, useEffect } from "react";
import logoM from "../assets/images/logo-m.svg";
import logoAmpersand from "../assets/images/logo-ampersand.svg";

const maskStyle = (src: string): React.CSSProperties => ({
  maskImage: `url(${src})`,
  WebkitMaskImage: `url(${src})`,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  backgroundColor: "currentColor",
});

function Logo() {
  return (
    <div className="relative w-[86px] h-[23px]">
      <div className="absolute inset-[1.86%_54.85%_1.91%_0]">
        <div
          aria-hidden="true"
          className="block size-full"
          style={maskStyle(logoM.src)}
        />
      </div>
      <div className="absolute inset-[0_0_3.77%_54.85%]">
        <div
          aria-hidden="true"
          className="block size-full"
          style={maskStyle(logoM.src)}
        />
      </div>
      <div className="absolute flex inset-[21.74%_42.75%_-4.01%_36.28%] items-center justify-center">
        <div className="flex-none h-[17px] rotate-[352.587deg] w-[16px]">
          <div
            aria-hidden="true"
            className="block size-full"
            style={maskStyle(logoAmpersand.src)}
          />
        </div>
      </div>
    </div>
  );
}

const SCROLL_THRESHOLD = 50;

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Detalles", href: "#detalles" },
    { label: "Asistencia", href: "#asistencia" },
    { label: "Traslado", href: "#traslado" },
    { label: "Gift List", href: "#gift-list" },
    { label: "Temaikenes", href: "#temaikenes" },
    { label: "Fotos", href: "#fotos" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 shadow-lg z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-brand-linen text-brand-burgundy"
          : "bg-brand-burgundy text-brand-linen"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 lg:px-12 py-6">
        <div className="flex items-center justify-between">
          {/* Logo - left edge */}
          <a href="#hero" className="flex-shrink-0">
            <Logo />
          </a>

          {/* Date - with gap-[30px] from logo per Figma */}
          <p className="flex-grow text-left text-[12px] ml-[30px]">
            25 de Abril de 2026
          </p>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-8 text-[18px] underline">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  isScrolled
                    ? "hover:text-brand-burgundy/60"
                    : "hover:text-brand-linen/80"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - right edge */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors flex-shrink-0 ${
              isScrolled
                ? "hover:bg-brand-burgundy/10"
                : "hover:bg-brand-darkGreen"
            }`}
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 ${
                isScrolled ? "text-brand-burgundy" : "text-brand-linen"
              }`}
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
      </div>

      {/* Mobile Navigation - always linen bg with burgundy text per Figma */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-center justify-center gap-10 bg-brand-linen text-brand-burgundy py-6 text-[16px] underline overflow-clip">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-brand-burgundy/60 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
