import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

const Experience = ({ experience }) => {
  return (
    <section id="experience" className="py-24 bg-bgSecondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-glow">Work Experience</h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-3xl relative overflow-hidden group hover:bg-white/10 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Briefcase size={80} />
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/20 rounded-2xl text-primary">
                    <Briefcase size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary-light transition-colors">{exp.role}</h3>
                    <p className="text-primary-light font-semibold text-lg">{exp.company}</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center text-white/40 font-medium glass px-4 py-2 rounded-xl text-sm">
                  <Calendar size={16} className="mr-2" />
                  <span>{exp.duration}</span>
                </div>
              </div>

              <p className="text-white/60 text-lg mb-6 leading-relaxed max-w-4xl">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white/80 uppercase tracking-wider">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-6 right-6 text-white/20 group-hover:text-primary transition-all group-hover:translate-x-1">
                <ChevronRight size={32} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
