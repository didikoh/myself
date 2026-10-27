const common = {
  identity: { name: 'KOH WEI ZHEN' },
  page: {
    title: 'Portfolio - KOH WEI ZHEN',
    description: 'Koh Wei Zhen — game, full-stack web, and interactive 3D developer. Explore my skills, work experience, and projects.',
  },
  nav: {
    label: 'Main navigation', home: 'Home', about: 'About', experience: 'Experience',
    skills: 'Skills', projects: 'Projects', playground: 'Playground', contact: 'Contact',
    openMenu: 'Open navigation menu', closeMenu: 'Close navigation menu',
    language: 'Language', switchChinese: 'Switch to Chinese', switchEnglish: 'Switch to English',
  },
  home: { viewProjects: 'View Projects' },
  about: {
    title: 'About Me', birthday: 'Birthday', zodiac: 'Zodiac', pisces: 'Pisces',
    mbtiIcon: 'ENFP personality icon', roles: 'What I Do', education: 'Education',
    certificate: 'View Certificate', beyondCode: 'Beyond Code',
    cgpa: 'CGPA: {{value}}',
  },
  experience: { title: 'Work Experience' },
  skills: {
    title: 'My Skills Journey',
    subtitle: "From my first line of code to cutting-edge technologies - here's my learning journey through the years",
    timeline: 'Learning Timeline', catalog: 'Skill Catalog',
    catalogDescription: 'Every skill from my learning timeline, organized by area of expertise.',
    count_one: '{{count}} skill', count_other: '{{count}} skills',
    categories: {
      frontend: { title: 'Frontend', description: 'Web interfaces, client state, and interactive browser experiences.' },
      backend: { title: 'Backend & Data', description: 'APIs, server frameworks, authentication, databases, and data services.' },
      game: { title: 'Game, 3D & XR', description: 'Gameplay, real-time 3D, immersive platforms, and streaming.' },
      ai: { title: 'AI & Automation', description: 'LLM integration, RAG, automation, and multi-agent workflows.' },
      devops: { title: 'DevOps & Infrastructure', description: 'Deployment pipelines, servers, process management, and networking.' },
      tools: { title: 'Tools & Design', description: 'Testing, interface design, and supporting production tools.' },
      other: { title: 'Other', description: 'Additional skills from the learning timeline.' },
    },
    names: {
      'Mixed Reality': 'Mixed Reality', 'Multiplayer Synchronization': 'Multiplayer Synchronization',
      'Game AI': 'Game AI', Automation: 'Automation', 'Virtual Reality': 'Virtual Reality',
      'Augmented Reality': 'Augmented Reality', 'Metaverse Development': 'Metaverse Development',
      'LLM API Integration': 'LLM API Integration', 'Web3 Integration': 'Web3 Integration',
      'RAG Chatbot': 'RAG Chatbot', 'Linux VPS Administration': 'Linux VPS Administration',
      'Apache HTTP Server': 'Apache HTTP Server', 'Reverse Proxy Configuration': 'Reverse Proxy Configuration',
      'PM2 Process Management': 'PM2 Process Management', 'Cloudflare Tunnel': 'Cloudflare Tunnel',
      'Unreal Engine Pixel Streaming': 'Unreal Engine Pixel Streaming', 'LLM Gateway': 'LLM Gateway',
      'Multi-Agent Development': 'Multi-Agent Development',
    },
  },
};

export default common;
