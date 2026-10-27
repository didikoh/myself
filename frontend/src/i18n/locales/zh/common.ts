const common = {
  identity: { name: '许伟振' },
  page: {
    title: '个人作品集 - KOH WEI ZHEN',
    description: 'Koh Wei Zhen 的个人作品集：游戏开发、全栈网站与交互式 3D 开发。了解我的技能、工作经历与项目。',
  },
  nav: {
    label: '主导航', home: '首页', about: '关于我', experience: '工作经历',
    skills: '技能', projects: '项目', playground: '实验室', contact: '联系我',
    openMenu: '展开导航菜单', closeMenu: '收起导航菜单',
    language: '语言', switchChinese: '切换到中文', switchEnglish: '切换到英文',
  },
  home: { viewProjects: '查看项目' },
  about: {
    title: '关于我', birthday: '生日', zodiac: '星座', pisces: '双鱼座',
    mbtiIcon: 'ENFP 人格图标', roles: '我的专长', education: '教育背景',
    certificate: '查看证书', beyondCode: '代码之外',
    cgpa: '平均绩点：{{value}}',
  },
  experience: { title: '工作经历' },
  skills: {
    title: '我的技能成长历程',
    subtitle: '从第一行代码到前沿技术，记录这些年来的学习与成长',
    timeline: '学习时间线', catalog: '技能一览',
    catalogDescription: '按专业领域整理学习历程中积累的各项技能。',
    count_one: '{{count}} 项技能', count_other: '{{count}} 项技能',
    categories: {
      frontend: { title: '前端开发', description: '网页界面、客户端状态管理与浏览器交互体验。' },
      backend: { title: '后端与数据', description: 'API、服务端框架、身份认证、数据库与数据服务。' },
      game: { title: '游戏、3D 与 XR', description: '游戏玩法、实时 3D、沉浸式平台与串流技术。' },
      ai: { title: 'AI 与自动化', description: '大语言模型集成、RAG、自动化与多智能体工作流。' },
      devops: { title: '运维与基础设施', description: '部署流水线、服务器、进程管理与网络配置。' },
      tools: { title: '工具与设计', description: '测试、界面设计与开发辅助工具。' },
      other: { title: '其他技能', description: '学习历程中积累的其他技能。' },
    },
    names: {
      'Mixed Reality': '混合现实', 'Multiplayer Synchronization': '多人同步',
      'Game AI': '游戏 AI', Automation: '自动化', 'Virtual Reality': '虚拟现实',
      'Augmented Reality': '增强现实', 'Metaverse Development': '元宇宙开发',
      'LLM API Integration': '大语言模型 API 集成', 'Web3 Integration': 'Web3 集成',
      'RAG Chatbot': 'RAG 聊天机器人', 'Linux VPS Administration': 'Linux VPS 运维',
      'Apache HTTP Server': 'Apache HTTP 服务器', 'Reverse Proxy Configuration': '反向代理配置',
      'PM2 Process Management': 'PM2 进程管理', 'Cloudflare Tunnel': 'Cloudflare 隧道',
      'Unreal Engine Pixel Streaming': 'Unreal Engine 像素流送', 'LLM Gateway': '大语言模型网关',
      'Multi-Agent Development': '多智能体开发',
    },
  },
};

export default common;
