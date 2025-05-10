import React from 'react';
import { motion } from 'framer-motion';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  gradientColors?: {
    from: string;
    to: string;
  };
  heroIcon?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  gradientColors = { from: 'rgba(99, 102, 241, 0.15)', to: 'rgba(168, 85, 247, 0.1)' },
  heroIcon
}) => {
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
          backgroundImage: `linear-gradient(to bottom right, ${gradientColors.from}, ${gradientColors.to})`,
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
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {heroIcon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  borderRadius: '16px',
                  padding: '16px',
                  marginBottom: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'var(--primary)'
                }}
              >
                {heroIcon}
              </motion.div>
            )}
            
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
              {title}
            </motion.h1>
            
            {subtitle && (
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
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ 
          maxWidth: '1200px', 
          margin: '0 auto 64px', 
          padding: '0 16px'
        }}
      >
        {children}
      </motion.section>
    </div>
  );
};

export default PageLayout; 