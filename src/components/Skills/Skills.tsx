import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/mockData';
import type { Skill } from '../../types';
import styles from './Skills.module.css';

const Skills: React.FC = () => {
  const categorizedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryConfig = {
    frontend: { title: 'Game & Frontend Development', icon: '�' },
    backend: { title: 'Backend & Programming', icon: '⚙️' },
    tools: { title: 'Media & Design Tools', icon: '🎨' },
    other: { title: 'Other Technologies', icon: '💡' }
  };

  const renderCatLevel = (level: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <motion.span
        key={index}
        className={`${styles.catIcon} ${index < level ? styles.active : styles.inactive}`}
        whileHover={{ 
          scale: 1.3, 
          rotate: 10,
          transition: { duration: 0.2 }
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        🐱
      </motion.span>
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>My Skills</h2>
          <p className={styles.subtitle}>
            Here are the technologies and tools I work with. Each skill is rated by cute cats - 
            the more cats, the more proficient I am! 🐱
          </p>
        </motion.div>

        <motion.div 
          className={styles.skillsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Object.entries(categorizedSkills).map(([category, categorySkills]) => (
            <motion.div 
              key={category}
              className={styles.skillCategory}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <h3 className={styles.categoryTitle}>
                <span className={styles.categoryIcon}>
                  {categoryConfig[category as keyof typeof categoryConfig]?.icon}
                </span>
                {categoryConfig[category as keyof typeof categoryConfig]?.title}
              </h3>
              
              {categorySkills.map((skill, index) => (
                <motion.div 
                  key={skill.id}
                  className={styles.skillItem}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className={styles.skillName}>{skill.name}</span>
                  <div className={styles.skillLevel}>
                    {renderCatLevel(skill.level)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.skillsOverview}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className={styles.overviewTitle}>All Technologies I Work With</h3>
          <div className={styles.skillTags}>
            {skills.map((skill, index) => (
              <motion.span
                key={skill.id}
                className={styles.skillTag}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.1,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
