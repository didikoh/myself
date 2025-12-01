import type { PersonalInfo, Skill, Project, SocialLink, TimelineSkill, AboutInfo, WorkExperience, PlaygroundProject } from "../types";

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

export const timelineSkills: TimelineSkill[] = [
  { year: 2016, month: 'Jan', skill: 'HTML' },
  { year: 2016, month: 'Mar', skill: 'CSS' },
  { year: 2016, month: 'Jun', skill: 'JavaScript' },
  { year: 2017, month: 'Feb', skill: 'PHP' },
  { year: 2017, month: 'May', skill: 'MySQL' },
  { year: 2018, month: 'Jan', skill: 'Unity' },
  { year: 2018, month: 'Apr', skill: 'C#' },
  { year: 2019, month: 'Aug', skill: 'React' },
  { year: 2019, month: 'Nov', skill: 'TypeScript' },
  { year: 2020, month: 'Mar', skill: 'Node.js' },
  { year: 2020, month: 'Sep', skill: 'Angular' },
  { year: 2021, month: 'Jan', skill: 'Babylon.js' },
  { year: 2021, month: 'Jun', skill: 'Python' },
  { year: 2022, month: 'Feb', skill: 'Unreal Engine' },
  { year: 2022, month: 'May', skill: 'C++' },
  { year: 2022, month: 'Oct', skill: 'Blueprint' },
  { year: 2023, month: 'Mar', skill: 'AR Foundation' },
  { year: 2023, month: 'Aug', skill: 'Playwright' },
];

export const skills: Skill[] = [
  // Game Development
  { id: "1", name: "Unity", level: 5, category: "frontend", icon: "SiUnity" },
  { id: "2", name: "C#", level: 4, category: "backend", icon: "TbBrandCSharp" },
  { id: "3", name: "Unreal Engine", level: 3, category: "frontend", icon: "SiUnrealengine" },
  { id: "4", name: "C++", level: 2, category: "backend", icon: "SiCplusplus" },
  { id: "5", name: "Blueprint", level: 4, category: "frontend", icon: "SiUnrealengine" },
  { id: "6", name: "AR Foundation", level: 3, category: "frontend", icon: "TbAugmentedReality" },
  { id: "7", name: "Babylon.js", level: 5, category: "frontend", icon: "SiBabylondotjs" },

  // Web Development
  { id: "8", name: "React", level: 5, category: "frontend", icon: "SiReact" },
  { id: "9", name: "TypeScript", level: 5, category: "frontend", icon: "SiTypescript" },
  { id: "10", name: "Angular", level: 4, category: "frontend", icon: "SiAngular" },
  { id: "11", name: "Node.js", level: 4, category: "backend", icon: "SiNodedotjs" },
  { id: "12", name: "PHP", level: 4, category: "backend", icon: "SiPhp" },
  { id: "13", name: "MySQL", level: 4, category: "backend", icon: "SiMysql" },
  { id: "14", name: "Python", level: 3, category: "backend", icon: "SiPython" },
  { id: "15", name: "JavaScript", level: 5, category: "frontend", icon: "SiJavascript" },

  // Media & Design
  { id: "16", name: "Blender", level: 1, category: "tools", icon: "SiBlender" },
  { id: "18", name: "Photoshop", level: 1, category: "tools", icon: "SiAdobephotoshop" },
  { id: "19", name: "Playwright", level: 4, category: "tools", icon: "SiPlaywright" },
  { id: "20", name: "Audacity", level: 2, category: "tools", icon: "SiAudacity" },
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

export const aboutInfo: AboutInfo = {
  introduction:
    "Birthday: 1999/2/25 | Zodiac: Pisces ♓ | MBTI: ENFP",
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
    major: "Dual Degree Programmed with Staffordshire University, United Kingdom",
    startYear: 2018,
    endYear: 2021,
    cgpa: "3.20/4.00 (Second Upper)",
    location: "Bukit Jalil, Kuala Lumpur",
    certificateLink: "https://drive.google.com/file/d/1j5oTN--x9bFQoxvBipbJByctxbXU9Iza/view",
  },
  funFacts: [
    {
      icon: "🐱",
      text: "Cat enthusiast and proud cat parent",
    },
    {
      icon: "🎨",
      text: "Love exploring digital art and 3D modeling",
    },
    {
      icon: "🎵",
      text: "Enjoy gaming and discovering new indie titles",
    },
    {
      icon: "☕",
      text: "Coffee-powered coding sessions are my favorite",
    },
  ],
};

export const workExperiences: WorkExperience[] = [
  {
    id: "1",
    position: "Software Developer",
    company: "Know Idea Sdn Bhd",
    location: "Kuala Lumpur",
    startDate: "September 2024",
    endDate: "Present",
    responsibilities: [
      "Developed virtual real estate sales platforms integrating 3D visuals, interactive tools, and backend systems.",
      "Built responsive web frontends using React with Vite and TypeScript.",
      "Designed backend systems using PHP and MySQL.",
      "Created interactive 3D web experiences with Babylon.js.",
      "Managed hosting environments and deployment workflows.",
      "Built real estate visualization tools with Unity and Unreal Engine.",
      "Collaborated with clients and designers to align digital sales materials with branding goals.",
    ],
    technologies: ["React", "TypeScript", "Vite", "PHP", "MySQL", "Babylon.js", "Unity", "Unreal Engine"],
  },
  {
    id: "2",
    position: "Game Developer",
    company: "ART WARDENS SDN BHD",
    location: "Penang",
    startDate: "May 2024",
    endDate: "August 2024",
    responsibilities: [
      "Developed local and online multiplayer game-play using Unreal Engine 5.",
      "Designed and implemented character animation systems.",
      "Created in-game logic and interactive systems using Blueprint.",
      "Built immersive game scenes and cinematic sequences.",
      "Conducted research on TON Wallet and TON Coin for blockchain integration.",
      "Developed Unity-based game-play features and integrated blockchain-based transactions.",
      "Collaborated with teams to prototype and test blockchain game mechanics.",
    ],
    technologies: ["Unreal Engine 5", "Blueprint", "Unity", "Blockchain", "TON Wallet"],
  },
  {
    id: "3",
    position: "Unity Developer",
    company: "FUSIONEX GROUP",
    location: "Kuala Lumpur",
    startDate: "September 2022",
    endDate: "February 2024",
    responsibilities: [
      "Spearheaded Unity development for groundbreaking Metaverse and Augmented Reality (AR) projects, crafting immersive virtual environments and interactive elements.",
      "Collaborated with cross-functional teams to ensure successful implementation, meeting project milestones for AR and Metaverse experiences.",
      "Conducted rigorous testing and optimization to deliver seamless, high-quality user experiences.",
      "Collaborated on web development initiatives involving portals and AI chatbots, employing Angular for front-end design and a back-end stack comprising C# and Python.",
      "Assisted in manual testing within a QA role, creating comprehensive test plans.",
    ],
    technologies: ["Unity", "AR Foundation", "Angular", "C#", "Python", "Metaverse"],
  },
  {
    id: "4",
    position: "Game Programmer",
    company: "Gamecode Media",
    location: "Kuala Lumpur",
    startDate: "March 2022",
    endDate: "July 2022",
    responsibilities: [
      "Conceptualized and designed game elements, rules, characters, and settings, employing Unreal Engine Blueprint for PC and VR game development.",
      "Tested and refined gameplay features and prototypes, ensuring engaging and functional user experiences.",
      "Maintained code integrity, conducted tests, and promptly addressed issues and bugs to enhance overall game performance.",
    ],
    technologies: ["Unreal Engine", "Blueprint", "VR"],
  },
  {
    id: "5",
    position: "XR Software Developer (Intern)",
    company: "Ministry XR",
    location: "Kuala Lumpur",
    startDate: "March 2020",
    endDate: "June 2021",
    responsibilities: [
      "Participated in the development of HoloLens education project, an innovative XR application that provides students with an immersive and interactive virtual environment where complex concepts are brought to life through engaging simulations and interactive lessons.",
      "Collaborated closely with designers to implement immersive XR environments, ensuring seamless integration of 3D models, animations, and interactive elements.",
      "Engaged in collaborative discussions with the development team, contributing valuable insights to enhance the educational impact of XR technology within the application.",
    ],
    technologies: ["HoloLens", "XR", "Unity"],
  },
];

export const playgroundProjects: PlaygroundProject[] = [
  {
    id: "1",
    title: "My Cats Introduction Website",
    description:
      "A fun and interactive website dedicated to introducing my beloved cats. Features animations, photo galleries, and personality profiles for each cat.",
    image: "/playground/cats-website.jpg",
    icon: "🐱",
    technologies: ["React", "TypeScript", "CSS Animations"],
    link: "#",
  },
  {
    id: "2",
    title: "Creative Experiments",
    description:
      "A collection of creative coding experiments exploring interactive animations, generative art, and playful web interactions.",
    image: "/playground/experiments.jpg",
    icon: "🎨",
    technologies: ["JavaScript", "Canvas API", "WebGL"],
  },
  {
    id: "3",
    title: "Mini Game Collection",
    description:
      "Small browser-based games created for fun and learning. Includes puzzles, arcade-style games, and interactive challenges.",
    image: "/playground/games.jpg",
    icon: "🎮",
    technologies: ["HTML5", "JavaScript", "Phaser"],
  },
];

