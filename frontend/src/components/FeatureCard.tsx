import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkText: string;
  linkTo: string;
  colorAccent?: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  linkText,
  linkTo,
  colorAccent = '#4f46e5',
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="perspective-card"
      style={{
        backgroundColor: 'var(--background-card)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--border-radius-lg)',
        overflow: 'hidden',
        border: `1px solid ${isHovered ? colorAccent + '50' : 'var(--border)'}`,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isHovered 
          ? `0 20px 40px rgba(0, 0, 0, 0.15), 0 0 20px ${colorAccent}30`
          : '0 10px 30px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-content" style={{ 
        padding: '32px', 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Icon with glow effect */}
        <div style={{
          backgroundColor: `${colorAccent}15`,
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '24px',
          width: 'fit-content',
          boxShadow: isHovered ? `0 0 20px ${colorAccent}30` : 'none',
          transition: 'all 0.4s ease',
          position: 'relative',
        }}>
          {/* Icon wrapper */}
          <div style={{ 
            width: '28px', 
            height: '28px', 
            color: colorAccent,
            filter: isHovered ? `drop-shadow(0 0 5px ${colorAccent})` : 'none',
            transition: 'all 0.4s ease'
          }}>
            {icon}
          </div>
          
          {/* Background pulse animation */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.2, 0], 
                scale: [0.8, 1.5, 0.8]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                inset: '0',
                borderRadius: '16px',
                backgroundColor: colorAccent,
                zIndex: -1,
              }}
            />
          )}
        </div>
        
        {/* Card content */}
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: '700', 
          marginBottom: '16px',
          color: 'var(--text)',
          position: 'relative',
          paddingBottom: '14px',
        }}>
          {/* Underline accent */}
          <span style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: isHovered ? '80px' : '40px',
            height: '3px',
            background: `linear-gradient(to right, ${colorAccent}, transparent)`,
            borderRadius: '3px',
            transition: 'width 0.4s ease',
          }}></span>
          
          {title}
        </h2>
        
        <p style={{ 
          fontSize: '16px', 
          marginBottom: '24px',
          lineHeight: '1.7',
          flex: 1,
          transition: 'color 0.3s ease',
          color: isHovered ? 'var(--text-secondary)' : 'var(--text-muted)',
        }}>
          {description}
        </p>
        
        <Link to={linkTo} style={{
          backgroundColor: isHovered ? `${colorAccent}15` : 'transparent',
          color: isHovered ? colorAccent : 'var(--text-muted)',
          padding: '12px 24px',
          borderRadius: 'var(--border-radius-md)',
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: '600',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          transition: 'all 0.3s ease',
          border: `1px solid ${isHovered ? colorAccent + '50' : 'transparent'}`,
          width: '100%',
        }}>
          <span>{linkText}</span>
          <motion.div
            animate={{
              x: isHovered ? 5 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <ArrowRightIcon style={{ width: '18px', height: '18px' }} />
          </motion.div>
        </Link>
      </div>
      
      {/* Background subtle patterns */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        opacity: isHovered ? 0.1 : 0.05,
        transition: 'opacity 0.3s ease',
        backgroundImage: `radial-gradient(circle at 80% 80%, ${colorAccent} 0%, transparent 20%), radial-gradient(circle at 20% 20%, ${colorAccent} 0%, transparent 20%)`,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />
    </motion.div>
  );
};

export default FeatureCard; 