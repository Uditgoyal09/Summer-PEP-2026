import React from 'react';
import './SkillsEducation.css';

const SkillsEducation = () => {
  const skills = [
    { category: 'Languages', items: ['C++', 'Java', 'JavaScript', 'TypeScript'] },
    { category: 'Frontend', items: ['React.js', 'Next.js', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Express.js', 'Laravel', 'REST API'] },
    { category: 'Databases', items: ['MongoDB', 'MySQL', 'PostgreSQL'] },
    { category: 'Core CS', items: ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks', 'OOPs'] },
    { category: 'Tools', items: ['Git', 'GitHub', 'Bitbucket', 'VS Code', 'Postman'] }
  ];

  const education = [
    {
      institution: 'Lovely Professional University',
      location: 'Phagwara, Punjab',
      degree: 'Bachelor of Technology in Computer Science and Engineering',
      duration: 'Aug 2023 – Present',
      score: 'CGPA: 7.88'
    },
    {
      institution: 'D.A.V Public School',
      location: 'Pundri, Haryana',
      degree: 'Intermediate (PCM)',
      duration: 'Apr 2021 – Mar 2022',
      score: 'Percentage: 76.4%'
    },
    {
      institution: 'D.A.V Public School',
      location: 'Pundri, Haryana',
      degree: 'Matriculation',
      duration: 'Apr 2019 – Mar 2020',
      score: 'Percentage: 87.2%'
    }
  ];

  return (
    <section id="skills" className="section skills-education-section">
      <div className="container">
        
        <div className="skills-edu-grid">
          {/* Skills Column */}
          <div className="skills-column">
            <h2 className="section-title" style={{ textAlign: 'left', transform: 'none', left: '0' }}>Skills</h2>
            <div className="skills-container">
              {skills.map((skillGroup, index) => (
                <div key={index} className="skill-group glass">
                  <h3 className="skill-category">{skillGroup.category}</h3>
                  <div className="skill-items">
                    {skillGroup.items.map((item, idx) => (
                      <span key={idx} className="skill-badge">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="education-column">
            <h2 className="section-title" style={{ textAlign: 'left', transform: 'none', left: '0' }}>Education</h2>
            <div className="timeline">
              {education.map((edu, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content glass">
                    <h3 className="edu-institution">{edu.institution}</h3>
                    <div className="edu-meta">
                      <span className="edu-degree">{edu.degree}</span>
                      <span className="edu-duration">{edu.duration}</span>
                    </div>
                    <div className="edu-details">
                      <span className="edu-score">{edu.score}</span>
                      <span className="edu-location">{edu.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SkillsEducation;
