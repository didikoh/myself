import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { usePortfolioData } from "../../data/usePortfolioData";
import { getPublicAssetUrl } from "../../utils/publicAssetUrl";
import styles from "./Playground.module.css";

const Playground: React.FC = () => {
  const { t } = useTranslation();
  const { playgroundProjects } = usePortfolioData();
  return (
    <section id="playground" className={styles.playground}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>{t("playground.title")}</h2>
          <p className={styles.sectionSubtitle}>
            {t("playground.subtitle")}
          </p>
        </motion.div>

        {playgroundProjects.length > 0 ? (
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
                  <img
                    src={getPublicAssetUrl(project.image)}
                    alt={project.title}
                  />
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
                      {t("playground.viewProject")} →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={styles.comingSoon}>
            <h3>{t("playground.comingSoon")}</h3>
            <p>{t("playground.comingSoonDescription")}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Playground;
