import type {
  PersonalInfo,
  Project,
  SocialLink,
  TimelineSkill,
  AboutInfo,
  WorkExperience,
  PlaygroundProject,
} from "../types";

export const personalInfo: PersonalInfo = {
  name: "Koh Wei Zhen",
  title: "Game Developer & Web Developer",
  description:
    "Software developer experienced in building full-stack web applications, interactive 3D sales platforms, AI chatbots, multiplayer games, blockchain integrations, and immersive XR experiences using React, TypeScript, PHP, MySQL, Angular, C#, Python, Babylon.js, Unity, and Unreal Engine.",
  avatar: "my-photo/me.jpg", // Cat avatar placeholder
  email: "didikoh@hotmail.com",
  github: "https://github.com/didikoh",
  linkedin: "https://www.linkedin.com/in/wei-zhen-koh-54bb651a2/",
};

export const timelineSkills: TimelineSkill[] = [
  { year: 2017, month: "", skill: "HTML" },
  { year: 2017, month: "", skill: "CSS" },
  { year: 2018, month: "", skill: "Python" },
  { year: 2018, month: "", skill: "C#" },
  { year: 2018, month: "", skill: "Unity" },
  { year: 2018, month: "", skill: "JavaScript" },
  { year: 2019, month: "", skill: "Blender" },
  { year: 2019, month: "", skill: "Unreal Engine 4" },
  { year: 2019, month: "", skill: "C++" },
  { year: 2020, month: "", skill: "Mixed Reality" },
  { year: 2020, month: "", skill: "Multiplayer Synchronization" },
  { year: 2020, month: "", skill: "Game AI" },
  { year: 2021, month: "", skill: "Automation" },
  { year: 2022, month: "", skill: "Unreal Engine 5" },
  { year: 2022, month: "", skill: "Virtual Reality" },
  { year: 2022, month: "", skill: "Steam Advanced Sessions" },
  { year: 2023, month: "", skill: "Augmented Reality" },
  { year: 2023, month: "", skill: "Metaverse Development" },
  { year: 2023, month: "", skill: "ASP.NET" },
  { year: 2023, month: "", skill: "Angular" },
  { year: 2024, month: "", skill: "LLM API Integration" },
  { year: 2024, month: "", skill: "Telegram Bot API" },
  { year: 2024, month: "", skill: "Telegram Mini App" },
  { year: 2024, month: "", skill: "Web3 Integration" },
  { year: 2024, month: "", skill: "Verge3D" },
  { year: 2025, month: "", skill: "Playwright" },
  { year: 2025, month: "", skill: "React" },
  { year: 2025, month: "", skill: "Vite" },
  { year: 2025, month: "", skill: "TypeScript" },
  { year: 2025, month: "", skill: "Babylon.js" },
  { year: 2025, month: "", skill: "PHP" },
  { year: 2025, month: "", skill: "RESTful API" },
  { year: 2025, month: "", skill: "Laravel" },
  { year: 2025, month: "", skill: "MySQL" },
  { year: 2025, month: "", skill: "Node.js" },
  { year: 2025, month: "", skill: "Cloudflare" },
  { year: 2025, month: "", skill: "Unreal Engine C++" },
  { year: 2025, month: "", skill: "RAG Chatbot" },
  { year: 2026, month: "", skill: "Slim 4" },
  { year: 2026, month: "", skill: "Fastify" },
  { year: 2026, month: "", skill: "Express.js" },
  { year: 2026, month: "", skill: "Next.js" },
  { year: 2026, month: "", skill: "Eloquent ORM" },
  { year: 2026, month: "", skill: "Zustand" },
  { year: 2026, month: "", skill: "Redux" },
  { year: 2026, month: "", skill: "Redux Toolkit" },
  { year: 2026, month: "", skill: "Konva.js" },
  { year: 2026, month: "", skill: "PostgreSQL" },
  { year: 2026, month: "", skill: "pgvector" },
  { year: 2026, month: "", skill: "Supabase" },
  { year: 2026, month: "", skill: "Redis" },
  { year: 2026, month: "", skill: "Docker" },
  { year: 2026, month: "", skill: "GitHub Actions" },
  { year: 2026, month: "", skill: "CI/CD" },
  { year: 2026, month: "", skill: "Linux VPS Administration" },
  { year: 2026, month: "", skill: "Apache HTTP Server" },
  { year: 2026, month: "", skill: "Reverse Proxy Configuration" },
  { year: 2026, month: "", skill: "PM2 Process Management" },
  { year: 2026, month: "", skill: "Cloudflare Tunnel" },
  { year: 2026, month: "", skill: "OAuth 2.0" },
  { year: 2026, month: "", skill: "Unreal Engine Pixel Streaming" },
  { year: 2026, month: "", skill: "WebRTC & CoTURN" },
  { year: 2026, month: "", skill: "WebGPU" },
  { year: 2026, month: "", skill: "Godot" },
  { year: 2026, month: "", skill: "Perforce" },
  { year: 2026, month: "", skill: "Figma" },
  { year: 2026, month: "", skill: "LLM Gateway" },
  { year: 2026, month: "", skill: "Multi-Agent Development" },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "The Rise - Guocoland Masterplan",
    description:
      "A real-time 3D masterplan viewer built with React and Babylon.js, featuring interactive property filters, land-material switching, toggleable building models, and integrated unit information for an intuitive property exploration experience.",
    images: [
      "/projects/CKG/Guocoland_540/Masterplan_1.webp",
      "/projects/CKG/Guocoland_540/Masterplan_2.webp",
      "/projects/CKG/Guocoland_540/Filter.webp",
    ],
    technologies: ["React", "TypeScript", "Babylon.js"],
    links: [
      {
        type: "website",
        url: "https://goprop360.com/goland/therise/masterplan",
        label: "Website",
      },
      {
        type: "video",
        url: "projects/CKG/Guocoland_540/Guocoland_masterplan.mp4",
        label: "Video",
      },
    ],
    featured: true,
  },
  {
    id: "2",
    title: "The Rise - Guocoland Web",
    description:
      "A React-based marketing site combined with fast-loading Pano2VR and Object2VR unit tours, allowing users to quickly browse unit types without the overhead of full 3D interaction.",
    images: [
      "/projects/CKG/Guocoland_Web/Landing.webp",
      "/projects/CKG/Guocoland_Web/Floorplan.webp",
      "/projects/CKG/Guocoland_Web/Interior.webp",
      "/projects/CKG/Guocoland_Web/Location.webp",
    ],
    technologies: ["React", "TypeScript", "Pano2VR", "Object2VR"],
    links: [
      {
        type: "website",
        url: "https://goprop360.com/goland/therise/",
        label: "Website",
      },
    ],
    featured: false,
  },
  {
    id: "3",
    title: "Exsim Causewayz JBCC",
    description:
      "A fully interactive 3D web platform that showcases Causewayz Square @ JBCC with immersive Babylon.js scenes, 360° tours, floor plans.",
    images: [
      "/projects/CKG/Causewayz_Exsim/LandingSD.webp",
      "/projects/CKG/Causewayz_Exsim/LandingHD.webp",
      "/projects/CKG/Causewayz_Exsim/540.webp",
      "/projects/CKG/Causewayz_Exsim/Concept.webp",
      "/projects/CKG/Causewayz_Exsim/FloorPlan.webp",
    ],
    technologies: ["React", "TypeScript", "Babylon.js"],
    links: [
      {
        type: "website",
        url: "https://causewayz.com.my/",
        label: "Website",
      },
      {
        type: "video",
        url: "projects/CKG/Causewayz_Exsim/0930.mp4",
        label: "Video",
      },
    ],
    featured: true,
  },
  {
    id: "4",
    title: "Anyara Hills",
    description:
      "Anyara is a vanilla JavaScript + Verge3D land platform featuring a real-time 3D masterplan with plot filtering, lot information, availability highlights, and integrated drone 360° views, fully connected to MHUB for seamless booking.",
    images: [
      "/projects/CKG/Anyara/Landing.webp",
      "/projects/CKG/Anyara/Masterplan.webp",
      "/projects/CKG/Anyara/Location.webp",
      "/projects/CKG/Anyara/Drone.webp",
    ],
    technologies: ["JavaScript", "Verge3D", "PHP", "MySQL", "HTML", "CSS"],
    links: [
      {
        type: "website",
        url: "https://goprop360.com/goland/anyara/go540/",
        label: "Website",
      },
      {
        type: "video",
        url: "projects/CKG/Anyara/Anyara.mp4",
        label: "Video",
      },
    ],
    featured: false,
  },
  {
    id: "5",
    title: "Bangsar Hill Park - Unreal Engine",
    description:
      "A Unreal Engine interactive showcase delivering real-time 3D interaction and immersive environments for use in sales galleries and high-end presentations.",
    images: [
      "/projects/CKG/BHP/Home.webp",
      "/projects/CKG/BHP/Unit.webp",
      "/projects/CKG/BHP/Facility.webp",
    ],
    technologies: ["Unreal Engine", "C++", "Blueprint"],
    links: [
      {
        type: "video",
        url: "projects/CKG/BHP/BHP.mp4",
        label: "Video",
      },
    ],
    featured: false,
  },
  {
    id: "6",
    title: "Bangsar Hill Park - Web 3D",
    description:
      "A React and Babylon.js 3D viewer offering immersive building exploration with full-floor sectional views, interactive level switching, unit browsing, and aerial perspectives.",
    images: [
      "/projects/CKG/BHP_Web/Landing.webp",
      "/projects/CKG/BHP_Web/Unit.webp",
      "/projects/CKG/BHP_Web/Facility.webp",
      "/projects/CKG/BHP_Web/LevelView.webp",
    ],
    technologies: ["React", "TypeScript", "Babylon.js", "Pano2VR"],
    links: [
      {
        type: "website",
        url: "https://goprop.ai/go540/bhp/",
        label: "Website",
      },
    ],
    featured: false,
  },
  {
    id: "7",
    title: "(DEMO) Collectiv Lnad - Celora 3D",
    description:
      "A game-like 3D property explorer built with React and Babylon.js, offering interactive type and orientation filters, sectional floor-plan browsing, facility exploration, and integrated Pano2VR level views for a seamless, fully unified experience.",
    images: [
      "/projects/CKG/Celora/Home.webp",
      "/projects/CKG/Celora/Info.webp",
      "/projects/CKG/Celora/Unit.webp",
    ],
    technologies: ["React", "TypeScript", "Babylon.js", "Pano2VR"],
    links: [
      {
        type: "demo",
        url: "https://goprop360.com/demo/celora/",
        label: "Demo",
      },
    ],
    featured: false,
  },
  {
    id: "8",
    title: "(DEMO) Collectiv Lnad - Celora branding",
    description:
      "An interactive branding site that uses Babylon.js to deliver cinematic scroll-based 3D background animations, allowing users to explore the Celora building through smooth, immersive transitions.",
    images: [
      "/projects/CKG/Celora_Branding/1.webp",
      "/projects/CKG/Celora_Branding/2.webp",
      "/projects/CKG/Celora_Branding/3.webp",
    ],
    technologies: ["React", "TypeScript", "Babylon.js"],
    links: [
      {
        type: "website",
        url: "https://goprop360.com/demo/celora_branding/",
        label: "Website",
      },
    ],
    featured: false,
  },
  {
    id: "9",
    title: "Goprop platform",
    description:
      "A full-stack real estate platform that provides interactive 3D visuals and region-based information—covering facilities, landmarks, amenities, and property details—across multiple cities.",
    images: [
      "/projects/CKG/Goprop/Home.webp",
      "/projects/CKG/Goprop/Rain.webp",
      "/projects/CKG/Goprop/Amenities.webp",
      "/projects/CKG/Goprop/Details.webp",
      "/projects/CKG/Goprop/Chatbot.webp",
    ],
    technologies: [
      "React",
      "TypeScript",
      "PHP",
      "MySQL",
      "LLM Integration",
      "Babylon.js",
    ],
    links: [
      {
        type: "website",
        url: "https://goprop.ai/my",
        label: "Website",
      },
      {
        type: "video",
        url: "projects/CKG/Goprop/goprop_platform.mp4",
        label: "Video",
      },
    ],
    featured: false,
  },
  {
    id: "10",
    title: "Goprop Landing Website",
    description:
      "A modern landing website for GoProp, designed to showcase our services, guide users into the main platform, and capture business leads through smooth animations, responsive UI, and integrated analytics.",
    images: [
      "/projects/CKG/Goprop_Home/Landing.webp",
      "/projects/CKG/Goprop_Home/Feature.webp",
      "/projects/CKG/Goprop_Home/Service1.webp",
      "/projects/CKG/Goprop_Home/Service2.webp",
    ],
    technologies: ["React", "TypeScript", "PHPMailer"],
    links: [
      {
        type: "website",
        url: "https://goprop.ai",
        label: "Website",
      },
    ],
    featured: false,
  },
  {
    id: "11",
    title: "Iskandar Wawari Johor",
    description:
      "A large-scale Unity visualization built for an 8-screen video wall, delivering an immersive, museum-style presentation of IIB Wawari’s key developments and regional highlights.",
    images: [
      "/projects/CKG/Iskandar/Welcome.webp",
      "/projects/CKG/Iskandar/Masterplan.webp",
      "/projects/CKG/Iskandar/Development.webp",
      "/projects/CKG/Iskandar/Development2.webp",
    ],
    technologies: ["Unity", "C#"],
    links: [
    ],
    featured: false,
  },
  {
    id: "12",
    title: "Skyworld Pearlmont",
    description:
      "A modern React-based landing page featuring smooth animations and multi-page content to introduce PPVC initiatives, healthy living concepts, and user registration for SW Pearlmont.",
    images: [
      "/projects/CKG/Pearlmont/Landing.webp",
      "/projects/CKG/Pearlmont/Concept.webp",
      "/projects/CKG/Pearlmont/Concept2.webp",
      "/projects/CKG/Pearlmont/Footer.webp",
    ],
    technologies: ["React", "TypeScript"],
    links: [
      {
        type: "website",
        url: "https://skyworld.my/skyworldpearlmont/",
        label: "Website",
      },
    ],
    featured: false,
  },
  {
    id: "13",
    title: "Be-studio System",
    description:
      "A React-based membership and class-management system for be studio, featuring course purchases, credit tracking, coupons, user accounts, and an integrated admin dashboard for managing members, classes, and transactions.",
    images: [
      "/projects/Own/BeStudio/Home.webp",
      "/projects/Own/BeStudio/Course.webp",
      "/projects/Own/BeStudio/Admin.webp",
    ],
    technologies: ["React", "TypeScript", "PHP", "MySQL"],
    links: [
      {
        type: "website",
        url: "https://bestudiobp.com/",
        label: "Website",
      },
    ],
    featured: true,
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: "1",
    name: "GitHub",
    url: "https://github.com/didikoh",
    icon: "github",
  },
  {
    id: "2",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/wei-zhen-koh-54bb651a2/",
    icon: "linkedin",
  },
  {
    id: "3",
    name: "Facebook",
    url: "https://www.facebook.com/didi.koh.9/",
    icon: "facebook",
  },
  {
    id: "4",
    name: "Instagram",
    url: "https://instagram.com/didikoh",
    icon: "instagram",
  },
];

export const aboutInfo: AboutInfo = {
  introduction: "Birthday: 1999/2/25 | Zodiac: Pisces ♓ | MBTI: ENFP",
  roles: [
    {
      icon: "🎮",
      title: "Game Developer",
      description:
        "Building interactive experiences with Unity and Unreal Engine, from 2D indie games to immersive 3D worlds.",
    },
    {
      icon: "💻",
      title: "Full-Stack Web Developer",
      description:
        "Designing and developing dynamic web applications using React, TypeScript, Node.js, and PHP to deliver seamless user experiences.",
    },
    {
      icon: "🌐",
      title: "3D/Interactive Developer",
      description:
        "Creating real-time 3D visualizations and interactive content using Babylon.js and WebGL technologies.",
    },
  ],
  education: {
    universityName: "Asia Pacific University of Technology & Innovation (APU)",
    degree: "Bachelor of Computer Game Development",
    major:
      "Dual Degree Programmed with Staffordshire University, United Kingdom",
    startYear: 2018,
    endYear: 2021,
    cgpa: "3.20/4.00 (Second Upper)",
    location: "Bukit Jalil, Kuala Lumpur",
    certificateLink:
      "https://drive.google.com/file/d/1j5oTN--x9bFQoxvBipbJByctxbXU9Iza/view",
  },
  funFacts: [
    {
      icon: "🤖",
      text: "Deeply interested in the evolution of AI — from model capabilities to real-world applications.",
      src: "/about/ai.webp",
    },
    {
      icon: "🔬",
      text: "Fascinated by emerging technologies like next-gen engines, advanced hardware, and neural interfaces.",
      src: "/about/r8.webp",
    },
    {
      icon: "🎮",
      text: "Passionate about gaming, both as a player and as a creator of immersive interactive experiences.",
      src: "/about/minecraft.webp",
    },
  ],
};

export const workExperiences: WorkExperience[] = [
  {
    id: "1",
    position: "Software Developer",
    company: "CK Group",
    location: "Kuala Lumpur",
    startDate: "September 2024",
    endDate: "Present",
    responsibilities: [
      "Built responsive frontend applications using React, Vite, and TypeScript, with reusable components and user-focused interfaces.",
      "Designed and maintained PHP and MySQL backend systems, including data handling and API-related functionality.",
      "Built virtual real estate sales platforms combining responsive interfaces, backend services, data-driven functionality, and interactive tools.",
      "Integrated Babylon.js into browser applications to provide interactive 3D property and digital sales experiences.",
      "Managed hosting, deployment, server-related workflows, and production troubleshooting for web applications.",
      "Collaborated with clients and designers to translate business and visual requirements into functional web features.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "PHP",
      "MySQL",
      "Babylon.js",
      "Unity",
      "Unreal Engine",
      "C++"
    ],
  },
  {
    id: "2",
    position: "Software Developer",
    company: "ART WARDENS SDN BHD",
    location: "Penang",
    startDate: "May 2024",
    endDate: "August 2024",
    responsibilities: [
      "Built Unreal Engine 5 gameplay systems, including local and online multiplayer, animation, interactive mechanics, and Blueprint features.",
      "Integrated blockchain wallet functionality into Unity-based game features and transaction-related workflows.",
      "Implemented transaction flows covering wallet connections, requests, user confirmations, and transaction status handling.",
    ],
    technologies: [
      "Unreal Engine 5",
      "Blueprint",
      "Unity",
      "Blockchain",
      "TON Wallet",
    ],
  },
  {
    id: "3",
    position: "Software Developer",
    company: "FUSIONEX GROUP",
    location: "Kuala Lumpur",
    startDate: "September 2022",
    endDate: "February 2024",
    responsibilities: [
      "Built a full-stack AI chatbot solution with LLM API integration, using Angular for the frontend and C# and Python for backend services.",
      "Built a full-stack web admin portal with Angular and C#, covering frontend interfaces, backend APIs, and system functionality.",
      "Created Unity-based Metaverse and Augmented Reality applications with immersive environments and interactive elements.",
      "Tested, debugged, and optimised application features to improve stability and user experience.",
      "Supported QA testing by preparing test plans, validating features, and reporting issues.",
    ],
    technologies: [
      "Unity",
      "AR Foundation",
      "Angular",
      "C#",
      "Python",
      "Metaverse",
    ],
  },
  {
    id: "4",
    position: "Unreal Engine Programmer",
    company: "Gamecode Media",
    location: "Kuala Lumpur",
    startDate: "March 2022",
    endDate: "July 2022",
    responsibilities: [
      "Built PC and VR gameplay prototypes using Unreal Engine Blueprint.",
      "Tested, debugged, and refined interactive gameplay features.",
    ],
    technologies: ["Unreal Engine", "Blueprint", "VR"],
  },
  {
    id: "5",
    position: "Intern - XR Software Developer",
    company: "Ministry XR",
    location: "Kuala Lumpur",
    startDate: "March 2020",
    endDate: "June 2020",
    responsibilities: [
      "Contributed to an XR education application for Microsoft HoloLens and interactive learning experiences.",
      "Integrated 3D models, animations, and interactive elements into immersive XR environments.",
    ],
    technologies: ["HoloLens", "XR", "Unity"],
  },
];

export const playgroundProjects: PlaygroundProject[] = [
  {
    id: "1",
    title: "Mekk",
    description:
      "Mekk is a fun little cat-chasing-mouse game where you dash around, catch sneaky mice, build satisfying combos, and try to beat your best score. Fast paws, quick reactions, and a little “mekk!” energy make every round playful and chaotic.",
    image: "/playground/mekk.webp",
    icon: "",
    technologies: ["React", "TypeScript", "Vite", "PixiJS"],
    link: "https://kooteefamily.com/mekk",
  },
];
