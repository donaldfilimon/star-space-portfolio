import { useState } from "react";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { HeroSection } from "./components/HeroSection";
import { ProjectGrid } from "./components/ProjectGrid";
import { ResumeSection } from "./components/ResumeSection";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { useActiveSection } from "./hooks/useActiveSection";
import { scrollToHash } from "./lib/navigation";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();

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
        <HeroSection onNavigate={handleNavigation} />
        <AboutSection />
        <ProjectGrid onNavigate={handleNavigation} />
        <ResumeSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
