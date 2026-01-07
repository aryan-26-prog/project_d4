import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import ConfessionForm from './components/ConfessionForm';
import ConfessionList from './components/ConfessionList';
import TrendingSidebar from './components/TrendingSidebar';
import { SocketProvider } from './context/SocketContext';
import { 
  FiGithub, 
  FiHeart, 
  FiUsers,
  FiSettings,
  FiBell,
  FiTrendingUp,
  FiZap,
  FiAward,
  FiCoffee,
  FiX,
  FiCheck
} from 'react-icons/fi';
import './App.css';

const themes = [
  { id: 'midnight', name: 'Midnight 🌙', icon: '🌙' },
  { id: 'sunset', name: 'Sunset 🌅', icon: '🌅' },
  { id: 'ocean', name: 'Ocean 🌊', icon: '🌊' },
  { id: 'forest', name: 'Forest 🌳', icon: '🌳' },
  { id: 'neon', name: 'Neon 💡', icon: '💡' },
  { id: 'royal', name: 'Royal 👑', icon: '👑' },
  { id: 'candy', name: 'Candy 🍭', icon: '🍭' }
];

function App() {
  const [currentTheme, setCurrentTheme] = useState('midnight');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [newConfessions, setNewConfessions] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    trending: 0,
    active: 0
  });

  // Set initial theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('confession-theme') || 'midnight';
    setCurrentTheme(savedTheme);
    document.body.className = `theme-${savedTheme}`;
  }, []);

  // Create floating shapes
  useEffect(() => {
    const createFloatingShapes = () => {
      const shapesContainer = document.querySelector('.floating-shapes');
      if (!shapesContainer) return;

      shapesContainer.innerHTML = '';
      
      for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        shape.style.width = `${Math.random() * 200 + 50}px`;
        shape.style.height = shape.style.width;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.animationDelay = `${Math.random() * 20}s`;
        shape.style.background = `linear-gradient(45deg, 
          hsl(${Math.random() * 360}, 100%, 60%), 
          hsl(${Math.random() * 360}, 100%, 50%))`;
        shape.style.opacity = Math.random() * 0.1 + 0.05;
        shapesContainer.appendChild(shape);
      }
    };

    createFloatingShapes();
  }, []);

  // Change theme
  const changeTheme = (themeId) => {
    setCurrentTheme(themeId);
    document.body.className = `theme-${themeId}`;
    localStorage.setItem('confession-theme', themeId);
    setShowThemeSelector(false);
  };

  // Handle keyboard navigation for theme options
  const handleThemeKeyPress = (e, themeId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      changeTheme(themeId);
    }
  };

  // Close theme selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showThemeSelector && !event.target.closest('.theme-selector-container')) {
        setShowThemeSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showThemeSelector]);

  return (
    <SocketProvider>
      <div className="app-container">
        {/* Animated Background */}
        <div className="animated-bg">
          <div className="gradient-bg"></div>
          <div className="floating-shapes"></div>
        </div>

        {/* Top Navigation Bar */}
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-xl">🎭</span>
              </div>
              <h1 className="text-5xl font-bold gradient-text">
                Anonymous Confessions
              </h1>
            </div>
            {/* Theme Selector - Simplified */}
              <div className="theme-selector-container ">
                <button
                  onClick={() => setShowThemeSelector(!showThemeSelector)}
                  className="theme-btn"
                  aria-label="Theme"
                >
                  <FiSettings />
                  <span className="hidden sm:inline">Theme</span>
                </button>
                
                {showThemeSelector && (
                  <div className="theme-dropdown show" onClick={e => e.stopPropagation()}>
                    <div className="theme-dropdown-header">
                      <span>Select Theme</span>
                      <button 
                        className="theme-close-btn"
                        onClick={() => setShowThemeSelector(false)}
                      >
                        <FiX />
                      </button>
                    </div>
                    
                    <div className="theme-grid">
                      {themes.map(theme => (
                        <div
                          key={theme.id}
                          data-theme={theme.id}
                          onClick={() => changeTheme(theme.id)}
                          className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="theme-info">
                            <div className="theme-icon text-lg">{theme.icon}</div>
                            <div className="theme-name">{theme.name.replace(' 🌙', '').replace(' 🌅', '').replace(' 🌊', '').replace(' 🌳', '').replace(' 💡', '').replace(' 👑', '').replace(' 🍭', '')}</div>
                          </div>
                          {currentTheme === theme.id && (
                            <div className="active-checkmark">
                              <FiCheck />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="theme-dropdown-footer">
                      <div className="text-sm opacity-70">Auto theme</div>
                      <button 
                        className="theme-reset-btn"
                        onClick={() => changeTheme('midnight')}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </div>
           </div>
          

        {/* Main Content */}
        <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <div className="inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
              <span className="flex items-center gap-2">
                <FiZap className="text-yellow-400" />
                <span className="text-sm font-semibold">Live Updates</span>
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Speak Your Truth</span>
              <br />
              <span className="text-3xl md:text-5xl font-light opacity-80">
                Anonymously & Safely
              </span>
            </h1>
            
            <p className="text-xl opacity-80 max-w-3xl mx-auto mb-10">
              A judgment-free zone where your identity remains hidden. 
              Share your deepest thoughts, secrets, and confessions without fear.
            </p>
          </section>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="lg:w-2/3">
              {/* Confession Form */}
              <div className="mb-8">
                <div className="glass p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold gradient-text">
                      Share Your Story
                    </h2>
                    <div className="flex items-center gap-2 text-sm opacity-70">
                      <FiCoffee />
                      <span>Your identity is safe</span>
                    </div>
                  </div>
                  <ConfessionForm />
                </div>
              </div>

              {/* Confession List */}
              <div className="glass p-8 rounded-3xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold gradient-text mb-2">
                      Latest Confessions
                    </h2>
                    <p className="opacity-70">Fresh from the community</p>
                  </div>
                  <button 
                    className="theme-btn flex items-center gap-2"
                    aria-label="View trending confessions"
                  >
                    <FiTrendingUp />
                    Trending
                  </button>
                </div>
                <ConfessionList />
              </div>
            </div>

              {/* Community Stats */}
              <div className="glass p-6 rounded-3xl mb-8">
                <h3 className="text-xl font-bold mb-4 gradient-text flex items-center gap-2">
                  <FiAward />
                  Community Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                    <span className="opacity-70">Most Active Time</span>
                    <span className="font-semibold">9 PM - 12 AM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                    <span className="opacity-70">Popular Category</span>
                    <span className="font-semibold text-purple-400">Love 💖</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                    <span className="opacity-70">Avg. Response Time</span>
                    <span className="font-semibold">2.4 mins ⚡</span>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="tips-card glass glass-hover mb-8">
                <div className="tips-header">
                  <h3 className="tips-title">Quick Tips</h3>
                </div>
                <div className="tips-list">
                  <div className="tip-item">
                    <div className="tip-icon">🎯</div>
                    <div className="tip-content">
                      <div className="tip-title">Be Specific</div>
                      <div className="tip-description">Details help others relate better</div>
                    </div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">🤝</div>
                    <div className="tip-content">
                      <div className="tip-title">Show Support</div>
                      <div className="tip-description">React to confessions you relate to</div>
                    </div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">🔒</div>
                    <div className="tip-content">
                      <div className="tip-title">Stay Anonymous</div>
                      <div className="tip-description">Never share personal details</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Button */}
              <div className="support-section">
                <button 
                  className="support-button glass glass-hover"
                  aria-label="View mental health resources"
                >
                  <div className="support-icon">❤️</div>
                  <div className="support-title">Need Immediate Support?</div>
                  <div className="support-description">24/7 mental health resources</div>
                  <div className="support-note">Click to view resources</div>
                </button>
              </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer-section">
          <div className="footer-container">
            <div className="footer-content">
              <div className="footer-top">
                <div className="footer-brand">
                  <div className="footer-logo">🎭</div>
                  <div className="footer-brand-info">
                    <div className="footer-brand-name">Anonymous Confessions</div>
                    <div className="footer-brand-tagline">Speak freely. Stay anonymous.</div>
                  </div>
                </div>
                
                <div className="footer-links">
                  <a href="#" className="footer-link">Privacy Policy</a>
                  <a href="#" className="footer-link">Terms</a>
                  <a href="#" className="footer-link">Safety</a>
                  <a href="#" className="footer-link">Contact</a>
                </div>
                
                <div className="footer-social">
                  <a href="#" className="social-link" aria-label="GitHub">
                    <FiGithub />
                  </a>
                  <a href="#" className="social-link" aria-label="Community">
                    <FiHeart />
                  </a>
                  <a href="#" className="social-link" aria-label="Users">
                    <FiUsers />
                  </a>
                </div>
              </div>
              
              <div className="footer-bottom">
                <div className="footer-copyright">
                  © {new Date().getFullYear()} Anonymous Confessions. All confessions are anonymous and automatically filtered.
                </div>
                <div className="footer-disclaimer">
                  If you're in crisis, please contact professional help immediately.
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Toaster */}
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'glass',
            style: {
              background: 'var(--theme-surface)',
              color: 'var(--theme-text)',
              border: '1px solid var(--theme-border)',
              backdropFilter: 'blur(20px)',
            },
            success: {
              iconTheme: {
                primary: 'var(--theme-primary)',
                secondary: 'white',
              },
            },
            error: {
              iconTheme: {
                primary: 'var(--theme-accent)',
                secondary: 'white',
              },
            },
          }}
        />
      </div>
    </SocketProvider>
  );
}

export default App;