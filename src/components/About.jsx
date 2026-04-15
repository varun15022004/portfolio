import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';

const About = ({ personalInfo, education }) => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">About Me</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-display font-semibold text-primary-light">My Background</h3>
            <p className="text-white/70 text-lg leading-relaxed">
              I am a driven Computer Engineering graduate with a deep interest in the intersection of Software Engineering and Artificial Intelligence. 
              My journey has led me from building robust full-stack applications to training sophisticated machine learning models for real-world environmental impacts.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="glass p-4 rounded-xl flex items-center space-x-3">
                <MapPin className="text-accent" />
                <div>
                  <p className="text-xs text-white/40 uppercase">Location</p>
                  <p className="font-semibold text-sm">{personalInfo.location}</p>
                </div>
              </div>
              <div className="glass p-4 rounded-xl flex items-center space-x-3">
                <Award className="text-accent2" />
                <div>
                  <p className="text-xs text-white/40 uppercase">Education</p>
                  <p className="font-semibold text-sm">B.Tech Graduate</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-display font-semibold text-primary-light">Education</h3>
            <div className="relative border-l-2 border-primary/30 pl-8 ml-4 space-y-12">
              {education.map((edu, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 bg-bg border-4 border-primary rounded-full" />
                  <div className="glass p-5 rounded-2xl hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <GraduationCap className="text-primary mb-2" size={24} />
                      <span className="text-xs font-bold text-accent px-2 py-1 glass rounded-md">{edu.duration}</span>
                    </div>
                    <h4 className="text-lg font-bold">{edu.institution}</h4>
                    <p className="text-primary-light text-sm font-medium">{edu.degree}</p>
                    <div className="mt-3 flex items-center space-x-4">
                      <span className="text-xs font-semibold text-white/50">Score: <span className="text-white">{edu.score}</span></span>
                      {edu.status && <span className="text-[10px] bg-accent2/20 text-accent2 px-2 py-0.5 rounded-full uppercase font-bold tracking-widest">{edu.status}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
