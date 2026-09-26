export const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

export const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

// The landing page is already on screen as prerendered HTML, so it skips its entrance
// (an opacity:0 start would hide it, and delay LCP, until JS runs). App ends the first
// load after its first mount, so later client navigations still stagger in.
let firstLoad = true
export const endFirstLoad = () => {
  firstLoad = false
}
export const entrance = () => (firstLoad ? false : "hidden")
