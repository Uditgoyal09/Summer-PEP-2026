import React from 'react';
import { FaCertificate, FaTrophy } from 'react-icons/fa';
import './CertificatesAchievements.css';

const CertificatesAchievements = () => {
  const certificates = [
    { title: 'Oracle Data Platform 2025 Certified Foundations Associate', issuer: 'Oracle', date: 'May 2026' },
    { title: 'Cloud Computing Essentials', issuer: 'AWS Training & Certification', date: 'Mar 2026' },
    { title: 'Summer Training in Object-Oriented Programming using C++', issuer: 'LPU', date: 'Aug 2025' },
    { title: 'Privacy and Security in Online Social Media', issuer: 'NPTEL', date: 'Apr 2025' },
    { title: 'Full Stack Development', issuer: 'Board Infinity', date: 'Feb 2024' }
  ];

  const achievements = [
    {
      title: 'Competitive Programming & Problem-Solving',
      platform: 'LeetCode',
      date: 'Mar 2026',
      description: 'Solved 160+ DSA problems across arrays, trees, graphs, recursion, and dynamic programming.'
    },
    {
      title: 'Problem-Solving Badge (4 Star)',
      platform: 'HackerRank',
      date: 'Feb 2026',
      description: 'Earned 500+ problem-solving points by solving coding challenges focused on data structures and algorithms.'
    },
    {
      title: 'Coordinated HackWithVertos 1.0 (24-Hour Hackathon)',
      platform: 'Student Organization ECHO',
      date: 'Apr 2024',
      description: 'Recognized for organizing and managing a major technical event at LPU.'
    }
  ];

  return (
    <section id="certificates" className="section">
      <div className="container">
        
        <div className="cert-achieve-grid">
          {/* Certificates */}
          <div className="cert-column">
            <h2 className="section-title" style={{ textAlign: 'left', transform: 'none', left: '0' }}>
              <FaCertificate className="title-icon" /> Certificates
            </h2>
            <div className="cert-list">
              {certificates.map((cert, index) => (
                <div key={index} className="cert-card glass">
                  <div className="cert-header">
                    <h3 className="cert-title">{cert.title}</h3>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                  <p className="cert-issuer">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="achieve-column">
            <h2 className="section-title" style={{ textAlign: 'left', transform: 'none', left: '0' }}>
              <FaTrophy className="title-icon" /> Achievements
            </h2>
            <div className="achieve-list">
              {achievements.map((achieve, index) => (
                <div key={index} className="achieve-card glass">
                  <div className="achieve-header">
                    <h3 className="achieve-title">{achieve.title}</h3>
                    <span className="achieve-date">{achieve.date}</span>
                  </div>
                  <p className="achieve-platform">{achieve.platform}</p>
                  <p className="achieve-description">{achieve.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesAchievements;
