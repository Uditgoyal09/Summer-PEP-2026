import React from 'react';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        {/* Placeholder sections */}
        <section id="home" className="section" style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
          <div className="container">
            <h1 className="animate-fade-in">Hi, I'm Udit</h1>
            <p className="animate-fade-in" style={{ animationDelay: '0.2s', marginTop: '1rem', color: 'var(--text-secondary)' }}>Welcome to my portfolio</p>
          </div>
        </section>
        <section id="skills" className="section" style={{ minHeight: '50vh' }}>
          <div className="container">
            <h2 className="section-title">Skills</h2>
          </div>
        </section>
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
