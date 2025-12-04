import React from 'react';
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

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Home />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Playground />
        <Contact />
      </main>
      <Chatbot />
    </div>
  );
};

export default App;