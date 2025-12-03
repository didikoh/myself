import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Send,
  Phone,
  Facebook,
  Instagram,
} from "lucide-react";
import { personalInfo, socialLinks } from "../../data/mockData";
import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const iconMap = {
    mail: Mail,
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    phone: Phone,
    facebook: Facebook,
    instagram: Instagram,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formBody = new FormData();
      formBody.append("name", formData.name);
      formBody.append("email", formData.email);
      formBody.append("message", formData.message);

      const response = await fetch("http://localhost:8000/api/send_mail.php", {
        method: "POST",
        body: formBody,
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      {/* Floating cat decorations */}
      <motion.div
        className={styles.catDecoration}
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        😸
      </motion.div>
      <motion.div
        className={styles.catDecoration}
        animate={{
          y: [0, -20, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        🐱
      </motion.div>
      <motion.div
        className={styles.catDecoration}
        animate={{
          y: [0, -25, 0],
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      >
        😺
      </motion.div>

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Get In Touch</h2>
          <p className={styles.subtitle}>
            I'm always excited to discuss new opportunities, interesting
            projects, or just chat about technology and cats! 🐱
          </p>
        </motion.div>

        <div className={styles.contactContent}>
          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.contactTitle}>Let's work together!</h3>
            <p className={styles.contactText}>
              Whether you have a project in mind, want to collaborate, or just
              want to say hello, I'd love to hear from you. Drop me a message
              and I'll get back to you as soon as possible.
            </p>

            <motion.div
              className={styles.directContact}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.a
                href="https://wa.me/60182198225"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactMethod}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={styles.contactIcon}>
                  <Phone size={20} />
                </div>
                <div className={styles.contactDetails}>
                  <div className={styles.contactLabel}>WhatsApp</div>
                  <div className={styles.contactValue}>+60 18-219 8225</div>
                </div>
              </motion.a>
              
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className={styles.contactMethod}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={styles.contactIcon}>
                  <Mail size={20} />
                </div>
                <div className={styles.contactDetails}>
                  <div className={styles.contactLabel}>Email</div>
                  <div className={styles.contactValue}>
                    {personalInfo.email}
                  </div>
                </div>
              </motion.a>

              <motion.div
                className={styles.contactMethod}
                variants={itemVariants}
                style={{ cursor: "default" }}
              >
                <div className={styles.contactIcon}>
                  <MapPin size={20} />
                </div>
                <div className={styles.contactDetails}>
                  <div className={styles.contactLabel}>Location</div>
                  <div className={styles.contactValue}>
                    Based in Kuala Lumpur, Malaysia<br/> Able to work remotely worldwide
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.formContainer}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <h3 className={styles.formTitle}>Send me a message</h3>

              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  required
                  placeholder="Your message..."
                  rows={5}
                />
              </div>

              {submitStatus === "success" && (
                <div className={styles.successMessage}>
                  ✅ Thank you! Your message has been sent.
                </div>
              )}

              {submitStatus === "error" && (
                <div className={styles.errorMessage}>
                  ❌ Sorry, something went wrong. Please try again later.
                </div>
              )}

              <motion.button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={18} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          className={styles.socialLinksContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className={styles.socialTitle}>Connect with me</h3>
          <motion.div
            className={styles.socialLinks}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {socialLinks.map((link) => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap];
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  title={link.name}
                >
                  {IconComponent && <IconComponent size={24} />}
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
