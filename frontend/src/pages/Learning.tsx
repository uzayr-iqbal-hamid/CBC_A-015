import { useState, useEffect } from 'react';
import { AcademicCapIcon, BookOpenIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'course';
  link: string;
  platform: string;
}

const Learning = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Introduction to Computer Science',
      description: 'Learn the fundamentals of computer science and programming',
      type: 'course',
      link: 'https://www.khanacademy.org/computing/computer-science',
      platform: 'Khan Academy'
    },
    {
      id: '2',
      title: 'Mathematics for Engineers',
      description: 'Essential mathematics concepts for engineering students',
      type: 'video',
      link: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
      platform: 'YouTube'
    },
    {
      id: '3',
      title: 'Career Guidance Articles',
      description: 'Collection of articles about different career paths',
      type: 'article',
      link: 'https://www.careers360.com/articles',
      platform: 'Careers360'
    },
    {
      id: '4',
      title: 'Machine Learning Foundations',
      description: 'Build a solid foundation in machine learning concepts',
      type: 'course',
      link: 'https://www.coursera.org/specializations/machine-learning',
      platform: 'Coursera'
    },
    {
      id: '5',
      title: 'Programming Interview Preparation',
      description: 'Prepare for technical interviews with these exercises',
      type: 'article',
      link: 'https://leetcode.com/explore/',
      platform: 'LeetCode'
    },
    {
      id: '6',
      title: 'Web Development Bootcamp',
      description: 'Complete guide to modern web development',
      type: 'video',
      link: 'https://www.udemy.com/course/the-web-developer-bootcamp/',
      platform: 'Udemy'
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredResources = resources
    .filter(resource => selectedType === 'all' || resource.type === selectedType)
    .filter(resource => 
      searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.platform.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <VideoCameraIcon style={{ width: '24px', height: '24px', color: '#3b82f6' }} />;
      case 'article':
        return <BookOpenIcon style={{ width: '24px', height: '24px', color: '#3b82f6' }} />;
      case 'course':
        return <AcademicCapIcon style={{ width: '24px', height: '24px', color: '#3b82f6' }} />;
      default:
        return null;
    }
  };

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
            <h1 style={{ 
              fontSize: '36px',
              fontWeight: 'bold',
              marginBottom: '16px',
              backgroundImage: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}>
              Learning Resources
            </h1>
            <p style={{ 
              fontSize: '18px',
              color: '#d1d5db',
              marginBottom: '24px',
            }}>
              Discover curated resources to help you learn, grow, and excel in your career journey
            </p>

            <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 44px',
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                }}
              />
              <svg 
                style={{ 
                  position: 'absolute', 
                  left: '16px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  width: '20px', 
                  height: '20px',
                  color: '#6b7280'
                }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section style={{ 
        maxWidth: '1200px',
        margin: '0 auto 32px',
        padding: '0 16px'
      }}>
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '16px',
          backgroundColor: '#1f2937',
          borderRadius: '12px',
          border: '1px solid #374151'
        }}>
          {[
            { value: 'all', label: 'All Resources' },
            { value: 'video', label: 'Videos', icon: <VideoCameraIcon style={{ width: '16px', height: '16px' }} /> },
            { value: 'article', label: 'Articles', icon: <BookOpenIcon style={{ width: '16px', height: '16px' }} /> },
            { value: 'course', label: 'Courses', icon: <AcademicCapIcon style={{ width: '16px', height: '16px' }} /> }
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedType(filter.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: '500',
                backgroundColor: selectedType === filter.value ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: selectedType === filter.value ? '#3b82f6' : '#d1d5db',
                border: selectedType === filter.value ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Resources Grid */}
      <section style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        {isLoading ? (
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px'
          }}>
            <div style={{ 
              width: '40px',
              height: '40px',
              border: '3px solid rgba(59, 130, 246, 0.1)',
              borderTop: '3px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          </div>
        ) : filteredResources.length > 0 ? (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                style={{
                  backgroundColor: '#1f2937',
                  borderRadius: '12px',
                  padding: '24px',
                  border: '1px solid #374151',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#374151';
                }}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '16px'
                }}>
                  <div style={{ 
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                    marginRight: '16px'
                  }}>
                    {getIcon(resource.type)}
                  </div>
                  <div>
                    <h2 style={{ 
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}>
                      {resource.title}
                    </h2>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '14px',
                      color: '#9ca3af'
                    }}>
                      {resource.platform}
                      <span style={{ 
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: '#9ca3af',
                        margin: '0 8px'
                      }}></span>
                      <span style={{ textTransform: 'capitalize' }}>{resource.type}</span>
                    </div>
                  </div>
                </div>
                
                <p style={{ 
                  marginBottom: '16px',
                  fontSize: '15px',
                  color: '#d1d5db',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {resource.description}
                </p>

                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#3b82f6',
                    fontSize: '14px',
                    fontWeight: '500',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#60a5fa';
                    e.currentTarget.querySelector('svg')!.style.transform = 'translate(2px, -2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#3b82f6';
                    e.currentTarget.querySelector('svg')!.style.transform = 'translate(0, 0)';
                  }}
                >
                  Access Resource
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    style={{ transition: 'transform 0.2s' }}
                  >
                    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center',
            padding: '64px 0'
          }}>
            <BookOpenIcon style={{ 
              width: '48px',
              height: '48px',
              color: '#6b7280',
              margin: '0 auto 16px'
            }} />
            <h3 style={{ 
              fontSize: '24px',
              fontWeight: '600',
              color: '#d1d5db',
              marginBottom: '8px'
            }}>
              No resources found
            </h3>
            <p style={{ color: '#9ca3af' }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </section>

      {/* STEM Assist Integration */}
      <section style={{ 
        maxWidth: '1200px',
        margin: '64px auto 0',
        padding: '0 16px'
      }}>
        <div style={{ 
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '32px',
          backgroundColor: '#1f2937',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid #374151',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ 
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(124, 58, 237, 0.05))',
            zIndex: 0
          }} />

          <div style={{ 
            zIndex: 1,
            textAlign: isMobile ? 'center' : 'left',
            flex: 1,
          }}>
            <h2 style={{ 
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '16px',
              backgroundImage: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}>
              STEM Learning Assistant
            </h2>
            <p style={{ 
              marginBottom: '24px',
              color: '#d1d5db',
              lineHeight: 1.6,
            }}>
              Get personalized help with STEM subjects through our interactive learning assistant.
              Ask questions, solve problems, and improve your understanding with AI-powered guidance.
            </p>
            <div style={{ 
              display: 'inline-block',
              padding: '8px 12px',
              backgroundColor: 'rgba(31, 41, 55, 0.7)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: '8px',
              border: '1px solid #374151',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}>
              <span style={{ 
                fontSize: '14px',
                color: '#3b82f6',
                fontWeight: '500',
              }}>
                AI-powered • Interactive • Real-time
              </span>
            </div>
          </div>

          <div style={{ 
            width: '100%',
            height: '400px',
            zIndex: 1,
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: 'rgba(31, 41, 55, 0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid #374151',
            flex: 1,
          }}>
            <iframe
              src="https://audio-stem-journey-nine.vercel.app"
              style={{ 
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '8px'
              }}
              title="STEM Learning Assistant"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Learning; 