import React, { useState, useEffect, ReactElement, cloneElement } from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, AcademicCapIcon, BoltIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import PageLayout from '../components/PageLayout';
import AnimatedCard from '../components/AnimatedCard';
import IconBlock from '../components/IconBlock';

// Define the SVG icon element type
interface IconComponentProps {
  width?: number;
  height?: number;
  className?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: ReactElement<IconComponentProps>;
  dateEarned?: string;
  progress: number; // 0-100
}

interface Badge {
  id: string;
  title: string;
  icon: ReactElement<IconComponentProps>;
  level: number;
  maxLevel: number;
  category: string;
  points: number;
}

const GamificationPage = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Mock achievements data
    const mockAchievements: Achievement[] = [
      {
        id: 'a1',
        title: 'Quiz Master',
        description: 'Completed 5 career quizzes',
        category: 'Quizzes',
        icon: <AcademicCapIcon width={24} height={24} />,
        dateEarned: '2023-12-10',
        progress: 100
      },
      {
        id: 'a2',
        title: 'Scholarship Hunter',
        description: 'Applied to 3 scholarships',
        category: 'Scholarships',
        icon: <TrophyIcon width={24} height={24} />,
        dateEarned: '2023-11-25',
        progress: 100
      },
      {
        id: 'a3',
        title: 'STEM Explorer',
        description: 'Solved 10 science problems with STEM Assistant',
        category: 'Learning',
        icon: <LightBulbIcon width={24} height={24} />,
        progress: 70
      },
      {
        id: 'a4',
        title: 'Profile Perfection',
        description: 'Completed your profile with all information',
        category: 'Profile',
        icon: <BoltIcon width={24} height={24} />,
        progress: 90
      },
    ];

    // Mock badges data
    const mockBadges: Badge[] = [
      {
        id: 'b1',
        title: 'Scholar',
        icon: <AcademicCapIcon width={24} height={24} />,
        level: 2,
        maxLevel: 5,
        category: 'Learning',
        points: 200
      },
      {
        id: 'b2',
        title: 'Networker',
        icon: <BoltIcon width={24} height={24} />,
        level: 1,
        maxLevel: 3,
        category: 'Community',
        points: 100
      },
      {
        id: 'b3',
        title: 'Problem Solver',
        icon: <LightBulbIcon width={24} height={24} />,
        level: 3,
        maxLevel: 5,
        category: 'STEM',
        points: 300
      }
    ];

    setAchievements(mockAchievements);
    setBadges(mockBadges);
    setTotalPoints(600);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'var(--border)';
    if (progress < 70) return 'var(--accent)';
    return 'var(--primary)';
  };

  return (
    <PageLayout
      title="Achievements & Badges"
      subtitle="Track your progress and earn rewards as you learn and grow"
      heroIcon={<TrophyIcon width={40} height={40} />}
      gradientColors={{ from: 'rgba(168, 85, 247, 0.15)', to: 'rgba(59, 130, 246, 0.1)' }}
    >
      {/* Points Overview */}
      <AnimatedCard delay={0.1}>
        <div style={{
          padding: '24px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '8px',
            color: 'var(--text)'
          }}>
            Your Learning Progress
          </h2>
          <div style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '16px',
            color: 'var(--primary)'
          }}>
            {totalPoints}
          </div>
          <p style={{
            fontSize: '16px',
            color: 'var(--text-secondary)'
          }}>
            Total points earned through activities and achievements
          </p>
        </div>
      </AnimatedCard>

      {/* Badges Section */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '16px',
          color: 'var(--text)'
        }}>
          Your Badges
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {badges.map((badge, index) => (
            <AnimatedCard
              key={badge.id}
              delay={0.2 + index * 0.1}
            >
              <div style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '16px',
                  color: 'var(--primary)'
                }}>
                  {cloneElement(badge.icon, { width: 40, height: 40 })}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: 'var(--text)'
                }}>
                  {badge.title}
                </h3>
                <div style={{
                  fontSize: '14px',
                  marginBottom: '16px',
                  color: 'var(--text-secondary)'
                }}>
                  Level {badge.level} / {badge.maxLevel}
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: 'var(--background-lighter)',
                  borderRadius: '4px',
                  marginBottom: '16px',
                  overflow: 'hidden'
                }}>
                  <div
                    style={{
                      width: `${(badge.level / badge.maxLevel) * 100}%`,
                      height: '100%',
                      backgroundColor: 'var(--primary)',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                <div style={{
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--primary)'
                }}>
                  <span style={{ fontWeight: '600' }}>{badge.points}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>points earned</span>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '16px',
          color: 'var(--text)'
        }}>
          Achievements
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '24px'
        }}>
          {achievements.map((achievement, index) => (
            <AnimatedCard
              key={achievement.id}
              delay={0.3 + index * 0.1}
            >
              <div style={{
                padding: '24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {achievement.dateEarned && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '-28px',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    padding: '4px 30px',
                    fontSize: '12px',
                    fontWeight: '600',
                    transform: 'rotate(45deg)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    zIndex: 1
                  }}>
                    COMPLETED
                  </div>
                )}
                
                <div style={{
                  minWidth: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  backgroundColor: achievement.dateEarned 
                    ? 'var(--primary)' 
                    : 'var(--background-lighter)', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: achievement.dateEarned 
                    ? '0 8px 16px rgba(99, 102, 241, 0.2)' 
                    : 'none',
                  color: achievement.dateEarned 
                    ? 'white' 
                    : 'var(--text-secondary)'
                }}>
                  {cloneElement(achievement.icon, { 
                    width: 32, 
                    height: 32 
                  })}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    marginBottom: '10px'
                  }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: 'var(--text)',
                      marginBottom: '6px'
                    }}>
                      {achievement.title}
                    </h3>
                    <div style={{
                      fontSize: '13px',
                      color: 'var(--text-muted)',
                      display: 'inline-block',
                      padding: '2px 8px',
                      backgroundColor: 'var(--background-lighter)',
                      borderRadius: '4px'
                    }}>
                      {achievement.category}
                    </div>
                  </div>
                  
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    marginBottom: '16px',
                    lineHeight: '1.5'
                  }}>
                    {achievement.description}
                  </p>
                  
                  <div style={{
                    marginBottom: '8px',
                    fontSize: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ 
                      color: 'var(--text-secondary)',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      Progress
                    </span>
                    <span style={{ 
                      color: getProgressColor(achievement.progress),
                      fontWeight: '600' 
                    }}>
                      {achievement.progress}%
                    </span>
                  </div>
                  
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--background-lighter)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
                  }}>
                    <div
                      style={{
                        width: `${achievement.progress}%`,
                        height: '100%',
                        backgroundColor: getProgressColor(achievement.progress),
                        borderRadius: '8px',
                        transition: 'width 0.5s ease',
                        boxShadow: achievement.progress === 100 
                          ? '0 0 6px rgba(99, 102, 241, 0.5)' 
                          : 'none'
                      }}
                    />
                  </div>
                  
                  {achievement.dateEarned && (
                    <div style={{
                      marginTop: '16px',
                      fontSize: '13px',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      Earned on {new Date(achievement.dateEarned).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default GamificationPage; 