import { ArrowUpRight } from "./Icons";
import { resumeEntries, resumeIntro } from "../data/resume";
import { site } from "../data/site";

export function ResumeSection() {
  return (
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
  );
}
