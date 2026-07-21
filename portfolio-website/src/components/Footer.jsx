import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer glass">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#home" className="logo">Udit<span>.</span></a>
            <p>Building digital experiences that matter.</p>
          </div>
          <div className="footer-social">
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
        <div className="footer-bottom">
          <p>&copy; {currentYear} Udit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
