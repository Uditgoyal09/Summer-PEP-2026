import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, ArrowRight, Check, X } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import './Signup.css';

export const Signup = () => {
  const { signup, showToast } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real-time password requirement tracker
  const [requirements, setRequirements] = useState({
    length: false,
    number: false,
    special: false,
    uppercase: false,
  });

  useEffect(() => {
    setRequirements({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
      uppercase: /[A-Z]/.test(password),
    });
  }, [password]);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      const allMet = Object.values(requirements).every(val => val === true);
      if (!allMet) {
        newErrors.password = 'Password must meet all security requirements';
      }
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    const result = await signup(name, email, password);
    setIsSubmitting(false);

    if (result.success) {
      showToast('Account created successfully! Welcome aboard.', 'success');
      navigate('/');
    } else {
      showToast(result.message, 'error');
      setErrors({ form: result.message });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ maxWidth: '520px' }}>
        <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
          <ThemeToggle />
        </div>
        <div className="auth-header">
          <div className="auth-logo">
            <UserPlus size={24} />
          </div>
          <h1>Create an account</h1>
          <p>Get started with your free secure account today</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {errors.form && (
            <div className="validation-msg" style={{ justifyContent: 'center', fontSize: '13px', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              ⚠️ {errors.form}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <div className="input-container">
              <User className="input-icon" size={18} />
              <input
                id="name"
                type="text"
                className="auth-input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors(prev => ({ ...prev, name: null }));
                }}
                disabled={isSubmitting}
              />
            </div>
            {errors.name && <span className="validation-msg">⚠️ {errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div className="input-container">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                type="email"
                className="auth-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                }}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && <span className="validation-msg">⚠️ {errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="auth-input"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: null }));
                }}
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {password && (
              <div className="password-checklist">
                <div className={`checklist-item ${requirements.length ? 'valid' : ''}`}>
                  {requirements.length ? <Check size={12} /> : <X size={12} />}
                  At least 8 characters
                </div>
                <div className={`checklist-item ${requirements.uppercase ? 'valid' : ''}`}>
                  {requirements.uppercase ? <Check size={12} /> : <X size={12} />}
                  One uppercase letter
                </div>
                <div className={`checklist-item ${requirements.number ? 'valid' : ''}`}>
                  {requirements.number ? <Check size={12} /> : <X size={12} />}
                  One number (0-9)
                </div>
                <div className={`checklist-item ${requirements.special ? 'valid' : ''}`}>
                  {requirements.special ? <Check size={12} /> : <X size={12} />}
                  One special char (!@#...)
                </div>
              </div>
            )}
            {errors.password && <span className="validation-msg">⚠️ {errors.password}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                className="auth-input"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: null }));
                }}
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex="-1"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <span className="validation-msg">⚠️ {errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <span>Creating account...</span>
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
