// Build-time only: scripts/prerender.mjs calls render() per route so each HTML file
// ships real body content for crawlers that don't run JS.
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import App from "./App"

export const render = (url) =>
  renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
