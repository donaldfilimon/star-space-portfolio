import { AsteriskMark } from "./Icons";
import { capabilities } from "../data/site";

export function AboutSection() {
  return (
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
  );
}
