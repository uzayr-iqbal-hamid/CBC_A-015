import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  AcademicCapIcon,
  HomeIcon,
  TrophyIcon,
  UserIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  ArrowDownTrayIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { Sun, Moon, LogOut, LogIn, Globe } from 'lucide-react'; 
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

// Custom styles for dark mode and active elements
const navbarStyles = `
  /* Active menu item styles for dark mode */
  .nav-link-active-dark {
    background-color: rgba(79, 70, 229, 0.15) !important;
    color: rgba(147, 197, 253, 1) !important;
    font-weight: 600 !important;
    backdrop-filter: blur(4px);
  }

  /* Active menu item styles for light mode */
  .nav-link-active-light {
    background-color: rgba(79, 70, 229, 0.1) !important;
    color: rgba(79, 70, 229, 1) !important;
    font-weight: 600 !important;
    backdrop-filter: blur(4px);
  }

  /* Glass effect styles - enhanced */
  .glass-effect-dark {
    background: rgba(15, 23, 42, 0.6) !important;
    backdrop-filter: blur(12px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(12px) saturate(180%) !important;
    border-bottom: 1px solid rgba(99, 102, 241, 0.12) !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
  }
  
  .glass-effect-light {
    background: rgba(255, 255, 255, 0.65) !important;
    backdrop-filter: blur(12px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(12px) saturate(180%) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05) !important;
  }

  /* Enhanced transition effects */
  .nav-element {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }

  /* Pulse animation for active menu items */
  @keyframes softPulse {
    0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); }
    70% { box-shadow: 0 0 0 6px rgba(79, 70, 229, 0); }
    100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
  }

  .nav-link-active-dark, .nav-link-active-light {
    animation: softPulse 2s infinite;
  }
  
  /* Theme Toggle Styles - refined */
  .theme-toggle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    backdrop-filter: blur(4px);
  }
  
  .theme-toggle.dark {
    background: linear-gradient(135deg, #4338ca 0%, #312e81 100%);
    box-shadow: 0 4px 12px rgba(67, 56, 202, 0.4);
    border: 2px solid #6366f1;
  }
  
  .theme-toggle.light {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
    border: 2px solid #fbbf24;
  }
  
  .theme-toggle:hover {
    transform: scale(1.1);
  }
  
  .theme-toggle:active {
    transform: scale(0.95);
  }
  
  .theme-toggle .toggle-icon {
    transition: all 0.3s ease;
    color: white;
  }
  
  .theme-toggle.light .toggle-icon {
    color: #1e293b;
  }
  
  /* Mobile Theme Toggle - enhanced */
  .mobile-toggle {
    flex: 1;
    margin-left: 8px;
    border-radius: var(--border-radius-md);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(8px);
  }
  
  .mobile-toggle.dark {
    background: linear-gradient(135deg, #4338ca 0%, #312e81 100%);
    border: 2px solid #6366f1;
    color: white;
  }
  
  .mobile-toggle.light {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    border: 2px solid #fbbf24;
    color: #1e293b;
  }
  
  .mobile-toggle:hover {
    transform: scale(1.02);
  }
  
  /* Tooltip styles - refined */
  .tooltip {
    position: relative;
    display: inline-block;
  }
  
  .tooltip .tooltip-text {
    visibility: hidden;
    min-width: 120px;
    background-color: var(--background-lighter);
    color: var(--text);
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 0.75rem;
    white-space: nowrap;
    border: 1px solid var(--border);
    backdrop-filter: blur(8px);
  }
  
  .tooltip:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }

  /* Logo animation */
  @keyframes logoGlow {
    0%, 100% { 
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
    }
    50% { 
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.7);
    }
  }

  .logo-container {
    animation: logoGlow 3s infinite ease-in-out;
  }

  /* Enhanced mobile menu */
  .mobile-menu {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .mobile-menu.open {
    max-height: 80vh;
  }

  /* Nav link hover effect */
  .nav-link-hover:hover {
    transform: translateY(-2px);
  }
`;

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if current page is STEM Assistant
  const isStemAssistant = location.pathname === '/stem-assistant';
   
  // If we're on STEM Assistant page, don't render the navbar
  if (isStemAssistant) {
    return null;
  }

  // Inject custom styles
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = navbarStyles;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // Handle responsive view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Close mobile menu when resizing to desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle scroll event to change navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Learning', path: '/learning', icon: BookOpenIcon },
    { name: 'Career Quiz', path: '/career-quiz', icon: DocumentTextIcon },
    { name: 'Scholarships', path: '/scholarships', icon: AcademicCapIcon },
    { name: 'Achievements', path: '/achievements', icon: TrophyIcon },
    { name: 'STEM Assistant', path: '/stem-assistant', icon: ChatBubbleLeftRightIcon },
    { name: 'APK Downloads', path: '/apk-downloads', icon: ArrowDownTrayIcon },
    { name: 'Profile', path: '/profile', icon: UserIcon },
    { name: 'Job Locations', path: '/job-locations', icon: MapPinIcon },
  ];

  // Change language function
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Toggle mobile menu
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const currentLanguage = i18n.language === 'en' ? 'English' : 'हिन्दी';

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? (darkMode ? "glass-effect-dark" : "glass-effect-light") : "bg-transparent"
      )}
      style={{
        borderBottom: scrolled ? 
          (darkMode ? '1px solid rgba(99, 102, 241, 0.12)' : '1px solid rgba(255, 255, 255, 0.3)') : 
          'none'
      }}
    >
      {/* Desktop/Tablet Navigation */}
      {!isMobileView && (
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0.75rem 1rem',
        }}>
          {/* Two-row layout for desktop/tablet */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}>
            {/* Top row - Logo and user actions */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem',
            }}>
              {/* Logo */}
              <Link to="/" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem', 
                textDecoration: 'none',
                position: 'relative',
                zIndex: 2
              }}>
                <div className="logo-container" style={{
                  backgroundImage: 'linear-gradient(45deg, var(--primary), var(--secondary))',
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}>
                  <span style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '24px',
                  }}>
                    A
                  </span>
                </div>
                <span className="gradient-text" style={{
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  letterSpacing: '0.5px',
                  textShadow: darkMode ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none'
                }}>
                  Aarambh
                </span>
              </Link>

              {/* Language & Theme Controls */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                {/* Language Button */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => changeLanguage(i18n.language === 'en' ? 'hi' : 'en')}
                    style={{
                      backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                      border: `1px solid ${darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.5)'}`,
                      borderRadius: '9999px',
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      gap: '4px',
                      height: '32px',
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      backdropFilter: 'blur(8px)',
                      fontWeight: '500',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.12)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.08)';
                    }}
                  >
                    <span>{currentLanguage}</span>
                  </button>
                </div>

                {/* Authentication Button */}
                {user ? (
                  <button
                    onClick={handleSignOut}
                    style={{
                      backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                      border: `1px solid ${darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.5)'}`,
                      borderRadius: '8px',
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      height: '32px',
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      cursor: 'pointer',
                      backdropFilter: 'blur(8px)',
                      fontWeight: '500',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.12)';
                      e.currentTarget.style.color = darkMode ? '#ef4444' : '#dc2626';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.08)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    <LogOut size={14} />
                    <span>{t('navbar.signOut', 'Sign Out')}</span>
                  </button>
                ) : (
                  <Link 
                    to="/auth"
                    style={{
                      backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                      border: `1px solid ${darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.5)'}`,
                      borderRadius: '8px',
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      height: '32px',
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      textDecoration: 'none',
                      backdropFilter: 'blur(8px)',
                      fontWeight: '500',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <LogIn size={14} />
                    <span>{t('navbar.signIn', 'Sign In')}</span>
                  </Link>
                )}

                {/* Theme Toggle Button */}
                <div className="tooltip" style={{ position: 'relative' }}>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
                    aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {darkMode ? (
                      <Sun className="toggle-icon" size={20} />
                    ) : (
                      <Moon className="toggle-icon" size={20} />
                    )}
                  </button>
                  <span className="tooltip-text">
                    {darkMode ? t('navbar.lightMode', 'Switch to Light Mode') : t('navbar.darkMode', 'Switch to Dark Mode')}
                  </span>
                </div>
              </div>
            </div>
                
            {/* Bottom row - Navigation links */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              paddingTop: '4px',
            }}>
              <ul style={{
                display: 'flex',
                gap: '0.75rem',
                padding: '4px 8px',
                margin: 0,
                listStyle: 'none',
                backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.3)' : 'rgba(255, 255, 255, 0.25)',
                borderRadius: '12px',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${darkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.5)'}`,
              }}>
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  
                  return (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className={`nav-element nav-link-hover ${isActive ? (darkMode ? 'nav-link-active-dark' : 'nav-link-active-light') : ''}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '10px',
                          color: isActive 
                            ? (darkMode ? 'rgba(147, 197, 253, 1)' : 'var(--primary-light)')
                            : 'var(--text-muted)',
                          backgroundColor: isActive 
                            ? (darkMode ? 'rgba(79, 70, 229, 0.15)' : 'rgba(79, 70, 229, 0.1)')
                            : 'transparent',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          fontWeight: isActive ? '600' : '500',
                          boxShadow: isActive ? `0 2px 6px ${darkMode ? 'rgba(79, 70, 229, 0.2)' : 'rgba(79, 70, 229, 0.15)'}` : 'none',
                        }}
                        onMouseOver={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.color = darkMode ? 'rgba(147, 197, 253, 0.8)' : 'var(--text-secondary)';
                            e.currentTarget.style.backgroundColor = darkMode ? 'rgba(79, 70, 229, 0.1)' : 'var(--background-lighter)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.color = 'var(--text-muted)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <Icon style={{ 
                          width: '20px', 
                          height: '20px',
                          color: isActive && darkMode ? 'rgba(147, 197, 253, 1)' : 'currentColor'
                        }} />
                        <span>{t(`navbar.${link.name.toLowerCase().replace(' ', '')}`, link.name)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobileView && (
        <div className={cn(
          "w-full transition-all duration-300",
          scrolled ? (darkMode ? "glass-effect-dark" : "glass-effect-light") : "bg-transparent"
        )}>
          {/* Mobile Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 1rem',
            borderBottom: scrolled ? '1px solid rgba(99, 102, 241, 0.12)' : 'none',
          }}>
            {/* Logo */}
            <Link to="/" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              textDecoration: 'none',
              position: 'relative',
              zIndex: 2
            }}>
              <div className="logo-container" style={{
                backgroundImage: 'linear-gradient(45deg, var(--primary), var(--secondary))',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 8px rgba(99, 102, 241, 0.3)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}>
                <span style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}>
                  A
                </span>
              </div>
              <span className="gradient-text" style={{
                fontWeight: 'bold',
                fontSize: '1.25rem',
                letterSpacing: '0.5px',
                textShadow: darkMode ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none'
              }}>
                Aarambh
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={handleToggle}
              style={{
                background: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                border: `1px solid ${darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.5)'}`,
                backdropFilter: 'blur(8px)',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text)',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {!isOpen ? (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown - with animation */}
          <div 
            className={`mobile-menu ${isOpen ? 'open' : ''}`}
            style={{
              overflow: 'hidden',
              transition: 'max-height 0.3s ease-in-out',
              maxHeight: isOpen ? '80vh' : '0',
            }}
          >
            <div style={{
              padding: '1rem',
              backgroundColor: darkMode 
                ? 'rgba(15, 23, 42, 0.75)'
                : 'rgba(255, 255, 255, 0.75)',
              boxShadow: darkMode 
                ? '0 8px 32px rgba(0, 0, 0, 0.2)'
                : '0 8px 32px rgba(0, 0, 0, 0.08)',
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px',
              backdropFilter: 'blur(12px) saturate(180%)',
              WebkitBackdropFilter: 'blur(12px) saturate(180%)',
              borderTop: darkMode 
                ? '1px solid rgba(99, 102, 241, 0.15)'
                : '1px solid rgba(255, 255, 255, 0.5)',
            }}>
              <ul style={{
                padding: 0,
                margin: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  
                  return (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className={`nav-element ${isActive ? (darkMode ? 'nav-link-active-dark' : 'nav-link-active-light') : ''}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          color: isActive 
                            ? (darkMode ? 'rgba(147, 197, 253, 1)' : 'var(--primary-light)')
                            : 'var(--text)',
                          backgroundColor: isActive 
                            ? (darkMode ? 'rgba(79, 70, 229, 0.15)' : 'rgba(79, 70, 229, 0.1)')
                            : 'transparent',
                          textDecoration: 'none',
                          fontWeight: isActive ? '600' : '500',
                          boxShadow: isActive 
                            ? `0 4px 8px ${darkMode ? 'rgba(79, 70, 229, 0.2)' : 'rgba(79, 70, 229, 0.15)'}`
                            : 'none',
                        }}
                      >
                        <Icon style={{ 
                          width: '20px', 
                          height: '20px',
                          opacity: isActive ? 1 : 0.7
                        }} />
                        <span style={{ fontSize: '1rem' }}>
                          {t(`navbar.${link.name.toLowerCase().replace(' ', '')}`, link.name)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              
              {/* Mobile Controls */}
              <div style={{
                display: 'flex',
                marginTop: '1rem',
                gap: '0.5rem',
                borderTop: darkMode ? '1px solid rgba(99, 102, 241, 0.15)' : '1px solid rgba(255, 255, 255, 0.3)',
                paddingTop: '1rem'
              }}>
                {/* Language Toggle - Mobile */}
                <button
                  onClick={() => changeLanguage(i18n.language === 'en' ? 'hi' : 'en')}
                  className={`mobile-toggle ${darkMode ? 'dark' : 'light'}`}
                >
                  <Globe size={18} />
                  <span>{currentLanguage}</span>
                </button>
                
                {/* Theme Toggle - Mobile */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`mobile-toggle ${darkMode ? 'dark' : 'light'}`}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  <span>
                    {darkMode ? t('navbar.lightMode', 'Light') : t('navbar.darkMode', 'Dark')}
                  </span>
                </button>
              </div>
              
              {/* User Controls - Mobile */}
              <div style={{
                marginTop: '1rem',
                borderTop: darkMode ? '1px solid rgba(99, 102, 241, 0.15)' : '1px solid rgba(255, 255, 255, 0.3)',
                paddingTop: '1rem'
              }}>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
                      borderRadius: '10px',
                      color: darkMode ? 'rgba(239, 68, 68, 0.9)' : 'rgba(220, 38, 38, 1)',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '500',
                      boxShadow: `0 4px 8px ${darkMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)'}`
                    }}
                  >
                    <LogOut size={18} />
                    <span>{t('navbar.signOut', 'Sign Out')}</span>
                  </button>
                ) : (
                  <Link 
                    to="/auth"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: darkMode ? 'rgba(79, 70, 229, 0.15)' : 'rgba(79, 70, 229, 0.1)',
                      borderRadius: '10px',
                      color: darkMode ? 'rgba(147, 197, 253, 1)' : 'rgba(79, 70, 229, 1)',
                      textDecoration: 'none',
                      fontWeight: '500',
                      boxShadow: `0 4px 8px ${darkMode ? 'rgba(79, 70, 229, 0.2)' : 'rgba(79, 70, 229, 0.15)'}`,
                      justifyContent: 'center'
                    }}
                  >
                    <LogIn size={18} />
                    <span>{t('navbar.signIn', 'Sign In')}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 