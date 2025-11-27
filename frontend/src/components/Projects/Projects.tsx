import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, Youtube, Play, Download, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../../data/mockData';
import type { ProjectLink } from '../../types';
import styles from './Projects.module.css';

const Projects: React.FC = () => {
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: string]: number }>({});
  const [autoPlayIntervals, setAutoPlayIntervals] = useState<{ [key: string]: number | null }>({});

  const getLinkIcon = (type: ProjectLink['type']) => {
    switch (type) {
      case 'github':
        return Github;
      case 'youtube':
        return Youtube;
      case 'video':
        return Play;
      case 'demo':
      case 'website':
        return Globe;
      case 'download':
        return Download;
      default:
        return ExternalLink;
    }
  };

  const getLinkLabel = (type: ProjectLink['type']) => {
    switch (type) {
      case 'github':
        return 'GitHub';
      case 'youtube':
        return 'YouTube';
      case 'video':
        return 'Video';
      case 'demo':
        return 'Demo';
      case 'website':
        return 'Website';
      case 'download':
        return 'Download';
      default:
        return 'Link';
    }
  };

  const nextImage = (projectId: string, imagesLength: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % imagesLength
    }));
  };

  const prevImage = (projectId: string, imagesLength: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + imagesLength) % imagesLength
    }));
  };

  const startAutoPlay = (projectId: string, imagesLength: number) => {
    if (imagesLength <= 1) return;
    
    const interval = window.setInterval(() => {
      nextImage(projectId, imagesLength);
    }, 2000); // 每2秒切换一张图片

    setAutoPlayIntervals(prev => ({
      ...prev,
      [projectId]: interval
    }));
  };

  const stopAutoPlay = (projectId: string) => {
    const interval = autoPlayIntervals[projectId];
    if (interval) {
      window.clearInterval(interval);
      setAutoPlayIntervals(prev => ({
        ...prev,
        [projectId]: null
      }));
    }
  };

  useEffect(() => {
    // 组件卸载时清理所有定时器
    return () => {
      Object.values(autoPlayIntervals).forEach(interval => {
        if (interval) window.clearInterval(interval);
      });
    };
  }, [autoPlayIntervals]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>My Projects</h2>
          <p className={styles.subtitle}>
            Here are some of the projects I've worked on. Each one represents 
            a learning journey and a step forward in my development skills.
          </p>
        </motion.div>

        <motion.div 
          className={styles.projectsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (project.id != '' &&
            <motion.div
              key={project.id}
              className={`${styles.projectCard} ${project.featured ? styles.featured : ''}`}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              {project.featured && (
                <div className={styles.featuredBadge}>
                  <Star size={12} fill="currentColor" />
                  Featured
                </div>
              )}

              <div 
                className={styles.imageContainer}
                onMouseEnter={() => startAutoPlay(project.id, project.images.length)}
                onMouseLeave={() => stopAutoPlay(project.id)}
              >
                <div className={styles.imageSlider}>
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={`${project.id}-${currentImageIndices[project.id] || 0}`}
                      src={project.images[currentImageIndices[project.id] || 0]}
                      alt={`${project.title} - Image ${(currentImageIndices[project.id] || 0) + 1}`}
                      className={styles.projectImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                  
                  {project.images.length > 1 && (
                    <>
                      <button
                        className={`${styles.navButton} ${styles.navButtonLeft}`}
                        onClick={() => prevImage(project.id, project.images.length)}
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      <button
                        className={`${styles.navButton} ${styles.navButtonRight}`}
                        onClick={() => nextImage(project.id, project.images.length)}
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      <div className={styles.imageIndicators}>
                        {project.images.map((_, index) => (
                          <button
                            key={index}
                            className={`${styles.indicator} ${
                              index === (currentImageIndices[project.id] || 0) ? styles.indicatorActive : ''
                            }`}
                            onClick={() => setCurrentImageIndices(prev => ({ ...prev, [project.id]: index }))}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>
                  <span className={styles.catEmoji}>🐱</span>
                  {project.title}
                </h3>
                
                <p className={styles.projectDescription}>
                  {project.description}
                </p>

                <div className={styles.technologies}>
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className={styles.techTag}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: techIndex * 0.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className={styles.projectLinks}>
                  {project.links.map((link, linkIndex) => {
                    const IconComponent = getLinkIcon(link.type);
                    return (
                      <motion.a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLink}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent size={16} />
                        {link.label || getLinkLabel(link.type)}
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewAllButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
