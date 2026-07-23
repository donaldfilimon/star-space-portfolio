import { useEffect, useId, useRef } from "react";
import { navItems } from "../lib/navigation";
import { site } from "../data/site";
import { ArrowUpRight, AsteriskMark, GithubIcon, MailIcon, MenuIcon } from "./Icons";

type SiteHeaderProps = {
  activeSection: string;
  menuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
  onNavigate: (href: string) => void;
};

export function SiteHeader({ activeSection, menuOpen, onMenuOpenChange, onNavigate }: SiteHeaderProps) {
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onMenuOpenChange(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current || !menuButtonRef.current) return;

      const menuLinks = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a[href]"));
      const focusable = [menuButtonRef.current, ...menuLinks];
      const active = document.activeElement as HTMLElement | null;
      const activeIndex = focusable.indexOf(active as HTMLElement);

      if (event.shiftKey && activeIndex === 0) {
        event.preventDefault();
        focusable[focusable.length - 1]?.focus();
      } else if (!event.shiftKey && activeIndex === focusable.length - 1) {
        event.preventDefault();
        focusable[0]?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, onMenuOpenChange]);

  const handleNavigation = (href: string) => {
    onMenuOpenChange(false);
    onNavigate(href);
  };

  return (
    <>
      {menuOpen ? (
        <button
          type="button"
          className="menu-backdrop open"
          aria-label="Close menu"
          onClick={() => onMenuOpenChange(false)}
        />
      ) : null}

      <header className="site-header">
        <a
          className="brand"
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            handleNavigation("#home");
          }}
        >
          <AsteriskMark className="brand-mark" />
          <span>{site.brand}</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={activeSection === item.href.slice(1) ? "active" : ""}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                handleNavigation(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="icon-button"
            href={site.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Donald Filimon on GitHub"
          >
            <GithubIcon />
          </a>
          <a
            className="icon-button"
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.name}`}
          >
            <MailIcon />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => onMenuOpenChange(!menuOpen)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>

        <div
          id={menuId}
          ref={menuRef}
          className={`mobile-menu ${menuOpen ? "open" : ""}`}
          aria-hidden={!menuOpen}
          inert={menuOpen ? undefined : true}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                handleNavigation(item.href);
              }}
            >
              <span>{item.label}</span>
              <ArrowUpRight />
            </a>
          ))}
          <div className="mobile-menu-utilities">
            <a href={site.githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={site.linkedInUrl} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`}>Email</a>
          </div>
        </div>
      </header>
    </>
  );
}
