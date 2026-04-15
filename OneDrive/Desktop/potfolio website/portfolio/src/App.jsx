import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { personalInfo, education, experience, projects, skillCategories } from './data';


function App() {
  return (
    <div className="bg-bg text-white selection:bg-primary/30 selection:text-white">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10">
        <Navbar personalInfo={personalInfo} />
        
        <main>
          <Hero personalInfo={personalInfo} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-24">
            <About personalInfo={personalInfo} education={education} />
            <Experience experience={experience} />
            <Projects projects={projects} />
            <Skills skillCategories={skillCategories} />
            <Contact personalInfo={personalInfo} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
