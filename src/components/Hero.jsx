import React from 'react';
import './Hero.css';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in">
            Hi, I'm <span className="highlight">Udit</span>
          </h1>
          <h2 className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Full Stack Developer & Problem Solver
          </h2>
          <p className="hero-description animate-fade-in" style={{ animationDelay: '0.4s' }}>
            I specialize in building scalable web applications with MERN stack, Next.js, and strong fundamentals in Data Structures and Algorithms.
          </p>
          <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/udit-goyal09/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedin />
              </a>
              <a href="https://github.com/Uditgoyal09/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaGithub />
              </a>
              <a href="mailto:uditgoyal0905@gmail.com" className="social-icon">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
