import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  role: string;
  content: string;
}

interface ChatRequestBody {
  messages: Message[];
}

const systemPrompt = `You are a helpful AI assistant for Koh Wei Zhen's portfolio website.
You help visitors learn about Koh Wei Zhen's skills, projects, work experience, and background.
Be friendly, professional, and concise in your responses. Provide specific details about projects and experience when asked.
You can discuss technical skills, work history, education, and personal interests related to technology and gaming.`;

// Resume context - 完整的简历信息

const resumeContext = `
PERSONAL INFORMATION:
- Name: Koh Wei Zhen
- Title: Game Developer & Web Developer
- Email: didikoh@hotmail.com
- GitHub: https://github.com/didikoh
- LinkedIn: https://linkedin.com/in/koh-wei-zhen
- Birthday: February 25, 1999
- Zodiac: Pisces ♓
- MBTI: ENFP
- Description: Enthusiastic game developer and web developer with expertise in Unity, Unreal Engine, React, and full-stack development. Passionate about creating innovative digital experiences at the intersection of creativity and technology.

EDUCATION:
- University: Asia Pacific University of Technology & Innovation (APU), Bukit Jalil, Kuala Lumpur
- Degree: Bachelor of Computer Game Development (Dual Degree with Staffordshire University, UK)
- Duration: 2018 - 2021
- CGPA: 3.20/4.00 (Second Upper)
- Certificate: https://drive.google.com/file/d/1j5oTN--x9bFQoxvBipbJByctxbXU9Iza/view

ROLES & EXPERTISE:
1. Game Developer: Building interactive experiences with Unity and Unreal Engine, from 2D indie games to immersive 3D worlds.
2. Full-Stack Web Developer: Designing and developing dynamic web applications using React, TypeScript, Node.js, and PHP to deliver seamless user experiences.
3. 3D/Interactive Developer: Creating real-time 3D visualizations and interactive content using Babylon.js and WebGL technologies.

TECHNICAL SKILLS (Categorized)
Game Development:
- Unity
- Unreal Engine 4 & 5
- C#
- C++
- Blueprint
- AR Foundation
- Babylon.js
- Mixed Reality
- Game AI
- Multiplayer Synchronization
- Steam Advanced Session

Web Development:
- HTML, CSS
- JavaScript
- TypeScript
- React
- Angular
- Node.js
- PHP
- MySQL
- Python
- ASP.NET
- RESTful API
- Telegram Bot API / Mini App
- LLM API Integration
- Web3 Integration
- Verge3D

Tools & Design:
- Blender
- Photoshop
- Figma
- Playwright
- Audacity
- Cloudflare / Hosting / Deployment Tools

Additional Expertise:
- Automation
- Virtual Reality
- Augmented Reality
- Metaverse Development
- Chatbot RAG

WORK EXPERIENCE:

1. Software Developer at Know Idea Sdn Bhd (September 2024 - Present, Kuala Lumpur)
- Developed virtual real estate sales platforms integrating 3D visuals, interactive tools, and backend systems
- Built responsive web frontends using React with Vite and TypeScript
- Designed backend systems using PHP and MySQL
- Created interactive 3D web experiences with Babylon.js
- Managed hosting environments and deployment workflows
- Built real estate visualization tools with Unity and Unreal Engine
- Collaborated with clients and designers to align digital sales materials with branding goals
Technologies: React, TypeScript, Vite, PHP, MySQL, Babylon.js, Unity, Unreal Engine

2. Game Developer at ART WARDENS SDN BHD (May 2024 - August 2024, Penang)
- Developed local and online multiplayer gameplay using Unreal Engine 5
- Designed and implemented character animation systems
- Created in-game logic and interactive systems using Blueprint
- Built immersive game scenes and cinematic sequences
- Conducted research on TON Wallet and TON Coin for blockchain integration
- Developed Unity-based gameplay features and integrated blockchain-based transactions
Technologies: Unreal Engine 5, Blueprint, Unity, Blockchain, TON Wallet

3. Unity Developer at FUSIONEX GROUP (September 2022 - February 2024, Kuala Lumpur)
- Spearheaded Unity development for groundbreaking Metaverse and Augmented Reality (AR) projects
- Crafted immersive virtual environments and interactive elements
- Collaborated with cross-functional teams to ensure successful implementation
- Conducted rigorous testing and optimization to deliver seamless user experiences
- Collaborated on web development initiatives involving portals and AI chatbots using Angular, C#, and Python
- Assisted in manual testing within a QA role, creating comprehensive test plans
Technologies: Unity, AR Foundation, Angular, C#, Python, Metaverse

4. Game Programmer at Gamecode Media (March 2022 - July 2022, Kuala Lumpur)
- Conceptualized and designed game elements, rules, characters, and settings using Unreal Engine Blueprint
- Developed PC and VR game experiences
- Tested and refined gameplay features and prototypes
- Maintained code integrity, conducted tests, and addressed issues and bugs
Technologies: Unreal Engine, Blueprint, VR

5. XR Software Developer (Intern) at Ministry XR (March 2020 - June 2020, Kuala Lumpur)
- Contributed to the development of an XR education app for HoloLens
- Enabled immersive and interactive learning experiences
- Worked with designers to integrate 3D models, animations, and interactive elements
- Collaborated with the development team to refine features
Technologies: HoloLens, XR, Unity

FEATURED PROJECTS:

1. The Rise - Guocoland Masterplan
- A real-time 3D masterplan viewer built with React and Babylon.js
- Features interactive property filters, land-material switching, toggleable building models
- Integrated unit information for intuitive property exploration
- Website: https://goprop360.com/goland/therise/masterplan
Technologies: React, TypeScript, Babylon.js

2. The Rise - Guocoland Web
- React-based marketing site with fast-loading Pano2VR and Object2VR unit tours
- Allows users to quickly browse unit types without full 3D overhead
- Website: https://goprop360.com/goland/therise/
Technologies: React, TypeScript, Pano2VR, Object2VR

3. Exsim Causewayz JBCC
- Fully interactive 3D web platform showcasing Causewayz Square @ JBCC
- Immersive Babylon.js scenes with 360° tours and floor plans
- Website: https://causewayz.com.my/
Technologies: React, TypeScript, Babylon.js

4. Anyara Hills
- Vanilla JavaScript + Verge3D land platform with real-time 3D masterplan
- Features plot filtering, lot information, availability highlights, and integrated drone 360° views
- Fully connected to MHUB for seamless booking
- Website: https://goprop360.com/goland/anyara/go540/
Technologies: JavaScript, Verge3D, PHP, MySQL, HTML, CSS

5. Bangsar Hill Park - Unreal Engine
- Unreal Engine interactive showcase with real-time 3D interaction
- Immersive environments for sales galleries and high-end presentations
Technologies: Unreal Engine, C++, Blueprint

6. Bangsar Hill Park - Web 3D
- React and Babylon.js 3D viewer with immersive building exploration
- Full-floor sectional views, interactive level switching, and unit browsing
- Website: https://goprop.ai/go540/bhp/
Technologies: React, TypeScript, Babylon.js, Pano2VR

7. Celora 3D (DEMO)
- Game-like 3D property explorer built with React and Babylon.js
- Interactive type and orientation filters, sectional floor-plan browsing
- Facility exploration with integrated Pano2VR level views
- Demo: https://goprop360.com/demo/celora/
Technologies: React, TypeScript, Babylon.js, Pano2VR

8. Celora Branding (DEMO)
- Interactive branding site with cinematic scroll-based 3D background animations
- Smooth, immersive transitions using Babylon.js
- Website: https://goprop360.com/demo/celora_branding/
Technologies: React, TypeScript, Babylon.js

9. Goprop Platform
- Full-stack real estate platform with interactive 3D visuals
- Region-based information covering facilities, landmarks, amenities across multiple cities
- Includes AI chatbot integration
- Website: https://goprop.ai/my
Technologies: React, TypeScript, PHP, MySQL, LLM Integration, Babylon.js

10. Goprop Landing Website
- Modern landing website showcasing GoProp services
- Smooth animations, responsive UI, and integrated analytics
- Website: https://goprop.ai
Technologies: React, TypeScript, PHPMailer

11. Iskandar Wawari Johor
- Large-scale Unity visualization for 8-screen video wall
- Museum-style presentation of IIB Wawari's developments
Technologies: Unity, C#

12. Skyworld Pearlmont
- Modern React landing page with smooth animations
- Multi-page content introducing PPVC initiatives and healthy living
- Website: https://skyworld.my/skyworldpearlmont/
Technologies: React, TypeScript

13. Be-studio System
- React-based membership and class-management system
- Features course purchases, credit tracking, coupons, user accounts
- Integrated admin dashboard for managing members, classes, and transactions
- Website: https://bestudiobp.com/
Technologies: React, TypeScript, PHP, MySQL

INTERESTS & FUN FACTS:
- Passionate about exploring all kinds of games — from action to indie storytelling — appreciating their art direction, narrative design, gameplay mechanics, music, and even underlying code logic.
- Biggest inspiration comes from the Devil May Cry series, which shaped both my taste in action design and my interest in stylish combat systems.
- Enjoys exploring cutting-edge technologies, especially in mechanical engineering (such as automotive tech) and software innovations like NVIDIA OGC and advanced simulation tools.
- Frequently dives into philosophical discussions, exploring perspectives on consciousness, existence, creativity, and human–AI interaction.
- Proud cat parent of two cats: Kola (Siamese) and Teddy (Khaki Maine Coon) — they are the inspiration behind the warm, friendly, character‑driven theme of my portfolio.
- Deeply interested in AI evolution — from model capabilities to real-world applications.
- Fascinated by emerging technologies like next-gen engines, advanced hardware, and neural interfaces.
- Passionate about gaming, both as a player and as a creator of immersive interactive experiences

When discussing projects, you can provide specific details about technologies used, features implemented, and live website links.
When asked about skills, you can reference the skill level and the year they were learned.
When discussing experience, provide details about specific roles, responsibilities, and duration at each company.

`;

export async function handleChat(req: Request, res: Response) {
  try {
    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }

    // Parse request body
    const { messages } = req.body as ChatRequestBody;
    if (!messages || !Array.isArray(messages)) {
      return res
        .status(400)
        .json({ error: "Invalid request: messages array required" });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Build the conversation history with system prompt and context
    const conversationHistory = [
      { role: "user", parts: [{ text: systemPrompt }] },
      {
        role: "model",
        parts: [
          {
            text: "Understood. I will assist visitors with information about the portfolio.",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `Here is the context about the portfolio owner:\n${resumeContext}`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "I have noted the portfolio information and will use it to answer questions.",
          },
        ],
      },
    ];

    // Add user messages to conversation history
    for (const msg of messages) {
      const role = msg.role === "user" ? "user" : "model";
      conversationHistory.push({
        role,
        parts: [{ text: msg.content }],
      });
    }

    // Get the last user message
    const lastUserMessage = messages[messages.length - 1];
    if (!lastUserMessage || lastUserMessage.role !== "user") {
      return res.status(400).json({ error: "Last message must be from user" });
    }

    // Start chat session
    const chat = model.startChat({
      history: conversationHistory.slice(0, -1), // All messages except the last one
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // Send the last message and get response
    const result = await chat.sendMessage(lastUserMessage.content);
    const response = await result.response;
    const reply = response.text();

    // Get token usage metadata
    const usageMetadata = response.usageMetadata;
    const tokenInfo = {
      promptTokenCount: usageMetadata?.promptTokenCount || 0,
      candidatesTokenCount: usageMetadata?.candidatesTokenCount || 0,
      totalTokenCount: usageMetadata?.totalTokenCount || 0,
    };

    console.log("Token Usage:", tokenInfo);

    // Return the response with token info
    return res.status(200).json({
      reply,
      tokenInfo,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
