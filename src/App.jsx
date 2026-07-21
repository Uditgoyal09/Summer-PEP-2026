import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsEducation from './components/SkillsEducation';
import ExperienceProjects from './components/ExperienceProjects';

import CertificatesAchievements from './components/CertificatesAchievements';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <SkillsEducation />
        <ExperienceProjects />
        <CertificatesAchievements />
      </main>
      <Footer />
    </div>
  );
}

export default App;
