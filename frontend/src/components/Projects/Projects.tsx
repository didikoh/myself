import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Star,
  Youtube,
  Play,
  Download,
  Globe,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaGoogleDrive, FaReact, FaUnity } from "react-icons/fa";
import { SiUnrealengine } from "react-icons/si";
import { SlMagnifierAdd } from "react-icons/sl";
import { projects } from "../../data/mockData";
import type { ProjectLink, Project } from "../../types";
import styles from "./Projects.module.css";
import { IoLogoJavascript } from "react-icons/io";

const Projects: React.FC = () => {
  const [currentImageIndices, setCurrentImageIndices] = useState<{
    [key: string]: number;
  }>({});
  const [autoPlayIntervals, setAutoPlayIntervals] = useState<{
    [key: string]: number | null;
  }>({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Sort projects: featured first, then by order
  const sortedProjects = [...projects]
    .filter((project) => project.id !== "")
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

  const getLinkIcon = (type: ProjectLink["type"]) => {
    switch (type) {
      case "github":
        return Github;
      case "youtube":
        return Youtube;
      case "video":
        return Play;
      case "demo":
      case "website":
        return Globe;
      case "download":
        return Download;
      default:
        return ExternalLink;
    }
  };

  const getLinkLabel = (type: ProjectLink["type"]) => {
    switch (type) {
      case "github":
        return "GitHub";
      case "youtube":
        return "YouTube";
      case "video":
        return "Video";
      case "demo":
        return "Demo";
      case "website":
        return "Website";
      case "download":
        return "Download";
      default:
        return "Link";
    }
  };

  const getProjectIcon = (project: Project) => {
    const techs = project.technologies.map((t) => t.toLowerCase());

    if (techs.some((t) => t.includes("react"))) {
      return <FaReact className={styles.projectIcon} />;
    }
    if (techs.some((t) => t.includes("unreal"))) {
      return <SiUnrealengine className={styles.projectIcon} />;
    }
    if (techs.some((t) => t.includes("unity"))) {
      return <FaUnity className={styles.projectIcon} />;
    }
    if (techs.some((t) => t.includes("javascript"))) {
      return <IoLogoJavascript className={styles.projectIcon} />;
    }

    return <span className={styles.catEmoji}>🐱</span>;
  };

  const nextImage = (
    projectId: string,
    imagesLength: number,
    resetAutoPlay: boolean = false
  ) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % imagesLength,
    }));

    if (resetAutoPlay) {
      stopAutoPlay(projectId);
      startAutoPlay(projectId, imagesLength);
    }
  };

  const prevImage = (
    projectId: string,
    imagesLength: number,
    resetAutoPlay: boolean = false
  ) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + imagesLength) % imagesLength,
    }));

    if (resetAutoPlay) {
      stopAutoPlay(projectId);
      startAutoPlay(projectId, imagesLength);
    }
  };

  const startAutoPlay = (projectId: string, imagesLength: number) => {
    if (imagesLength <= 1) return;

    const interval = window.setInterval(() => {
      nextImage(projectId, imagesLength);
    }, 2000); // 每2秒切换一张图片

    setAutoPlayIntervals((prev) => ({
      ...prev,
      [projectId]: interval,
    }));
  };

  const stopAutoPlay = (projectId: string) => {
    const interval = autoPlayIntervals[projectId];
    if (interval) {
      window.clearInterval(interval);
      setAutoPlayIntervals((prev) => ({
        ...prev,
        [projectId]: null,
      }));
    }
  };

  const openGallery = (images: string[], currentIndex: number) => {
    setGalleryImages(images);
    setGalleryIndex(currentIndex);
    setGalleryOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextGalleryImage = () => {
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevGalleryImage = () => {
    setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!galleryOpen) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') nextGalleryImage();
      if (e.key === 'ArrowLeft') prevGalleryImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryOpen, galleryImages.length]);

  useEffect(() => {
    // 组件卸载时清理所有定时器
    return () => {
      Object.values(autoPlayIntervals).forEach((interval) => {
        if (interval) window.clearInterval(interval);
      });
    };
  }, [autoPlayIntervals]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
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
            Here are some of the projects I've worked on. Each one represents a
            learning journey and a step forward in my development skills.
          </p>
        </motion.div>

        <div
          className={`${styles.projectsGridWrapper} ${
            !isExpanded ? styles.collapsed : ""
          }`}
        >
          <motion.div
            className={styles.projectsGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {sortedProjects.map((project) => (
              <motion.div
                key={project.id}
                className={`${styles.projectCard} ${
                  project.featured ? styles.featured : ""
                }`}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
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
                  onMouseEnter={() =>
                    startAutoPlay(project.id, project.images.length)
                  }
                  onMouseLeave={() => stopAutoPlay(project.id)}
                >
                  <div className={styles.imageSlider}>
                    <button
                      className={styles.enlargeButton}
                      onClick={() => openGallery(project.images, currentImageIndices[project.id] || 0)}
                      aria-label="Enlarge image"
                    >
                      <SlMagnifierAdd size={20} />
                    </button>
                    
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${project.id}-${
                          currentImageIndices[project.id] || 0
                        }`}
                        src={
                          import.meta.env.BASE_URL + project.images[currentImageIndices[project.id] || 0]
                        }
                        alt={`${project.title} - Image ${
                          (currentImageIndices[project.id] || 0) + 1
                        }`}
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
                          onClick={() =>
                            prevImage(project.id, project.images.length, true)
                          }
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={20} />
                        </button>

                        <button
                          className={`${styles.navButton} ${styles.navButtonRight}`}
                          onClick={() =>
                            nextImage(project.id, project.images.length, true)
                          }
                          aria-label="Next image"
                        >
                          <ChevronRight size={20} />
                        </button>

                        <div className={styles.imageIndicators}>
                          {project.images.map((_, index) => (
                            <button
                              key={index}
                              className={`${styles.indicator} ${
                                index === (currentImageIndices[project.id] || 0)
                                  ? styles.indicatorActive
                                  : ""
                              }`}
                              onClick={() =>
                                setCurrentImageIndices((prev) => ({
                                  ...prev,
                                  [project.id]: index,
                                }))
                              }
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
                    {getProjectIcon(project)}
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={styles.buttonGroup}
        >
          {!isExpanded ? (
            <motion.button
              onClick={() => setIsExpanded(true)}
              className={styles.viewAllButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MdExpandMore size={20} />
              View All Projects
            </motion.button>
          ) : (
            <>
              <motion.a
                href={import.meta.env.VITE_G_DRIVE_PROJECT_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewAllButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGoogleDrive size={20} />
                View More
              </motion.a>
              <motion.button
                onClick={() => setIsExpanded(false)}
                className={styles.collapseButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdExpandLess size={20} />
                Collapse
              </motion.button>
            </>
          )}
        </motion.div>

        <AnimatePresence>
          {galleryOpen && (
            <motion.div
              className={styles.galleryOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeGallery}
            >
              <button
                className={styles.galleryCloseButton}
                onClick={closeGallery}
                aria-label="Close gallery"
              >
                <X size={30} />
              </button>

              <div className={styles.galleryContent} onClick={(e) => e.stopPropagation()}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={galleryIndex}
                    src={import.meta.env.BASE_URL +galleryImages[galleryIndex]}
                    alt={`Gallery image ${galleryIndex + 1}`}
                    className={styles.galleryImage}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {galleryImages.length > 1 && (
                  <>
                    <button
                      className={`${styles.galleryNavButton} ${styles.galleryNavLeft}`}
                      onClick={prevGalleryImage}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={30} />
                    </button>

                    <button
                      className={`${styles.galleryNavButton} ${styles.galleryNavRight}`}
                      onClick={nextGalleryImage}
                      aria-label="Next image"
                    >
                      <ChevronRight size={30} />
                    </button>

                    <div className={styles.galleryIndicators}>
                      {galleryImages.map((_, index) => (
                        <button
                          key={index}
                          className={`${styles.galleryDot} ${
                            index === galleryIndex ? styles.galleryDotActive : ''
                          }`}
                          onClick={() => setGalleryIndex(index)}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
