import { motion } from 'framer-motion';

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = 'Loading...' }: LoadingProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        minHeight: '200px',
        gap: '1.5rem',
      }}
    >
      {/* Spinner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '3px solid rgba(99, 102, 241, 0.1)',
          borderTop: '3px solid rgba(99, 102, 241, 0.8)',
          borderRight: '3px solid rgba(99, 102, 241, 0.6)',
          borderBottom: '3px solid rgba(99, 102, 241, 0.4)',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          fontSize: '1rem',
          color: '#6366f1',
          fontWeight: 500,
          textAlign: 'center',
          maxWidth: '80%',
        }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default Loading; 