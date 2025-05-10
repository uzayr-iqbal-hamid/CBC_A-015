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
  EyeIcon,
  BookOpenIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { Sun, Moon, LogOut, LogIn, Globe } from 'lucide-react'; 
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

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
    background: rgba(15, 23, 42, 0.4) !important;
    backdrop-filter: blur(12px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(12px) saturate(180%) !important;
    border-bottom: 1px solid rgba(99, 102, 241, 0.12) !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
  }
  
  .glass-effect-light {
    background: rgba(255, 255, 255, 0.3) !important;
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
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

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
    { name: 'home', path: '/', icon: HomeIcon },
    { name: 'learning', path: '/learning', icon: BookOpenIcon },
    { name: 'careerQuiz', path: '/career-quiz', icon: DocumentTextIcon },
    { name: 'scholarships', path: '/scholarships', icon: AcademicCapIcon },
    { name: 'achievements', path: '/achievements', icon: TrophyIcon },
    { name: 'resumeBuilder', path: '/resume-builder', icon: DocumentTextIcon },
    { name: 'profile', path: '/profile', icon: UserIcon },
    { name: 'jobLocations', path: '/job-locations', icon: MapPinIcon },
    { name: 'attentiveness', path: '/attentiveness', icon: CalendarIcon },
  ];

  // Change language function
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setIsLanguageMenuOpen(false);
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

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? (darkMode ? "glass-effect-dark" : "glass-effect-light") : "bg-transparent"
      )}
      style={{
        borderBottom: scrolled ? 
          (darkMode ? '1px solid rgba(99, 102, 241, 0.12)' : '1px solid rgba(255, 255, 255, 0.3)') : 
          'none',
        backgroundColor: 'transparent'
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
                gap: '8px'
              }}>
                {/* Language Selector */}
                <div className="language-selector" style={{ position: 'relative' }}>
                  <button
                    onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                    className="nav-button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      minWidth: '90px',
                      justifyContent: 'space-between',
                      backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                      border: `1px solid ${darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.5)'}`,
                      borderRadius: '8px',
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      backdropFilter: 'blur(8px)',
                      fontWeight: '500',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.backgroundColor = darkMode ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.6)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.backgroundColor = darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.4)';
                    }}
                  >
                    <Globe size={16} />
                    <span>{i18n.language === 'en' ? 'English' : i18n.language === 'hi' ? 'हिंदी' : 'ಕನ್ನಡ'}</span>
                    <svg 
                      width="12" 
                      height="12" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      style={{
                        transform: isLanguageMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  
                  {isLanguageMenuOpen && (
                    <div 
                      className="language-menu" 
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: '0.5rem',
                        backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                        border: `1px solid ${darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.5)'}`,
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        zIndex: 1000,
                        minWidth: '120px',
                        overflow: 'hidden',
                        backdropFilter: 'blur(12px)',
                      }}
                    >
                      <button
                        onClick={() => changeLanguage('en')}
                        className="nav-button"
                        style={{
                          display: 'flex',
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          color: i18n.language === 'en' ? 'var(--primary)' : 'var(--text)',
                          justifyContent: 'flex-start',
                          gap: '0.5rem',
                          transition: 'all 0.2s ease',
                          alignItems: 'center',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = darkMode ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Globe size={16} />
                        <span>English</span>
                      </button>
                      <button
                        onClick={() => changeLanguage('hi')}
                        className="nav-button"
                        style={{
                          display: 'flex',
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          color: i18n.language === 'hi' ? 'var(--primary)' : 'var(--text)',
                          justifyContent: 'flex-start',
                          gap: '0.5rem',
                          transition: 'all 0.2s ease',
                          alignItems: 'center',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = darkMode ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Globe size={16} />
                        <span>हिंदी</span>
                      </button>
                      <button
                        onClick={() => changeLanguage('kn')}
                        className="nav-button"
                        style={{
                          display: 'flex',
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          color: i18n.language === 'kn' ? 'var(--primary)' : 'var(--text)',
                          justifyContent: 'flex-start',
                          gap: '0.5rem',
                          transition: 'all 0.2s ease',
                          alignItems: 'center',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = darkMode ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Globe size={16} />
                        <span>ಕನ್ನಡ</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Authentication Button */}
                {user ? (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                      border: `1px solid ${darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.5)'}`,
                      borderRadius: '8px',
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      backdropFilter: 'blur(8px)',
                      fontWeight: '500',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.backgroundColor = darkMode ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.6)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.backgroundColor = darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.4)';
                    }}
                  >
                    <LogOut size={16} />
                    <span>{t('nav.signOut')}</span>
                  </Button>
                ) : (
                  <Link 
                    to="/auth"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                      border: `1px solid ${darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.5)'}`,
                      borderRadius: '8px',
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
                      e.currentTarget.style.backgroundColor = darkMode ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.6)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.backgroundColor = darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.4)';
                    }}
                  >
                    <LogIn size={16} />
                    <span>{t('nav.signIn')}</span>
                  </Link>
                )}

                {/* Theme Toggle Button */}
                <div className="tooltip" style={{ position: 'relative' }}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDarkMode(!darkMode)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.5rem',
                            backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                            border: `1px solid ${darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.5)'}`,
                            borderRadius: '8px',
                            color: 'var(--text-secondary)',
                            backdropFilter: 'blur(8px)',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.backgroundColor = darkMode ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.6)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.backgroundColor = darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.4)';
                          }}
                        >
                          {darkMode ? (
                            <Sun className="h-5 w-5" />
                          ) : (
                            <Moon className="h-5 w-5" />
                          )}
                          <span className="sr-only">
                            {t(darkMode ? 'nav.lightMode' : 'nav.darkMode')}
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t(darkMode ? 'nav.lightMode' : 'nav.darkMode')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
                          whiteSpace: 'nowrap',
                          fontSize: '0.875rem',
                          minWidth: 'fit-content'
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
                        <span>{link.name === 'resumeBuilder' ? t('resumeBuilder') : link.name === 'learning' ? t('learning') : t(`nav.${link.name}`)}</span>
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
                          {link.name === 'resumeBuilder' ? t('resumeBuilder') : link.name === 'learning' ? t('learning') : t(`nav.${link.name}`)}
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
                    {t(darkMode ? 'nav.lightMode' : 'nav.darkMode')}
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
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    {t('nav.signOut')}
                  </Button>
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
                    <span>{t('nav.signIn')}</span>
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