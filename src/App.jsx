import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsEducation from './components/SkillsEducation';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <SkillsEducation />
        <section id="experience" className="section" style={{ minHeight: '50vh' }}>
          <div className="container">
            <h2 className="section-title">Experience</h2>
          </div>
        </section>
        <section id="projects" className="section" style={{ minHeight: '50vh' }}>
          <div className="container">
            <h2 className="section-title">Projects</h2>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
