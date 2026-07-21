import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './ExperienceProjects.css';

const ExperienceProjects = () => {
  const experiences = [
    {
      role: 'Web Developer Intern',
      company: 'Green Mandi Deals Private Limited',
      duration: 'Jun 2025 - Aug 2025',
      points: [
        'Architected modular web platform components and a role-based admin portal, reducing admin task time by 35%.',
        'Optimized admin-side data operations, improving system reliability and maintainability.',
        'Streamlined RESTful API integration across 10+ backend services, boosting operational throughput by 40%.'
      ],
      techStack: ['Next.js', 'React.js', 'Node.js', 'Express.js', 'TypeScript', 'PostgreSQL']
    }
  ];

  const projects = [
    {
      title: 'CarbonTracker',
      subtitle: 'Carbon Footprint Monitoring Platform',
      duration: 'Jan 2026 - Feb 2026',
      points: [
        'Built a full-stack carbon tracking platform with real-time CO₂ estimation covering transport, energy, and lifestyle data.',
        'Enforced JWT-based stateless authentication and role-level route authorization across 12+ secured API endpoints.',
        'Processed and persisted multisource emission data from 3 categories using a structured MongoDB schema design.'
      ],
      techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      github: 'https://github.com/Uditgoyal09/',
      live: '#'
    },
    {
      title: 'CrediScore',
      subtitle: 'FinTech Credit Scoring & Lending Platform',
      duration: 'Nov 2025 - Dec 2025',
      points: [
        'Engineered a MERN-stack credit scoring engine processing 20+ records with sub-2s end-to-end response latency.',
        'Designed and implemented a modular monolithic backend architecture for authentication, financial data validation, and rule-based credit score computation, ensuring maintainability, scalability, and clean separation of concerns.',
        'Exposed 10+ REST API endpoints with defined request & response contracts, cutting frontend-backend integration overhead by 30%.'
      ],
      techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      github: 'https://github.com/Uditgoyal09/',
      live: '#'
    }
  ];

  return (
    <>
      <section id="experience" className="section">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <div className="experience-container">
            {experiences.map((exp, index) => (
              <div key={index} className="experience-card glass">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <h4 className="exp-company">{exp.company}</h4>
                  </div>
                  <span className="exp-duration">{exp.duration}</span>
                </div>
                <ul className="exp-points">
                  {exp.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
                <div className="tech-stack">
                  {exp.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card glass">
                <div className="project-content">
                  <div className="project-header">
                    <div>
                      <h3 className="project-title">{project.title}</h3>
                      <h4 className="project-subtitle">{project.subtitle}</h4>
                    </div>
                    <div className="project-links">
                      <a href={project.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                      <a href={project.live} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /></a>
                    </div>
                  </div>
                  <span className="project-duration">{project.duration}</span>
                  <ul className="project-points">
                    {project.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-footer">
                  <div className="tech-stack">
                    {project.techStack.map((tech, idx) => (
                      <span key={idx} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ExperienceProjects;
