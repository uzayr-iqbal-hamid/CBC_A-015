import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LogOut, User, Edit, Mail, Save, X, Trophy, Star, Award, Target, Zap, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: user?.user_metadata?.full_name || 'Student',
    email: user?.email || '',
    bio: 'STEM enthusiast looking to explore new opportunities.',
    interests: ['Computer Science', 'Mathematics', 'Robotics'],
    achievements: [
      {
        id: 1,
        title: 'Quiz Master',
        description: 'Completed 10 career quizzes with high scores',
        icon: Target,
        progress: 100,
        date: '2024-03-15',
        color: 'var(--primary)'
      },
      {
        id: 2,
        title: 'Learning Streak',
        description: 'Maintained a 7-day learning streak',
        icon: Zap,
        progress: 100,
        date: '2024-03-10',
        color: '#FFB800'
      },
      {
        id: 3,
        title: 'Knowledge Seeker',
        description: 'Completed 5 learning modules',
        icon: BookOpen,
        progress: 60,
        date: '2024-03-05',
        color: '#00B8D9'
      },
      {
        id: 4,
        title: 'Career Explorer',
        description: 'Explored 15 different career paths',
        icon: Star,
        progress: 75,
        date: '2024-03-01',
        color: '#FF5630'
      }
    ]
  });
  const [editableProfile, setEditableProfile] = useState({ ...userProfile });

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const startEditing = () => {
    setEditableProfile({ ...userProfile });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveChanges = () => {
    setUserProfile({ ...editableProfile });
    setIsEditing(false);
    // Here you would typically call an API to update the user profile
    // For now, we're just updating the local state
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditableProfile({
      ...editableProfile,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div 
          style={{
            backgroundColor: 'var(--background-lighter)',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            overflow: 'hidden',
            border: '1px solid var(--border)'
          }}
        >
          {/* Profile Header */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '2rem',
              position: 'relative',
              backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
              color: 'white'
            }}
          >
            <div 
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '4px solid white'
              }}
            >
              <User size={60} color="var(--primary)" />
            </div>
            
            <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {userProfile.name}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Mail size={16} />
              <span>{userProfile.email}</span>
            </div>
            
            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <button
                onClick={handleSignOut}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <LogOut size={18} />
                <span>{t('profile.signOut', 'Sign Out')}</span>
              </button>
            </div>
          </div>
          
          {/* Profile Body */}
          <div style={{ padding: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {t('profile.about', 'About Me')}
              </h2>
              
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="btn-glossy btn-secondary btn-icon"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px'
                  }}
                >
                  <Edit size={16} />
                  Edit Profile
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="btn-glossy btn-secondary"
                    style={{
                      marginRight: '8px',
                      fontSize: '14px'
                    }}
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={saveChanges}
                    className="btn-glossy btn-primary"
                    style={{
                      fontSize: '14px'
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
            
            {!isEditing ? (
              <div style={{ marginBottom: '2rem' }}>
                <p style={{ lineHeight: '1.6', color: 'var(--text)' }}>
                  {userProfile.bio}
                </p>
              </div>
            ) : (
              <div style={{ marginBottom: '2rem' }}>
                <textarea
                  name="bio"
                  value={editableProfile.bio}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.375rem',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--text)',
                    minHeight: '100px',
                  }}
                />
              </div>
            )}
            
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: 'var(--text)'
            }}>
              {t('profile.interests', 'Interests')}
            </h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {userProfile.interests.map((interest, index) => (
                <span
                  key={index}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontSize: '0.875rem',
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
            
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                color: 'var(--text)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Trophy size={20} />
                {t('profile.achievements', 'Recent Achievements')}
              </h3>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                {userProfile.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    style={{
                      backgroundColor: 'var(--background)',
                      borderRadius: '0.75rem',
                      padding: '1.25rem',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '60px',
                      height: '60px',
                      background: achievement.color,
                      opacity: 0.1,
                      borderRadius: '0 0 0 60px',
                    }} />
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: achievement.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}>
                        <achievement.icon size={20} />
                      </div>
                      <div>
                        <h4 style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: 'var(--text)',
                          margin: 0,
                        }}>
                          {achievement.title}
                        </h4>
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-muted)',
                          margin: '0.25rem 0 0 0',
                        }}>
                          {achievement.date}
                        </p>
                      </div>
                    </div>
                    
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--text)',
                      margin: 0,
                      lineHeight: '1.5',
                    }}>
                      {achievement.description}
                    </p>
                    
                    <div style={{
                      width: '100%',
                      height: '4px',
                      backgroundColor: 'var(--border)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${achievement.progress}%`,
                        height: '100%',
                        backgroundColor: achievement.color,
                        borderRadius: '2px',
                        transition: 'width 0.3s ease',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{
                backgroundColor: 'var(--background)',
                borderRadius: '0.75rem',
                padding: '1.25rem',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <Award size={24} color="var(--text-muted)" />
                <div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--text)',
                    margin: 0,
                  }}>
                    {t('profile.keepGoing', 'Keep Going!')}
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    margin: '0.25rem 0 0 0',
                  }}>
                    {t('profile.achievementHint', 'Complete more activities to unlock new achievements')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile; 