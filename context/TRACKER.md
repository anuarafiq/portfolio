# Tracker - improvement run, Nov 2026

Branch: `improve/nov-2026` (from `dev` at `a0f4a57`). Plan: `context/PLAN.md`.

| Unit | Name | Status | Commit | Notes |
|---|---|---|---|---|
| 1 | Harness and hygiene | done | `da697a5` | `npm audit` 0. Capture writes 32 screenshots. |
| 2 | Live links and RSS discovery | done | `3cc3503` | `Projects.jsx` needed no change. |
| 3 | Page endings and not-found states | done | `85bedc2` | Detail pages split into a wrapper and a view component. |
| 4 | Contact section | done | `a9b5e11` | Also touched `src/data/status.js` for the availability string. |
| 5 | Open Graph image for each page | done | `3bf4191` | 12 images, made at build time in `dist/og/`. |
| 6 | Contrast and target size | done | `d3f9f72` | Warm is `#6f665b` light, `#8d8372` dark. Nav fix is in `index.css`, so `Nav.jsx` did not change. |
| - | End of phase | done | see git log | Audit 0, knip clean, README and vault note updated, branch pushed. |

Each unit passed lint, build, `npm run check` and `npm run capture` in the unit session and again in the planning session.

## Waits for Afiq

- Checks on the preview URL (list in `context/PLAN.md`, "Checks for the user" in each unit).
- Unit 4 and unit 6 change the look. Each is one commit, so each can be reverted alone.
- The merge to `main`.
