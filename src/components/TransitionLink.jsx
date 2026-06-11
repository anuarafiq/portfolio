/**
 * Link that wraps navigation in document.startViewTransition, so elements
 * sharing a view-transition-name (project titles) morph between routes.
 *
 * BrowserRouter (declarative mode) doesn't support React Router's
 * viewTransition prop, so the wrap is manual: flushSync commits the route
 * swap inside the transition callback, where the API snapshots the new
 * state. Scroll-to-top also happens inside the callback so the snapshot is
 * taken at the final scroll position (App's ScrollToTop effect fires too
 * late for the snapshot).
 *
 * Falls through to a plain Link when the API is missing, the user prefers
 * reduced motion, or the click is a modified/new-tab click.
 */
import { Link, useNavigate } from "react-router-dom"
import { flushSync } from "react-dom"
import {
  beginViewTransition,
  finishViewTransition,
  focusMorphTarget,
} from "../lib/viewTransition"

export default function TransitionLink({ to, vtTarget, onClick, children, ...props }) {
  const navigate = useNavigate()

  function handleClick(e) {
    onClick?.(e)
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
      e.currentTarget.target ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    e.preventDefault()
    const token = beginViewTransition()
    try {
      if (vtTarget) focusMorphTarget(vtTarget)
      const transition = document.startViewTransition(() => {
        flushSync(() => navigate(to))
        window.scrollTo({ top: 0, behavior: "instant" })
      })
      // finally re-throws if `finished` rejects (callback error / skipped
      // transition edge cases) - swallow so cleanup is the end of the chain.
      transition.finished
        .finally(() => finishViewTransition(token))
        .catch(() => {})
    } catch {
      // Setup threw before a transition existed: clear state so page
      // entrances aren't silently skipped forever, and still navigate.
      finishViewTransition(token)
      navigate(to)
    }
  }

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
