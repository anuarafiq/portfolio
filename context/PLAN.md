# Plan - improvement run, Nov 2026

Branch: `improve/nov-2026`. One unit for each session, in order. Status is in `context/TRACKER.md`.

## Rules for every unit

Invariants (from `HANDOFF.md` and the code):
- `main.jsx` uses `createRoot`. Do not use `hydrateRoot`.
- Do not lazy-load routes or components.
- Use `m.*` from framer-motion, not `motion.*` (`<LazyMotion strict>` throws).
- A page entrance uses `initial={entrance()}` from `src/lib/motion.js`, not `initial="hidden"`.
- The CSP entry stays at `headers[0]` in `vercel.json`. `check-prerender` reads it there.
- Each prerendered page has exactly one `<h1>` and exactly one inline `<script>`.
- `npm run build` rewrites the date in `public/feed.xml`. Run `git checkout public/feed.xml` before the commit.
- A new font weight or italic needs a new woff2 file and `@font-face` rule. Do not add one in this run.

Design contract (`.impeccable.md`):
- Ink on paper. Cormorant Garamond for display and body, IBM Plex Mono for labels.
- No border radius. No cards, gradients, glass or shadows.
- Hierarchy comes from type, not from colour or boxes.
- Motion stays where it is now. New elements get the existing `item` variant or no motion.
- All effects must work with `prefers-reduced-motion`.
- Reuse existing classes: label = `font-mono text-[11px] uppercase tracking-widest`, link = `font-mono text-xs text-rust hover:underline`, stamp button = the Resume button classes in `Nav.jsx`.

Dependencies:
- No new npm dependency. Unit 1 runs `npm audit fix` only.
- The capture script uses the Python Playwright that is installed on this machine. It is not a repo dependency.

Hard limits:
- Never push to `main`. Never merge into `main`. No `vercel` CLI deploy. A unit does not push at all.
- No change to the CSP policy value.
- If a unit changes the inline theme script in `index.html`, it makes the sha256 again from the built `dist/index.html` and updates `vercel.json` in the same commit. No unit in this plan needs to change that script.
- Stage only the hunks of the unit. One commit for each unit. Short lowercase commit message, no model attribution, no co-author trailer.
- No Claude Browser MCP for visual checks. Use the capture script.

Stop conditions (stop, write the reason in the final reply, do not commit a partial state):
- A step needs a CSP change, a new dependency, or a file that is not in the unit's file list and not a direct import of one.
- `npm run check` fails for a reason that is not in the unit's scope.
- The unit touches more than 10 files.

Unit done:
- The verification protocol passes.
- `code-review` (medium) ran on the diff, and Critical and Important items are fixed.
- The commit exists and `git status` is clean (the three untracked paths excepted).
- Final reply format: commit hash, files changed, result of each verification command, review findings and what changed, deviations from the plan, open points.

## Verification protocol

Run in this order. Each must pass.

1. `npm run lint`
2. `npm run build`
3. `npm run check`
4. `git checkout public/feed.xml`
5. `npm run capture` (from unit 1 on; unit 1 makes it)

No `tsc` and no test runner exist in this repo. `npm run check` is the test step.

Capture (`scripts/capture.py`, made in unit 1):
- Starts `npx vite preview --port 4173 --strictPort`, waits for it, and stops it at the end.
- Adds the `Content-Security-Policy` value from `vercel.json` to each document response (Playwright route), because `vite preview` does not send it.
- Captures `/`, `/projects`, `/projects/path-os`, `/about`, `/record`, `/notes`, `/notes/course-difficulty-predictor` and `/nope` (404).
- Four variants for each route: 390x844 and 1440x900, `color_scheme` light and dark. Full page PNG in `.captures/` (in `.gitignore`).
- Exit code 1 if a console message contains "Content Security Policy", or if a `pageerror` occurs, or if a route has horizontal scroll at 390px.
- A 404 for `/_vercel/insights/script.js` and `/_vercel/speed-insights/script.js` is normal in a local run. It is not a failure.

The session looks at the PNG files of the routes it changed (Read tool) before it commits.

## Unit order and file overlap

Order: 1, 2, 3, 4, 5, 6. Each unit starts from the commit of the unit before it.

| File | U1 | U2 | U3 | U4 | U5 | U6 |
|---|---|---|---|---|---|---|
| `scripts/capture.py` (new) | x | | | | | |
| `package.json`, `package-lock.json` | x | | | | | |
| `vercel.json` | x | | | | | |
| `.gitignore` | x | | | | | |
| `index.html` | | x | | | | |
| `scripts/check-prerender.mjs` | | x | | | x | |
| `src/components/ProjectCard.jsx` | | x | | | | |
| `src/components/Footer.jsx` | | x | | x | | |
| `src/pages/Home.jsx` | | x | | x | | |
| `src/pages/BlogPost.jsx` | | | x | | x | |
| `src/pages/ProjectDetail.jsx` | | | x | | x | |
| `src/pages/NotFound.jsx` | | | x | | | |
| `src/data/links.js` (new) | | | | x | | |
| `src/components/Contact.jsx` (new) | | | | x | | |
| `src/pages/About.jsx` | | | | x | | |
| `scripts/generate-og.mjs` | | | | | x | x |
| `scripts/prerender.mjs` | | | | | x | |
| `src/hooks/useMeta.js` | | | | | x | |
| `src/index.css` | | | | | | x |
| `src/components/Nav.jsx` | | | | | | x |
| `src/hooks/useTheme.js` | | | | | | x |
| `src/pages/Projects.jsx` | | | | | | x |

Unit 6 is last because it changes a palette token. It is one commit, so Afiq can revert it alone.

---

## Unit 1 - Harness and hygiene

Goal: later units can prove their work, and the repo has 0 audit advisories.

Files: `scripts/capture.py` (new), `package.json`, `package-lock.json`, `vercel.json`, `.gitignore`.

Steps:
1. Write `scripts/capture.py` as the verification protocol describes. Use `playwright.sync_api`. Read the CSP from `vercel.json` `headers[0]`.
2. Add `"capture": "python3 scripts/capture.py"` to `package.json` scripts. Add `.captures` to `.gitignore`.
3. Run `npm audit fix` (no `--force`). Confirm that `package.json` dependency ranges do not change.
4. Add two entries after the CSP entry in `vercel.json`: `/assets/(.*)` with `Cache-Control: public, max-age=31536000, immutable`, and `/fonts/(.*)` with `Cache-Control: public, max-age=2592000`.

Edge cases:
- Port 4173 is in use: the script exits with a clear message. It does not kill other processes.
- The preview server must stop when a capture fails (`try/finally`).
- `npm audit fix` cannot reach 0 without `--force`: stop condition. Report the remaining advisories.
- Font files have no content hash, so the font header is 30 days and not `immutable`.

Tests: the capture run is the test. To prove the CSP check works, run it once with a temporary inline `<script>` in `dist/index.html` and confirm exit code 1. Then build again.

Acceptance cases:
- `npm audit` prints 0 vulnerabilities.
- `npm run capture` writes 32 PNG files and exits 0.
- The capture fails when a page breaks the CSP (shown once, as above).
- `vercel.json` `headers[0]` is unchanged, byte for byte.
- `git status` does not show `.captures/`.

Checks for the user (preview URL):
- `curl -sI <preview>/fonts/cormorant-garamond.woff2` shows the 30-day `Cache-Control`.
- `curl -sI <preview>/assets/<a js file>` shows `immutable`.
- The site loads with no console errors.

## Unit 2 - Live links and RSS discovery

Goal: a visitor can reach a live project from a project row, and a feed reader can find the feed.

Files: `src/components/ProjectCard.jsx`, `src/pages/Home.jsx`, `src/components/Footer.jsx`, `index.html`, `scripts/check-prerender.mjs`.

Steps:
1. `ProjectCard.jsx`: accept `liveUrl`. Show `Live ↗` before the GitHub link, same classes. Rename the visible GitHub text from `View ↗` to `Code ↗` only when both links show. Each external link gets an `aria-label` with the project title.
2. `Home.jsx` featured list: show the same `Live ↗` link where the row has `liveUrl`.
3. `index.html`: add `<link rel="alternate" type="application/rss+xml" title="Anuar Afiq - Notes" href="/feed.xml" />`. Do not touch the inline script.
4. `Footer.jsx`: add an `RSS` link to `/feed.xml` after Email.
5. `check-prerender.mjs`: assert that each page has the `rel="alternate"` RSS tag.

Edge cases:
- A project with `liveUrl` and no `githubUrl`, and the reverse. Duply has neither.
- The link must stay outside the `TransitionLink`, so a click does not start a morph.
- Footer at 390px: four links must fit on one line or wrap cleanly.

Tests: the new assertion in `check-prerender.mjs`. The CSP hash check (section 3 of that script) must still pass after the `index.html` edit.

Acceptance cases:
- `/projects` shows `Live ↗` on Path OS only. It opens `https://www.path-os.tech` in a new tab.
- `/` shows the same on the Path OS featured row.
- Each prerendered page has the RSS `<link>`.
- The footer has an RSS link that returns the feed.

Checks for the user:
- `/projects` and `/`: the Path OS row has the live link, and the row layout looks right on a phone.
- A feed reader (or the browser RSS extension) finds the feed from the home page.

## Unit 3 - Page endings and not-found states

Goal: a reader at the end of a note or project has a next step, and each unknown URL gives the same 404 page.

Files: `src/pages/BlogPost.jsx`, `src/pages/ProjectDetail.jsx`, `src/pages/NotFound.jsx`.

Steps:
1. `BlogPost.jsx`: below the article, show `← Older` and `Newer →` links with the note titles, from the sorted `posts` array. Keep `← All Notes`.
2. `ProjectDetail.jsx`: in the footer row, add `Next: <title> →` to the next project in the `projects` array order (wrap from last to first). Use a plain `Link`, not `TransitionLink`.
3. `NotFound.jsx`: call `useMeta` with title `404 - Not Found` and a short description.
4. `BlogPost.jsx` and `ProjectDetail.jsx`: for an unknown slug, return `<NotFound />`. Remove the two local not-found blocks.

Edge cases:
- First and last note: only one of the two links shows. The layout must not shift.
- `useMeta` runs in the detail page and in `NotFound` for an unknown slug. The `NotFound` title must win (child effects run first, so check the final `document.title`, and remove the parent call for the unknown case if needed. Hooks must still run in the same order on each render).
- Long note titles at 390px wrap inside their half of the row.
- `dist/404.html` must still contain "Page not found" and one `<h1>`.

Tests: `npm run check` (one `<h1>` on each page, 404 body). The capture of `/nope`.

Acceptance cases:
- `/notes/finals` (newest) shows only an older link. `/notes/data-science-and-ml` (oldest) shows only a newer link.
- `/projects/portfolio` shows a next link, and a click loads the next project at the top of the page.
- `/projects/nope` and `/notes/nope` render the same page as `/nope`, with the title `404 - Not Found`.

Checks for the user:
- Read to the end of one note and one project. The next links read well and look like the rest of the page.
- Open `/projects/nope` on the preview.

## Unit 4 - Contact section

Goal: a recruiter finds how to reach Afiq without a scroll to the footer.

Files: `src/data/links.js` (new), `src/components/Contact.jsx` (new), `src/components/Footer.jsx`, `src/pages/Home.jsx`, `src/pages/About.jsx`.

Steps:
1. `src/data/links.js`: export the email, GitHub and LinkedIn entries that are now inside `Footer.jsx`. `Footer.jsx` imports them (the RSS link from unit 2 stays in the footer).
2. `Contact.jsx`: one section. A mono label (`Contact`), one serif line with the availability text from the Home hero ("Open to internships, Jan to Aug 2027"), the email as a visible `mailto:` link in serif at a large size, then GitHub, LinkedIn and Resume as mono links. No form.
3. Add `<Contact />` as the last section of `Home.jsx` and `About.jsx`, inside an `m.div variants={item}` or `m.section`.

Edge cases:
- No form, so no new input and no endpoint. `security-review` is not needed.
- The email must be real text (copy works) and a `mailto:` link.
- The availability text is now in two places on Home. Move the string to `src/data/status.js` only if both places can import it with no layout change. If not, leave the hero as it is and write the string once in `Contact.jsx`.
- The section must not add a second `<h1>`. Use `<h2>` or a label.
- `/about` JSON-LD and `check-prerender` must still pass.

Tests: `npm run check`. Capture of `/` and `/about` in the four variants.

Acceptance cases:
- `/` and `/about` end with the contact section, above the footer.
- The email link opens the mail client. GitHub, LinkedIn and Resume open in a new tab.
- The footer still shows the same links as before, plus RSS.
- No horizontal scroll at 390px.

Checks for the user:
- Does the section fit the broadsheet look, or does it repeat the footer too much? Keep, change, or revert (one commit).
- Is the availability line still correct?

## Unit 5 - Open Graph image for each page

Goal: a shared project or note link shows its own title in the preview image.

Files: `scripts/generate-og.mjs`, `scripts/prerender.mjs`, `scripts/check-prerender.mjs`, `src/hooks/useMeta.js`, `src/pages/ProjectDetail.jsx`, `src/pages/BlogPost.jsx`.

Steps:
1. `generate-og.mjs`: keep the current output (`public/og-image.png`) when run directly. Export `renderOg({ label, title, footer })` that returns a PNG buffer in the same layout: mono label top left, title in Cormorant Light, rule, node-graph motif, `ANUARAFIQ.ME`.
2. `prerender.mjs`: for each project and note route, write `dist/og/<projects|notes>-<slug>.png` with `renderOg`, and set `og:image` and `twitter:image` to that URL with `replaceOnce`. Static pages keep `/og-image.png`. Add the image to the `BlogPosting` JSON-LD.
3. `useMeta.js`: accept an optional `image` path. `ProjectDetail.jsx` and `BlogPost.jsx` pass theirs.
4. `check-prerender.mjs`: assert that each `og:image` URL maps to a file in `dist`, and that project and note pages do not use the default image.

Edge cases:
- Titles go into SVG: escape `&`, `<`, `>` and `"`.
- SVG text does not wrap. Split a long title into two lines at a word boundary, and reduce the font size for a long line. Longest titles now: "Data Science and Machine Learning", "Course Difficulty Predictor", "Airbnb Database System".
- Only `CormorantGaramond-Light.ttf` and `IBMPlexMono-Regular.ttf` are in `scripts/fonts`. Use only these.
- Images are made at build time into `dist/og/`. Do not commit PNG files. `@resvg/resvg-js` is a devDependency, and the Vercel build installs it.
- `public/og-image.png` must not change (`git status` clean after `npm run build`).
- The image URL must be absolute (`https://anuarafiq.me/og/...`).

Tests: the new assertions in `check-prerender.mjs`. The session opens three generated PNG files (short title, long title, a note) with the Read tool.

Acceptance cases:
- `dist/og/` has 7 project images and 5 note images, each 1200x630.
- `/projects/path-os/index.html` has `og:image` = `https://anuarafiq.me/og/projects-path-os.png`. `/about/index.html` still has `/og-image.png`.
- No title is cut or leaves the frame in the three checked images.
- After a client navigation to a note, `meta[property="og:image"]` has the note image.

Checks for the user:
- Open `<preview>/og/projects-path-os.png` and `<preview>/og/notes-data-science-and-ml.png`. Check the look.
- After the merge: LinkedIn Post Inspector on one project URL (the preview URL has deployment protection, so this check works only on production).

## Unit 6 - Contrast and target size

Goal: small labels meet WCAG AA contrast, and nav targets meet the WCAG 2.2 minimum.

Files: `src/index.css`, `scripts/generate-og.mjs`, `src/components/Nav.jsx`, `src/hooks/useTheme.js`, `src/pages/Projects.jsx`.

Steps:
1. `index.css`: change `--color-warm` to the lightest value that gives at least 4.5:1 on `--color-paper` and on `--color-paper-dim`. Light: start from `#736a5c` (same hue, about 4.6:1). Dark: start from `#948a7b` in both dark blocks (about 4.9:1). Calculate the real ratios and put them in the final reply.
2. `generate-og.mjs`: set the `warm` constant to the new light value. Run `npm run gen-og` and commit the new `public/og-image.png`.
3. `Nav.jsx`: give each nav link a hit area of at least 24px high (vertical padding, same visual position, underline stays at the text). The row must still fit 360px.
4. `useTheme.js`: in system mode, listen for `prefers-color-scheme` changes so the sun or moon icon follows the OS.
5. `Projects.jsx`: add a visually hidden `aria-live="polite"` line with the result count ("3 projects").

Edge cases:
- The light and dark values are in three places in `index.css` (`@theme`, media query, `[data-theme="dark"]`). Change all three.
- `text-warm` on `bg-paper-dim` (if used) must also pass.
- Hover states go from `text-warm` to `text-ink`. The difference must still be visible.
- The `change` listener must be removed on unmount, and must not write to `localStorage`.
- Nav at 360px has 8px spare width. Do not add horizontal padding.

Tests: a small contrast function in `check-prerender.mjs` is out of scope (file not in this unit). The session calculates the ratios with a one-line node command and reports them. Capture shows the nav at 390px.

Acceptance cases:
- Contrast of `warm` on `paper` is 4.5:1 or more in light and dark (numbers in the reply).
- Each nav link box is 24px high or more (measure in the capture script run or with `getBoundingClientRect` in a Playwright one-liner).
- With no saved theme, an OS switch to dark changes the toggle icon with no reload.
- A filter change on `/projects` updates the live region text.
- No horizontal scroll at 360px and 390px.

Checks for the user:
- This unit changes a palette colour. Compare the labels on the preview with production, light and dark. If the darker warm is wrong for the design, revert this one commit.
- Check the new `og-image.png`.

---

## End of phase

1. `npm audit` must print 0 vulnerabilities.
2. `npx knip`: report the output. Delete nothing.
3. Docs. Run humanizer on the prose first.
   - `README.md`: add the capture command and the `check` command to Dev.
   - `context/TRACKER.md`: real state of each unit (commit hash, or the reason it stopped).
   - Vault note `Projects/Portfolio.md`: add `/record` to Pages, remove the backlog items that are shipped, add what is still open.
4. Push `improve/nov-2026` once (not `main`). Wait for the Vercel preview deployment to be READY. Record the preview URL.
5. Delete the cron job.
6. Final report: commit of each unit, plan changes, open points, what is not verified, the checks for the user for each unit with the preview URL, and each decision that waits for Afiq.

