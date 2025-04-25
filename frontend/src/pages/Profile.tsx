import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  UserCircleIcon, 
  AcademicCapIcon, 
  TrophyIcon, 
  ClipboardDocumentCheckIcon,
  BellIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

// Mock user data (in a real app, this would come from an API or context)
const mockUserData = {
  name: "Aditya Sharma",
  email: "aditya.s@example.com",
  avatar: null, // null means we'll use a fallback icon
  location: "Jaipur, Rajasthan",
  completedQuizzes: 3,
  achievements: 5,
  scholarshipsApplied: 2,
  joinDate: "January 2023"
};

const Profile = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(mockUserData);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const tabs = [
    { id: 'profile', label: t('profile.tabs.profile', 'Profile'), icon: UserCircleIcon },
    { id: 'achievements', label: t('profile.tabs.achievements', 'Achievements'), icon: TrophyIcon },
    { id: 'scholarships', label: t('profile.tabs.scholarships', 'Scholarships'), icon: AcademicCapIcon },
    { id: 'quizzes', label: t('profile.tabs.quizzes', 'Quizzes'), icon: ClipboardDocumentCheckIcon },
    { id: 'notifications', label: t('profile.tabs.notifications', 'Notifications'), icon: BellIcon },
    { id: 'settings', label: t('profile.tabs.settings', 'Settings'), icon: Cog6ToothIcon },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div style={{ 
            backgroundColor: '#1f2937', 
            borderRadius: '12px', 
            padding: '24px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '24px',
              color: '#e5e7eb'
            }}>
              {t('profile.personalInfo', 'Personal Information')}
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  marginBottom: '4px',
                  color: '#9ca3af'
                }}>
                  {t('profile.name', 'Name')}
                </label>
                <div style={{ 
                  fontSize: '1rem', 
                  color: '#e5e7eb',
                  padding: '8px 0'
                }}>
                  {userData.name}
                </div>
                <div style={{ height: '1px', backgroundColor: '#374151', marginTop: '4px' }}></div>
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  marginBottom: '4px',
                  color: '#9ca3af'
                }}>
                  {t('profile.email', 'Email')}
                </label>
                <div style={{ 
                  fontSize: '1rem', 
                  color: '#e5e7eb',
                  padding: '8px 0'
                }}>
                  {userData.email}
                </div>
                <div style={{ height: '1px', backgroundColor: '#374151', marginTop: '4px' }}></div>
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  marginBottom: '4px',
                  color: '#9ca3af'
                }}>
                  {t('profile.location', 'Location')}
                </label>
                <div style={{ 
                  fontSize: '1rem', 
                  color: '#e5e7eb',
                  padding: '8px 0'
                }}>
                  {userData.location}
                </div>
                <div style={{ height: '1px', backgroundColor: '#374151', marginTop: '4px' }}></div>
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  marginBottom: '4px',
                  color: '#9ca3af'
                }}>
                  {t('profile.joinDate', 'Member Since')}
                </label>
                <div style={{ 
                  fontSize: '1rem', 
                  color: '#e5e7eb',
                  padding: '8px 0'
                }}>
                  {userData.joinDate}
                </div>
                <div style={{ height: '1px', backgroundColor: '#374151', marginTop: '4px' }}></div>
              </div>

              <button style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                marginTop: '16px',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#2563eb' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#3b82f6' }}
              >
                {t('profile.editProfile', 'Edit Profile')}
              </button>
            </div>
          </div>
        );
        
      case 'achievements':
        return (
          <div style={{ 
            backgroundColor: '#1f2937', 
            borderRadius: '12px', 
            padding: '24px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '24px',
              color: '#e5e7eb'
            }}>
              {t('profile.achievements', 'Your Achievements')}
            </h2>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
              padding: '32px',
              gap: '16px',
              color: '#9ca3af',
            }}>
              <TrophyIcon style={{ width: '48px', height: '48px', color: '#f59e0b' }} />
              <p>{t('profile.achievementsCount', 'You have earned {{count}} achievements', { count: userData.achievements })}</p>
              <button style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#d97706' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#f59e0b' }}
              >
                {t('profile.viewAchievements', 'View All Achievements')}
              </button>
            </div>
          </div>
        );
        
      case 'scholarships':
        return (
          <div style={{ 
            backgroundColor: '#1f2937', 
            borderRadius: '12px', 
            padding: '24px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '24px',
              color: '#e5e7eb'
            }}>
              {t('profile.scholarships', 'Applied Scholarships')}
            </h2>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
              padding: '32px',
              gap: '16px',
              color: '#9ca3af',
            }}>
              <AcademicCapIcon style={{ width: '48px', height: '48px', color: '#3b82f6' }} />
              <p>{t('profile.scholarshipsCount', 'You have applied to {{count}} scholarships', { count: userData.scholarshipsApplied })}</p>
              <button style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#2563eb' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#3b82f6' }}
              >
                {t('profile.findScholarships', 'Find More Scholarships')}
              </button>
            </div>
          </div>
        );
        
      case 'quizzes':
        return (
          <div style={{ 
            backgroundColor: '#1f2937', 
            borderRadius: '12px', 
            padding: '24px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '24px',
              color: '#e5e7eb'
            }}>
              {t('profile.quizzes', 'Completed Quizzes')}
            </h2>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
              padding: '32px',
              gap: '16px',
              color: '#9ca3af',
            }}>
              <ClipboardDocumentCheckIcon style={{ width: '48px', height: '48px', color: '#4f46e5' }} />
              <p>{t('profile.quizzesCount', 'You have completed {{count}} quizzes', { count: userData.completedQuizzes })}</p>
              <button style={{
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#4338ca' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#4f46e5' }}
              >
                {t('profile.takeQuiz', 'Take Another Quiz')}
              </button>
            </div>
          </div>
        );
        
      case 'notifications':
      case 'settings':
        return (
          <div style={{ 
            backgroundColor: '#1f2937', 
            borderRadius: '12px', 
            padding: '48px 24px',
            border: '1px solid #374151',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '16px',
              color: '#e5e7eb'
            }}>
              {activeTab === 'notifications' 
                ? t('profile.notificationsTitle', 'Notifications')
                : t('profile.settingsTitle', 'Settings')}
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '24px' }}>
              {activeTab === 'notifications'
                ? t('profile.notificationsMessage', 'You have no new notifications')
                : t('profile.settingsMessage', 'Settings will be available soon')}
            </p>
            {activeTab === 'settings' && (
              <button style={{
                backgroundColor: '#4b5563',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#374151' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#4b5563' }}
              >
                {t('profile.comingSoon', 'Coming Soon')}
              </button>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      paddingTop: '72px',
      minHeight: '100vh',
      backgroundColor: '#111827',
      color: 'white',
      padding: isMobile ? '72px 16px 32px' : '72px 32px 48px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Profile Header */}
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'center' : 'flex-start',
          gap: '24px',
          backgroundColor: '#1f2937',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          border: '1px solid #374151'
        }}>
          {/* Avatar */}
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '3rem',
            fontWeight: 'bold',
          }}>
            {userData.name.charAt(0)}
          </div>
          
          {/* User Info */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left',
          }}>
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '8px',
              color: '#e5e7eb'
            }}>
              {userData.name}
            </h1>
            <div style={{ 
              color: '#9ca3af', 
              marginBottom: '16px',
              fontSize: '0.875rem'
            }}>
              {userData.email}
            </div>
            
            {/* Stats */}
            <div style={{ 
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: isMobile ? 'center' : 'flex-start',
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                color: '#9ca3af',
                fontSize: '0.875rem'
              }}>
                <TrophyIcon style={{ width: '16px', height: '16px', color: '#f59e0b' }} />
                {userData.achievements} {t('profile.achievements', 'Achievements')}
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                color: '#9ca3af',
                fontSize: '0.875rem'
              }}>
                <ClipboardDocumentCheckIcon style={{ width: '16px', height: '16px', color: '#4f46e5' }} />
                {userData.completedQuizzes} {t('profile.quizzes', 'Quizzes')}
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                color: '#9ca3af',
                fontSize: '0.875rem'
              }}>
                <AcademicCapIcon style={{ width: '16px', height: '16px', color: '#3b82f6' }} />
                {userData.scholarshipsApplied} {t('profile.scholarships', 'Scholarships')}
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs and Content Section */}
        <div style={{ 
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '24px',
        }}>
          {/* Tabs */}
          <div style={{ 
            width: isMobile ? '100%' : '250px',
            backgroundColor: '#1f2937',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: isMobile ? '16px' : 0,
            border: '1px solid #374151'
          }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {tabs.map(tab => (
                <li key={tab.id} style={{ marginBottom: '8px' }}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      backgroundColor: activeTab === tab.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      color: activeTab === tab.id ? '#60a5fa' : '#d1d5db',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      width: '100%',
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      fontWeight: activeTab === tab.id ? '600' : '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => {
                      if (activeTab !== tab.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
                        e.currentTarget.style.color = '#e5e7eb';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (activeTab !== tab.id) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#d1d5db';
                      }
                    }}
                  >
                    <tab.icon style={{ width: '18px', height: '18px' }} />
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{ flex: 1 }}
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 