import {
  sanitizeUrl,
  type ExperienceItem,
  type MetricItem,
  type ProfileData,
  type ResearchItem,
} from '@/data/profile';
import { CopyEmailButton } from './copy-email-button';
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons';

export function HeroSection({ profile }: { readonly profile: ProfileData }) {
  const githubUrl = sanitizeUrl(profile.links.github);
  const linkedinUrl = sanitizeUrl(profile.links.linkedin);
  const mailHref = sanitizeUrl(`mailto:${profile.email}`);

  return (
    <section id="hero-root" className="section hero-section" aria-label="Introduction">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            <span>{profile.location}</span>
          </p>
          <h1 className="hero-title">{profile.name}</h1>
          <p className="hero-headline">{profile.headline}</p>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Selected systems
            </a>
            <a
              className="button button-secondary"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              <span>GitHub</span>
              <ArrowUpRightIcon />
            </a>
            <a
              className="button button-secondary"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
              <ArrowUpRightIcon />
            </a>
            <a className="button button-ghost" href={mailHref}>
              <MailIcon />
              <span>Email</span>
            </a>
          </div>
        </div>
        <aside className="hero-panel" aria-label="Current focus">
          <p className="panel-label">Focus areas</p>
          <dl className="focus-list">
            <div className="focus-item">
              <dt>Production AI</dt>
              <dd>Google ADK agents, Vertex AI, BigQuery pipelines, and FAISS semantic search.</dd>
            </div>
            <div className="focus-item">
              <dt>Systems &amp; Web</dt>
              <dd>
                Next.js, PostgreSQL, HTTP/2 proxy tuning, Java plugins, and telemetry spooling.
              </dd>
            </div>
            <div className="focus-item">
              <dt>MSc Research</dt>
              <dd>In-context learning with Tabular Foundation Models for algorithm selection.</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

export function MetricsSection({ metrics }: { readonly metrics: readonly MetricItem[] }) {
  return (
    <section id="metrics-root" className="section metrics-section" aria-label="Key metrics">
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="metric-card">
            <p className="metric-value">{metric.value}</p>
            <p className="metric-label">{metric.label}</p>
            <p className="metric-detail">{metric.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ResearchSection({ research }: { readonly research: readonly ResearchItem[] }) {
  return (
    <section id="research" className="section" aria-labelledby="research-heading">
      <div className="section-header">
        <div>
          <h2 id="research-heading" className="section-title">
            Research and publications
          </h2>
          <p className="section-subtitle">MSc research and peer-reviewed publications in 2026.</p>
        </div>
      </div>
      <div id="research-root">
        <div className="research-grid">
          {research.map((item) => (
            <article key={item.id} className="card research-card">
              <div className="card-meta">
                <span className="badge badge-accent">{item.venue}</span>
                <span className="meta-text">{`${item.status} · ${item.year}`}</span>
              </div>
              <h3 className="card-title">{item.title}</h3>
              <p className="research-area">{`${item.type} · ${item.area}`}</p>
              <p className="card-summary">{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection({
  experience,
}: {
  readonly experience: readonly ExperienceItem[];
}) {
  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="section-header">
        <div>
          <h2 id="experience-heading" className="section-title">
            Experience
          </h2>
          <p className="section-subtitle">
            Industry engineering across AI platforms, QA automation, and RPA.
          </p>
        </div>
      </div>
      <div id="experience-root">
        <div className="timeline">
          {experience.map((role) => {
            const meta = role.location ? `${role.period} · ${role.location}` : role.period;
            return (
              <article key={role.id} className="timeline-item">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{role.role}</h3>
                    <p className="timeline-company">{role.company}</p>
                  </div>
                  <p className="timeline-period">{meta}</p>
                </div>
                <ul className="timeline-list">
                  {role.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CredentialsSection({ profile }: { readonly profile: ProfileData }) {
  return (
    <section id="credentials" className="section" aria-labelledby="credentials-heading">
      <div className="section-header">
        <div>
          <h2 id="credentials-heading" className="section-title">
            Education and credentials
          </h2>
          <p className="section-subtitle">
            Academic degrees, technical stack, languages, honors, and certifications.
          </p>
        </div>
      </div>
      <div id="credentials-root">
        <div className="credentials-grid">
          <section className="card credential-card" aria-labelledby="stack-heading">
            <h3 id="stack-heading" className="card-title">
              Technical stack
            </h3>
            <div className="stack-groups">
              {profile.stack.map((group) => (
                <div key={group.label} className="stack-group">
                  <h4 className="stack-label">{group.label}</h4>
                  <ul className="tag-list">
                    {group.items.map((item) => (
                      <li key={item} className="tag">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          <div className="credentials-column">
            <section className="card credential-card" aria-labelledby="education-heading">
              <h3 id="education-heading" className="card-title">
                Education
              </h3>
              <ul className="credential-list">
                {profile.education.map((edu) => (
                  <li key={`${edu.degree}-${edu.period}`} className="credential-row">
                    <div>
                      <p className="credential-primary">{edu.degree}</p>
                      <p className="credential-secondary">{edu.institution}</p>
                    </div>
                    <span className="credential-period">{edu.period}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="card credential-card" aria-labelledby="languages-honors-heading">
              <h3 id="languages-honors-heading" className="card-title">
                Languages and honors
              </h3>
              <ul className="credential-list">
                {profile.languages.map((lang) => (
                  <li key={lang.name} className="credential-row">
                    <span className="credential-primary">{lang.name}</span>
                    <span className="credential-secondary">{lang.level}</span>
                  </li>
                ))}
              </ul>
              <h4 className="sub-heading">Honors</h4>
              <ul className="plain-list">
                {profile.honors.map((honor) => (
                  <li key={honor} className="plain-item">
                    {honor}
                  </li>
                ))}
              </ul>
            </section>
            <section className="card credential-card" aria-labelledby="certifications-heading">
              <h3 id="certifications-heading" className="card-title">
                Certifications
              </h3>
              <ul className="plain-list">
                {profile.certifications.map((cert) => (
                  <li key={cert} className="plain-item">
                    {cert}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ profile }: { readonly profile: ProfileData }) {
  const mailHref = sanitizeUrl(`mailto:${profile.email}`);
  const githubUrl = sanitizeUrl(profile.links.github);
  const linkedinUrl = sanitizeUrl(profile.links.linkedin);

  return (
    <section id="contact" className="section contact-section" aria-label="Contact">
      <div id="contact-root">
        <div className="contact-card">
          <div className="contact-copy">
            <h2 className="section-title">Contact</h2>
            <p className="contact-text">
              Open to Machine Learning Engineering, Applied AI, and Full-Stack Systems discussions.
            </p>
          </div>
          <div className="contact-actions">
            <a className="button button-primary" href={mailHref}>
              <MailIcon />
              <span>{profile.email}</span>
            </a>
            <CopyEmailButton email={profile.email} />
            <a
              className="button button-ghost"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              <span>GitHub</span>
              <ArrowUpRightIcon />
            </a>
            <a
              className="button button-ghost"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
              <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
