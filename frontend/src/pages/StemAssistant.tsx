import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const StemAssistant = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    // Hide navbar when this component mounts
    document.body.style.overflow = 'hidden';
    
    // Show navbar when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ 
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0
    }}>
      {/* Back button header instead of nav space */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ 
          height: '48px', 
          minHeight: '48px',
          width: '100%',
          backgroundColor: 'rgba(17, 24, 39, 0.9)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          borderBottom: '1px solid rgba(75, 85, 99, 0.2)'
        }}
      >
        <button
          onClick={handleBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#d1d5db',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.3)';
            e.currentTarget.style.color = '#f9fafb';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#d1d5db';
          }}
        >
          <ArrowLeftIcon style={{ width: '20px', height: '20px' }} />
          <span style={{ fontWeight: '500' }}>Back</span>
        </button>
        
        <div style={{ 
          flexGrow: 1, 
          textAlign: 'center',
          color: '#f9fafb',
          fontWeight: '600',
          fontSize: '16px',
        }}>
          Stem Assistant
        </div>
        
        {/* Empty div to balance the layout */}
        <div style={{ width: '76px' }}></div>
      </motion.div>
      
      {/* Iframe container taking the remaining height */}
      <div style={{ 
        flex: 1,
        width: '100%',
        position: 'relative',
        margin: 0,
        padding: 0
      }}>
        <iframe
          src="https://audio-stem-journey-nine.vercel.app"
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            margin: 0,
            padding: 0
          }}
          title="Visual Learning Aid"
          allow="microphone"
        />
      </div>
    </div>
  );
};

export default StemAssistant; 