import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GamificationComponent from '../components/Gamification';
import { UsersIcon, CurrencyRupeeIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  level: number;
  position: number;
  avatar: string;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  image: string;
  category: 'certificate' | 'discount' | 'exclusive';
}

const GamificationPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');
  
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([
    {
      id: '1',
      name: 'Vikram S.',
      points: 2450,
      level: 8,
      position: 1,
      avatar: 'https://i.pravatar.cc/150?img=11'
    },
    {
      id: '2',
      name: 'Priya M.',
      points: 2280,
      level: 7,
      position: 2,
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: '3',
      name: 'Rahul D.',
      points: 1950,
      level: 6,
      position: 3,
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: '4',
      name: 'Ananya K.',
      points: 1840,
      level: 6,
      position: 4,
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: '5',
      name: 'Varun T.',
      points: 1790,
      level: 5,
      position: 5,
      avatar: 'https://i.pravatar.cc/150?img=15'
    }
  ]);
  
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      title: 'Career Readiness Certificate',
      description: 'Earn a verified certificate to showcase your skills to potential employers',
      pointsCost: 5000,
      image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      category: 'certificate'
    },
    {
      id: '2',
      title: '50% Scholarship Discount',
      description: 'Get 50% off on application fees for selected scholarships',
      pointsCost: 3500,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      category: 'discount'
    },
    {
      id: '3',
      title: 'Exclusive Career Mentorship',
      description: '1-on-1 virtual session with an industry expert in your field of interest',
      pointsCost: 8000,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      category: 'exclusive'
    }
  ]);

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
      paddingBottom: '64px',
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
              Learning Achievements
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
              Track your progress, earn rewards, and compete with others on your learning journey
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
        gap: '24px'
      }}>
        {/* Left Column - Gamification Component */}
        <div>
          <GamificationComponent />
          
          {/* Rewards Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              marginTop: '32px',
              backgroundColor: '#1f2937',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #374151',
            }}
          >
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CurrencyRupeeIcon width={20} height={20} style={{ color: '#f59e0b' }} />
              Rewards Center
            </h2>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '16px'
            }}>
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #374151',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.borderColor = '#4f46e5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#374151';
                  }}
                >
                  <div style={{ 
                    height: '120px', 
                    backgroundImage: `url(${reward.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      right: '8px',
                      top: '8px',
                      backgroundColor: 'rgba(79, 70, 229, 0.9)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <RocketLaunchIcon width={12} height={12} />
                      {reward.pointsCost} points
                    </div>
                  </div>
                  
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#e5e7eb' 
                    }}>
                      {reward.title}
                    </h3>
                    <p style={{ 
                      fontSize: '14px',
                      color: '#9ca3af',
                      marginBottom: '16px',
                      lineHeight: '1.4'
                    }}>
                      {reward.description}
                    </p>
                    <button
                      style={{
                        width: '100%',
                        backgroundColor: '#4f46e5',
                        color: 'white',
                        padding: '8px 0',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#4338ca' }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#4f46e5' }}
                    >
                      Redeem Reward
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Right Column - Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            backgroundColor: '#1f2937',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #374151',
            height: 'fit-content',
          }}
        >
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#e5e7eb',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <UsersIcon width={20} height={20} style={{ color: '#f59e0b' }} />
            Leaderboard
          </h2>
          
          {/* Tabs */}
          <div style={{ 
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            borderBottom: '1px solid #374151',
            paddingBottom: '12px'
          }}>
            {[
              { id: 'weekly', label: 'This Week' },
              { id: 'monthly', label: 'This Month' },
              { id: 'allTime', label: 'All Time' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveLeaderboardTab(tab.id as any)}
                style={{
                  backgroundColor: activeLeaderboardTab === tab.id ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                  color: activeLeaderboardTab === tab.id ? '#818cf8' : '#9ca3af',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: activeLeaderboardTab === tab.id ? '600' : '400',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => { 
                  if (activeLeaderboardTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.3)' 
                  }
                }}
                onMouseOut={(e) => { 
                  if (activeLeaderboardTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = 'transparent' 
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Leaderboard List */}
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {leaderboard.map((user) => (
              <div
                key={user.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: 'rgba(31, 41, 55, 0.5)',
                  borderRadius: '8px',
                  border: '1px solid #374151',
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: user.position <= 3 ? 
                    ['#fbbf24', '#94a3b8', '#d97706'][user.position - 1] : 
                    '#374151',
                  borderRadius: '50%',
                  color: user.position <= 3 ? '#111827' : '#d1d5db',
                  fontSize: '14px',
                  fontWeight: '600',
                }}>
                  {user.position}
                </div>
                
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}>
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    color: '#e5e7eb' 
                  }}>
                    {user.name}
                  </div>
                  <div style={{ 
                    fontSize: '13px', 
                    color: '#9ca3af',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Level {user.level}
                  </div>
                </div>
                
                <div style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#818cf8',
                }}>
                  {user.points.toLocaleString()} pts
                </div>
              </div>
            ))}
            
            <div style={{ 
              marginTop: '8px',
              padding: '12px',
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(79, 70, 229, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#4f46e5',
                borderRadius: '50%',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
              }}>
                24
              </div>
              
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
              }}>
                You
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '15px', 
                  fontWeight: '600', 
                  color: '#e5e7eb' 
                }}>
                  Your Rank
                </div>
                <div style={{ 
                  fontSize: '13px', 
                  color: '#9ca3af'
                }}>
                  Level 1
                </div>
              </div>
              
              <div style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#818cf8',
              }}>
                150 pts
              </div>
            </div>
          </div>
          
          <div style={{ 
            marginTop: '20px',
            textAlign: 'center'
          }}>
            <button
              style={{
                backgroundColor: 'transparent',
                color: '#818cf8',
                border: '1px solid rgba(129, 140, 248, 0.3)',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => { 
                e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(129, 140, 248, 0.5)';
              }}
              onMouseOut={(e) => { 
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(129, 140, 248, 0.3)';
              }}
            >
              View Full Leaderboard
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GamificationPage; 