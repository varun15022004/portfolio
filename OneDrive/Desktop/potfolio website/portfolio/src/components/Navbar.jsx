import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Code2, Briefcase, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ personalInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Experience', to: 'experience' },
    { name: 'Projects', to: 'projects' },
    { name: 'Skills', to: 'skills' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass relative rounded-2xl flex items-center justify-between px-6 py-3 transition-colors ${scrolled ? 'bg-bg/80 border-white/20' : ''}`}>
          
          <Link to="home" smooth={true} className="flex items-center cursor-pointer group">
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              VS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                spy={true}
                activeClass="text-primary font-semibold"
                className="text-white/70 hover:text-white cursor-pointer transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="p-2 glass-hover rounded-full">
              <Code2 size={20} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="p-2 glass-hover rounded-full text-blue-400">
              <Briefcase size={20} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="p-2 glass-hover rounded-full text-accent">
              <Mail size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 glass-hover rounded-lg">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute w-full top-20 left-0 px-4"
          >
            <div className="glass rounded-2xl p-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white py-2 text-lg font-medium border-b border-white/5"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex justify-around pt-2">
                <a href={personalInfo.github} className="p-2 glass rounded-full"><Code2 /></a>
                <a href={personalInfo.linkedin} className="p-2 glass rounded-full text-blue-400"><Briefcase /></a>
                <a href={`mailto:${personalInfo.email}`} className="p-2 glass rounded-full text-accent"><Mail /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
