// Mirrors the Competitions / Campus Involvements / Certifications sections of public/resume.pdf.
// Newest first. `url` is optional: internal paths render as router links, full URLs open in a new tab.

export const competitions = [
  { title: "2nd Place", event: "International PBL Expo 2026 (Web and Mobile Application)", date: "Sept 2026" },
  { title: "Silver Medal", event: "Malaysia-Japan International Conference", date: "Jan 2026" },
  { title: "Gold Medal", event: "Virtual Innovation Competition Exhibition", date: "Nov 2025" },
  { title: "2nd Runner Up", event: "Top Coder National Level", date: "Oct 2025" },
  { title: "Champion", event: "Top Coder University Level", date: "July 2025" },
  { title: "Gold Medal", event: "Malaysia Invention & Innovation Expo", date: "May 2025" },
]

export const campus = [
  {
    role: "Trainer",
    org: "Intro to GitHub Workshop",
    group: "Google Developer Student Club UTP",
    date: "Jul 2026",
    points: [
      "Designed and delivered a hands-on GitHub workshop for 11 first-time users, 90% of whom entered as true beginners, pairing a custom repo and facilitator guide with pre/post-workshop materials; earned a 4.7/5 average experience rating.",
      "All 11 participants independently completed their first commit, push, and pull request by the end of the session, with 100% of surveyed attendees reporting they gained new GitHub skills.",
    ],
  },
  {
    role: "Project Manager",
    org: "Waves of Change: AI Literacy Programme",
    group: "University Social Responsibility",
    date: "Jun 2026 - Sep 2026",
    points: [
      "Earned an 87.5% recommend rate from surveyed participants after directing a 20-person UTP committee to design and deliver a four-module AI literacy curriculum for 40 Form 3 students at MCKK.",
      "Secured and managed over RM6,000 budget across 4 sponsors, overseeing stakeholder liaison with UTP management, the advisor, and school administration.",
    ],
  },
  {
    role: "Head of Cluster Dakwah",
    org: "Rakan Masjid UTP",
    date: "Jan 2026 - Present",
    points: [
      "Leads 8 committee members and 60+ general members, coordinating 5+ programmes each semester across planning, execution, and reporting.",
      "Authored the Dakwah cluster's standardized guideline document (objectives, job scopes, KPIs, documentation), now the reference point committee members turn to for resolving role conflicts and functional misunderstandings across all 5+ semester programmes.",
    ],
  },
  {
    role: "Project Director",
    org: "MathEZ",
    group: "Rakan Masjid UTP",
    date: "Oct 2025 - Nov 2025",
    points: [
      "Secured over RM1,000 in revenue and sponsorships; over 90% of students reported improved understanding and exam performance.",
      "Directed a 14-person team to run a paid 1-to-1 tutoring programme for 10+ high school students, managing budgeting, logistics, and documentation.",
    ],
  },
]

export const certifications = [
  { title: "Full Stack Web Development Program Certificate", issuer: "Finlatics", date: "Sept 2026" },
  {
    title: "Data Science and Machine Learning Program Certificates",
    issuer: "Finlatics",
    date: "May 2026",
    url: "/notes/data-science-and-ml",
  },
  { title: "Python (Basic) Certificate", issuer: "HackerRank", date: "Mar 2026" },
]
