import React from 'react';
import { motion } from 'framer-motion';
import { Box, Code2, Cloud, Database } from 'lucide-react';

const Skills = ({ skillCategories }) => {
  const getIcon = (name) => {
    switch (name) {
      case 'Development': return <Code2 className="text-primary" />;
      case 'AI & Data Science': return <Database className="text-secondary" style={{color: '#43e97b'}} />;
      case 'Cloud & DevOps': return <Cloud className="text-accent" />;
      default: return <Box className="text-white/40" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-bgSecondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Technical Arsenal</h2>
          <div className="w-20 h-1.5 bg-primary/50 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-3xl group hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {getIcon(category.name)}
              </div>
              <h3 className="text-xl font-bold mb-6 text-white/90">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 glass rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:border-white/30 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Skill Badge (Visual Polish) */}
        <div className="mt-24 text-center">
            <div className="inline-block relative">
                <div className="absolute inset-0 bg-primary blur-3xl opacity-20" />
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative glass px-8 py-4 rounded-full border-primary/30"
                >
                    <p className="text-sm md:text-lg font-display font-medium text-white/80 uppercase tracking-widest">
                        Constantly Learning & Evolving
                    </p>
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
