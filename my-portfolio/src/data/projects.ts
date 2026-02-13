export type Project = {
  slug: "intern" | "eduplayground" | "dishcovery";
  title: string;
  shortSummary: string;
  role: string;
  team: string;
  stack: string[];
  tags: string[];
  heroImage?: string; // "/projects/intern.png"
  demoVideo?: string; // "/projects/demo.mov"
  galleryImages?: string[]; // ["/projects/design.png", ...]
  githubUrl?: string;
  demoUrl?: string;
  notes?: string[];
  contributions: string[];
  features: string[];
  challenges: string[];
};

export const projects: Project[] = [
  {
    slug: "intern",
    title: "Parachannel",
    shortSummary:
      "This is a job platform that connects companies and job seekers with disabilities, streamlining listings, applications, and hiring progress in one place.",
    role: "Frontend Engineer (Intern)",
    team: "1 frontend (me), 1 backend, supported by mentors",
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS", "GitHub", "Figma"],
    tags: ["React", "TypeScript", "Figma → UI", "Mentored PRs", "Internship"],
    heroImage: "/projects/Parachannel_Web.png",
    galleryImages: [
      "/projects/Parachannel_Web.png",
      "/projects/Parachannel_Web2.png",
      "/projects/Parachannel_Web3.png",
    ],
    contributions: [
      "Implemented UI components based on Figma designs",
      "Built company-side pages and reusable UI patterns",
      "Started connecting frontend with backend APIs (in progress)",
      "Fixing UI bugs and refactoring code during daily reviews/PR feedback (ongoing)",
    ],
    features: [
      "Company and job seeker portal: centralizes listings, applications, and hiring progress in one place",
      "Company and Applicant accounts: sign up / log in and manage profile settings",
      "Job postings and applications: create, edit, publish, and manage applications.",
      "Interview tracking: schedule interviews and track status in the hiring pipeline.",
    ],
    challenges: [
      "Understanding a production codebase and conventions",
      "Building confidence in frontend–backend integration (REST APIs, async data fetching)",
    ],
  },
  {
    slug: "eduplayground",
    title: "EduPlayground",
    shortSummary:
      "This is an interactive learning web app for kids with mini-games and progress tracking for parents, supporting SDG 4 (Quality Education).",
    role: "Frontend Developer & UI/UX Designer",
    team: "4 members (2 backend, 2 frontend/design)",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "JWT",
      "JSON DB",
      "Canva",
    ],
    tags: ["React", "TypeScript", "UI/UX", "Team Project"],
    heroImage: "/projects/Eduplayground_Web.png",
    demoVideo: "/projects/Eduplayground_Demo.mov",
    galleryImages: [
      "/projects/Eduplayground_Design.png",
      "/projects/Eduplayground_UML.png",
      "/projects/Eduplayground_Web.png",
    ],
    githubUrl: "https://github.com/lxymahatma/2025-WebInfo/tree/main/final",
    notes: ["Project is part of a larger course repository."],
    contributions: [
      "Led UI/UX design for layout, and interactions based on use case and storyboard",
      "Created UML diagrams to clarify system structure",
      "Built Memory Card Game UI with interactions handling",
      "Implemented Sign-In / Sign-Up UI pages",
    ],
    features: [
      "3 mini-games: Drag & Drop, Timed Quiz, and Memory Card for playful learning.",
      "Progress Tracker: play counts, most-played game, and reset for parents/guardians.",
      "Profile customization: avatar/photo, items to collect/equip, and basic account edits.",
      "Accounts: sign up / sign in / sign out to save each child’s progress.",
    ],
    challenges: [
      "Learned to design kid-friendly UI with simple layouts, and clear feedback.",
      "Learned to structure states and components.",
      "Improved understanding of team communication between frontend and backend through connecting pages",
    ],
  },
  {
    slug: "dishcovery",
    title: "Dishcovery",
    shortSummary:
      "This is a restaurant discovery site that combines a fun food quiz with filtered recommendations and map viewing to help users quickly find nearby places that match their preferences.",
    role: "Frontend Lead (HTML/CSS) & UI/UX Contributor",
    team: "8 members (HTML/CSS: 3)",
    stack: [
      "HTML",
      "CSS",
      "Vanilla JS",
      "Spoonacular API",
      "Google Maps API",
      "Formspree",
      "Canva",
    ],
    tags: ["HTML", "CSS", "Vanilla JS", "UI/UX", "Team Project"],
    heroImage: "/projects/Dishcovery_Web.png",
    demoVideo: "/projects/Dishcovery_Demo.mov",
    galleryImages: [
      "/projects/Dishcovery_Design.png",
      "/projects/Dishcovery_Web.png",
    ],
    githubUrl: "https://github.com/Myatmade/PBL4",
    notes: [
      "Development was coordinated via LINE; this repository contains the merged copy for portfolio viewing.",
    ],
    contributions: [
      "Led HTML/CSS implementation for quiz and recipe pages",
      "Ensured consistent layout and typography",
      "Contributed to UI/UX planning and overall flow",
    ],
    features: [
      "Food Quiz: help users discover restaurants they might like",
      "Filtered recommendations with map locations: region, dietary preference, flavor profile, student discount",
      "Recipe section: explore dishes beyond just the restaurant list",
      "Account flow: sign up / sign in / sign out and edit user profile details",
    ],
    challenges: [
      "Responsive layout without a component framework",
      "Keeping UI consistent while iterating quickly as a team",
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
