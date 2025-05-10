import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { AcademicCapIcon, CalendarIcon, CurrencyDollarIcon, UserGroupIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import PageLayout from '../components/PageLayout';
import AnimatedCard from '../components/AnimatedCard';
import IconBlock from '../components/IconBlock';

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
      },
      {
        id: '3',
        title: 'KVPY Fellowship',
        description: 'Kishore Vaigyanik Protsahan Yojana for science students',
        eligibility: 'Class 11-12, B.Sc./B.S./B.Stat./B.Math./Int. M.Sc./M.S.',
        deadline: '2024-05-10',
        amount: '₹5,000-7,000 per month + Annual Contingency Grant',
        link: 'https://kvpy.iisc.ac.in/'
      },
      {
        id: '4',
        title: 'Prime Minister Scholarship Scheme',
        description: 'For wards of ex-servicemen/ex-Coast Guards',
        eligibility: 'Professional degree courses like MBBS, Engineering, etc.',
        deadline: '2024-03-15',
        amount: '₹2,500 per month for boys and ₹3,000 per month for girls',
        link: 'https://ksb.gov.in/pm-scholarship.htm'
      }
    ];

    setTimeout(() => {
      setScholarships(mockScholarships);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <PageLayout
      title="Scholarships"
      subtitle="Find and apply for scholarships that match your academic profile and aspirations"
      heroIcon={<AcademicCapIcon width={40} height={40} />}
      gradientColors={{ from: 'rgba(139, 92, 246, 0.15)', to: 'rgba(59, 130, 246, 0.1)' }}
    >
      {/* Filter Section */}
      <AnimatedCard delay={0.1}>
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px'
        }}>
          <h2 style={{ 
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--text)'
          }}>
            Available Scholarships
          </h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              backgroundColor: 'var(--background-lighter)',
              color: 'var(--text)',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
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
      </AnimatedCard>

      {/* Scholarships List */}
      <div style={{ marginTop: '24px' }}>
        {loading ? (
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '80px 0'
          }}>
            <div className="loader"></div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            marginTop: '24px'
          }}>
            {scholarships.map((scholarship, index) => (
              <AnimatedCard key={scholarship.id} delay={0.1 + index * 0.1}>
                <div style={{ 
                  padding: '24px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: 'var(--text)'
                  }}>
                    {scholarship.title}
                  </h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    marginBottom: '20px',
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}>
                    {scholarship.description}
                  </p>
                  
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ 
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      columnGap: '12px',
                      rowGap: '10px',
                      alignItems: 'start'
                    }}>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <UserGroupIcon width={16} height={16} style={{ color: 'var(--primary)' }} />
                        <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Eligibility:</span>
                      </div>
                      <span style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '500' }}>{scholarship.eligibility}</span>
                      
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <CalendarIcon width={16} height={16} style={{ color: 'var(--primary)' }} />
                        <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Deadline:</span>
                      </div>
                      <span style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '500' }}>{scholarship.deadline}</span>
                      
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <CurrencyDollarIcon width={16} height={16} style={{ color: 'var(--primary)' }} />
                        <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Amount:</span>
                      </div>
                      <span style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '500' }}>{scholarship.amount}</span>
                    </div>
                  </div>

                  <div style={{ 
                    marginTop: 'auto',
                    paddingTop: '16px',
                    width: '100%'
                  }}>
                    <button
                      onClick={() => window.open(scholarship.link, '_blank')}
                      className="btn-3d"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        fontSize: '14px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Apply Now
                      <ArrowTopRightOnSquareIcon width={16} height={16} />
                    </button>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Scholarships; 