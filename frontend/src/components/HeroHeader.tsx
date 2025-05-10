import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DocumentTextIcon, LightBulbIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const HeroHeader: React.FC = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const calculateTransform = (factor: number) => {
    if (isMobile) return {};
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const deltaX = (mousePosition.x - centerX) / centerX;
    const deltaY = (mousePosition.y - centerY) / centerY;
    
    return {
      transform: `translate(${deltaX * -factor}px, ${deltaY * -factor}px)`
    };
  };

  return (
    <section className="glass-card magic-glow" style={{ 
      position: 'relative', 
      padding: '80px 20px',
      margin: '0 20px 40px',
      overflow: 'hidden',
      isolation: 'isolate'
    }}>
      {/* Animated background elements */}
      <div className="blurry-load" style={{ 
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 30% 40%, rgba(99, 102, 241, 0.15), transparent 70%), radial-gradient(circle at 70% 60%, rgba(79, 70, 229, 0.1), transparent 70%)',
        zIndex: -1,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 1s ease'
      }}>
        {/* Animated particles */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '40%',
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, transparent 70%)',
            top: '20%',
            left: '10%',
            filter: 'blur(40px)',
            ...calculateTransform(30)
          }}
        />
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            position: 'absolute',
            width: '250px',
            height: '250px',
            borderRadius: '60%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            bottom: '15%',
            right: '5%',
            filter: 'blur(50px)',
            ...calculateTransform(20)
          }}
        />
        
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'rgba(99, 102, 241, 0.6)',
            top: '30%',
            left: '20%',
            boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)',
            ...calculateTransform(15)
          }} 
        />
        
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          style={{
            position: 'absolute',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: 'rgba(139, 92, 246, 0.5)',
            bottom: '25%',
            right: '15%',
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)',
            ...calculateTransform(25)
          }} 
        />
        
        <motion.div 
          animate={{ 
            x: [0, 15, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'rgba(96, 165, 250, 0.5)',
            top: '60%',
            left: '40%',
            boxShadow: '0 0 8px rgba(96, 165, 250, 0.3)',
            ...calculateTransform(10)
          }} 
        />
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ 
          textAlign: 'center', 
          maxWidth: '800px',
          margin: '0 auto' 
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="badge"
            style={{
              marginBottom: '24px',
              fontSize: '0.875rem',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 16px',
              gap: '6px'
            }}
          >
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
            {t('home.newFeature', 'New: Interactive Job Locations Map')}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="gradient-text neon-text"
            style={{ 
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: 'bold',
              marginBottom: '24px',
              lineHeight: 1.2,
            }}
          >
            {t('home.welcomeTitle', 'Your Career Journey Starts with Aarambh')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ 
              fontSize: isMobile ? '16px' : '18px',
              color: 'var(--text-secondary)',
              marginBottom: '40px',
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto 48px',
            }}
          >
            {t('home.welcomeSubtitle', 'Empowering rural students with personalized career guidance, scholarship opportunities, and interactive learning resources')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '16px',
              justifyContent: 'center',
            }}
          >
            <Link to="/career-quiz" className="btn-3d liquid-button" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textDecoration: 'none',
              width: isMobile ? '100%' : 'auto'
            }}>
              <DocumentTextIcon style={{ width: '20px', height: '20px' }} />
              {t('home.startQuizButton', 'Start Career Quiz')}
            </Link>
            
            <Link to="/job-locations" className="btn liquid-button" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: 'var(--border-radius-md)',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              width: isMobile ? '100%' : 'auto'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)';
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)';
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <MapPinIcon style={{ width: '20px', height: '20px' }} />
              {t('home.exploreJobsButton', 'Explore Job Map')}
            </Link>
            
            <Link to="/stem-assistant" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 'var(--border-radius-md)',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              width: isMobile ? '100%' : 'auto'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.5)';
              e.currentTarget.style.color = 'var(--text)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}>
              <LightBulbIcon style={{ width: '20px', height: '20px' }} />
              {t('home.getAssistanceButton', 'Ask STEM Assistant')}
              <ArrowRightIcon style={{ width: '16px', height: '16px', marginLeft: '4px' }} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroHeader; 