import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, TrophyIcon, LightBulbIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    </div>
  );
};

export default Home; 