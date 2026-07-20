import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('current_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('current_user');
      }
    }
    setLoading(false);
  }, []);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || 'Login failed' };
      }
      
      const sessionUser = { name: data.user.name, email: data.user.email };
      localStorage.setItem('current_user', JSON.stringify(sessionUser));
      setUser(sessionUser);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error occurred' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || 'Signup failed' };
      }
      
      const sessionUser = { name: data.user.name, email: data.user.email };
      localStorage.setItem('current_user', JSON.stringify(sessionUser));
      setUser(sessionUser);
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Network error occurred' };
    }
  };

  const logout = () => {
    localStorage.removeItem('current_user');
    setUser(null);
    showToast('Logged out successfully', 'success');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, toasts, showToast, removeToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span>{t.message}</span>
            <button className="toast-close" onClick={() => removeToast(t.id)}>×</button>
          </div>
        ))}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
