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
  category?: string;
  isImportant?: boolean;
  reminder?: boolean;
}

const Home = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [eventCategory, setEventCategory] = useState<string>('all');
  const [showRemindModal, setShowRemindModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

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
      // Check if response data exists and is an array
      if (response.data && Array.isArray(response.data)) {
        const enhancedEvents = response.data.map((event: any) => ({
          ...event,
          id: event.id || `event-${Math.random().toString(36).substr(2, 9)}`,
          category: event.category || (
            event.summary?.toLowerCase().includes('exam') ? 'exam' : 
            event.summary?.toLowerCase().includes('scholarship') ? 'scholarship' :
            event.summary?.toLowerCase().includes('workshop') ? 'workshop' : 'general'
          ),
          isImportant: event.isImportant || Math.random() > 0.7,
          reminder: event.reminder || false
        }));
        setEvents(enhancedEvents);
      } else {
        // If no events are returned or data isn't in expected format
        console.warn('No events data returned or invalid format, using fallback data:', response.data);
        useFallbackEvents();
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoadError("Failed to load events from server. Using sample events instead.");
      useFallbackEvents();
    } finally {
      setLoading(false);
    }
  };

  // Fallback events in case API fails
  const useFallbackEvents = () => {
    const fallbackEvents: CalendarEvent[] = [
      {
        id: 'fb-1',
        summary: 'JEE Advanced Exam',
        start: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        link: 'https://jeeadv.ac.in',
        description: 'Joint Entrance Examination Advanced for IIT admissions',
        location: 'Multiple centers across India',
        category: 'exam',
        isImportant: true,
        reminder: false
      },
      {
        id: 'fb-2',
        summary: 'Scholarship Application Workshop',
        start: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        link: 'https://aarambh-workshops.edu',
        description: 'Learn how to write effective scholarship applications and personal statements',
        location: 'Online (Zoom)',
        category: 'workshop',
        isImportant: false,
        reminder: false
      },
      {
        id: 'fb-3',
        summary: 'National Talent Scholarship Deadline',
        start: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        link: 'https://nts-scholarships.gov.in',
        description: 'Last date to apply for the National Talent Scholarship for undergraduate students',
        category: 'scholarship',
        isImportant: true,
        reminder: false
      }
    ];
    setEvents(fallbackEvents);
    setLoadError(null); // Clear any error if we're using fallback data
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn(`Invalid date: ${dateString}`);
        return "Date unavailable";
      }
      
      return new Intl.DateTimeFormat('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return "Date unavailable";
    }
  };

  const getDaysRemaining = (dateString: string) => {
    try {
      const eventDate = new Date(dateString);
      // Check if date is valid
      if (isNaN(eventDate.getTime())) {
        return 999; // Large number to not show urgency for invalid dates
      }
      
      const today = new Date();
      
      today.setHours(0, 0, 0, 0);
      const eventDateNoTime = new Date(eventDate);
      eventDateNoTime.setHours(0, 0, 0, 0);
      
      const diffTime = eventDateNoTime.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays;
    } catch (error) {
      console.error('Error calculating days remaining:', error);
      return 999;
    }
  };

  const formatRemainingDays = (dateString: string) => {
    const days = getDaysRemaining(dateString);
    
    if (days < 0) return "Passed";
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    return `${days} days left`;
  };

  const toggleReminder = (event: CalendarEvent) => {
    const updatedEvents = events.map(e => {
      if (e.id === event.id) {
        return { ...e, reminder: !e.reminder };
      }
      return e;
    });
    setEvents(updatedEvents);
  };

  const getFilteredEvents = () => {
    if (eventCategory === 'all') return events;
    return events.filter(event => event.category === eventCategory);
  };
  
  const getCategoryColor = (category?: string) => {
    switch(category) {
      case 'exam': return 'rgba(239, 68, 68, 0.15)';
      case 'scholarship': return 'rgba(16, 185, 129, 0.15)';
      case 'workshop': return 'rgba(59, 130, 246, 0.15)';
      default: return 'rgba(99, 102, 241, 0.15)';
    }
  };
  
  const getCategoryTextColor = (category?: string) => {
    switch(category) {
      case 'exam': return 'rgb(239, 68, 68)';
      case 'scholarship': return 'rgb(16, 185, 129)';
      case 'workshop': return 'rgb(59, 130, 246)';
      default: return 'var(--primary)';
    }
  };
  
  const getCategoryLabel = (category?: string) => {
    switch(category) {
      case 'exam': return 'Exam';
      case 'scholarship': return 'Scholarship';
      case 'workshop': return 'Workshop';
      default: return 'General';
    }
  };

  return (
    <div style={{ 
      paddingTop: '16px',
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      color: 'var(--text)'
    }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', padding: '16px 0 24px' }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'linear-gradient(to bottom right, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.1))',
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
              className="gradient-text"
              style={{ 
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '16px',
              }}
            >
              {t('home.title')}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ 
                fontSize: '18px',
                color: 'var(--text-secondary)',
                marginBottom: '24px',
              }}
            >
              {t('home.subtitle')}
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
            className="glass-card"
            style={{
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
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px',
                width: 'fit-content'
              }}>
                <DocumentTextIcon style={{ width: '24px', height: '24px', color: 'var(--primary-light)' }} />
              </div>
              
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                marginBottom: '16px',
                color: 'var(--text)' 
              }}>
                {t('home.features.careerQuiz.title')}
              </h2>
              
              <p style={{ 
                fontSize: '16px', 
                color: 'var(--text-secondary)', 
                marginBottom: '24px',
                lineHeight: '1.6',
                flex: 1
              }}>
                {t('home.features.careerQuiz.description')}
              </p>
              
              <Link to="/career-quiz" className="btn-glossy btn-primary" style={{
                textDecoration: 'none',
                fontSize: '16px',
                display: 'inline-block',
                textAlign: 'center',
                width: 'fit-content'
              }}>
                {t('careerQuiz.startButton')}
              </Link>
            </div>
          </motion.div>

          {/* Scholarships Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="glass-card"
            style={{
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
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px',
                width: 'fit-content'
              }}>
                <AcademicCapIcon style={{ width: '24px', height: '24px', color: 'var(--secondary)' }} />
              </div>
              
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                marginBottom: '16px',
                color: 'var(--text)' 
              }}>
                {t('home.features.scholarships.title')}
              </h2>
              
              <p style={{ 
                fontSize: '16px', 
                color: 'var(--text-secondary)', 
                marginBottom: '24px',
                lineHeight: '1.6',
                flex: 1
              }}>
                {t('home.features.scholarships.description')}
              </p>
              
              <Link to="/scholarships" className="btn-glossy btn-secondary" style={{
                textDecoration: 'none',
                fontSize: '16px',
                display: 'inline-block',
                textAlign: 'center',
                width: 'fit-content'
              }}>
                {t('scholarships.applyButton')}
              </Link>
            </div>
          </motion.div>

          {/* STEM Assistant Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="glass-card"
            style={{
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
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px',
                width: 'fit-content'
              }}>
                <LightBulbIcon style={{ width: '24px', height: '24px', color: 'var(--primary)' }} />
              </div>
              
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                marginBottom: '16px',
                color: 'var(--text)' 
              }}>
                {t('nav.stemAssistant')}
              </h2>
              
              <p style={{ 
                fontSize: '16px', 
                color: 'var(--text-secondary)', 
                marginBottom: '24px',
                lineHeight: '1.6',
                flex: 1
              }}>
                {t('home.features.courses.description')}
              </p>
              
              <Link to="/stem-assistant" className="btn-glossy btn-primary" style={{
                textDecoration: 'none',
                fontSize: '16px',
                display: 'inline-block',
                textAlign: 'center',
                width: 'fit-content'
              }}>
                {t('home.getAssistanceButton', 'Ask STEM Assistant')}
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
        <div style={{
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '600',
            color: 'var(--text)'
          }}>
            <CalendarIcon style={{ 
              width: '24px', 
              height: '24px', 
              display: 'inline-block', 
              marginRight: '8px',
              verticalAlign: 'text-bottom',
              color: 'var(--primary)'
            }} />
            Upcoming Events
          </h2>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            {/* Event Category Filter */}
            <div style={{
              position: 'relative',
              zIndex: 5
            }}>
              <select
                value={eventCategory}
                onChange={(e) => setEventCategory(e.target.value)}
                style={{
                  backgroundColor: 'var(--background-lighter)',
                  color: 'var(--text)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  fontSize: '14px',
                  appearance: 'none',
                  paddingRight: '32px',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Categories</option>
                <option value="exam">Exams</option>
                <option value="scholarship">Scholarships</option>
                <option value="workshop">Workshops</option>
                <option value="general">General</option>
              </select>
              <div style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            
            <Link to="/calendar" style={{ 
              fontSize: '14px',
              color: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'none'
            }}>
              View All
              <ArrowRightIcon style={{ width: '16px', height: '16px' }} />
            </Link>
          </div>
        </div>

        {/* Events Grid or Loading State */}
        <div className="glass-card" style={{ padding: '16px' }}>
          {loading ? (
            <div style={{ 
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px'
            }}>
              <div className="loader"></div>
              <p style={{ color: 'var(--text-secondary)' }}>Loading events...</p>
              
              {/* Show a timeout message if loading takes too long */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5 }} // Show after 5 seconds
                style={{ 
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  maxWidth: '400px',
                  marginTop: '8px'
                }}
              >
                Taking longer than expected. You can try refreshing the page or come back later.
              </motion.div>
            </div>
          ) : loadError ? (
            <div style={{ 
              padding: '32px',
              textAlign: 'center',
              color: 'var(--text-secondary)'
            }}>
              <p>{loadError}</p>
              <div style={{ 
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                marginTop: '16px'
              }}>
                <button 
                  onClick={fetchEvents}
                  className="btn-glossy btn-primary btn-icon"
                  style={{
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <polyline points="23 20 23 14 17 14"></polyline>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                  </svg>
                  Try Again
                </button>
                <Link to="/calendar" 
                  className="btn-glossy btn-secondary btn-icon"
                  style={{
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3h18v18H3z"></path>
                    <path d="M8 12h8"></path>
                    <path d="M12 8v8"></path>
                  </svg>
                  Create Event
                </Link>
              </div>
            </div>
          ) : getFilteredEvents().length === 0 ? (
            <div style={{ 
              padding: '32px',
              textAlign: 'center',
              color: 'var(--text-secondary)'
            }}>
              <p>No {eventCategory !== 'all' ? getCategoryLabel(eventCategory) + ' ' : ''}events found.</p>
              <Link to="/calendar" 
                className="btn-glossy btn-primary btn-icon"
                style={{
                  display: 'inline-block',
                  marginTop: '16px',
                  padding: '8px 16px',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                Create Event
              </Link>
            </div>
          ) : (
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '16px'
              }}>
                {getFilteredEvents().slice(0, 3).map((event) => (
                  <motion.div
                    key={event.id || `event-${Math.random().toString(36).substr(2, 9)}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '16px',
                      position: 'relative',
                      overflow: 'hidden',
                      border: `1px solid ${event.isImportant ? getCategoryTextColor(event.category) : 'var(--border)'}`
                    }}
                    whileHover={{
                      y: -5,
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    {/* Category Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: getCategoryColor(event.category),
                      color: getCategoryTextColor(event.category),
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      padding: '2px 8px'
                    }}>
                      {getCategoryLabel(event.category)}
                    </div>
                    
                    {/* Important Flag */}
                    {event.isImportant && (
                      <div style={{
                        position: 'absolute',
                        top: '0',
                        left: '16px',
                        backgroundColor: getCategoryTextColor(event.category),
                        color: 'white',
                        fontSize: '10px',
                        padding: '4px 8px',
                        borderBottomLeftRadius: '4px',
                        borderBottomRightRadius: '4px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        Important
                      </div>
                    )}
                    
                    {/* Date and Countdown */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '16px',
                      marginTop: event.isImportant ? '8px' : '0'
                    }}>
                      <div style={{
                        backgroundColor: getCategoryColor(event.category),
                        borderRadius: '50%',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <CalendarIcon style={{ width: '16px', height: '16px', color: getCategoryTextColor(event.category) }} />
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                      }}>
                        <span style={{ 
                          fontSize: '14px',
                          fontWeight: '600',
                          color: 'var(--text)'
                        }}>
                          {event.start ? formatDate(event.start) : "Date unavailable"}
                        </span>
                        
                        <span style={{ 
                          fontSize: '12px',
                          color: event.start && getDaysRemaining(event.start) <= 3 ? 'var(--red)' : 'var(--text-muted)',
                          fontWeight: event.start && getDaysRemaining(event.start) <= 3 ? '600' : '400'
                        }}>
                          {event.start ? formatRemainingDays(event.start) : "No date set"}
                        </span>
                      </div>
                    </div>
                    
                    {/* Event title and description */}
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: 'var(--text)'
                    }}>
                      {event.summary || "Untitled Event"}
                    </h3>
                    
                    {event.description && (
                      <p style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        marginBottom: '16px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        flex: '1'
                      }}>
                        {event.description}
                      </p>
                    )}
                    
                    {/* Location if available */}
                    {event.location && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                        marginBottom: '12px'
                      }}>
                        <MapPinIcon style={{ width: '14px', height: '14px' }} />
                        <span style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {event.location}
                        </span>
                      </div>
                    )}
                    
                    {/* Action buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      marginTop: 'auto',
                      paddingTop: '12px',
                      borderTop: '1px solid var(--border)'
                    }}>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          toggleReminder(event);
                        }}
                        style={{
                          flex: '1',
                          padding: '8px',
                          background: event.reminder ? getCategoryColor(event.category) : 'var(--background-lighter)',
                          border: `1px solid ${event.reminder ? getCategoryTextColor(event.category) : 'var(--border)'}`,
                          color: event.reminder ? getCategoryTextColor(event.category) : 'var(--text-secondary)',
                          borderRadius: '6px',
                          fontSize: '13px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                        {event.reminder ? 'Reminder Set' : 'Set Reminder'}
                      </button>
                      
                      <a 
                        href={event.link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          flex: '1',
                          padding: '8px',
                          backgroundColor: getCategoryTextColor(event.category),
                          color: 'white',
                          borderRadius: '6px',
                          fontSize: '13px',
                          textDecoration: 'none',
                          textAlign: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        View Details
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Create Event Button */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '24px',
                gap: '16px'
              }}>
                <Link to="/calendar" 
                  className="btn-glossy btn-primary btn-icon"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}
                >
                  <PlusIcon width={16} height={16} />
                  Add New Event
                </Link>
                
                {getFilteredEvents().length > 3 && (
                  <Link to="/calendar" 
                    className="btn-glossy btn-secondary btn-icon"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      textDecoration: 'none'
                    }}
                  >
                    View all {getFilteredEvents().length} events
                    <ArrowRightIcon style={{ width: '14px', height: '14px' }} />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home; 