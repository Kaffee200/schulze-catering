"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { catalog } from "@/data/catalog";
import { nav } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLLIElement>(null);

  // Menüs bei Seitenwechsel schließen
  useEffect(() => {
    setMobileOpen(false);
    setPickerOpen(false);
  }, [pathname]);

  // Auswahlmenü per Escape oder Klick daneben schließen
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setPickerOpen(false);
        setMobileOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setPickerOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Schulze Catering – zur Startseite">
          <Logo />
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={mobileOpen}
          aria-controls="main-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">Menü</span>
          <span className="menu-bars" aria-hidden="true" data-open={mobileOpen} />
        </button>

        <nav id="main-nav" aria-label="Hauptmenü" className="main-nav" data-open={mobileOpen}>
          <ul>
            {nav.map((item) => {
              if (item.href !== "/anfrage") {
                return (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={item.href} className="has-picker" ref={pickerRef}>
                  <div className="picker-row">
                    <Link href="/anfrage" aria-current={isActive("/anfrage") ? "page" : undefined}>
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      className="picker-toggle"
                      aria-expanded={pickerOpen}
                      aria-controls="katalog-menu"
                      onClick={() => setPickerOpen((v) => !v)}
                    >
                      <span className="sr-only">Katalogauswahl öffnen</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                        <path d="M3 5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.800" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <div id="katalog-menu" className="picker-panel" hidden={!pickerOpen}>
                    <p className="picker-title">Aus dem Katalog anfragen</p>
                    <ul className="picker-list">
                      {catalog.map((cat) => (
                        <li key={cat.slug}>
                          <Link href={`/anfrage?kategorie=${cat.slug}#auswahl`}>
                            <span>{cat.title}</span>
                            <span className="picker-count">{cat.items.length}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link className="picker-all" href="/anfrage#auswahl">
                      Zur kompletten Auswahl
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
          <Link href="/anfrage" className="btn btn-small nav-cta">
            Jetzt anfragen
          </Link>
        </nav>
      </div>
    </header>
  );
}
