import React, { useEffect, useSyncExternalStore } from 'react';
import i18n from './i18n';
import { detectLanguage } from './i18n/language';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Playground from './components/Playground/Playground';
import Contact from './components/Contact/Contact';
import Chatbot from './components/Chatbot/Chatbot';
import './App.css';

const subscribeToHydration = () => () => undefined;

const App: React.FC = () => {
  // False on the server and first hydration pass; true for client rendering.
  const showProjectContent = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  useEffect(() => {
    // Hand visible prerendered content back to motion only after hydration.
    document.getElementById('root')?.removeAttribute('data-prerendered');
    // Apply saved/browser preferences only after the initial hydration commits.
    const language = detectLanguage();
    if (language !== i18n.resolvedLanguage) void i18n.changeLanguage(language);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main>
        <Home />
        <About />
        <Skills />
        <Experience />
        {showProjectContent ? <Projects /> : <section id="projects" />}
        {showProjectContent ? <Playground /> : <section id="playground" />}
        <Contact />
      </main>
      <Chatbot />
    </div>
  );
};

export default App;
