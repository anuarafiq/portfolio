export const projects = [
  {
    id: 1,
    slug: "smart-parking",
    title: "Smart Parking System",
    description:
      "CLI-based parking management system with OOP design patterns. Handles space allocation, billing calculation, and usage reporting across multiple parking levels.",
    longDescription:
      "A fully-featured command-line parking management system built in Python. Supports multiple parking levels, real-time space tracking, hourly billing, and end-of-day usage reports. Designed with object-oriented principles — each entity (lot, level, space, ticket) is its own class with clear responsibilities.",
    problem:
      "Manual parking management is error-prone and doesn't scale. The brief called for a system that could track dozens of spaces across multiple levels, calculate fees accurately, and produce a summary report — all without a GUI.",
    solution:
      "Modelled the domain with OOP: a ParkingLot owns Levels, each Level owns Spaces, and a Ticket is issued on entry and resolved on exit. Billing is calculated from timestamps. A reporting module aggregates occupancy data at the end of each session.",
    tags: ["C++", "CLI"],
    status: "complete",
    year: "2025",
    githubUrl: "https://github.com/anuarafiq/Smart-Parking-System",
    featured: true,
  },
  {
    id: 2,
    slug: "projectoop",
    title: "Space Shooter Game",
    description:
      "Side-scrolling game built with the MonoGame framework in C#. Implemented collision detection, sprite animation state machines, and hand-authored level design.",
    longDescription:
      "A side-scrolling 2D game built from scratch in C# using the MonoGame framework. The player navigates hand-crafted levels, interacts with enemies, and collects items. Every system — movement, animation, collision, rendering — was implemented without a game engine abstraction layer.",
    problem:
      "The challenge was building a playable game without the safety net of Unity or Godot. MonoGame gives you a game loop and a graphics device — nothing else. All game logic, state management, and physics had to be written by hand.",
    solution:
      "Built a finite state machine for character animation so each action (idle, run, jump, fall) transitions cleanly. Collision detection uses axis-aligned bounding boxes with a separate resolution pass. Level data is stored in a 2D tile array and rendered from a spritesheet.",
    tags: ["C#", "MonoGame", "Game Dev", "OOP"],
    status: "complete",
    year: "2025",
    githubUrl: "https://github.com/anuarafiq/ProjectOOP",
    featured: true,
  },
  {
    id: 3,
    slug: "airbnb-db",
    title: "Airbnb Database System",
    description:
      "Relational database design modelling an Airbnb-style rental platform. Includes ER diagrams, normalised schema up to 3NF, and complex analytical queries.",
    longDescription:
      "A relational database project that models the core data layer of a rental platform. Covers entity design, relationship mapping, schema normalisation to Third Normal Form, and a set of analytical SQL queries covering booking trends, host revenue, and property availability.",
    problem:
      "Designing a schema that accurately reflects real-world constraints — a guest can have many bookings, a property can have many reviews, a host can list many properties — while avoiding redundancy and update anomalies.",
    solution:
      "Started with an ER diagram to map entities and cardinalities, then normalised to 3NF to eliminate transitive dependencies. Wrote queries using JOINs, subqueries, and window functions to answer analytical questions that a real platform would need.",
    tags: ["Database", "SQL"],
    status: "complete",
    year: "2026",
    githubUrl: "https://github.com/anuarafiq/Airbnb-Database-System",
    featured: false,
  },
  {
    id: 4,
    slug: "paradise-shoes",
    title: "Paradise Shoes",
    description:
      "E-commerce web application for a shoe store. Product listings, cart functionality, and checkout flow built from scratch without any frameworks.",
    longDescription:
      "A vanilla web e-commerce app for a fictional shoe store. Includes a product catalogue, filter by category, add-to-cart functionality with a running total, and a checkout summary. No frameworks — just HTML, CSS, and JavaScript.",
    problem:
      "The constraint was no frameworks. Building cart state, DOM updates, and page transitions in vanilla JS forces you to understand exactly what React and similar tools are abstracting away.",
    solution:
      "Cart state is held in a plain JavaScript object and persisted to localStorage. Product data is stored as a JS array and rendered into the DOM on page load. Event delegation handles clicks on dynamically rendered elements without attaching hundreds of listeners.",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "SQL"],
    status: "complete",
    year: "2023",
    githubUrl: "https://github.com/anuarafiq/Paradise-Shoes",
    featured: false,
  },
  {
    id: 6,
    slug: "career-os",
    title: "Career OS",
    description:
      "Career navigation platform built for the Talentbank Tech Hackathon 2026. Connects job seekers, employers, and universities through AI-powered career pathing, smart matching, and outcome tracking.",
    longDescription:
      "Career OS is a full-stack career navigation platform and competition entry for the Talentbank Tech Hackathon 2026. It models three connected user groups — candidates, employers, and universities — each with their own dashboard and workflows. Candidates get AI-powered career path visualization built with React Flow, personalized coaching, and a living portfolio. Employers get intelligent candidate matching and talent retention signals. Universities get graduate outcome tracking and curriculum feedback loops.",
    problem:
      "Career navigation is fragmented. Job boards show listings but not pathways. University systems track enrollment, not outcomes. The hackathon brief called for a platform that bridges all three sides — helping candidates see realistic career paths, giving employers smarter matching, and letting institutions close the feedback loop on graduate employment.",
    solution:
      "Built on Next.js App Router with Supabase handling auth and the relational data layer. The career path visualizer uses React Flow to render branching trajectory graphs. AI features run through Vercel AI SDK with Google and Groq as model providers. Role-based routing separates the candidate, employer, and university surfaces into distinct dashboard experiences.",
    tags: ["Next.js", "TypeScript", "Supabase", "AI SDK", "React Flow", "Tailwind"],
    status: "wip",
    year: "2026",
    githubUrl: "https://github.com/anuarafiq/career-os",
    liveUrl: "https://career-os-five-omega.vercel.app",
    featured: true,
  },
  {
    id: 5,
    slug: "portfolio",
    title: "This Portfolio",
    description:
      "Rebuilt from scratch with a committed editorial aesthetic. Typography-led design, intentional motion, ink-on-paper palette. The constraint was the brief.",
    longDescription:
      "A personal portfolio built in React and Vite with Tailwind CSS. The design is editorial — ink-on-paper palette, Cormorant Garamond for serif, IBM Plex Mono for monospace, Framer Motion for staggered page-load animations. Every decision has a reason.",
    problem:
      "Most developer portfolios look the same: dark mode, neon accents, card grids. The challenge was building something that felt considered and personal without being over-designed.",
    solution:
      "Committed to a single aesthetic — ink on paper — and applied it consistently across typography, spacing, and motion. Data is separated from presentation (projects, posts, and status live in /data). Components are small and single-purpose.",
    tags: ["React", "Tailwind", "Vite", "Framer Motion", "Web Design"],
    status: "wip",
    year: "2026",
    githubUrl: "https://github.com/anuarafiq/portfolio",
    featured: false,
  },
].sort((a, b) => Number(b.year) - Number(a.year))
