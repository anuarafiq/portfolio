import { useState } from "react"

export function useContactForm() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("idle") // idle | loading | success | error

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch(
        `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fields),
        }
      )

      if (res.ok) {
        setStatus("success")
        setFields({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return { fields, status, handleChange, handleSubmit }
}
