export const projects = [
  {
    id: 1,
    slug: "smart-parking",
    title: "Smart Parking System",
    description:
      "Console parking system in C++, built for a Structured Programming course. It draws slots on a text grid and handles entry and exit by user ID, with checks against duplicate or invalid input.",
    longDescription:
      "A command-line parking system for UTP students and staff, written in C++ as a two-person project for the TEB1013 Structured Programming course. A text grid shows which slots are free or taken. Users park and leave by ID. The menu can also list parked users, look up one user, or show a slot summary.",
    problem:
      "The system had to show slot status live in the console and handle the mistakes people make at a gate, like parking twice under one ID or exiting without ever entering. It stays within what the course taught: structs, arrays, vectors, and functions.",
    solution:
      "Slots sit in a 2D array and users in a vector of structs. Each menu option is its own function. Before it assigns a slot, entry checks that one is free and that the ID is not already parked. The grid redraws after every change, so what you see matches the data.",
    tags: ["C++", "CLI"],
    status: "complete",
    year: "2025",
    githubUrl: "https://github.com/anuarafiq/Smart-Parking-System",
    featured: true,
    visual: "terminal",
  },
  {
    id: 2,
    slug: "projectoop",
    title: "Space Shooter Game",
    description:
      "Side-scrolling game built with the MonoGame framework in C#. Implemented collision detection, sprite animation state machines, and hand-authored level design.",
    longDescription:
      "A side-scrolling 2D game built from scratch in C# using the MonoGame framework. The player navigates hand-crafted levels, interacts with enemies, and collects items. Every system (movement, animation, collision, rendering) was implemented without a game engine abstraction layer.",
    problem:
      "The challenge was building a playable game without the safety net of Unity or Godot. MonoGame gives you a game loop and a graphics device, nothing else. All game logic, state management, and physics had to be written by hand.",
    solution:
      "Built a finite state machine for character animation so each action (idle, run, jump, fall) transitions cleanly. Collision detection uses axis-aligned bounding boxes with a separate resolution pass. Level data is stored in a 2D tile array and rendered from a spritesheet.",
    tags: ["C#", "MonoGame", "Game Dev", "OOP"],
    status: "complete",
    year: "2025",
    githubUrl: "https://github.com/anuarafiq/ProjectOOP",
    featured: true,
    visual: "sprite",
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
      "Designing a schema that accurately reflects real-world constraints (a guest can have many bookings, a property can have many reviews, a host can list many properties) while avoiding redundancy and update anomalies.",
    solution:
      "Started with an ER diagram to map entities and cardinalities, then normalised to 3NF to eliminate transitive dependencies. Wrote queries using JOINs, subqueries, and window functions to answer analytical questions that a real platform would need.",
    tags: ["Database", "SQL"],
    status: "complete",
    year: "2026",
    githubUrl: "https://github.com/anuarafiq/Airbnb-Database-System",
    featured: false,
    visual: "erd",
  },
  {
    id: 4,
    slug: "paradise-shoes",
    title: "Paradise Shoes",
    description:
      "E-commerce web application for a shoe store. Product listings, cart functionality, and checkout flow built from scratch without any frameworks.",
    longDescription:
      "A vanilla web e-commerce app for a fictional shoe store. Includes a product catalogue, filter by category, add-to-cart functionality with a running total, and a checkout summary. No frameworks, just HTML, CSS, and JavaScript.",
    problem:
      "The constraint was no frameworks. Building cart state, DOM updates, and page transitions in vanilla JS forces you to understand exactly what React and similar tools are abstracting away.",
    solution:
      "Cart state is held in a plain JavaScript object and persisted to localStorage. Product data is stored as a JS array and rendered into the DOM on page load. Event delegation handles clicks on dynamically rendered elements without attaching hundreds of listeners.",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "SQL"],
    status: "complete",
    year: "2023",
    githubUrl: "https://github.com/anuarafiq/Paradise-Shoes",
    featured: false,
    visual: "storefront",
  },
  {
    id: 6,
    slug: "path-os",
    title: "Path OS",
    description:
      "Career navigation platform that links job seekers, employers, and universities through AI career pathing, candidate matching, and graduate outcome tracking. Took 2nd place in Web and Mobile Application at the International PBL Expo 2026.",
    longDescription:
      "Path OS is a full-stack career navigation platform. It has three connected user groups (candidates, employers, and universities), and each one gets its own dashboard. Candidates get AI-powered career path visualization built with React Flow, personalized coaching, and a living portfolio. Employers get intelligent candidate matching and talent retention signals. Universities get graduate outcome tracking and curriculum feedback loops.",
    problem:
      "Career navigation is fragmented. Job boards show listings but not pathways. University systems track enrollment, not outcomes. Path OS tries to connect all three sides. It shows candidates realistic career paths, gives employers better matching, and tells universities how their graduates actually do.",
    solution:
      "Built on Next.js App Router with Supabase handling auth and the relational data layer. The career path visualizer uses React Flow to render branching trajectory graphs. AI features run through Vercel AI SDK with Google and Groq as model providers. Role-based routing separates the candidate, employer, and university surfaces into distinct dashboard experiences.",
    tags: ["Next.js", "TypeScript", "Supabase", "AI SDK", "React Flow", "Tailwind"],
    status: "wip",
    year: "2026",
    githubUrl: "https://github.com/anuarafiq/path-os",
    liveUrl: "https://www.path-os.tech",
    featured: true,
    visual: "flow",
    award: "2nd Place, International PBL Expo 2026 (Web and Mobile Application)",
    screenshots: [
      { src: "/projects/path-os/hero.jpg", alt: "Path OS landing page in dark mode, with one-click candidate and employer demo buttons" },
      { src: "/projects/path-os/graph.png", alt: "Path OS career path graph showing engineering roles from intern to VP with salary ranges" },
    ],
  },
  {
    id: 5,
    slug: "portfolio",
    title: "This Portfolio",
    description:
      "Rebuilt from scratch with a committed editorial aesthetic. Typography-led design, intentional motion, ink-on-paper palette. The constraint was the brief.",
    longDescription:
      "A personal portfolio built in React and Vite with Tailwind CSS. The design is editorial: ink-on-paper palette, Cormorant Garamond for serif, IBM Plex Mono for monospace, Framer Motion for staggered page-load animations. Every decision has a reason.",
    problem:
      "Most developer portfolios look the same: dark mode, neon accents, card grids. The challenge was building something that felt considered and personal without being over-designed.",
    solution:
      "Committed to a single aesthetic, ink on paper, and applied it consistently across typography, spacing, and motion. Data is separated from presentation (projects, posts, and status live in /data). Components are small and single-purpose.",
    tags: ["React", "Tailwind", "Vite", "Framer Motion", "Web Design"],
    status: "wip",
    year: "2026",
    githubUrl: "https://github.com/anuarafiq/portfolio",
    featured: false,
    visual: "typescale",
  },
].sort((a, b) => Number(b.year) - Number(a.year))
