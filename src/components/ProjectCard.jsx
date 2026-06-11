/**
 * Editorial project row — NOT a card.
 *
 * Design decisions:
 * - Left border in rust appears on hover via .project-row CSS class
 * - Index number is a decorative typographic anchor, not functional nav
 * - WIP badge styled like a rubber stamp: no fill, rust border, small uppercase
 * - Tags are small border-only chips — label not container
 * - No rounded corners on any element here — sharp edges suit ink-on-paper
 */
import TransitionLink from "./TransitionLink"
import { morphNameFor } from "../lib/viewTransition"

export default function ProjectCard({ index, slug, title, description, tags, status, year, githubUrl }) {
  const displayNum = String(index + 1).padStart(2, "0")

  return (
    <article className="project-row py-5 px-4 -mx-4">
      <div className="flex items-start gap-5">
        {/* Decorative sequence number — purely visual */}
        <span
          className="font-mono text-xs text-warm mt-1.5 tabular-nums select-none shrink-0 w-6"
          aria-hidden="true"
        >
          {displayNum}
        </span>

        <div className="flex-1 min-w-0">
          {/* Title + metadata row */}
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
            <TransitionLink
                to={`/projects/${slug}`}
                vtTarget={slug}
                data-vt={slug}
                className="font-serif font-semibold text-xl text-ink leading-tight hover:text-rust transition-colors duration-200"
                style={{ viewTransitionName: morphNameFor(slug) }}
              >
                {title}
              </TransitionLink>
            <div className="flex items-center gap-2.5">
              {status === "wip" && (
                /* Stamp-style badge — no fill, border only, no border-radius */
                <span className="font-mono text-[10px] uppercase tracking-widest text-rust border border-rust px-1.5 py-0.5 leading-none">
                  WIP
                </span>
              )}
              <span className="font-mono text-xs text-warm">{year}</span>
            </div>
          </div>

          {/* Description */}
          <p className="font-serif font-bold text-warm text-base leading-relaxed mb-3 text-justify">{description}</p>

          {/* Tags + optional link */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-wider text-warm border border-line px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-rust hover:underline ml-auto"
              >
                View ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
