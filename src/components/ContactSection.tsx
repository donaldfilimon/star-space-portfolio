import { ArrowUpRight, AsteriskMark } from "./Icons";
import { site } from "../data/site";

export function ContactSection() {
  return (
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
          {" · "}
          <a href={site.linkedInUrl} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          {" · "}
          <a href={site.twitterUrl} target="_blank" rel="noreferrer">
            Twitter
          </a>
        </small>
      </div>
    </section>
  );
}
