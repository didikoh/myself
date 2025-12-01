import React from 'react';
import { motion } from 'framer-motion';
import { skills, timelineSkills } from '../../data/mockData';
import * as SimpleIcons from 'react-icons/si';
import * as TablerIcons from 'react-icons/tb';
import styles from './Skills.module.css';

const Skills: React.FC = () => {
  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    
    // Check if it's a Tabler icon (Tb prefix)
    if (iconName.startsWith('Tb')) {
      const IconComponent = (TablerIcons as any)[iconName];
      return IconComponent ? <IconComponent /> : null;
    }
    
    // Otherwise, treat as Simple Icon (Si prefix)
    const IconComponent = (SimpleIcons as any)[iconName];
    return IconComponent ? <IconComponent /> : null;
  };

  const halfLength = Math.ceil(skills.length / 2);
  const firstRowSkills = skills.slice(0, halfLength);
  const secondRowSkills = skills.slice(halfLength);

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
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
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

        {/* Skills Carousel Section */}
        <motion.div 
          className={styles.carouselSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className={styles.sectionTitle}>Technologies & Tools</h3>
          
          {/* First Row - Left to Right */}
          <div className={styles.marqueeContainer}>
            <motion.div 
              className={styles.marquee}
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[...firstRowSkills, ...firstRowSkills].map((skill, index) => (
                <motion.div
                  key={`row1-${skill.id}-${index}`}
                  className={styles.skillCard}
                  whileHover={{ 
                    scale: 1.15,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className={styles.skillCardContent}>
                    <span className={styles.skillIcon}>{getIcon(skill.icon)}</span>
                    <span className={styles.skillName}>{skill.name}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Second Row - Right to Left */}
          <div className={styles.marqueeContainer}>
            <motion.div 
              className={styles.marquee}
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[...secondRowSkills, ...secondRowSkills].map((skill, index) => (
                <motion.div
                  key={`row2-${skill.id}-${index}`}
                  className={styles.skillCard}
                  whileHover={{ 
                    scale: 1.15,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className={styles.skillCardContent}>
                    <span className={styles.skillIcon}>{getIcon(skill.icon)}</span>
                    <span className={styles.skillName}>{skill.name}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
