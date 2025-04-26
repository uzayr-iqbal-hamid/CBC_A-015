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
import PageLayout from '../components/PageLayout';

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
          <div className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '24px',
              color: 'var(--text)'
            }}>
              {t('profile.personalInfo', 'Personal Information')}
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  marginBottom: '4px',
                  color: 'var(--text-secondary)'
                }}>
                  {t('profile.name', 'Name')}
                </label>
                <div style={{ 
                  fontSize: '1rem', 
                  color: 'var(--text)',
                  padding: '8px 0'
                }}>
                  {userData.name}
                </div>
                <div style={{ height: '1px', backgroundColor: 'var(--border)', marginTop: '4px' }}></div>
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  marginBottom: '4px',
                  color: 'var(--text-secondary)'
                }}>
                  {t('profile.email', 'Email')}
                </label>
                <div style={{ 
                  fontSize: '1rem', 
                  color: 'var(--text)',
                  padding: '8px 0'
                }}>
                  {userData.email}
                </div>
                <div style={{ height: '1px', backgroundColor: 'var(--border)', marginTop: '4px' }}></div>
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  marginBottom: '4px',
                  color: 'var(--text-secondary)'
                }}>
                  {t('profile.location', 'Location')}
                </label>
                <div style={{ 
                  fontSize: '1rem', 
                  color: 'var(--text)',
                  padding: '8px 0'
                }}>
                  {userData.location}
                </div>
                <div style={{ height: '1px', backgroundColor: 'var(--border)', marginTop: '4px' }}></div>
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  marginBottom: '4px',
                  color: 'var(--text-secondary)'
                }}>
                  {t('profile.joinDate', 'Member Since')}
                </label>
                <div style={{ 
                  fontSize: '1rem', 
                  color: 'var(--text)',
                  padding: '8px 0'
                }}>
                  {userData.joinDate}
                </div>
                <div style={{ height: '1px', backgroundColor: 'var(--border)', marginTop: '4px' }}></div>
              </div>

              <button 
                className="btn-3d"
                style={{ marginTop: '16px' }}
              >
                {t('profile.editProfile', 'Edit Profile')}
              </button>
            </div>
          </div>
        );
        
      case 'achievements':
        return (
          <div className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '24px',
              color: 'var(--text)'
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
              color: 'var(--text-secondary)',
            }}>
              <TrophyIcon style={{ width: '48px', height: '48px', color: 'var(--accent)' }} />
              <p>{t('profile.achievementsCount', 'You have earned {{count}} achievements', { count: userData.achievements })}</p>
              <button className="btn-3d" style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent-dark)' }}>
                {t('profile.viewAchievements', 'View All Achievements')}
              </button>
            </div>
          </div>
        );
        
      case 'scholarships':
        return (
          <div className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '24px',
              color: 'var(--text)'
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
              color: 'var(--text-secondary)',
            }}>
              <AcademicCapIcon style={{ width: '48px', height: '48px', color: 'var(--primary)' }} />
              <p>{t('profile.scholarshipsCount', 'You have applied to {{count}} scholarships', { count: userData.scholarshipsApplied })}</p>
              <button className="btn-3d">
                {t('profile.findScholarships', 'Find More Scholarships')}
              </button>
            </div>
          </div>
        );
        
      case 'quizzes':
        return (
          <div className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '24px',
              color: 'var(--text)'
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
              color: 'var(--text-secondary)',
            }}>
              <ClipboardDocumentCheckIcon style={{ width: '48px', height: '48px', color: 'var(--primary)' }} />
              <p>{t('profile.quizzesCount', 'You have completed {{count}} quizzes', { count: userData.completedQuizzes })}</p>
              <button className="btn-3d" style={{ backgroundColor: 'var(--primary-dark)', borderColor: 'var(--primary-darker)' }}>
                {t('profile.takeQuiz', 'Take Another Quiz')}
              </button>
            </div>
          </div>
        );
        
      case 'notifications':
      case 'settings':
        return (
          <div className="glass-card" style={{ 
            padding: '48px 24px',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '16px',
              color: 'var(--text)'
            }}>
              {activeTab === 'notifications' 
                ? t('profile.notificationsTitle', 'Notifications')
                : t('profile.settingsTitle', 'Settings')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {activeTab === 'notifications'
                ? t('profile.notificationsMessage', 'You have no new notifications')
                : t('profile.settingsMessage', 'Settings will be available soon')}
            </p>
            {activeTab === 'settings' && (
              <button className="btn-3d" style={{ backgroundColor: 'var(--background-lighter)', borderColor: 'var(--border)' }}>
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
    <PageLayout
      title={t('profile.title', 'Profile')}
      subtitle={t('profile.subtitle', 'Manage your account, view achievements and track your progress')}
      heroIcon={<UserCircleIcon width={40} height={40} />}
      gradientColors={{ from: 'rgba(59, 130, 246, 0.15)', to: 'rgba(139, 92, 246, 0.1)' }}
    >
      {/* Profile Header */}
      <div className="glass-card" style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'flex-start',
        gap: '24px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        {/* Avatar */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
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
            color: 'var(--text)'
          }}>
            {userData.name}
          </h1>
          <div style={{ 
            color: 'var(--text-secondary)', 
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
              color: 'var(--text-secondary)',
              fontSize: '0.875rem'
            }}>
              <TrophyIcon style={{ width: '16px', height: '16px', color: 'var(--accent)' }} />
              {userData.achievements} {t('profile.achievements', 'Achievements')}
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem'
            }}>
              <ClipboardDocumentCheckIcon style={{ width: '16px', height: '16px', color: 'var(--primary-dark)' }} />
              {userData.completedQuizzes} {t('profile.quizzes', 'Quizzes')}
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem'
            }}>
              <AcademicCapIcon style={{ width: '16px', height: '16px', color: 'var(--primary)' }} />
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
        <div className="glass-card" style={{ 
          width: isMobile ? '100%' : '250px',
          padding: '16px',
          marginBottom: isMobile ? '16px' : 0
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
                    backgroundColor: activeTab === tab.id ? 'var(--primary-transparent)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
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
                      e.currentTarget.style.backgroundColor = 'var(--hover)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <tab.icon style={{ width: '20px', height: '20px' }} />
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1 }}>
          {renderTabContent()}
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile; 