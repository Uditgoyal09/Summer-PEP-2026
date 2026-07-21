import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsEducation from './components/SkillsEducation';
import ExperienceProjects from './components/ExperienceProjects';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <SkillsEducation />
        <ExperienceProjects />
      </main>
    </div>
  );
}

export default App;
