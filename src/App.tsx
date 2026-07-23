import { useEffect, useId, useRef, useState } from "react";
import { ParticleField } from "./components/ParticleField";
import {
  ArrowRight,
  ArrowUpRight,
  AsteriskMark,
  GithubIcon,
  MailIcon,
  MenuIcon,
} from "./components/Icons";
import { projects } from "./data/projects";
import { resumeEntries, resumeIntro } from "./data/resume";
import { capabilities, site } from "./data/site";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

function scrollToHash(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0.1, 0.3, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;

      const focusable = menuRef.current.querySelectorAll<HTMLElement>("a[href]");
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const handleNavigation = (href: string) => {
    setMenuOpen(false);
    scrollToHash(href);
  };

  return (
    <div className="site-shell">
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
            onClick={() => setMenuOpen((current) => !current)}
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
        </div>
      </header>

      <main>
        <section id="home" className="hero section-anchor">
          <div className="hero-visual">
            <ParticleField />
          </div>

          <div className="hero-content page-width">
            <p className="hero-brand reveal-up">{site.brand}</p>
            <p className="hero-intro reveal-up reveal-delay-1">Hello, I’m</p>
            <h1 className="reveal-up reveal-delay-2">
              DONALD <span>FILIMON</span>
            </h1>
            <p className="hero-role reveal-up reveal-delay-3">{site.role}</p>
            <p className="hero-copy reveal-up reveal-delay-4">{site.tagline}</p>
            <div className="hero-actions reveal-up reveal-delay-5">
              <button className="button button-primary" type="button" onClick={() => handleNavigation("#projects")}>
                View projects
                <ArrowRight />
              </button>
              <button className="button button-secondary" type="button" onClick={() => handleNavigation("#about")}>
                About me
                <ArrowRight />
              </button>
            </div>
          </div>

          <div className="hero-index" aria-hidden="true">
            <span>01</span>
            <div />
            <span>05</span>
          </div>
        </section>

        <section id="about" className="about section-anchor page-width">
          <div className="section-heading reveal-section">
            <p>WHAT I DO</p>
            <h2>
              Engineering depth.
              <br />
              Product instinct.
            </h2>
          </div>

          <div className="capability-list">
            {capabilities.map((capability) => (
              <article className="capability" key={capability.code}>
                <span className="capability-code">{capability.code}</span>
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>
                </div>
                <AsteriskMark className="capability-mark" />
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="projects section-anchor">
          <div className="page-width">
            <div className="section-heading split-heading reveal-section">
              <div>
                <p>SELECTED WORK</p>
                <h2>Systems built to last.</h2>
              </div>
              <p className="section-copy">
                Ambitious technical work spanning personal AI, distributed memory, Swift frameworks,
                and real-time creative experiences.
              </p>
            </div>

            <div className="project-grid">
              {projects.map((project, index) => {
                const destination = project.href ?? project.repoUrl;
                return (
                  <article className={`project-card accent-${project.accent}`} key={project.name}>
                    <div className="project-number">0{index + 1}</div>
                    <div className="project-orbit" aria-hidden="true">
                      <AsteriskMark />
                    </div>
                    <div className="project-content">
                      <p>
                        {project.eyebrow}
                        <span className="project-year"> · {project.year}</span>
                      </p>
                      <h3>{project.name}</h3>
                      <p className="project-description">{project.description}</p>
                      <p className="project-outcome">{project.outcome}</p>
                      <div className="tag-row">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    {destination ? (
                      <a
                        className="project-link"
                        href={destination}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.name}`}
                      >
                        <ArrowUpRight />
                      </a>
                    ) : (
                      <a
                        className="project-link"
                        href="#contact"
                        aria-label={`Ask about ${project.name}`}
                        onClick={(event) => {
                          event.preventDefault();
                          handleNavigation("#contact");
                        }}
                      >
                        <ArrowUpRight />
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="resume" className="resume section-anchor page-width">
          <div className="resume-intro reveal-section">
            <p>RESUME / EXPERIENCE</p>
            <h2>
              Low-level rigor.
              <br />
              High-level vision.
            </h2>
            <p>{resumeIntro}</p>
          </div>

          <div className="timeline">
            {resumeEntries.map((entry) => (
              <article key={entry.title}>
                <span>{entry.label}</span>
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.summary}</p>
                  <ul className="resume-bullets">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact section-anchor">
          <div className="contact-glow" aria-hidden="true" />
          <div className="page-width contact-inner reveal-section">
            <AsteriskMark className="contact-mark" />
            <p>LET’S BUILD SOMETHING THAT MATTERS</p>
            <h2>Have an impossible idea?</h2>
            <p className="contact-copy">Good. Those are usually the interesting ones.</p>
            <a className="button button-primary" href={`mailto:${site.email}`}>
              Start a conversation
              <ArrowUpRight />
            </a>
            <small>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              {" · "}
              <a href={site.githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </small>
          </div>
        </section>
      </main>

      <footer className="site-footer page-width">
        <div className="brand footer-brand">
          <AsteriskMark className="brand-mark" />
          <span>{site.brand}</span>
        </div>
        <p>© {new Date().getFullYear()} {site.fullName}</p>
        <div className="footer-links">
          <a href={site.githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={site.websiteUrl} target="_blank" rel="noreferrer">
            Web
          </a>
        </div>
      </footer>
    </div>
  );
}
