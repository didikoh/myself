import React from 'react';
import { motion } from 'framer-motion';
import { timelineSkills } from '../../data/mockData';
import styles from './Skills.module.css';

type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'game'
  | 'ai'
  | 'devops'
  | 'tools'
  | 'other';

const categoryBySkill: Record<string, SkillCategory> = {
  HTML: 'frontend',
  CSS: 'frontend',
  JavaScript: 'frontend',
  Angular: 'frontend',
  'Telegram Mini App': 'frontend',
  React: 'frontend',
  Vite: 'frontend',
  TypeScript: 'frontend',
  'Next.js': 'frontend',
  Zustand: 'frontend',
  Redux: 'frontend',
  'Redux Toolkit': 'frontend',
  'Konva.js': 'frontend',

  Python: 'backend',
  'C#': 'backend',
  'ASP.NET': 'backend',
  'Telegram Bot API': 'backend',
  'Web3 Integration': 'backend',
  PHP: 'backend',
  'RESTful API': 'backend',
  Laravel: 'backend',
  MySQL: 'backend',
  'Node.js': 'backend',
  'Slim 4': 'backend',
  Fastify: 'backend',
  'Express.js': 'backend',
  'Eloquent ORM': 'backend',
  PostgreSQL: 'backend',
  pgvector: 'backend',
  Supabase: 'backend',
  Redis: 'backend',
  'OAuth 2.0': 'backend',

  Unity: 'game',
  Blender: 'game',
  'Unreal Engine 4': 'game',
  'C++': 'game',
  'Mixed Reality': 'game',
  'Multiplayer Synchronization': 'game',
  'Game AI': 'game',
  'Unreal Engine 5': 'game',
  'Virtual Reality': 'game',
  'Steam Advanced Sessions': 'game',
  'Augmented Reality': 'game',
  'Metaverse Development': 'game',
  Verge3D: 'game',
  'Babylon.js': 'game',
  'Unreal Engine C++': 'game',
  'Unreal Engine Pixel Streaming': 'game',
  'WebRTC & CoTURN': 'game',
  WebGPU: 'game',
  Godot: 'game',
  Perforce: 'game',

  Automation: 'ai',
  'LLM API Integration': 'ai',
  'RAG Chatbot': 'ai',
  'LLM Gateway': 'ai',
  'Multi-Agent Development': 'ai',

  Cloudflare: 'devops',
  Docker: 'devops',
  'GitHub Actions': 'devops',
  'CI/CD': 'devops',
  'Linux VPS Administration': 'devops',
  'Apache HTTP Server': 'devops',
  'Reverse Proxy Configuration': 'devops',
  'PM2 Process Management': 'devops',
  'Cloudflare Tunnel': 'devops',

  Playwright: 'tools',
  Figma: 'tools',
};

const catalogCategories: Array<{
  key: SkillCategory;
  index: string;
  title: string;
  description: string;
}> = [
  {
    key: 'frontend',
    index: '01',
    title: 'Frontend',
    description: 'Web interfaces, client state, and interactive browser experiences.',
  },
  {
    key: 'backend',
    index: '02',
    title: 'Backend & Data',
    description: 'APIs, server frameworks, authentication, databases, and data services.',
  },
  {
    key: 'game',
    index: '03',
    title: 'Game, 3D & XR',
    description: 'Gameplay, real-time 3D, immersive platforms, and streaming.',
  },
  {
    key: 'ai',
    index: '04',
    title: 'AI & Automation',
    description: 'LLM integration, RAG, automation, and multi-agent workflows.',
  },
  {
    key: 'devops',
    index: '05',
    title: 'DevOps & Infrastructure',
    description: 'Deployment pipelines, servers, process management, and networking.',
  },
  {
    key: 'tools',
    index: '06',
    title: 'Tools & Design',
    description: 'Testing, interface design, and supporting production tools.',
  },
  {
    key: 'other',
    index: '07',
    title: 'Other',
    description: 'Additional skills from the learning timeline.',
  },
];

const skillCatalog = catalogCategories
  .map((category) => ({
    ...category,
    skills: timelineSkills
      .filter(
        (item) => (categoryBySkill[item.skill] ?? 'other') === category.key,
      )
      .map((item) => item.skill),
  }))
  .filter((category) => category.skills.length > 0);

const Skills: React.FC = () => {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>My Skills Journey</h2>
          <p className={styles.subtitle}>
            From my first line of code to cutting-edge technologies - 
            here's my learning journey through the years
          </p>
        </motion.div>

        {/* Timeline Section */}
        <motion.div 
          className={styles.timelineSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className={styles.sectionTitle}>Learning Timeline</h3>
          <div className={styles.timelineWrapper}>
            <div className={styles.timeline}>
              <div className={styles.timelineLine} />
              {timelineSkills.map((item, index) => (
                <motion.div
                  key={index}
                  className={styles.timelineNode}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineDate}>
                      {item.month} {item.year}
                    </div>
                    <div className={styles.timelineSkill}>{item.skill}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Catalog Section */}
        <motion.div 
          className={styles.catalogSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className={styles.catalogIntro}>
            <h3 className={styles.sectionTitle}>Skill Catalog</h3>
            <p className={styles.catalogDescription}>
              Every skill from my learning timeline, organized by area of expertise.
            </p>
          </div>

          <div className={styles.catalog}>
            {skillCatalog.map((category, categoryIndex) => (
              <motion.section
                key={category.key}
                className={styles.catalogGroup}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: categoryIndex * 0.06 }}
              >
                <div className={styles.catalogGroupHeader}>
                  <div className={styles.catalogGroupHeading}>
                    <span className={styles.categoryIndex}>{category.index}</span>
                    <div>
                      <h4 className={styles.categoryTitle}>{category.title}</h4>
                      <p className={styles.categoryDescription}>
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <span className={styles.categoryCount}>
                    {category.skills.length}{' '}
                    {category.skills.length === 1 ? 'skill' : 'skills'}
                  </span>
                </div>

                <ul className={styles.skillGrid}>
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={`${category.key}-${skill}-${skillIndex}`}
                      className={styles.skillCard}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className={styles.skillMarker} aria-hidden="true" />
                      <span className={styles.skillName}>{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
