import React from 'react';
import { motion } from 'framer-motion';
//@ts-ignore
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import { personalInfo } from '../../data/mockData';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={styles.home}>
      <motion.div 
        className={styles.homeContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className={styles.textContent}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className={styles.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {personalInfo.name}
          </motion.h1>
          
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {personalInfo.title}
          </motion.h2>
          
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {personalInfo.description}
          </motion.p>
          
          <motion.div 
            className={styles.ctaButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.button 
              className={`${styles.ctaButton} ${styles.primary}`}
              onClick={scrollToProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects <ArrowDown size={16} />
            </motion.button>
            
            {/* <motion.a 
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} /> GitHub
            </motion.a> */}
            
            {/* <motion.a 
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={16} /> LinkedIn
            </motion.a> */}
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.imageContent}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className={styles.avatarContainer}>
            <motion.img 
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className={styles.avatar}
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6 }
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating cat decorations */}
      <div className={styles.decorations}>
        <motion.span 
          className={styles.catDecoration}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🐱
        </motion.span>
        <motion.span 
          className={styles.catDecoration}
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -3, 3, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          😸
        </motion.span>
        <motion.span 
          className={styles.catDecoration}
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, 7, -7, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        >
          😺
        </motion.span>
        <motion.span 
          className={styles.catDecoration}
          animate={{ 
            y: [0, -18, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          🙀
        </motion.span>
      </div>
    </section>
  );
};

export default Home;
