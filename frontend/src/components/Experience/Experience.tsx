import React from 'react';
import { motion } from 'framer-motion';
import { workExperiences } from '../../data/mockData';
import styles from './Experience.module.css';

const Experience: React.FC = () => {
  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Work Experience</h2>
        </motion.div>

        <div className={styles.timeline}>
          {workExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={styles.timelineMarker}>
                <div className={styles.markerDot}></div>
              </div>

              <motion.div
                className={styles.experienceCard}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.headerTop}>
                    <h3 className={styles.position}>{experience.position}</h3>
                    <span className={styles.dateRange}>
                      {experience.startDate} - {experience.endDate}
                    </span>
                  </div>
                  <div className={styles.companyInfo}>
                    <span className={styles.company}>{experience.company}</span>
                    <span className={styles.location}>📍 {experience.location}</span>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <ul className={styles.responsibilities}>
                    {experience.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className={styles.responsibilityItem}>
                        {responsibility}
                      </li>
                    ))}
                  </ul>

                  {experience.technologies && experience.technologies.length > 0 && (
                    <div className={styles.technologies}>
                      {experience.technologies.map((tech, idx) => (
                        <span key={idx} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
