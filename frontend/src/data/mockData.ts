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
      "A real-time 3D visualization and masterplan engine built with React and Babylon.js, backed by a PHP + MySQL API for dynamic property data. It focuses on interactive unit and plot visualization, allowing users to explore the site masterplan, filter properties, and inspect building forms directly in 3D. The system connects 3D views with live data such as unit information and availability, turning the experience into a functional sales and decision-support tool rather than just a static viewer.",
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
      "A React-based marketing website that provides a clean, responsive entry point into the project with conventional pages such as overview, location, gallery, and 360° virtual tours. The 360 tours are embedded into the web interface to let users explore interiors and surroundings without needing full 3D interaction. This layer focuses on content presentation, storytelling, and accessibility for all devices, complementing the advanced 3D interactive module used for data-driven visualization.",
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
      "Anyara is an integrated property platform designed for landed developments, built using vanilla JavaScript and Verge3D for optimal performance. The system includes a 3D interactive masterplan where users can explore land plots in real time, apply filters, view lot-specific information, and highlight availability directly within the 3D environment. Drone-based 360° panoramas provide a realistic overview of the site surroundings. The platform is also connected to MHUB, enabling users to seamlessly transition from land exploration to actual booking and sales registration within the same digital workflow.",
    images: [
      "/projects/CKG/Anyara/Landing.webp",
      "/projects/CKG/Anyara/Masterplan.webp",
      "/projects/CKG/Anyara/Location.webp",
      "/projects/CKG/Anyara/Drone.webp",
    ],
    technologies: [
      "Vanilla JavaScript",
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
    title: "Bangsar Hill Park - Web 540",
    description:
      "A React and Babylon.js powered 3D property visualization platform offering immersive building exploration, unit browsing, and aerial views for real estate presentations.",
    images: [
      "/projects/CKG/BHP_Web/Landing.webp",
      "/projects/CKG/BHP_Web/Unit.webp",
      "/projects/CKG/BHP_Web/Facility.webp",
      "/projects/CKG/BHP_Web/LevelView.webp",
    ],
    technologies: ["React", "TypeScript", "Babylon.js", "Pano2VR","PHP"],
    links: [
      {
        type: "website",
        url: "",
        label: "Website",
      },
    ],
    featured: false,
  },
  {
    id: "",
    title: "",
    description: "",
    images: [""],
    technologies: [""],
    links: [
      {
        type: "website",
        url: "",
        label: "Website",
      },
    ],
    featured: false,
  },
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
