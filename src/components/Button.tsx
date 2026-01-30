import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "default" | "secondary";
  className?: string;
}

export default function Button({
  href,
  children,
  variant = "default",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-block px-6 py-3 rounded-md font-semibold transition-colors duration-200";

  const variantStyles = {
    default: "bg-brand-darkGreen text-brand-linen hover:bg-brand-eucalyptus",
    secondary: "bg-brand-terracotta text-brand-linen hover:bg-brand-burgundy",
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === "#whatsapp-mock") {
      e.preventDefault();
      alert("Por favor contactanos por WhatsApp al: [número a confirmar]");
    } else if (href === "#telegram-mock") {
      e.preventDefault();
      alert("Por favor contactanos por Telegram: [usuario a confirmar]");
    }
  };

  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      onClick={handleClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
