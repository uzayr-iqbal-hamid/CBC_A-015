import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrophyIcon, 
  FireIcon, 
  StarIcon, 
  ArrowUpIcon, 
  GiftIcon, 
  CheckBadgeIcon, 
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  total: number;
}

interface Badge {
  id: string;
  name: string;
  icon: React.ReactNode;
  unlocked: boolean;
  level: number;
}

interface Props {
  userId?: string;
}

const Gamification: React.FC<Props> = ({ userId }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [experience, setExperience] = useState(150);
  const [experienceToNextLevel, setExperienceToNextLevel] = useState(300);
  const [streak, setStreak] = useState(3);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'quiz-taker',
      title: 'Quiz Enthusiast',
      description: 'Complete 5 different quizzes',
      icon: <StarIcon width={24} height={24} />,
      unlocked: false,
      progress: 1,
      total: 5
    },
    {
      id: 'streak-master',
      title: 'Streak Master',
      description: 'Maintain a 7-day activity streak',
      icon: <FireIcon width={24} height={24} />,
      unlocked: false,
      progress: 3,
      total: 7
    },
    {
      id: 'course-completer',
      title: 'Course Champion',
      description: 'Complete a full learning course',
      icon: <CheckBadgeIcon width={24} height={24} />,
      unlocked: false,
      progress: 60,
      total: 100
    },
    {
      id: 'explorer',
      title: 'Platform Explorer',
      description: 'Visit all main sections of the platform',
      icon: <ChartBarIcon width={24} height={24} />,
      unlocked: false,
      progress: 3,
      total: 5
    },
  ]);
  
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 'quiz-master',
      name: 'Quiz Master',
      icon: <TrophyIcon width={20} height={20} />,
      unlocked: true,
      level: 1
    },
    {
      id: 'fast-learner',
      name: 'Fast Learner',
      icon: <ArrowUpIcon width={20} height={20} />,
      unlocked: true,
      level: 2
    },
    {
      id: 'consistent',
      name: 'Consistency King',
      icon: <FireIcon width={20} height={20} />,
      unlocked: false,
      level: 0
    }
  ]);
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showAchievementNotification, setShowAchievementNotification] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Simulate unlocking a new achievement after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      const updatedAchievements = [...achievements];
      const achievementIndex = 1; // Unlock the second achievement
      
      if (!updatedAchievements[achievementIndex].unlocked) {
        updatedAchievements[achievementIndex].unlocked = true;
        updatedAchievements[achievementIndex].progress = updatedAchievements[achievementIndex].total;
        setAchievements(updatedAchievements);
        
        setNewAchievement(updatedAchievements[achievementIndex]);
        setShowAchievementNotification(true);
        
        // Add experience for unlocking achievement
        addExperience(50);
        
        // Hide notification after 5 seconds
        setTimeout(() => {
          setShowAchievementNotification(false);
        }, 5000);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const addExperience = (amount: number) => {
    const newExperience = experience + amount;
    setExperience(newExperience);
    
    // Level up if enough experience
    if (newExperience >= experienceToNextLevel) {
      setCurrentLevel(currentLevel + 1);
      setExperience(newExperience - experienceToNextLevel);
      setExperienceToNextLevel(Math.floor(experienceToNextLevel * 1.5)); // Increase XP needed for next level
    }
  };

  const calculateLevelProgress = () => {
    return (experience / experienceToNextLevel) * 100;
  };

  return (
    <div>
      {/* Achievement Notification */}
      {showAchievementNotification && newAchievement && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#4338ca',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            maxWidth: '350px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}>
            {newAchievement.icon}
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: 'rgba(255, 255, 255, 0.9)' }}>
              Achievement Unlocked!
            </div>
            <div style={{ fontWeight: 'bold', color: 'white' }}>
              {newAchievement.title}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
              +50 XP
            </div>
          </div>
        </motion.div>
      )}

      <div style={{ 
        backgroundColor: '#1f2937',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #374151',
      }}>
        {/* User Level and XP Section */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '16px' : '0',
          marginBottom: '24px'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px' 
          }}>
            <div style={{
              backgroundColor: '#4f46e5',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
            }}>
              {currentLevel}
            </div>
            <div>
              <div style={{ 
                color: '#e5e7eb', 
                fontWeight: '600', 
                fontSize: '18px' 
              }}>
                Level {currentLevel}
              </div>
              <div style={{ 
                color: '#9ca3af', 
                fontSize: '14px' 
              }}>
                {experience} / {experienceToNextLevel} XP
              </div>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px' 
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              color: '#f59e0b' 
            }}>
              <FireIcon width={20} height={20} />
              <span style={{ fontWeight: '600' }}>{streak} day streak</span>
            </div>
            
            <button
              onClick={() => addExperience(10)}
              style={{
                backgroundColor: '#374151',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#4b5563' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#374151' }}
            >
              <GiftIcon width={16} height={16} /> 
              Get Daily Bonus
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div style={{ 
          width: '100%',
          height: '8px',
          backgroundColor: '#374151',
          borderRadius: '4px',
          marginBottom: '32px',
          overflow: 'hidden'
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${calculateLevelProgress()}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              height: '100%',
              backgroundColor: '#4f46e5',
              borderRadius: '4px',
            }}
          />
        </div>
        
        {/* Badges Section */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#e5e7eb',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <TrophyIcon width={20} height={20} style={{ color: '#f59e0b' }} />
            Your Badges
          </h3>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: '16px'
          }}>
            {badges.map((badge) => (
              <div
                key={badge.id}
                style={{
                  backgroundColor: badge.unlocked ? 'rgba(79, 70, 229, 0.1)' : 'rgba(31, 41, 55, 0.5)',
                  borderRadius: '8px',
                  padding: '16px',
                  border: `1px solid ${badge.unlocked ? 'rgba(79, 70, 229, 0.3)' : '#374151'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: badge.unlocked ? 1 : 0.6,
                }}
              >
                <div style={{
                  backgroundColor: badge.unlocked ? 'rgba(79, 70, 229, 0.2)' : 'rgba(55, 65, 81, 0.5)',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: badge.unlocked ? '#818cf8' : '#6b7280',
                }}>
                  {badge.icon}
                </div>
                <div style={{ 
                  fontWeight: '600', 
                  color: badge.unlocked ? '#e5e7eb' : '#9ca3af',
                  textAlign: 'center',
                  fontSize: '14px'
                }}>
                  {badge.name}
                </div>
                {badge.unlocked && (
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#818cf8',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    Level {badge.level}
                  </div>
                )}
                {!badge.unlocked && (
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#6b7280'
                  }}>
                    Locked
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Achievements Progress */}
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#e5e7eb',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <StarIcon width={20} height={20} style={{ color: '#f59e0b' }} />
            Achievements Progress
          </h3>
          
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                style={{
                  backgroundColor: 'rgba(31, 41, 55, 0.5)',
                  borderRadius: '8px',
                  padding: '16px',
                  border: `1px solid ${achievement.unlocked ? 'rgba(79, 70, 229, 0.3)' : '#374151'}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      backgroundColor: achievement.unlocked ? 'rgba(79, 70, 229, 0.2)' : 'rgba(55, 65, 81, 0.5)',
                      borderRadius: '8px',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: achievement.unlocked ? '#818cf8' : '#6b7280',
                    }}>
                      {achievement.icon}
                    </div>
                    <div>
                      <div style={{ 
                        fontWeight: '600', 
                        color: '#e5e7eb',
                      }}>
                        {achievement.title}
                      </div>
                      <div style={{ 
                        fontSize: '13px', 
                        color: '#9ca3af'
                      }}>
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                  {achievement.unlocked && (
                    <div style={{
                      backgroundColor: 'rgba(79, 70, 229, 0.1)',
                      color: '#818cf8',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      height: 'fit-content',
                    }}>
                      Completed
                    </div>
                  )}
                </div>
                
                <div style={{ 
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#374151',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                      height: '100%',
                      backgroundColor: achievement.unlocked ? '#4f46e5' : '#6b7280',
                      borderRadius: '3px',
                    }}
                  />
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#9ca3af',
                  marginTop: '4px',
                  textAlign: 'right'
                }}>
                  {achievement.progress}/{achievement.total}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification; 