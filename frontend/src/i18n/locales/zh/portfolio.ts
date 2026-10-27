import english from "../en/portfolio";

const portfolio = {
  personalInfo: {
    title: "游戏开发者与 Web 开发者",
    description:
      "软件开发者，擅长使用 React、TypeScript、PHP、MySQL、Angular、C#、Python、Babylon.js、Unity 和 Unreal Engine，构建全栈 Web 应用、交互式 3D 销售平台、AI 聊天机器人、多人游戏、区块链集成及沉浸式 XR 体验。",
  },
  aboutInfo: {
    introduction: "生日：1999/2/25 | 星座：双鱼座 ♓ | MBTI：ENFP",
    roles: [
      {
        title: "游戏开发者",
        description:
          "使用 Unity 和 Unreal Engine 构建交互体验，涵盖 2D 独立游戏与沉浸式 3D 世界。",
      },
      {
        title: "全栈 Web 开发者",
        description:
          "使用 React、TypeScript、Node.js 和 PHP 设计与开发动态 Web 应用，打造流畅的用户体验。",
      },
      {
        title: "3D 与交互开发者",
        description:
          "使用 Babylon.js 和 WebGL 技术制作实时 3D 可视化与交互内容。",
      },
    ],
    education: {
      universityName: english.aboutInfo.education.universityName,
      degree: "计算机游戏开发学士",
      major: "与英国 Staffordshire University 合作的双学位课程",
      cgpa: "3.20/4.00（二等一级荣誉）",
      location: "吉隆坡武吉加里尔",
    },
    funFacts: [
      { text: "对 AI 的发展充满兴趣，从模型能力到实际应用都持续关注。" },
      { text: "热衷探索新一代引擎、先进硬件及神经接口等新兴技术。" },
      { text: "热爱游戏，既享受游玩的乐趣，也喜欢创造沉浸式交互体验。" },
    ],
  },
  projects: {
    "1": {
      title: "The Rise - Guocoland 总体规划",
      description:
        "使用 React 和 Babylon.js 打造的实时 3D 总体规划浏览器，支持交互式房产筛选、地块材质切换、建筑模型显示切换及户型信息整合，带来直观的房产探索体验。",
    },
    "2": {
      title: "The Rise - Guocoland 网站",
      description:
        "以 React 构建的营销网站，结合快速加载的 Pano2VR 和 Object2VR 户型导览，让用户轻松浏览各类户型，无需完整 3D 交互的加载开销。",
    },
    "3": {
      title: english.projects["3"].title,
      description:
        "全交互式 3D 网页平台，结合沉浸式 Babylon.js 场景、360° 导览与平面图，展示 Causewayz Square @ JBCC。",
    },
    "4": {
      title: english.projects["4"].title,
      description:
        "使用原生 JavaScript 与 Verge3D 开发的土地展示平台，提供实时 3D 总体规划、地块筛选、地块资料、可售状态高亮及无人机 360° 全景，并全面对接 MHUB，实现顺畅的预订流程。",
    },
    "5": {
      title: english.projects["5"].title,
      description:
        "以 Unreal Engine 打造的交互式展示项目，提供实时 3D 交互与沉浸式环境，适用于售楼展厅及高品质演示。",
    },
    "6": {
      title: "Bangsar Hill Park - 网页 3D",
      description:
        "使用 React 和 Babylon.js 开发的 3D 浏览器，结合整层剖面视图、交互式楼层切换、户型浏览与鸟瞰视角，带来沉浸式建筑探索体验。",
    },
    "7": {
      title: "（演示）Collectiv Lnad - Celora 3D",
      description:
        "以 React 和 Babylon.js 打造的游戏式 3D 房产探索平台，提供户型与朝向筛选、楼层剖面图浏览、设施探索，并整合 Pano2VR 楼层视图，呈现流畅统一的体验。",
    },
    "8": {
      title: "（演示）Collectiv Lnad - Celora 品牌展示",
      description:
        "交互式品牌网站，使用 Babylon.js 呈现随页面滚动变化的电影感 3D 背景动画，让用户通过流畅、沉浸式的过渡效果探索 Celora 建筑。",
    },
    "9": {
      title: "Goprop 平台",
      description:
        "全栈房地产平台，结合交互式 3D 视觉与区域信息，覆盖多个城市的设施、地标、周边配套及房产详情。",
    },
    "10": {
      title: "Goprop 品牌官网",
      description:
        "为 GoProp 打造的现代化官网，通过流畅动画、响应式界面及集成的数据分析展示服务，引导用户进入主平台，并收集潜在客户信息。",
    },
    "11": {
      title: english.projects["11"].title,
      description:
        "基于 Unity 开发的大型可视化项目，面向 8 屏拼接显示墙，以沉浸式、博物馆风格展示 IIB Wawari 的重点开发项目与区域亮点。",
    },
    "12": {
      title: english.projects["12"].title,
      description:
        "基于 React 的现代化推广网站，结合流畅动画与多页面内容，介绍 SW Pearlmont 的 PPVC 建筑方案、健康生活理念，并提供用户注册功能。",
    },
    "13": {
      title: "Be-studio 管理系统",
      description:
        "基于 React 的 be studio 会员与课程管理系统，支持课程购买、积分追踪、优惠券、用户账户，并提供集成管理后台，管理会员、课程及交易。",
    },
  },
  workExperiences: {
    "1": {
      position: "软件开发工程师",
      location: "吉隆坡",
      startDate: "2024 年 9 月",
      endDate: "至今",
      responsibilities: [
        "使用 React、Vite 和 TypeScript 构建响应式前端应用，开发可复用组件与以用户为中心的界面。",
        "设计与维护 PHP 和 MySQL 后端系统，涵盖数据处理及 API 相关功能。",
        "构建虚拟房地产销售平台，整合响应式界面、后端服务、数据驱动功能及交互工具。",
        "将 Babylon.js 集成到浏览器应用，提供交互式 3D 房产展示与数字销售体验。",
        "负责 Web 应用的托管、部署、服务器相关流程及生产环境故障排查。",
        "与客户及设计师合作，将业务需求与视觉设计转化为可用的网页功能。",
      ],
    },
    "2": {
      position: "软件开发工程师",
      location: "槟城",
      startDate: "2024 年 5 月",
      endDate: "2024 年 8 月",
      responsibilities: [
        "开发 Unreal Engine 5 游戏系统，涵盖本地与在线多人模式、动画、交互机制及 Blueprint 功能。",
        "将区块链钱包功能集成到 Unity 游戏功能及交易相关流程中。",
        "实现钱包连接、请求、用户确认及交易状态处理等交易流程。",
      ],
    },
    "3": {
      position: "软件开发工程师",
      location: "吉隆坡",
      startDate: "2022 年 9 月",
      endDate: "2024 年 2 月",
      responsibilities: [
        "构建集成 LLM API 的全栈 AI 聊天机器人方案，使用 Angular 开发前端，并以 C# 和 Python 构建后端服务。",
        "使用 Angular 和 C# 开发全栈 Web 管理后台，涵盖前端界面、后端 API 及系统功能。",
        "使用 Unity 开发元宇宙与增强现实应用，构建沉浸式环境及交互元素。",
        "测试、调试与优化应用功能，提升稳定性与用户体验。",
        "通过编写测试计划、验证功能及报告问题，协助质量保证测试。",
      ],
    },
    "4": {
      position: "Unreal Engine 程序员",
      location: "吉隆坡",
      startDate: "2022 年 3 月",
      endDate: "2022 年 7 月",
      responsibilities: [
        "使用 Unreal Engine Blueprint 开发 PC 与 VR 游戏原型。",
        "测试、调试并完善交互式游戏功能。",
      ],
    },
    "5": {
      position: "XR 软件开发实习生",
      location: "吉隆坡",
      startDate: "2020 年 3 月",
      endDate: "2020 年 6 月",
      responsibilities: [
        "参与 Microsoft HoloLens 的 XR 教育应用及交互式学习体验开发。",
        "将 3D 模型、动画与交互元素整合到沉浸式 XR 环境中。",
      ],
    },
  },
  playgroundProjects: {
    "1": {
      title: english.playgroundProjects["1"].title,
      description:
        "Mekk 是一款轻松有趣的猫捉老鼠小游戏。四处冲刺，抓住狡猾的老鼠，打出畅快连击，挑战自己的最高分。灵活的猫爪、敏捷的反应，再加上一点“mekk！”的活力，让每一局都充满欢乐与混乱。",
    },
  },
} satisfies typeof english;

export default portfolio;
