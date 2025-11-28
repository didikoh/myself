import type { PersonalInfo, Skill, Project, SocialLink } from "../types";

export const personalInfo: PersonalInfo = {
  name: "Koh Wei Zhen",
  title: "Game Developer & Web Developer",
  description:
    "Enthusiastic game developer and web developer with expertise in Unity, Unreal Engine, React, and full-stack development. Passionate about creating innovative digital experiences at the intersection of creativity and technology.",
  avatar: "my-photo/me.jpg", // Cat avatar placeholder
  email: "didikoh@hotmail.com",
  github: "https://github.com/didikoh",
  linkedin: "https://linkedin.com/in/koh-wei-zhen",
};

export const skills: Skill[] = [
  // Game Development
  { id: "1", name: "Unity", level: 5, category: "frontend" },
  { id: "2", name: "C#", level: 4, category: "backend" },
  { id: "3", name: "Unreal Engine", level: 3, category: "frontend" },
  { id: "4", name: "C++", level: 2, category: "backend" },
  { id: "5", name: "Blueprint", level: 4, category: "frontend" },
  { id: "6", name: "AR Foundation", level: 3, category: "frontend" },
  { id: "7", name: "Babylon.js", level: 5, category: "frontend" },

  // Web Development
  { id: "8", name: "React", level: 5, category: "frontend" },
  { id: "9", name: "TypeScript", level: 5, category: "frontend" },
  { id: "10", name: "Angular", level: 4, category: "frontend" },
  { id: "11", name: "Node.js", level: 4, category: "backend" },
  { id: "12", name: "PHP", level: 4, category: "backend" },
  { id: "13", name: "MySQL", level: 4, category: "backend" },
  { id: "14", name: "Python", level: 3, category: "backend" },
  { id: "15", name: "JavaScript", level: 5, category: "frontend" },

  // Media & Design
  { id: "16", name: "Blender", level: 1, category: "tools" },
  { id: "18", name: "Photoshop", level: 1, category: "tools" },
  { id: "19", name: "Playwright", level: 4, category: "tools" },
  { id: "20", name: "Audacity", level: 2, category: "tools" },
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
        url: "/projects/CKG/Guocoland_540/Guocoland_masterplan.mp4",
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
        url: "/projects/CKG/Causewayz_Exsim/0930.mp4",
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
    technologies: [
      "JavaScript",
      "Verge3D",
      "PHP",
      "MySQL",
      "HTML",
      "CSS",
    ],
    links: [
      {
        type: "website",
        url: "https://goprop360.com/goland/anyara/go540/",
        label: "Website",
      },
      {
        type: "video",
        url: "/projects/CKG/Anyara/Anyara.mp4",
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
        url: "/projects/CKG/BHP/BHP.mp4",
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
        url: "/projects/CKG/Goprop/goprop_platform.mp4",
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
      {
        type: "video",
        url: "8tv.mp4",
        label: "Video",
      },
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
  // {
  //   id: "",
  //   title: "",
  //   description: "",
  //   images: [],
  //   technologies: [],
  //   links: [
  //     {
  //       type: "website",
  //       url: "",
  //       label: "Website",
  //     },
  //   ],
  //   featured: false,
  // },
  // {
  //   id: '2',
  //   title: 'HoloLens Education XR App',
  //   description: 'Immersive educational XR application for Microsoft HoloLens providing interactive virtual learning environments.',
  //   images: [
  //     '/api/placeholder/400/250',
  //     '/api/placeholder/400/250?text=AR+Interface',
  //     '/api/placeholder/400/250?text=3D+Models',
  //     '/api/placeholder/400/250?text=Interaction'
  //   ],
  //   technologies: ['Unity', 'C#', 'AR Foundation', 'HoloLens SDK'],
  //   links: [
  //     { type: 'github', url: 'https://github.com/didikoh/hololens-education' },
  //     { type: 'video', url: '/assets/videos/hololens-demo.mp4' },
  //     { type: 'youtube', url: 'https://youtube.com/watch?v=hololens-demo' }
  //   ],
  //   featured: true
  // },
  // {
  //   id: '3',
  //   title: 'Metaverse Gaming Experience',
  //   description: 'Multiplayer VR gaming experience built with Unreal Engine 5, featuring blockchain integration and immersive environments.',
  //   images: [
  //     '/api/placeholder/400/250',
  //     '/api/placeholder/400/250?text=VR+World',
  //     '/api/placeholder/400/250?text=Multiplayer',
  //     '/api/placeholder/400/250?text=Blockchain'
  //   ],
  //   technologies: ['Unreal Engine 5', 'C++', 'Blueprint', 'Blockchain'],
  //   links: [
  //     { type: 'github', url: 'https://github.com/didikoh/metaverse-game' },
  //     { type: 'youtube', url: 'https://youtube.com/watch?v=metaverse-gameplay' },
  //     { type: 'download', url: 'https://github.com/didikoh/metaverse-game/releases' }
  //   ],
  //   featured: true
  // },
  // {
  //   id: '4',
  //   title: 'Unity AR Mobile Game',
  //   description: 'Augmented reality mobile game with character animation systems and interactive gameplay mechanics.',
  //   images: [
  //     '/api/placeholder/400/250',
  //     '/api/placeholder/400/250?text=AR+Camera',
  //     '/api/placeholder/400/250?text=Characters'
  //   ],
  //   technologies: ['Unity', 'C#', 'AR Foundation', 'Mobile Development'],
  //   links: [
  //     { type: 'github', url: 'https://github.com/didikoh/ar-mobile-game' },
  //     { type: 'video', url: '/assets/videos/ar-game-demo.mp4' }
  //   ],
  //   featured: false
  // },
  // {
  //   id: '5',
  //   title: 'Web Portal with AI Chatbot',
  //   description: 'Enterprise web portal featuring AI chatbot integration, built with Angular frontend and Python/C# backend.',
  //   images: [
  //     '/api/placeholder/400/250',
  //     '/api/placeholder/400/250?text=Chat+Interface',
  //     '/api/placeholder/400/250?text=Dashboard'
  //   ],
  //   technologies: ['Angular', 'Python', 'C#', 'AI/ML'],
  //   links: [
  //     { type: 'github', url: 'https://github.com/didikoh/web-portal-ai' },
  //     { type: 'demo', url: 'https://web-portal-demo.netlify.app' }
  //   ],
  //   featured: false
  // },
  // {
  //   id: '6',
  //   title: 'Blockchain Gaming Platform',
  //   description: 'Gaming platform with TON Wallet integration for blockchain-based transactions and NFT marketplace.',
  //   images: [
  //     '/api/placeholder/400/250',
  //     '/api/placeholder/400/250?text=NFT+Market',
  //     '/api/placeholder/400/250?text=Wallet+UI'
  //   ],
  //   technologies: ['Unity', 'Blockchain', 'TON Wallet', 'Smart Contracts'],
  //   links: [
  //     { type: 'github', url: 'https://github.com/didikoh/blockchain-gaming' },
  //     { type: 'website', url: 'https://blockchain-gaming.ton.org' },
  //     { type: 'youtube', url: 'https://youtube.com/watch?v=blockchain-demo' }
  //   ],
  //   featured: false
  // }
];

export const socialLinks: SocialLink[] = [
  // {
  //   id: '1',
  //   name: 'GitHub',
  //   url: 'https://github.com/didikoh',
  //   icon: 'github'
  // },
  // {
  //   id: '2',
  //   name: 'LinkedIn',
  //   url: 'https://linkedin.com/in/koh-wei-zhen',
  //   icon: 'linkedin'
  // },
  // {
  //   id: '1',
  //   name: 'Email',
  //   url: 'mailto:didikoh@hotmail.com',
  //   icon: 'mail'
  // },
  // {
  //   id: '4',
  //   name: 'Portfolio',
  //   url: 'https://drive.google.com/file/d/1j5oTN--x9bFQoxvBipbJByctxbXU9lza/view?usp=sharing',
  //   icon: 'twitter'
  // }
];
