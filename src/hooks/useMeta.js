import { useEffect } from "react"

function setMeta(selector, attr, value) {
  let tag = document.querySelector(selector)
  if (!tag) {
    tag = document.createElement("meta")
    const [attrName, attrValue] = attr.split("=")
    tag.setAttribute(attrName, attrValue)
    document.head.appendChild(tag)
  }
  tag.setAttribute("content", value)
}

function setCanonical(href) {
  let tag = document.querySelector('link[rel="canonical"]')
  if (!tag) {
    tag = document.createElement("link")
    tag.setAttribute("rel", "canonical")
    document.head.appendChild(tag)
  }
  tag.setAttribute("href", href)
}

export function useMeta({ title, description, type = "website" }) {
  useEffect(() => {
    document.title = title

    const canonical = `${window.location.origin}${window.location.pathname}`
    const image = `${window.location.origin}/og-image.png`

    setMeta('meta[name="description"]', "name=description", description)

    setMeta('meta[property="og:title"]', "property=og:title", title)
    setMeta('meta[property="og:description"]', "property=og:description", description)
    setMeta('meta[property="og:image"]', "property=og:image", image)
    setMeta('meta[property="og:url"]', "property=og:url", canonical)
    setMeta('meta[property="og:type"]', "property=og:type", type)

    setMeta('meta[name="twitter:card"]', "name=twitter:card", "summary_large_image")
    setMeta('meta[name="twitter:title"]', "name=twitter:title", title)
    setMeta('meta[name="twitter:description"]', "name=twitter:description", description)
    setMeta('meta[name="twitter:image"]', "name=twitter:image", image)

    setCanonical(canonical)
  }, [title, description, type])
}
