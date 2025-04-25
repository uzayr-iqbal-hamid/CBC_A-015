import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  MapPinIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const location = useLocation();

  // Check if current page is STEM Assistant
  const isStemAssistant = location.pathname === '/stem-assistant';
  
  // If we're on STEM Assistant page, don't render the navbar
  if (isStemAssistant) {
    return null;
  }

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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Career Quiz', path: '/career-quiz', icon: DocumentTextIcon },
    { name: 'Scholarships', path: '/scholarships', icon: AcademicCapIcon },
    { name: 'Achievements', path: '/achievements', icon: TrophyIcon },
    { name: 'STEM Assistant', path: '/stem-assistant', icon: ChatBubbleLeftRightIcon },
    { name: 'Profile', path: '/profile', icon: UserIcon },
    { name: 'Job Locations', path: '/job-locations', icon: MapPinIcon },
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const currentLanguage = i18n.language === 'en' ? 'English' : 'हिन्दी';
  
  return (
    <nav 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(17, 24, 39, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(75, 85, 99, 0.2)' : 'none',
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
              marginBottom: '0.5rem',
            }}>
              {/* Logo */}
              <Link to="/" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                textDecoration: 'none' 
              }}>
                <div style={{
                  backgroundImage: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '24px',
                  }}>
                    A
                  </span>
                </div>
                <span style={{
                  backgroundImage: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
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
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '9999px',
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      gap: '4px',
                      height: '32px',
                      color: '#d1d5db',
                      fontSize: '14px',
                    }}
                  >
                    <span>{currentLanguage}</span>
                  </button>
                </div>

                {/* Theme Toggle Button */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  style={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '9999px',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    width: '32px',
                    height: '32px',
                  }}
                >
                  {darkMode ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#d1d5db' }}>
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#d1d5db' }}>
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  )}
                </button>
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
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '0.5rem',
                          color: isActive ? '#60a5fa' : '#9ca3af',
                          backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          fontWeight: isActive ? '600' : '500',
                        }}
                        onMouseOver={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.color = '#d1d5db';
                            e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.color = '#9ca3af';
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <Icon style={{ width: '1.25rem', height: '1.25rem' }} />
                        {link.name}
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
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0.75rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* Logo */}
          <Link to="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            textDecoration: 'none' 
          }}>
            <div style={{
              backgroundImage: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '24px',
              }}>
                A
              </span>
            </div>
            <span style={{
              backgroundImage: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}>
              Aarambh
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={handleToggle}
            style={{
              display: 'block',
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
            }}
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isOpen ? (
              <XMarkIcon style={{ width: '1.75rem', height: '1.75rem' }} />
            ) : (
              <Bars3Icon style={{ width: '1.75rem', height: '1.75rem' }} />
            )}
          </button>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && isMobileView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 40,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '70%',
                maxWidth: '300px',
                backgroundColor: '#111827',
                boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.5)',
                padding: '1.5rem',
                overflow: 'auto',
              }}
            >
              <button
                onClick={handleToggle}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '1rem',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                }}
                aria-label="Close Menu"
              >
                <XMarkIcon style={{ width: '1.5rem', height: '1.5rem' }} />
              </button>

              <div style={{ marginTop: '3rem' }}>
                <ul style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}>
                  {navLinks.map((link, index) => {
                    const isActive = location.pathname === link.path;
                    const Icon = link.icon;
                    
                    return (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={link.path}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            borderRadius: '0.5rem',
                            color: isActive ? '#60a5fa' : '#d1d5db',
                            backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                            textDecoration: 'none',
                            fontWeight: isActive ? '600' : '500',
                            width: '100%',
                          }}
                        >
                          <Icon style={{ width: '1.25rem', height: '1.25rem' }} />
                          {link.name}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
                
                {/* Language toggle in mobile menu */}
                <div style={{ 
                  marginTop: '2rem',
                  padding: '1rem 0.5rem',
                  borderTop: '1px solid #374151' 
                }}>
                  <div style={{ 
                    color: '#d1d5db',
                    marginBottom: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    Language
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => changeLanguage('en')}
                      style={{
                        flex: 1,
                        backgroundColor: i18n.language === 'en' ? '#3b82f6' : '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        color: i18n.language === 'en' ? 'white' : '#9ca3af',
                        cursor: 'pointer',
                        fontWeight: i18n.language === 'en' ? '600' : '400',
                      }}
                    >
                      English
                    </button>
                    <button
                      onClick={() => changeLanguage('hi')}
                      style={{
                        flex: 1,
                        backgroundColor: i18n.language === 'hi' ? '#3b82f6' : '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        color: i18n.language === 'hi' ? 'white' : '#9ca3af',
                        cursor: 'pointer',
                        fontWeight: i18n.language === 'hi' ? '600' : '400',
                      }}
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>
                
                {/* Dark mode toggle in mobile menu */}
                <div style={{ 
                  marginTop: '1rem',
                  padding: '0.5rem',
                }}>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div style={{ 
                      color: '#d1d5db',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      Dark Mode
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      style={{
                        backgroundColor: darkMode ? '#3b82f6' : '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '9999px',
                        width: '40px',
                        height: '22px',
                        position: 'relative',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        width: '16px',
                        height: '16px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        top: '2px',
                        left: darkMode ? '20px' : '2px',
                        transition: 'left 0.2s',
                      }} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 