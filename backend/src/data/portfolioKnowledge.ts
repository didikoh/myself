export type KnowledgeCategory =
  | "profile"
  | "education"
  | "roles"
  | "skills"
  | "experience"
  | "projects"
  | "interests";

export interface KnowledgeChunk {
  id: string;
  category: KnowledgeCategory;
  title: string;
  content: string;
  keywords: string[];
  priority?: number;
}

// Keep this date in sync with the portfolio content below. It lets the model
// distinguish a current "Present" role from undated training data.
export const portfolioDataUpdatedAt = "2026-07-28";

export const portfolioKnowledge: KnowledgeChunk[] = [
  {
    id: "profile-summary",
    category: "profile",
    title: "Profile summary",
    content:
      "Koh Wei Zhen is a Kuala Lumpur-based Game Developer and Web Developer. He is a software developer experienced in full-stack web applications, interactive 3D sales platforms, AI chatbots, multiplayer games, blockchain integrations, and immersive XR experiences. His main technologies include React, TypeScript, PHP, MySQL, Angular, C#, Python, Babylon.js, Unity, and Unreal Engine.",
    keywords: [
      "Koh Wei Zhen",
      "about",
      "about you",
      "background",
      "bio",
      "introduction",
      "introduce yourself",
      "summary",
      "yourself",
      "who are you",
      "developer",
      "Kuala Lumpur",
    ],
    priority: 10,
  },
  {
    id: "profile-contact",
    category: "profile",
    title: "Contact options and social links",
    content:
      "Visitors can contact Koh Wei Zhen directly by WhatsApp at +60 18-219 8225 (https://wa.me/60182198225) or by email at didikoh@hotmail.com. They can also use the Contact section and message form on this portfolio page. Professional and social profiles: GitHub: https://github.com/didikoh. LinkedIn: https://www.linkedin.com/in/wei-zhen-koh-54bb651a2/. Facebook: https://www.facebook.com/didi.koh.9/. Instagram: https://instagram.com/didikoh.",
    keywords: [
      "contact",
      "contact form",
      "email",
      "WhatsApp",
      "phone",
      "message",
      "reach out",
      "get in touch",
      "talk to him",
      "speak with him",
      "schedule a call",
      "meeting",
      "GitHub",
      "LinkedIn",
      "Facebook",
      "Instagram",
      "social",
      "hire",
    ],
    priority: 9,
  },
  {
    id: "profile-personal",
    category: "profile",
    title: "Personal details",
    content:
      "Birthday: February 25, 1999. Zodiac: Pisces. MBTI: ENFP.",
    keywords: ["birthday", "age", "zodiac", "Pisces", "MBTI", "ENFP"],
    priority: 4,
  },
  {
    id: "education-degree",
    category: "education",
    title: "Education",
    content:
      "Bachelor of Computer Game Development at Asia Pacific University of Technology & Innovation (APU), Bukit Jalil, Kuala Lumpur, from 2018 to 2021. It was a dual-degree programme with Staffordshire University, United Kingdom. CGPA: 3.20/4.00 (Second Upper). Certificate: https://drive.google.com/file/d/1j5oTN--x9bFQoxvBipbJByctxbXU9Iza/view.",
    keywords: [
      "education",
      "degree",
      "university",
      "college",
      "APU",
      "Staffordshire",
      "CGPA",
      "certificate",
      "qualification",
      "study",
    ],
    priority: 8,
  },
  {
    id: "roles-focus",
    category: "roles",
    title: "Professional focus",
    content:
      "Game Developer: builds interactive experiences with Unity and Unreal Engine, from 2D indie games to immersive 3D worlds. Full-Stack Web Developer: designs and develops dynamic applications using React, TypeScript, Node.js, and PHP. 3D/Interactive Developer: creates real-time 3D visualisations and interactive content using Babylon.js and WebGL.",
    keywords: [
      "role",
      "focus",
      "specialization",
      "game developer",
      "full stack",
      "web developer",
      "3D developer",
      "interactive developer",
    ],
    priority: 8,
  },
  {
    id: "skills-web-application",
    category: "skills",
    title: "Web, application, and data skills",
    content:
      "Frontend and application skills: HTML, CSS, JavaScript, TypeScript, React, Angular, Next.js, Vite, Zustand, Redux, Redux Toolkit, Konva.js, and Telegram Mini App. Backend and data skills: Python, C#, ASP.NET, PHP, Laravel, Slim 4, Node.js, Express.js, Fastify, RESTful API, Eloquent ORM, MySQL, PostgreSQL, pgvector, Supabase, Redis, OAuth 2.0, Telegram Bot API, and Web3 Integration.",
    keywords: [
      "skills",
      "frontend",
      "backend",
      "full stack",
      "web development",
      "application development",
      "database",
      "API",
      "React",
      "TypeScript",
      "Node.js",
      "PHP",
      "PostgreSQL",
    ],
    priority: 9,
  },
  {
    id: "skills-game-3d-xr",
    category: "skills",
    title: "Game, 3D, and XR skills",
    content:
      "Game, 3D, and XR skills: Unity, Unreal Engine 4, Unreal Engine 5, Unreal Engine C++, Unreal Engine Pixel Streaming, C++, Blender, Mixed Reality, Augmented Reality, Virtual Reality, Metaverse Development, Multiplayer Synchronization, Game AI, Steam Advanced Sessions, Verge3D, Babylon.js, WebRTC & CoTURN, WebGPU, Godot, and Perforce.",
    keywords: [
      "skills",
      "game development",
      "3D",
      "XR",
      "Unity",
      "Unreal Engine",
      "C++",
      "Babylon.js",
      "AR",
      "VR",
      "Metaverse",
    ],
    priority: 8,
  },
  {
    id: "skills-ai-devops-tools",
    category: "skills",
    title: "AI, DevOps, infrastructure, and tool skills",
    content:
      "AI and automation skills: Automation, LLM API Integration, RAG Chatbot, LLM Gateway, and Multi-Agent Development. DevOps and infrastructure skills: Cloudflare, Docker, GitHub Actions, CI/CD, Linux VPS Administration, Apache HTTP Server, Reverse Proxy Configuration, PM2 Process Management, and Cloudflare Tunnel. Tools and design skills: Playwright and Figma.",
    keywords: [
      "skills",
      "AI",
      "automation",
      "LLM",
      "RAG",
      "DevOps",
      "infrastructure",
      "Docker",
      "CI/CD",
      "Cloudflare",
      "Playwright",
      "Figma",
    ],
    priority: 7,
  },
  {
    id: "experience-ck-group",
    category: "experience",
    title: "Software Developer at CK Group",
    content:
      "Software Developer at CK Group, Kuala Lumpur, September 2024 to Present (as of the portfolio update date). Built responsive React, Vite, and TypeScript applications with reusable, user-focused interfaces. Designed and maintained PHP and MySQL backends, data handling, and APIs. Built virtual real-estate sales platforms combining frontend, backend, data-driven features, and interactive tools. Integrated Babylon.js for interactive 3D property experiences. Managed hosting, deployment, server workflows, and production troubleshooting. Worked with clients and designers to turn business and visual requirements into features. Technologies: React, TypeScript, Vite, PHP, MySQL, Babylon.js, Unity, Unreal Engine, C++.",
    keywords: [
      "CK Group",
      "current job",
      "current role",
      "present",
      "work experience",
      "employment",
      "software developer",
      "real estate",
    ],
    priority: 10,
  },
  {
    id: "experience-art-wardens",
    category: "experience",
    title: "Software Developer at ART WARDENS",
    content:
      "Software Developer at ART WARDENS SDN BHD, Penang, May 2024 to August 2024. Built Unreal Engine 5 gameplay systems including local and online multiplayer, animation, interactive mechanics, and Blueprint features. Integrated blockchain wallet functionality into Unity game features. Implemented wallet connection, transaction request, user confirmation, and transaction-status flows. Technologies: Unreal Engine 5, Blueprint, Unity, Blockchain, TON Wallet.",
    keywords: [
      "ART WARDENS",
      "work experience",
      "employment",
      "multiplayer",
      "blockchain",
      "TON Wallet",
      "Unreal Engine 5",
    ],
    priority: 7,
  },
  {
    id: "experience-fusionex",
    category: "experience",
    title: "Software Developer at FUSIONEX GROUP",
    content:
      "Software Developer at FUSIONEX GROUP, Kuala Lumpur, September 2022 to February 2024. Built a full-stack AI chatbot with LLM API integration, using Angular on the frontend and C# and Python for backend services. Built a full-stack Angular and C# admin portal with backend APIs. Created Unity Metaverse and Augmented Reality applications. Tested, debugged, and optimised application features, and supported QA through test plans, validation, and issue reporting. Technologies: Unity, AR Foundation, Angular, C#, Python, Metaverse.",
    keywords: [
      "Fusionex",
      "work experience",
      "employment",
      "AI chatbot",
      "admin portal",
      "Metaverse",
      "QA",
    ],
    priority: 8,
  },
  {
    id: "experience-gamecode",
    category: "experience",
    title: "Unreal Engine Programmer at Gamecode Media",
    content:
      "Unreal Engine Programmer at Gamecode Media, Kuala Lumpur, March 2022 to July 2022. Built PC and VR gameplay prototypes with Unreal Engine Blueprint. Tested, debugged, and refined interactive gameplay features. Technologies: Unreal Engine, Blueprint, VR.",
    keywords: [
      "Gamecode Media",
      "work experience",
      "employment",
      "Unreal Engine Programmer",
      "game programmer",
      "VR",
    ],
    priority: 5,
  },
  {
    id: "experience-ministry-xr",
    category: "experience",
    title: "XR Software Developer Intern at Ministry XR",
    content:
      "Intern — XR Software Developer at Ministry XR, Kuala Lumpur, March 2020 to June 2020. Contributed to an XR education application for Microsoft HoloLens and interactive learning. Integrated 3D models, animations, and interactive elements into immersive XR environments. Technologies: HoloLens, XR, Unity.",
    keywords: [
      "Ministry XR",
      "intern",
      "internship",
      "work experience",
      "employment",
      "HoloLens",
      "XR education",
    ],
    priority: 4,
  },
  {
    id: "project-guocoland-masterplan",
    category: "projects",
    title: "The Rise — Guocoland Masterplan",
    content:
      "A real-time 3D masterplan viewer built with React, TypeScript, and Babylon.js. It has property filters, land-material switching, toggleable building models, and integrated unit information. Website: https://goprop360.com/goland/therise/masterplan.",
    keywords: [
      "project",
      "The Rise",
      "Guocoland",
      "masterplan",
      "property filter",
      "Babylon.js",
    ],
    priority: 10,
  },
  {
    id: "project-guocoland-web",
    category: "projects",
    title: "The Rise — Guocoland Web",
    content:
      "A React and TypeScript marketing site with fast-loading Pano2VR and Object2VR unit tours, allowing visitors to browse unit types without full 3D overhead. Website: https://goprop360.com/goland/therise/.",
    keywords: [
      "project",
      "The Rise",
      "Guocoland",
      "marketing website",
      "Pano2VR",
      "Object2VR",
    ],
    priority: 6,
  },
  {
    id: "project-causewayz",
    category: "projects",
    title: "Exsim Causewayz JBCC",
    content:
      "A fully interactive 3D web platform for Causewayz Square at JBCC, featuring Babylon.js scenes, 360-degree tours, and floor plans. Technologies: React, TypeScript, Babylon.js. Website: https://causewayz.com.my/.",
    keywords: ["project", "Exsim", "Causewayz", "JBCC", "360 tour", "floor plan"],
    priority: 9,
  },
  {
    id: "project-anyara",
    category: "projects",
    title: "Anyara Hills",
    content:
      "A vanilla JavaScript and Verge3D land platform with a real-time 3D masterplan, plot filtering, lot details, availability highlights, drone 360-degree views, and MHUB booking integration. Technologies: JavaScript, Verge3D, PHP, MySQL, HTML, CSS. Website: https://goprop360.com/goland/anyara/go540/.",
    keywords: ["project", "Anyara Hills", "Anyara", "Verge3D", "MHUB", "land platform"],
    priority: 7,
  },
  {
    id: "project-bhp-unreal",
    category: "projects",
    title: "Bangsar Hill Park — Unreal Engine",
    content:
      "An Unreal Engine interactive showcase with real-time 3D interaction and immersive environments for sales galleries and presentations. Technologies: Unreal Engine, C++, Blueprint.",
    keywords: ["project", "Bangsar Hill Park", "BHP", "sales gallery", "Unreal Engine"],
    priority: 5,
  },
  {
    id: "project-bhp-web",
    category: "projects",
    title: "Bangsar Hill Park — Web 3D",
    content:
      "A React and Babylon.js 3D viewer with building exploration, full-floor sectional views, level switching, unit browsing, and aerial perspectives. Technologies: React, TypeScript, Babylon.js, Pano2VR. Website: https://goprop.ai/go540/bhp/.",
    keywords: ["project", "Bangsar Hill Park", "BHP", "Web 3D", "floor section"],
    priority: 6,
  },
  {
    id: "project-celora-3d",
    category: "projects",
    title: "Collectiv Land — Celora 3D demo",
    content:
      "A game-like React and Babylon.js property explorer with type and orientation filters, sectional floor-plan browsing, facility exploration, and Pano2VR level views. Technologies: React, TypeScript, Babylon.js, Pano2VR. Demo: https://goprop360.com/demo/celora/.",
    keywords: ["project", "Collectiv Land", "Celora", "3D demo", "property explorer"],
    priority: 5,
  },
  {
    id: "project-celora-branding",
    category: "projects",
    title: "Collectiv Land — Celora Branding demo",
    content:
      "An interactive branding site with cinematic, scroll-based 3D background animation and smooth Babylon.js transitions. Technologies: React, TypeScript, Babylon.js. Website: https://goprop360.com/demo/celora_branding/.",
    keywords: ["project", "Collectiv Land", "Celora", "branding", "scroll animation"],
    priority: 4,
  },
  {
    id: "project-goprop-platform",
    category: "projects",
    title: "GoProp Platform",
    content:
      "A full-stack real-estate platform with interactive 3D visuals and region-based facility, landmark, amenity, and property information across multiple cities. It includes LLM integration. Technologies: React, TypeScript, PHP, MySQL, LLM Integration, Babylon.js. Website: https://goprop.ai/my.",
    keywords: ["project", "GoProp", "platform", "LLM", "real estate", "full stack"],
    priority: 8,
  },
  {
    id: "project-goprop-landing",
    category: "projects",
    title: "GoProp Landing Website",
    content:
      "A responsive React landing site that presents GoProp services, guides visitors into the platform, captures leads, and includes smooth animation and analytics. Technologies: React, TypeScript, PHPMailer. Website: https://goprop.ai.",
    keywords: ["project", "GoProp", "landing", "lead capture", "analytics", "PHPMailer"],
    priority: 5,
  },
  {
    id: "project-iskandar-wawari",
    category: "projects",
    title: "Iskandar Wawari Johor",
    content:
      "A large-scale Unity visualisation for an eight-screen video wall, presenting IIB Wawari developments and regional highlights in a museum-style experience. Technologies: Unity, C#.",
    keywords: ["project", "Iskandar", "Wawari", "Johor", "video wall", "IIB"],
    priority: 5,
  },
  {
    id: "project-pearlmont",
    category: "projects",
    title: "Skyworld Pearlmont",
    content:
      "A React and TypeScript landing site with smooth animation and multi-page content about PPVC initiatives, healthy living, and user registration. Website: https://skyworld.my/skyworldpearlmont/.",
    keywords: ["project", "Skyworld", "Pearlmont", "PPVC", "healthy living"],
    priority: 5,
  },
  {
    id: "project-bestudio",
    category: "projects",
    title: "Be-studio System",
    content:
      "A React and TypeScript membership and class-management system with course purchases, credit tracking, coupons, user accounts, and an admin dashboard for members, classes, and transactions. Backend technologies: PHP and MySQL. Website: https://bestudiobp.com/.",
    keywords: ["project", "Be-studio", "membership", "class management", "admin dashboard"],
    priority: 9,
  },
  {
    id: "project-mekk",
    category: "projects",
    title: "Mekk playground project",
    content:
      "Mekk is a playful cat-chasing-mouse game where players catch mice, build combos, and chase a high score. Technologies: React, TypeScript, Vite, PixiJS. Website: https://kooteefamily.com/mekk.",
    keywords: ["project", "playground", "personal project", "Mekk", "cat game", "PixiJS"],
    priority: 7,
  },
  {
    id: "interests-current",
    category: "interests",
    title: "Interests",
    content:
      "Koh Wei Zhen is deeply interested in AI evolution and real-world applications, emerging technology such as next-generation engines, advanced hardware and neural interfaces, and gaming as both a player and a creator of immersive interactive experiences.",
    keywords: [
      "interest",
      "hobby",
      "fun fact",
      "AI",
      "emerging technology",
      "gaming",
      "games",
    ],
    priority: 5,
  },
];
