import type { PersonalInfo, Skill, Project, SocialLink } from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Koh Wei Zhen',
  title: 'Game Developer & Web Developer',
  description: 'Enthusiastic game developer and web developer with expertise in Unity, Unreal Engine, React, and full-stack development. Passionate about creating innovative digital experiences at the intersection of creativity and technology.',
  avatar: 'my-photo/me.jpg', // Cat avatar placeholder
  email: 'didikoh@hotmail.com',
  github: 'https://github.com/didikoh',
  linkedin: 'https://linkedin.com/in/koh-wei-zhen'
};

export const skills: Skill[] = [
  // Game Development
  { id: '1', name: 'Unity', level: 5, category: 'frontend' },
  { id: '2', name: 'C#', level: 4, category: 'backend' },
  { id: '3', name: 'Unreal Engine', level: 3, category: 'frontend' },
  { id: '4', name: 'C++', level: 2, category: 'backend' },
  { id: '5', name: 'Blueprint', level: 4, category: 'frontend' },
  { id: '6', name: 'AR Foundation', level: 3, category: 'frontend' },
  { id: '7', name: 'Babylon.js', level: 5, category: 'frontend' },
  
  // Web Development
  { id: '8', name: 'React', level: 5, category: 'frontend' },
  { id: '9', name: 'TypeScript', level: 5, category: 'frontend' },
  { id: '10', name: 'Angular', level: 4, category: 'frontend' },
  { id: '11', name: 'Node.js', level: 4, category: 'backend' },
  { id: '12', name: 'PHP', level: 4, category: 'backend' },
  { id: '13', name: 'MySQL', level: 4, category: 'backend' },
  { id: '14', name: 'Python', level: 3, category: 'backend' },
  { id: '15', name: 'JavaScript', level: 5, category: 'frontend' },
  
  // Media & Design
  { id: '16', name: 'Blender', level: 1, category: 'tools' },
  { id: '18', name: 'Photoshop', level: 1, category: 'tools' },
  { id: '19', name: 'Playwright', level: 4, category: 'tools' },
  { id: '20', name: 'Audacity', level: 2, category: 'tools' },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'The Rise - Guocoland',
    description: 'Interactive 3D real estate marketing website with virtual tours, built using React, Babylon.js.',
    images: [
      '/projects/guocoland/masterplan1.png',
      '/projects/guocoland/website1.png',
    ],
    technologies: ['React', 'TypeScript', 'Babylon.js'],
    links: [
      { type: 'demo', url: 'https://goprop360.com/goland/therise/', label: 'Website' },
      { type: 'demo', url: 'https://goprop360.com/goland/therise/masterplan', label: '3D Masterplan' }
    ],
    featured: true
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
