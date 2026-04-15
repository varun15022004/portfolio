import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Code2, Briefcase, Send, ArrowUp } from 'lucide-react';
import { Link } from 'react-scroll';

const Contact = ({ personalInfo }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Portfolio Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-6" />
          <p className="text-white/50 max-w-xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass p-8 rounded-3xl space-y-8">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              
              <div className="flex items-center space-x-6 group">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Email</p>
                  <a href={`mailto:${personalInfo.email}`} className="text-lg font-semibold hover:text-primary transition-colors">{personalInfo.email}</a>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <Phone />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Phone</p>
                  <p className="text-lg font-semibold">{personalInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-accent2 group-hover:bg-accent2 group-hover:text-white transition-all">
                  <MapPin />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Location</p>
                  <p className="text-lg font-semibold">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-start space-x-4">
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="p-4 glass rounded-2xl hover:bg-white/10 transition-colors">
                <Code2 size={24} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="p-4 glass rounded-2xl hover:bg-white/10 text-blue-400 transition-colors">
                <Briefcase size={24} />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-white/40 uppercase mb-2 ml-1">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-white" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/40 uppercase mb-2 ml-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-white" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-white/40 uppercase mb-2 ml-1">Message</label>
                <textarea 
                  rows="4" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message here..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-white resize-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl flex items-center justify-center space-x-2 hover:scale-[1.02] transition-transform active:scale-95">
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 text-white/30 text-sm">
          <p>© 2026 {personalInfo.name}. All rights reserved.</p>
          <div className="flex space-x-8">
            <Link to="about" smooth={true} className="hover:text-white transition-colors cursor-pointer">About</Link>
            <Link to="experience" smooth={true} className="hover:text-white transition-colors cursor-pointer">Experience</Link>
            <Link to="projects" smooth={true} className="hover:text-white transition-colors cursor-pointer">Projects</Link>
          </div>
          <Link to="home" smooth={true}>
            <button className="p-3 glass rounded-full hover:bg-primary transition-all group">
              <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
