/**
 * Generated editorial visuals — one per project, matched to what it actually
 * is (terminal grid for a CLI app, ER diagram for a database project, etc.)
 * rather than generic filler. Ink linework only, no color beyond currentColor,
 * so it inherits --color-ink and adapts to light/dark automatically.
 *
 * Placeholder pass: no real screenshots exist yet. Swap a `visual` entry in
 * src/data/projects.js for a real `image` field when one is available.
 */

function TerminalVisual() {
  const occupied = new Set([0, 2, 3, 7, 8, 10])
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto block" role="presentation">
      <line x1="0" y1="34" x2="400" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="20" cy="17" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="36" cy="17" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="52" cy="17" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
      {Array.from({ length: 12 }).map((_, i) => {
        const col = i % 6
        const row = Math.floor(i / 6)
        return (
          <rect
            key={i}
            x={30 + col * 54}
            y={62 + row * 46}
            width="40"
            height="30"
            fill={occupied.has(i) ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1"
            opacity={occupied.has(i) ? 0.85 : 1}
          />
        )
      })}
      <text x="30" y="188" fontSize="11" letterSpacing="0.06em" fill="currentColor" className="font-mono">$ ./parking --status</text>
      <text x="30" y="204" fontSize="11" letterSpacing="0.06em" fill="currentColor" opacity="0.55" className="font-mono">6/12 OCCUPIED · LEVEL 2</text>
    </svg>
  )
}

function ErdVisual() {
  const box = (x, y, w, h, label) => (
    <g key={label}>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="currentColor" strokeWidth="1" />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize="10" letterSpacing="0.08em" fill="currentColor" className="font-mono">
        {label}
      </text>
    </g>
  )
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto block" role="presentation">
      <line x1="128" y1="112" x2="148" y2="52" stroke="currentColor" strokeWidth="1" />
      <line x1="128" y1="112" x2="148" y2="168" stroke="currentColor" strokeWidth="1" />
      <line x1="252" y1="52" x2="272" y2="112" stroke="currentColor" strokeWidth="1" />
      <line x1="252" y1="168" x2="272" y2="112" stroke="currentColor" strokeWidth="1" />
      {box(24, 90, 104, 44, "GUEST")}
      {box(148, 30, 104, 44, "BOOKING")}
      {box(148, 146, 104, 44, "REVIEW")}
      {box(272, 90, 104, 44, "PROPERTY")}
      <text x="24" y="200" fontSize="11" letterSpacing="0.08em" fill="currentColor" opacity="0.55" className="font-mono">3NF SCHEMA</text>
    </svg>
  )
}

function SpriteVisual() {
  const pattern = ["0001000", "0001000", "0011100", "0111110", "1111111", "1010101"]
  const cell = 14
  const offX = 148
  const offY = 56
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto block" role="presentation">
      {pattern.flatMap((row, r) =>
        row.split("").map((v, c) =>
          v === "1" ? (
            <rect key={`${r}-${c}`} x={offX + c * cell} y={offY + r * cell} width={cell} height={cell} fill="currentColor" />
          ) : null
        )
      )}
      <rect x="170" y="20" width="6" height="6" fill="currentColor" transform="rotate(45 173 23)" />
      <rect x="220" y="14" width="6" height="6" fill="currentColor" transform="rotate(45 223 17)" />
      <line x1="0" y1="180" x2="400" y2="180" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={i} x1={i * 20} y1="180" x2={i * 20 - 8} y2="188" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      ))}
      <text x="24" y="206" fontSize="11" letterSpacing="0.08em" fill="currentColor" opacity="0.55" className="font-mono">SPRITE / 7×6</text>
    </svg>
  )
}

function StorefrontVisual() {
  const card = (x) => (
    <g key={x}>
      <rect x={x} y="40" width="88" height="88" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1={x + 16} y1="70" x2={x + 72} y2="70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1={x + 16} y1="82" x2={x + 56} y2="82" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1={x + 16} y1="140" x2={x + 50} y2="140" stroke="currentColor" strokeWidth="1.5" />
    </g>
  )
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto block" role="presentation">
      {card(30)}
      {card(156)}
      {card(282)}
      <path d="M340 20 h20 l4 14 h-28 z" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M346 20 v-6 a4 4 0 0 1 8 0 v6" fill="none" stroke="currentColor" strokeWidth="1" />
      <text x="24" y="196" fontSize="11" letterSpacing="0.08em" fill="currentColor" opacity="0.55" className="font-mono">CATALOGUE / CART</text>
    </svg>
  )
}

function FlowVisual() {
  const node = (x, y, label, w = 100) => (
    <g key={label}>
      <rect x={x} y={y} width={w} height="36" fill="none" stroke="currentColor" strokeWidth="1" />
      <text x={x + w / 2} y={y + 22} textAnchor="middle" fontSize="9.5" letterSpacing="0.06em" fill="currentColor" className="font-mono">
        {label}
      </text>
    </g>
  )
  const arrow = (x1, y1, x2, y2, key) => {
    const len = Math.hypot(x2 - x1, y2 - y1)
    const ux = (x2 - x1) / len
    const uy = (y2 - y1) / len
    const backX = x2 - ux * 6
    const backY = y2 - uy * 6
    const perpX = -uy * 4
    const perpY = ux * 4
    return (
      <g key={key}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" />
        <line x1={x2} y1={y2} x2={backX + perpX} y2={backY + perpY} stroke="currentColor" strokeWidth="1" />
        <line x1={x2} y1={y2} x2={backX - perpX} y2={backY - perpY} stroke="currentColor" strokeWidth="1" />
      </g>
    )
  }
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto block" role="presentation">
      {arrow(120, 58, 150, 58, "a1")}
      {arrow(250, 58, 280, 58, "a2")}
      {arrow(200, 76, 200, 140, "a3")}
      {node(20, 40, "CANDIDATE")}
      {node(150, 40, "MATCHING")}
      {node(280, 40, "EMPLOYER")}
      {node(150, 140, "UNIVERSITY")}
      <text x="24" y="200" fontSize="11" letterSpacing="0.08em" fill="currentColor" opacity="0.55" className="font-mono">PATHWAY GRAPH</text>
    </svg>
  )
}

function TypescaleVisual() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto block" role="presentation">
      <text x="24" y="100" fontSize="76" fontWeight="300" fill="currentColor" className="font-serif">Aa</text>
      <line x1="180" y1="40" x2="380" y2="40" stroke="currentColor" strokeWidth="6" />
      <line x1="180" y1="68" x2="360" y2="68" stroke="currentColor" strokeWidth="4" />
      <line x1="180" y1="90" x2="340" y2="90" stroke="currentColor" strokeWidth="2.5" />
      <line x1="180" y1="108" x2="320" y2="108" stroke="currentColor" strokeWidth="1.5" />
      <line x1="180" y1="122" x2="300" y2="122" stroke="currentColor" strokeWidth="1" />
      <text x="24" y="196" fontSize="11" letterSpacing="0.08em" fill="currentColor" opacity="0.55" className="font-mono">TYPE SCALE</text>
    </svg>
  )
}

const visuals = {
  terminal: TerminalVisual,
  erd: ErdVisual,
  sprite: SpriteVisual,
  storefront: StorefrontVisual,
  flow: FlowVisual,
  typescale: TypescaleVisual,
}

export default function ProjectVisual({ type, className = "" }) {
  const Visual = visuals[type]
  if (!Visual) return null

  return (
    <div className={`editorial-frame text-ink p-1.5 ${className}`}>
      <Visual />
    </div>
  )
}
