import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface Scholarship {
  id: string;
  title: string;
  description: string;
  eligibility: string;
  deadline: string;
  amount: string;
  link: string;
}

const Scholarships = () => {
  const { t } = useTranslation();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockScholarships: Scholarship[] = [
      {
        id: '1',
        title: 'National Scholarship Portal',
        description: 'Central government scholarship for all categories of students',
        eligibility: 'Class 9-12, Graduation, Post Graduation',
        deadline: '2024-03-31',
        amount: 'Up to ₹20,000 per year',
        link: 'https://scholarships.gov.in'
      },
      {
        id: '2',
        title: 'Buddy4Study Scholarship',
        description: 'Merit-based scholarship for undergraduate students',
        eligibility: 'Class 12 passed, pursuing graduation',
        deadline: '2024-04-15',
        amount: '₹25,000 per year',
        link: 'https://www.buddy4study.com'
      }
    ];

    setTimeout(() => {
      setScholarships(mockScholarships);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
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
                Scholarships
              </h1>
              <p style={{ 
                fontSize: '18px',
                color: '#d1d5db',
                marginBottom: '24px',
              }}>
                Find and apply for scholarships that match your academic profile and aspirations
              </p>
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
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: '#1f2937',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ 
              fontSize: '20px',
              fontWeight: '600',
              color: '#e5e7eb'
            }}>
              Available Scholarships
            </h2>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                backgroundColor: '#374151',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #4b5563',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Scholarships</option>
              <option value="central">Central Government</option>
              <option value="state">State Government</option>
              <option value="private">Private</option>
            </select>
          </div>
        </section>

        {/* Scholarships List */}
        <section style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          {loading ? (
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '300px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                border: '4px solid #1f2937',
                borderTopColor: '#3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px'
            }}>
              {scholarships.map((scholarship, index) => (
                <motion.div
                  key={scholarship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    backgroundColor: '#1f2937',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid #374151',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#e5e7eb'
                  }}>
                    {scholarship.title}
                  </h3>
                  <p style={{
                    color: '#9ca3af',
                    marginBottom: '16px'
                  }}>
                    {scholarship.description}
                  </p>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ 
                      display: 'flex',
                      marginBottom: '4px'
                    }}>
                      <span style={{ color: '#6b7280', marginRight: '8px', width: '80px' }}>Eligibility:</span>
                      <span style={{ color: '#e5e7eb' }}>{scholarship.eligibility}</span>
                    </div>
                    <div style={{ 
                      display: 'flex',
                      marginBottom: '4px'
                    }}>
                      <span style={{ color: '#6b7280', marginRight: '8px', width: '80px' }}>Deadline:</span>
                      <span style={{ color: '#e5e7eb' }}>{scholarship.deadline}</span>
                    </div>
                    <div style={{ 
                      display: 'flex',
                      marginBottom: '4px'
                    }}>
                      <span style={{ color: '#6b7280', marginRight: '8px', width: '80px' }}>Amount:</span>
                      <span style={{ color: '#e5e7eb' }}>{scholarship.amount}</span>
                    </div>
                  </div>

                  <a
                    href={scholarship.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      width: '100%',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      textAlign: 'center',
                      padding: '10px 0',
                      borderRadius: '8px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                  >
                    Apply Now
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Scholarships; 