import React from "react";
import { motion } from "framer-motion";
import { playgroundProjects } from "../../data/mockData";
import styles from "./Playground.module.css";

const Playground: React.FC = () => {
  const [comingSoon, setComingSoon] = React.useState(true);

  if (comingSoon) {
    return (
      <section id="playground" className={styles.playground}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.sectionTitle}>Playground</h2>
            <p className={styles.sectionSubtitle}>
              Personal projects and experimental work where I explore new ideas
              and have fun with code
            </p>
          </motion.div>
          <div className={styles.comingSoon}>
            <h3>Coming Soon!</h3>
            <p>Exciting projects are on the way. Stay tuned!</p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="playground" className={styles.playground}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Playground</h2>
          <p className={styles.sectionSubtitle}>
            Personal projects and experimental work where I explore new ideas
            and have fun with code
          </p>
        </motion.div>

        <div className={styles.projectsGrid}>
          {playgroundProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={styles.projectCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.cardImage}>
                <img src={project.image} alt={project.title} />
                <div className={styles.imageOverlay}>
                  <span className={styles.projectIcon}>{project.icon}</span>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>

                <div className={styles.technologies}>
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    View Project →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Playground;
