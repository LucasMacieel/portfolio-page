import {
  buildGmailComposeUrl,
  sanitizeUrl,
  type ExperienceItem,
  type MetricItem,
  type ProfileData,
  type ResearchItem,
} from '@/data/profile';
import { CopyEmailButton } from './copy-email-button';
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons';
import {
  BADGE_ACCENT_CLASS,
  BUTTON_CLASSES,
  CARD_CLASS,
  CARD_META_CLASS,
  CARD_SUMMARY_CLASS,
  CARD_TITLE_CLASS,
  INTERACTIVE_CARD_CLASS,
  META_TEXT_CLASS,
  SECTION_CLASS,
  SECTION_HEADER_CLASS,
  SECTION_SUBTITLE_CLASS,
  SECTION_TITLE_CLASS,
  STACK_TAG_LIST_CLASS,
  TAG_CLASS,
} from './ui-classes';

const SUB_HEADING_CLASS = 'font-mono text-xs uppercase tracking-[0.06em] text-text-muted';
const LIST_CLASS = 'grid list-disc gap-[0.45rem] pl-[1.15rem] text-[0.9375rem] text-text-muted';

export function HeroSection({ profile }: { readonly profile: ProfileData }) {
  const githubUrl = sanitizeUrl(profile.links.github);
  const linkedinUrl = sanitizeUrl(profile.links.linkedin);
  const mailHref = sanitizeUrl(buildGmailComposeUrl(profile.email));

  return (
    <section id="hero-root" className="pt-4 pb-8" aria-label="Introduction">
      <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(260px,1fr)] items-start gap-8 max-[960px]:grid-cols-1">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 font-mono text-[0.8125rem] text-text-muted">
            <span className="h-2 w-2 rounded-full bg-metric" aria-hidden="true" />
            <span>{profile.location}</span>
          </p>
          <h1 className="text-[clamp(2.15rem,4.5vw,3.25rem)] leading-[1.08] font-bold tracking-[-0.035em]">
            {profile.name}
          </h1>
          <p className="mt-3 text-[1.0625rem] leading-[1.45] font-semibold text-accent">
            {profile.headline}
          </p>
          <p className="mt-4 max-w-[64ch] text-text-muted">{profile.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className={BUTTON_CLASSES.primary} href="#work">
              Selected systems
            </a>
            <a
              className={BUTTON_CLASSES.secondary}
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              <span>GitHub</span>
              <ArrowUpRightIcon />
            </a>
            <a
              className={BUTTON_CLASSES.secondary}
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
              <ArrowUpRightIcon />
            </a>
            <a
              className={BUTTON_CLASSES.ghost}
              href={mailHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MailIcon />
              <span>Email</span>
            </a>
          </div>
        </div>
        <aside
          className="rounded-lg border border-border bg-surface p-6 shadow-sm"
          aria-label="Current focus"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
            Focus areas
          </p>
          <dl className="grid gap-4">
            <div>
              <dt className="text-[0.9375rem] font-semibold">Production AI</dt>
              <dd className="mt-[0.2rem] text-sm text-text-muted">
                Google ADK agents, Vertex AI, BigQuery pipelines, and FAISS semantic search.
              </dd>
            </div>
            <div>
              <dt className="text-[0.9375rem] font-semibold">Systems &amp; Web</dt>
              <dd className="mt-[0.2rem] text-sm text-text-muted">
                Next.js, PostgreSQL, HTTP/2 proxy tuning, Java plugins, and telemetry spooling.
              </dd>
            </div>
            <div>
              <dt className="text-[0.9375rem] font-semibold">MSc Research</dt>
              <dd className="mt-[0.2rem] text-sm text-text-muted">
                In-context learning with Tabular Foundation Models for algorithm selection.
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

export function MetricsSection({ metrics }: { readonly metrics: readonly MetricItem[] }) {
  return (
    <section id="metrics-root" className={SECTION_CLASS} aria-label="Key metrics">
      <div className="grid grid-cols-4 gap-4 max-[960px]:grid-cols-2 max-[480px]:grid-cols-1">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-md border border-border bg-surface px-6 py-4 shadow-sm"
          >
            <p className="font-mono text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] font-bold text-metric tabular-nums">
              {metric.value}
            </p>
            <p className="mt-[0.4rem] text-[0.9375rem] font-semibold">{metric.label}</p>
            <p className="mt-1 text-[0.8125rem] text-text-muted">{metric.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ResearchSection({ research }: { readonly research: readonly ResearchItem[] }) {
  return (
    <section id="research" className={SECTION_CLASS} aria-labelledby="research-heading">
      <div className={SECTION_HEADER_CLASS}>
        <div>
          <h2 id="research-heading" className={SECTION_TITLE_CLASS}>
            Research and publications
          </h2>
          <p className={SECTION_SUBTITLE_CLASS}>
            MSc research and peer-reviewed publications in 2026.
          </p>
        </div>
      </div>
      <div id="research-root">
        <div className="grid grid-cols-3 gap-4 max-[960px]:grid-cols-1">
          {research.map((item) => (
            <article key={item.id} className={INTERACTIVE_CARD_CLASS}>
              <div className={CARD_META_CLASS}>
                <span className={BADGE_ACCENT_CLASS}>{item.venue}</span>
                <span className={META_TEXT_CLASS}>{`${item.status} · ${item.year}`}</span>
              </div>
              <h3 className={CARD_TITLE_CLASS}>{item.title}</h3>
              <p className="mt-[0.35rem] font-mono text-[0.8125rem] text-metric">
                {`${item.type} · ${item.area}`}
              </p>
              <p className={CARD_SUMMARY_CLASS}>{item.summary}</p>
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
    <section id="experience" className={SECTION_CLASS} aria-labelledby="experience-heading">
      <div className={SECTION_HEADER_CLASS}>
        <div>
          <h2 id="experience-heading" className={SECTION_TITLE_CLASS}>
            Experience
          </h2>
          <p className={SECTION_SUBTITLE_CLASS}>
            Industry engineering across AI platforms, QA automation, and RPA.
          </p>
        </div>
      </div>
      <div id="experience-root">
        <div className="grid gap-4">
          {experience.map((role) => {
            const meta = role.location ? `${role.period} · ${role.location}` : role.period;
            return (
              <article
                key={role.id}
                className="rounded-md border border-border bg-surface p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <div>
                    <h3 className="text-[1.125rem] font-bold">{role.role}</h3>
                    <p className="text-[0.9375rem] font-semibold text-accent">{role.company}</p>
                  </div>
                  <p className="font-mono text-[0.8125rem] text-text-muted tabular-nums">{meta}</p>
                </div>
                <ul className={`mt-4 ${LIST_CLASS}`}>
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
    <section id="credentials" className={SECTION_CLASS} aria-labelledby="credentials-heading">
      <div className={SECTION_HEADER_CLASS}>
        <div>
          <h2 id="credentials-heading" className={SECTION_TITLE_CLASS}>
            Education and credentials
          </h2>
          <p className={SECTION_SUBTITLE_CLASS}>
            Academic degrees, technical stack, languages, honors, and certifications.
          </p>
        </div>
      </div>
      <div id="credentials-root">
        <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-start gap-4 max-[960px]:grid-cols-1">
          <section className={CARD_CLASS} aria-labelledby="stack-heading">
            <h3 id="stack-heading" className={CARD_TITLE_CLASS}>
              Technical stack
            </h3>
            <div className="mt-4 grid gap-4">
              {profile.stack.map((group) => (
                <div key={group.label}>
                  <h4 className={SUB_HEADING_CLASS}>{group.label}</h4>
                  <ul className={STACK_TAG_LIST_CLASS}>
                    {group.items.map((item) => (
                      <li key={item} className={TAG_CLASS}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          <div className="grid gap-4">
            <section className={CARD_CLASS} aria-labelledby="education-heading">
              <h3 id="education-heading" className={CARD_TITLE_CLASS}>
                Education
              </h3>
              <ul className="mt-4 grid gap-3">
                {profile.education.map((edu) => (
                  <li
                    key={`${edu.degree}-${edu.period}`}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-2 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p className="text-[0.9375rem] font-semibold">{edu.degree}</p>
                      <p className="text-sm text-text-muted">{edu.institution}</p>
                    </div>
                    <span className="font-mono text-xs text-text-muted">{edu.period}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className={CARD_CLASS} aria-labelledby="languages-honors-heading">
              <h3 id="languages-honors-heading" className={CARD_TITLE_CLASS}>
                Languages and honors
              </h3>
              <ul className="mt-4 grid gap-3">
                {profile.languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-2 last:border-b-0 last:pb-0"
                  >
                    <span className="text-[0.9375rem] font-semibold">{lang.name}</span>
                    <span className="text-sm text-text-muted">{lang.level}</span>
                  </li>
                ))}
              </ul>
              <h4 className={`mt-4 mb-2 ${SUB_HEADING_CLASS}`}>Honors</h4>
              <ul className={`mt-3 ${LIST_CLASS}`}>
                {profile.honors.map((honor) => (
                  <li key={honor}>{honor}</li>
                ))}
              </ul>
            </section>
            <section className={CARD_CLASS} aria-labelledby="certifications-heading">
              <h3 id="certifications-heading" className={CARD_TITLE_CLASS}>
                Certifications
              </h3>
              <ul className={`mt-3 ${LIST_CLASS}`}>
                {profile.certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
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
  const mailHref = sanitizeUrl(buildGmailComposeUrl(profile.email));
  const githubUrl = sanitizeUrl(profile.links.github);
  const linkedinUrl = sanitizeUrl(profile.links.linkedin);

  return (
    <section id="contact" className={SECTION_CLASS} aria-label="Contact">
      <div id="contact-root">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg border border-border bg-surface p-8 max-[480px]:p-6">
          <div>
            <h2 className={SECTION_TITLE_CLASS}>Contact</h2>
            <p className="mt-[0.35rem] max-w-[52ch] text-text-muted">
              Open to Machine Learning Engineering, Applied AI, and Full-Stack Systems discussions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className={BUTTON_CLASSES.primary}
              href={mailHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MailIcon />
              <span>{profile.email}</span>
            </a>
            <CopyEmailButton email={profile.email} />
            <a
              className={BUTTON_CLASSES.ghost}
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              <span>GitHub</span>
              <ArrowUpRightIcon />
            </a>
            <a
              className={BUTTON_CLASSES.ghost}
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
