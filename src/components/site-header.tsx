"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, type Locale } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const locale: Locale = pathname === "/en" || pathname.startsWith("/en/")
    ? "en"
    : "es";
  const [menuOpen, setMenuOpen] = useState(false);
  const languagePath =
    locale === "en"
      ? pathname.replace(/^\/en(?=\/|$)/, "") || "/"
      : `/en${pathname === "/" ? "" : pathname}`;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          aria-label="FANAMI, inicio"
          className="brand"
          href={locale === "en" ? "/en" : "/"}
          onClick={() => setMenuOpen(false)}
        >
          <span aria-hidden="true" className="brand-mark">F</span>
          <span>
            FANAMI
            <small>CREATIVE STUDIO</small>
          </span>
        </Link>
        <nav
          aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}
          className={`nav-links${menuOpen ? " is-open" : ""}`}
        >
          {navigation[locale].map((item) => {
            const target = item.href;
            const current =
              pathname === target ||
              (target !== "/en" && target !== "/" && pathname.startsWith(`${target}/`));
            return (
              <Link
                key={item.href}
                aria-current={current ? "page" : undefined}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="header-actions">
          <a
            aria-label={locale === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
            className="language-switch"
            href={languagePath}
            onClick={() => setMenuOpen(false)}
          >
            {locale === "en" ? <>EN <span>/ ES</span></> : <><span>ES</span> / EN</>}
          </a>
          <Link
            className="button header-cta"
            href={locale === "es" ? "/contact" : "/en/contact"}
          >
            {locale === "es" ? "Empecemos" : "Start a project"}
          </Link>
          <button
            aria-expanded={menuOpen}
            aria-label={
              locale === "es"
                ? menuOpen ? "Cerrar menú" : "Abrir menú"
                : menuOpen ? "Close menu" : "Open menu"
            }
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
