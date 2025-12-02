import React from "react";
import { motion } from "framer-motion";
import { aboutInfo } from "../../data/mockData";
import styles from "./About.module.css";
import { FaGoogleDrive } from "react-icons/fa6";
import enfp from "../../assets/enfp.webp";

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
          <div className={styles.introCards}>
            <motion.div
              className={styles.introCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={styles.introIcon}>🎂</div>
              <h4 className={styles.introLabel}>Birthday</h4>
              <p className={styles.introValue}>1999/2/25</p>
            </motion.div>
            <motion.div
              className={styles.introCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={styles.introIcon}>♓</div>
              <h4 className={styles.introLabel}>Zodiac</h4>
              <p className={styles.introValue}>Pisces</p>
            </motion.div>
            <motion.div
              className={styles.introCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={styles.introIcon}>
                <img src={enfp} alt="MBTI Icon" />
              </div>
              <h4 className={styles.introLabel}>MBTI</h4>
              <p className={styles.introValue}>ENFP</p>
            </motion.div>
          </div>
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
              <p className={styles.university}>
                {aboutInfo.education.universityName}
              </p>
              {aboutInfo.education.location && (
                <p className={styles.location}>
                  {aboutInfo.education.location}
                </p>
              )}
              <p className={styles.duration}>
                {aboutInfo.education.startYear} - {aboutInfo.education.endYear}
              </p>
              {aboutInfo.education.cgpa && (
                <p className={styles.cgpa}>CGPA: {aboutInfo.education.cgpa}</p>
              )}
              {aboutInfo.education.certificateLink && (
                <a
                  href={aboutInfo.education.certificateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.certificateButton}
                >
                  <span className={styles.buttonIcon}>
                    <FaGoogleDrive />
                  </span>
                  View Certificate
                </a>
              )}
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
                  style={{
                    backgroundImage: `url(${fact.src})`,
                    backgroundBlendMode: 'overlay',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
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
