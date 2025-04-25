import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, TrophyIcon, LightBulbIcon, DocumentTextIcon, CalendarIcon, ClockIcon, PlusIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Define types for calendar events
interface CalendarEvent {
  id: string;
  summary: string;
  start: string;
  link: string;
  description?: string;
  location?: string;
}

const Home = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fetch calendar events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setLoadError(null);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/api/calendar/events`);
      setEvents(response.data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoadError("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div style={{ 
      paddingTop: '72px',
      minHeight: '100vh',
      backgroundColor: '#111827',
      color: 'white'
    }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', padding: '64px 0 48px' }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(124, 58, 237, 0.1))',
          zIndex: 0
        }} />
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 16px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ 
            textAlign: 'center', 
            maxWidth: '800px',
            margin: '0 auto' 
          }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ 
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '16px',
                backgroundImage: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Welcome to Aarambh
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ 
                fontSize: '18px',
                color: '#d1d5db',
                marginBottom: '24px',
              }}
            >
              Empowering rural students with career guidance, scholarship information, and learning resources
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ 
        maxWidth: '1200px', 
        margin: '0 auto 64px', 
        padding: '0 16px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '24px'
        }}>
          {/* Career Quiz Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #374151',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ 
              padding: '24px', 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px',
                width: 'fit-content'
              }}>
                <DocumentTextIcon style={{ width: '24px', height: '24px', color: '#818cf8' }} />
              </div>
              
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                marginBottom: '16px',
                color: '#e5e7eb' 
              }}>
                Career Discovery Quiz
              </h2>
              
              <p style={{ 
                fontSize: '16px', 
                color: '#9ca3af', 
                marginBottom: '24px',
                lineHeight: '1.6',
                flex: 1
              }}>
                Take our interactive quiz to discover career paths that match your interests and strengths. Get personalized recommendations and resources tailored to your profile.
              </p>
              
              <Link to="/career-quiz" style={{
                backgroundColor: '#4f46e5',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                display: 'inline-block',
                textAlign: 'center',
                transition: 'background-color 0.2s ease',
                width: '100%'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#4338ca' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#4f46e5' }}
              >
                Start Quiz
              </Link>
            </div>
          </motion.div>

          {/* Achievements Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #374151',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ 
              padding: '24px', 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px',
                width: 'fit-content'
              }}>
                <TrophyIcon style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
              </div>
              
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                marginBottom: '16px',
                color: '#e5e7eb' 
              }}>
                Learning Achievements
              </h2>
              
              <p style={{ 
                fontSize: '16px', 
                color: '#9ca3af', 
                marginBottom: '24px',
                lineHeight: '1.6',
                flex: 1
              }}>
                Track your progress, earn badges, and compete on the leaderboard as you advance through your learning journey. Unlock rewards with points you earn.
              </p>
              
              <Link to="/achievements" style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                display: 'inline-block',
                textAlign: 'center',
                transition: 'background-color 0.2s ease',
                width: '100%'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#d97706' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#f59e0b' }}
              >
                View Achievements
              </Link>
            </div>
          </motion.div>

          {/* Scholarships Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #374151',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ 
              padding: '24px', 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px',
                width: 'fit-content'
              }}>
                <AcademicCapIcon style={{ width: '24px', height: '24px', color: '#60a5fa' }} />
              </div>
              
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                marginBottom: '16px',
                color: '#e5e7eb' 
              }}>
                Scholarships
              </h2>
              
              <p style={{ 
                fontSize: '16px', 
                color: '#9ca3af', 
                marginBottom: '24px',
                lineHeight: '1.6',
                flex: 1
              }}>
                Find and apply for scholarships that match your academic profile and aspirations. Access opportunities from government and private institutions.
              </p>
              
              <Link to="/scholarships" style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                display: 'inline-block',
                textAlign: 'center',
                transition: 'background-color 0.2s ease',
                width: '100%'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#2563eb' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#3b82f6' }}
              >
                Browse Scholarships
              </Link>
            </div>
          </motion.div>

          {/* STEM Assistant Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #374151',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ 
              padding: '24px', 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px',
                width: 'fit-content'
              }}>
                <LightBulbIcon style={{ width: '24px', height: '24px', color: '#34d399' }} />
              </div>
              
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                marginBottom: '16px',
                color: '#e5e7eb' 
              }}>
                STEM Assistant
              </h2>
              
              <p style={{ 
                fontSize: '16px', 
                color: '#9ca3af', 
                marginBottom: '24px',
                lineHeight: '1.6',
                flex: 1
              }}>
                Get personalized help with Science, Technology, Engineering, and Mathematics subjects. Ask questions and receive AI-powered guidance.
              </p>
              
              <Link to="/stem-assistant" style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                display: 'inline-block',
                textAlign: 'center',
                transition: 'background-color 0.2s ease',
                width: '100%'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#059669' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#10b981' }}
              >
                Open STEM Assistant
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Academic Calendar Section */}
      <section style={{ 
        maxWidth: '1200px', 
        margin: '0 auto 64px', 
        padding: '0 16px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: '#1f2937',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid #374151',
            padding: '24px',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                width: 'fit-content'
              }}>
                <CalendarIcon style={{ width: '24px', height: '24px', color: '#3b82f6' }} />
              </div>
              
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#e5e7eb' 
              }}>
                {t('calendar.title', 'Academic Calendar')}
              </h2>
            </div>
            
            <Link to="/calendar" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#2563eb' }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#3b82f6' }}
            >
              <PlusIcon style={{ width: '16px', height: '16px' }} />
              {t('calendar.addEvent', 'Add Event')}
            </Link>
          </div>
          
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#d1d5db',
            marginBottom: '16px'
          }}>
            {t('calendar.upcomingEvents', 'Upcoming Academic Events')}
          </h3>
          
          {loading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px'
            }}>
              <div className="spinner"></div>
            </div>
          ) : loadError ? (
            <div style={{
              padding: '16px',
              textAlign: 'center',
              color: '#ef4444',
              borderRadius: '8px',
              backgroundColor: 'rgba(220, 38, 38, 0.05)',
              marginBottom: '16px'
            }}>
              <p>{loadError}</p>
              <button
                onClick={fetchEvents}
                style={{
                  backgroundColor: '#374151',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginTop: '8px'
                }}
              >
                Retry
              </button>
            </div>
          ) : events.length === 0 ? (
            <div style={{
              padding: '24px',
              textAlign: 'center',
              color: '#9ca3af',
              border: '1px dashed #4b5563',
              borderRadius: '12px'
            }}>
              <p>No upcoming events found</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '16px'
            }}>
              {events.slice(0, 3).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  style={{
                    backgroundColor: '#111827',
                    borderRadius: '12px',
                    border: '1px solid #374151',
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{
                    borderBottom: '1px solid #374151',
                    padding: '16px',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#f9fafb',
                        margin: '0 0 8px 0',
                      }}>
                        {event.summary}
                      </h3>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#9ca3af',
                      fontSize: '14px'
                    }}>
                      <ClockIcon style={{ width: '16px', height: '16px' }} />
                      <span>{formatDate(event.start)}</span>
                    </div>
                  </div>
                  
                  <div style={{ padding: '16px' }}>
                    {event.description && (
                      <p style={{
                        margin: '0 0 16px 0',
                        color: '#d1d5db',
                        fontSize: '14px',
                        lineHeight: '1.5'
                      }}>
                        {event.description.length > 80 
                          ? `${event.description.substring(0, 80)}...` 
                          : event.description}
                      </p>
                    )}
                    
                    {event.location && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#9ca3af',
                        fontSize: '14px',
                        marginBottom: '16px'
                      }}>
                        <MapPinIcon style={{ width: '16px', height: '16px' }} />
                        <span>{event.location}</span>
                      </div>
                    )}
                    
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#3b82f6',
                        fontSize: '14px',
                        textDecoration: 'none',
                        fontWeight: '500',
                      }}
                    >
                      {t('calendar.viewInCalendar', 'View Details')}
                      <ArrowRightIcon style={{ width: '16px', height: '16px' }} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {events.length > 3 && (
            <div style={{ 
              textAlign: 'center', 
              marginTop: '24px' 
            }}>
              <Link to="/calendar" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#3b82f6',
                fontSize: '16px',
                textDecoration: 'none',
                fontWeight: '500',
              }}>
                View all events
                <ArrowRightIcon style={{ width: '16px', height: '16px' }} />
              </Link>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default Home; 