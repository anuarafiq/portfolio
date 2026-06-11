/**
 * Coordination between TransitionLink and the pages it navigates between.
 *
 * Two jobs:
 *
 * 1. `isViewTransitioning` - destination pages read this at mount to skip
 *    their Framer Motion entrance. Otherwise the two animation systems
 *    fight: Framer would render the morph target at opacity 0 right when
 *    the View Transitions API snapshots the new state. The flag stays true
 *    for the lifetime of the transition (cleared on `finished`), so reads
 *    during render are stable - including StrictMode's double render.
 *
 * 2. Morph-target focus. Every project title carries a per-slug
 *    view-transition-name so any of them CAN morph, but if all names are
 *    live during a transition, each title becomes its own transition group
 *    and the non-matching ones linger as ghost snapshots over the page
 *    crossfade. So at click time the clicked project keeps its name and
 *    every other title is set to "none" (old snapshot via direct DOM style,
 *    new snapshot via morphNameFor during render), restored after the
 *    transition finishes.
 */
let active = false
let targetSlug = null
let generation = 0

const nameFor = (slug) => `project-title-${slug}`

/** Returns a token identifying this transition. A second navigation started
 *  mid-transition makes the browser skip the first one; its `finished` then
 *  settles and would otherwise run cleanup in the middle of the second
 *  transition (clearing `active`, re-arming every name). The token lets
 *  stale cleanup detect it has been superseded and do nothing. */
export function beginViewTransition() {
  active = true
  return ++generation
}

export function finishViewTransition(token) {
  if (token !== generation) return
  active = false
  restoreMorphNames()
}

export function isViewTransitioning() {
  return active
}

/** Called before startViewTransition: scopes the OLD snapshot to one title. */
export function focusMorphTarget(slug) {
  targetSlug = slug
  document.querySelectorAll("[data-vt]").forEach((el) => {
    el.style.viewTransitionName = el.dataset.vt === slug ? nameFor(slug) : "none"
  })
}

/** Used in render by title elements: scopes the NEW snapshot the same way. */
export function morphNameFor(slug) {
  if (active && targetSlug && targetSlug !== slug) return "none"
  return nameFor(slug)
}

/** Re-arms every title for the next navigation. */
function restoreMorphNames() {
  targetSlug = null
  document.querySelectorAll("[data-vt]").forEach((el) => {
    el.style.viewTransitionName = nameFor(el.dataset.vt)
  })
}
