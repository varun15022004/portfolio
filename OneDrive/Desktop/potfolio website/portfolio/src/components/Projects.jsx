import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Filter } from 'lucide-react';

const Projects = ({ projects }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1.5 bg-accent2 mx-auto rounded-full mb-8" />
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                  filter === cat 
                  ? 'bg-primary text-white shadow-[0_0_15px_rgba(108,99,255,0.4)]' 
                  : 'glass text-white/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-3xl overflow-hidden group hover:border-primary/50 transition-all flex flex-col h-full"
              >
                {/* Image Placeholder / Gradient */}
                <div className="h-48 relative overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/10 to-bg flex items-center justify-center">
                      <Code size={40} className="opacity-20 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] bg-white/10 backdrop-blur-md px-3 py-1 rounded-full uppercase font-bold tracking-widest text-white/80 border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary-light transition-colors">{project.title}</h3>
                  <p className="text-white/50 text-sm mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] font-bold text-primary-light px-2 py-0.5 glass rounded-md italic">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4">
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 glass-hover rounded-xl text-white/70 hover:text-white transition-colors"
                      >
                        <Code size={20} />
                      </a>
                    )}
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-grow py-2.5 glass-hover rounded-xl text-sm font-bold flex items-center justify-center space-x-2 text-white/90"
                      >
                        <span>View Project</span>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
