import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../i18n';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage === 'zh' ? 'zh' : 'en';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#playground', label: t('nav.playground') },
    { href: '#contact', label: t('nav.contact') }
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      aria-label={t('nav.label')}
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.navContainer}>
        <motion.div 
          className={styles.logo}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className={styles.catIcon}>🐱</span>
          <span>{t('identity.name')}</span>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks}>
          {navItems.map((item, index) => (
            <motion.li 
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <a 
                href={item.href} 
                className={styles.navLink}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.label}
              </a>
            </motion.li>
          ))}
        </ul>

        <div className={styles.navActions}>
          <div className={styles.languageSwitcher} role="group" aria-label={t('nav.language')}>
            <button
              type="button"
              className={`${styles.languageButton} ${language === 'zh' ? styles.activeLanguage : ''}`}
              aria-label={t('nav.switchChinese')}
              aria-pressed={language === 'zh'}
              lang="zh-CN"
              onClick={() => { void changeLanguage('zh'); }}
            >
              中文
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              className={`${styles.languageButton} ${language === 'en' ? styles.activeLanguage : ''}`}
              aria-label={t('nav.switchEnglish')}
              aria-pressed={language === 'en'}
              lang="en"
              onClick={() => { void changeLanguage('en'); }}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t(isMobileMenuOpen ? 'nav.closeMenu' : 'nav.openMenu')}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        id="mobile-navigation"
        inert={!isMobileMenuOpen}
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
        initial={false}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ul className={styles.mobileNavLinks}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a 
                href={item.href} 
                className={styles.navLink}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
