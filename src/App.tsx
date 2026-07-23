import { useEffect, useState } from "react";
import { ParticleField } from "./components/ParticleField";
import { SiteHeader } from "./components/SiteHeader";
import { ArrowRight, ArrowUpRight, AsteriskMark } from "./components/Icons";
import { projects } from "./data/projects";
import { resumeEntries, resumeIntro } from "./data/resume";
import { capabilities, site } from "./data/site";
import { navItems, scrollToHash } from "./lib/navigation";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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

  const handleNavigation = (href: string) => {
    scrollToHash(href);
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <SiteHeader
        activeSection={activeSection}
        menuOpen={menuOpen}
        onMenuOpenChange={setMenuOpen}
        onNavigate={handleNavigation}
      />

      <main id="main-content">
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
                        className="project-card-link"
                        href={destination}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.name}`}
                      >
                        <span className="project-link-icon" aria-hidden="true">
                          <ArrowUpRight />
                        </span>
                      </a>
                    ) : (
                      <a
                        className="project-card-link"
                        href="#contact"
                        aria-label={`Ask about ${project.name}`}
                        onClick={(event) => {
                          event.preventDefault();
                          handleNavigation("#contact");
                        }}
                      >
                        <span className="project-link-icon" aria-hidden="true">
                          <ArrowUpRight />
                        </span>
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
            {site.resumePdfUrl ? (
              <a className="button button-secondary resume-download" href={site.resumePdfUrl} target="_blank" rel="noreferrer">
                Download resume
                <ArrowUpRight />
              </a>
            ) : null}
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
