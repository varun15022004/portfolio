import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Download, Terminal } from 'lucide-react';
import { Link } from 'react-scroll';

const Hero = ({ personalInfo }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[140px] animate-pulse delay-700" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass border-white/20 mb-6 group cursor-pointer hover:bg-white/10 transition-colors">
            <span className="w-2 h-2 rounded-full bg-accent2 animate-ping" />
            <span className="text-sm font-medium text-white/80">{personalInfo.availability}</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-display font-extrabold mb-6 tracking-tight">
            I'm <span className="bg-gradient-to-r from-primary via-accent to-primary-light bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </h1>

          <div className="h-12 md:h-16 mb-8">
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'AI/ML Engineer',
                2000,
                'GenAI Specialist',
                2000,
                'DevOps Enthusiast',
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="text-2xl md:text-4xl font-medium text-white/60 font-display"
              repeat={Infinity}
            />
          </div>

          <p className="max-w-2xl mx-auto text-lg text-white/50 mb-10 leading-relaxed">
            {personalInfo.summary}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="projects" smooth={true}>
              <button className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold flex items-center justify-center space-x-2 transition-all group shadow-[0_0_20px_rgba(108,99,255,0.4)]">
                <span>View My Work</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            
            <a href="#" className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/10 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all">
              <Download size={20} />
              <span>Resume</span>
            </a>
          </div>
        </motion.div>

        {/* Tech Stack Floating Icons (Decorative) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 flex flex-wrap justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
        >
          {['React', 'Node.js', 'Python', 'AWS', 'Docker', 'PySpark'].map((tech) => (
            <div key={tech} className="flex items-center space-x-2 glass px-4 py-2 rounded-lg text-sm font-semibold">
              <Terminal size={14} className="text-primary" />
              <span>{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
