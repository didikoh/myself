import React from 'react';
import { motion } from 'framer-motion';
import { aboutInfo } from '../../data/mockData';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>About Me</h2>
        </motion.div>

        {/* Personal Introduction */}
        <motion.div
          className={styles.introBlock}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className={styles.intro}>{aboutInfo.introduction}</p>
        </motion.div>

        {/* Key Roles/Specialties */}
        <motion.div
          className={styles.rolesBlock}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className={styles.blockTitle}>What I Do</h3>
          <div className={styles.rolesList}>
            {aboutInfo.roles.map((role, index) => (
              <motion.div
                key={index}
                className={styles.roleCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={styles.roleIcon}>{role.icon}</div>
                <h4 className={styles.roleTitle}>{role.title}</h4>
                <p className={styles.roleDescription}>{role.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          className={styles.educationBlock}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className={styles.blockTitle}>Education</h3>
          <div className={styles.educationCard}>
            <div className={styles.educationIcon}>🎓</div>
            <div className={styles.educationContent}>
              <h4 className={styles.degree}>{aboutInfo.education.degree}</h4>
              <p className={styles.major}>{aboutInfo.education.major}</p>
              <p className={styles.university}>{aboutInfo.education.universityName}</p>
              <p className={styles.duration}>
                {aboutInfo.education.startYear} - {aboutInfo.education.endYear}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Fun Facts/Hobbies */}
        {aboutInfo.funFacts && aboutInfo.funFacts.length > 0 && (
          <motion.div
            className={styles.funFactsBlock}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className={styles.blockTitle}>Beyond Code</h3>
            <div className={styles.funFactsList}>
              {aboutInfo.funFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  className={styles.funFactItem}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <span className={styles.funFactIcon}>{fact.icon}</span>
                  <span className={styles.funFactText}>{fact.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default About;
