import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Monitor, Cpu, LogOut, CheckCircle2, Clock, Terminal, BookOpen, User } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import courses from '../data/courses';
import './Dashboard.css';
import './Courses.css';

export const Dashboard = () => {
  const { user, logout } = useAuth();

  // Get initials for user avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="dashboard-wrapper">
      {/* Navigation bar */}
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <Terminal className="nav-brand-icon" size={22} />
          <span>Portal</span>
        </div>
        <div className="nav-user">
          <div className="user-avatar" title={user?.name}>
            {getInitials(user?.name)}
          </div>
          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
            {user?.name || 'User'}
          </span>
          <ThemeToggle />
          <button className="btn-logout" onClick={logout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main dashboard content */}
      <main className="dashboard-content">
        {/* <section className="welcome-section">
          <h2>Welcome back, {user?.name || 'Operator'}! 👋</h2>
          <p>Your security credentials are authenticated and your workspace session is active.</p>
        </section>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon indigo">
              <ShieldCheck size={26} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Security Tier</span>
              <span className="stat-value">Excellent</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              <Monitor size={26} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Active Sessions</span>
              <span className="stat-value">1 Device</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pink">
              <Cpu size={26} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Access Token</span>
              <span className="stat-value">Developer</span>
            </div>
          </div>
        </div> */}

        {/* Courses Catalogue Section */}
        <section className="courses-section" style={{ marginBottom: '48px' }}>
          <div className="panel-header" style={{ marginBottom: '22px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BookOpen size={22} style={{ color: 'var(--accent-primary)' }} />
              Available Learning Catalogue ({courses.length})
            </h3>
          </div>
          
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-image-wrapper">
                  <img src={course.image} alt={course.title} className="course-image" loading="lazy" />
                  <span className={`course-badge ${course.level.toLowerCase()}`}>
                    {course.level}
                  </span>
                </div>
                <div className="course-body">
                  <h4 className="course-title">{course.title}</h4>
                  <div className="course-instructor">
                    <User size={14} style={{ color: 'var(--accent-secondary)' }} />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="course-details">
                    <span className="course-duration">
                      <Clock size={14} />
                      {course.duration}
                    </span>
                    <span className="course-price">${course.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Details & Logs Panel */}
        <div className="details-panel">
          <div className="panel-header">
            <h3>Session Activity Log</h3>
            <span style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: '600', background: 'rgba(99, 102, 241, 0.1)', padding: '4px 10px', borderRadius: '20px' }}>
              Live Session
            </span>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-desc">
                <CheckCircle2 className="activity-dot success" size={16} />
                <span className="activity-text">Local Storage authentication successfully validated</span>
              </div>
              <span className="activity-time">Just now</span>
            </div>

            <div className="activity-item">
              <div className="activity-desc">
                <CheckCircle2 className="activity-dot success" size={16} />
                <span className="activity-text">Logged in as {user?.email|| ": Email not found"}</span>
              </div>
              <span className="activity-time">1 min ago</span>
            </div>

            <div className="activity-item">
              <div className="activity-desc">
                <Clock className="activity-dot" size={16} style={{ color: 'var(--accent-secondary)' }} />
                <span className="activity-text">Secure Router guards mounted successfully</span>
              </div>
              <span className="activity-time">5 mins ago</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
