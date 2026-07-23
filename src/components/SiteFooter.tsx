import { AsteriskMark } from "./Icons";
import { site } from "../data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer page-width">
      <div className="brand footer-brand">
        <AsteriskMark className="brand-mark" />
        <span>{site.brand}</span>
      </div>
      <p>
        © {new Date().getFullYear()} {site.fullName}
      </p>
      <div className="footer-links">
        <a href={site.githubUrl} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={site.linkedInUrl} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={site.twitterUrl} target="_blank" rel="noreferrer">
          Twitter
        </a>
        <a href={`mailto:${site.email}`}>Email</a>
        <a href={site.portfolioUrl}>Portfolio</a>
      </div>
    </footer>
  );
}
