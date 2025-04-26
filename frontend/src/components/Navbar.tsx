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
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { Sun, Moon, LogOut, LogIn } from 'lucide-react'; 
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

// Custom styles for dark mode and active elements
const navbarStyles = `
  /* Active menu item styles for dark mode */
  .nav-link-active-dark {
    background-color: rgba(79, 70, 229, 0.2) !important;
    color: rgba(147, 197, 253, 1) !important;
    font-weight: 600 !important;
  }

  /* Active menu item styles for light mode */
  .nav-link-active-light {
    background-color: rgba(79, 70, 229, 0.1) !important;
    color: rgba(79, 70, 229, 1) !important;
    font-weight: 600 !important;
  }

  /* Glass effect styles */
  .glass-effect-dark {
    background: rgba(15, 23, 42, 0.65) !important;
    backdrop-filter: blur(16px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
    border-bottom: 1px solid rgba(99, 102, 241, 0.15) !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
  }
  
  .glass-effect-light {
    background: rgba(255, 255, 255, 0.6) !important;
    backdrop-filter: blur(16px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05) !important;
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
  
  /* Theme Toggle Styles */
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
  
  /* Mobile Theme Toggle */
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
  
  /* Tooltip styles */
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
  }
  
  .tooltip:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? (darkMode ? "glass-effect-dark" : "glass-effect-light") : "bg-transparent"
      )}
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
              marginBottom: '0.5rem',
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
                <div style={{
                  backgroundImage: 'linear-gradient(45deg, var(--primary), var(--secondary))',
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
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
                  letterSpacing: '0.5px'
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
                      backgroundColor: 'var(--background-lighter)',
                      border: '1px solid var(--border)',
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
                      backgroundColor: 'var(--background-lighter)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      height: '32px',
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    <LogOut size={14} />
                    <span>{t('navbar.signOut', 'Sign Out')}</span>
                  </button>
                ) : (
                  <Link 
                    to="/auth"
                    style={{
                      backgroundColor: 'var(--background-lighter)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      height: '32px',
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      textDecoration: 'none',
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
            }}>
              <ul style={{
                display: 'flex',
                gap: '1.5rem',
                padding: 0,
                margin: 0,
                listStyle: 'none',
              }}>
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  
                  return (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className={isActive ? (darkMode ? 'nav-link-active-dark' : 'nav-link-active-light') : ''}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          borderRadius: 'var(--border-radius-md)',
                          color: isActive 
                            ? (darkMode ? 'rgba(147, 197, 253, 1)' : 'var(--primary-light)')
                            : 'var(--text-muted)',
                          backgroundColor: isActive 
                            ? (darkMode ? 'rgba(79, 70, 229, 0.2)' : 'rgba(79, 70, 229, 0.1)')
                            : 'transparent',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          fontWeight: isActive ? '600' : '500',
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
            borderBottom: scrolled ? '1px solid rgba(99, 102, 241, 0.2)' : 'none',
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
              <div style={{
                backgroundImage: 'linear-gradient(45deg, var(--primary), var(--secondary))',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 8px rgba(99, 102, 241, 0.3)'
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
                letterSpacing: '0.5px'
              }}>
                Aarambh
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={handleToggle}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text)',
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

          {/* Mobile Menu Dropdown */}
          {isOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              padding: '1rem',
              zIndex: 40,
              backgroundColor: darkMode 
                ? 'rgba(15, 23, 42, 0.75)'
                : 'rgba(255, 255, 255, 0.7)',
              boxShadow: darkMode 
                ? '0 8px 32px rgba(0, 0, 0, 0.2)'
                : '0 8px 32px rgba(0, 0, 0, 0.08)',
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px',
              backdropFilter: 'blur(12px) saturate(180%)',
              WebkitBackdropFilter: 'blur(12px) saturate(180%)',
              borderTop: darkMode 
                ? '1px solid rgba(99, 102, 241, 0.25)'
                : '1px solid rgba(255, 255, 255, 0.25)'
            }}>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}>
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  
                  return (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className={isActive ? (darkMode ? 'nav-link-active-dark' : 'nav-link-active-light') : ''}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem',
                          borderRadius: 'var(--border-radius-md)',
                          color: isActive 
                            ? (darkMode ? 'rgba(147, 197, 253, 1)' : 'var(--primary-light)')
                            : darkMode ? 'rgba(255, 255, 255, 0.8)' : 'var(--text)',
                          backgroundColor: isActive 
                            ? (darkMode ? 'rgba(79, 70, 229, 0.2)' : 'rgba(79, 70, 229, 0.1)')
                            : 'transparent',
                          textDecoration: 'none',
                          fontWeight: isActive ? '600' : '500',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseOver={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = darkMode 
                              ? 'rgba(79, 70, 229, 0.1)' 
                              : 'var(--background-lighter)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (!isActive) {
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
                
                {/* Mobile Language & Theme Controls */}
                <li style={{ 
                  borderTop: '1px solid var(--border)',
                  marginTop: '0.5rem',
                  paddingTop: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  {/* Language Toggle */}
                  <button
                    onClick={() => changeLanguage(i18n.language === 'en' ? 'hi' : 'en')}
                    style={{
                      flex: 1,
                      backgroundColor: 'var(--background-lighter)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--border-radius-md)',
                      padding: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      color: 'var(--text)',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                  >
                    <span>{i18n.language === 'en' ? 'हिन्दी' : 'English'}</span>
                  </button>
                  
                  {/* Theme Toggle */}
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`mobile-toggle ${darkMode ? 'dark' : 'light'}`}
                  >
                    {darkMode ? (
                      <Sun className="toggle-icon" size={18} />
                    ) : (
                      <Moon className="toggle-icon" size={18} />
                    )}
                    <span>
                      {darkMode ? t('navbar.lightMode', 'Light') : t('navbar.darkMode', 'Dark')}
                    </span>
                  </button>
                </li>

                {/* Authentication in mobile menu */}
                <li>
                  {user ? (
                    <button
                      onClick={handleSignOut}
                      style={{
                        width: '100%',
                        backgroundColor: 'var(--background-lighter)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--border-radius-md)',
                        padding: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        color: 'var(--danger)',
                        fontSize: '14px',
                        fontWeight: '500',
                      }}
                    >
                      <LogOut size={18} />
                      <span>{t('navbar.signOut', 'Sign Out')}</span>
                    </button>
                  ) : (
                    <Link
                      to="/auth" 
                      style={{
                        width: '100%',
                        backgroundColor: 'var(--primary)',
                        border: '1px solid var(--primary-dark)',
                        borderRadius: 'var(--border-radius-md)',
                        padding: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '500',
                        textDecoration: 'none',
                      }}
                    >
                      <LogIn size={18} />
                      <span>{t('navbar.signIn', 'Sign In')}</span>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 