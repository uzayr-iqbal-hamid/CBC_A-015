import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LogOut, User, Edit, Mail, Save, X } from 'lucide-react';
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
    interests: ['Computer Science', 'Mathematics', 'Robotics']
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
                  onClick={startEditing}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    cursor: 'pointer',
                  }}
                >
                  <Edit size={16} />
                  <span>{t('profile.edit', 'Edit Profile')}</span>
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={cancelEditing}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      cursor: 'pointer',
                    }}
                  >
                    <X size={16} />
                    <span>{t('profile.cancel', 'Cancel')}</span>
                  </button>
                  
                  <button
                    onClick={saveChanges}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      backgroundColor: 'var(--primary)',
                      border: '1px solid var(--primary)',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    <Save size={16} />
                    <span>{t('profile.save', 'Save')}</span>
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
                color: 'var(--text)'
              }}>
                {t('profile.achievements', 'Recent Achievements')}
              </h3>
              
              <div style={{ 
                backgroundColor: 'var(--background)',
                borderRadius: '0.5rem',
                padding: '1rem',
                border: '1px solid var(--border)',
              }}>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
                  {t('profile.noAchievements', 'Complete quizzes and challenges to earn achievements')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile; 