import { lazy, Suspense } from "react";
import { ArrowRight } from "./Icons";
import { site } from "../data/site";

const ParticleField = lazy(() =>
  import("./ParticleField").then((module) => ({ default: module.ParticleField })),
);

type HeroSectionProps = {
  onNavigate: (href: string) => void;
};

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section id="home" className="hero section-anchor">
      <div className="hero-visual">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
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
          <button className="button button-primary" type="button" onClick={() => onNavigate("#projects")}>
            View projects
            <ArrowRight />
          </button>
          <button className="button button-secondary" type="button" onClick={() => onNavigate("#about")}>
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
  );
}
