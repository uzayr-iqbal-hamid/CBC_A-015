import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoadingProps {
  message?: string;
  timeout?: number; // Time in ms before redirect
}

const Loading = ({ message = 'Loading...', timeout = 5000 }: LoadingProps) => {
  const navigate = useNavigate();
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Start timer
    const startTime = Date.now();
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    // Set a timeout to redirect if loading takes too long
    console.log(`Setting loading timeout for ${timeout}ms`);
    const timer = setTimeout(() => {
      console.log("Loading timeout reached, redirecting to auth");
      setTimeoutReached(true);
    }, timeout);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [timeout]);

  const handleSkip = () => {
    console.log("User skipped loading, redirecting to auth");
    navigate('/auth', { replace: true });
  };

  const handleGoHome = () => {
    console.log("User chose to go to home page");
    navigate('/', { replace: true });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        minHeight: '200px',
        gap: '1.5rem',
        backgroundColor: '#111827', // Match dark theme
        padding: '20px',
      }}
    >
      {/* Spinner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          rotate: 360
        }}
        transition={{ 
          opacity: { duration: 0.5 },
          rotate: {
            duration: 1.2,
            repeat: Infinity,
            ease: 'linear',
          }
        }}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '3px solid var(--primary-light)',
          borderTopColor: 'var(--primary)',
          borderRightColor: 'var(--secondary)',
          borderBottomColor: 'var(--accent)',
          opacity: 0.8,
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.3)',
        }}
      />

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          fontSize: '1rem',
          color: 'var(--primary)',
          fontWeight: 600,
          textAlign: 'center',
          maxWidth: '80%',
        }}
      >
        {timeoutReached ? 'Taking longer than expected...' : message}
      </motion.p>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          fontSize: '0.75rem',
          color: '#9ca3af',
          textAlign: 'center',
        }}
      >
        Time elapsed: {elapsedTime}s
      </motion.p>

      {(timeoutReached || elapsedTime > 3) && (
        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: '20px'
        }}>
          <button
            onClick={handleSkip}
            style={{
              backgroundColor: '#4b5563',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Go to Login
          </button>
          
          <button
            onClick={handleGoHome}
            style={{
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Go to Home
          </button>
        </div>
      )}

      {/* Debug info */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        right: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '10px',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#a5b4fc',
        maxHeight: '150px',
        overflow: 'auto',
      }}>
        <p>Debug Information:</p>
        <p>- Loading time: {elapsedTime} seconds</p>
        <p>- Timeout reached: {timeoutReached ? 'Yes' : 'No'}</p>
        <p>- Current pathname: {window.location.pathname}</p>
        <p>- Timeout set to: {timeout}ms</p>
      </div>
    </div>
  );
};

export default Loading; 