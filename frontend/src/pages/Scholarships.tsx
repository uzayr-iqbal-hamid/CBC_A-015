import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import PageLayout from '../components/PageLayout';
import AnimatedCard from '../components/AnimatedCard';
import IconBlock from '../components/IconBlock';

const Scholarships = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const scholarships = [
    {
      title: t('scholarships.items.merit.title', 'Merit Scholarship'),
      description: t('scholarships.items.merit.description', 'Based on academic excellence and achievements.'),
      amount: t('scholarships.items.merit.amount', 'Up to ₹50,000'),
      deadline: t('scholarships.items.merit.deadline', 'June 30, 2024'),
      requirements: [
        t('scholarships.items.merit.requirements.1', 'Minimum 85% in previous year'),
        t('scholarships.items.merit.requirements.2', 'No backlogs'),
        t('scholarships.items.merit.requirements.3', 'Good conduct certificate')
      ]
    },
    {
      title: t('scholarships.items.need.title', 'Need-Based Scholarship'),
      description: t('scholarships.items.need.description', 'For students with financial constraints.'),
      amount: t('scholarships.items.need.amount', 'Up to ₹75,000'),
      deadline: t('scholarships.items.need.deadline', 'July 15, 2024'),
      requirements: [
        t('scholarships.items.need.requirements.1', 'Income proof required'),
        t('scholarships.items.need.requirements.2', 'Minimum 75% in previous year'),
        t('scholarships.items.need.requirements.3', 'No backlogs')
      ]
    },
    {
      title: t('scholarships.items.sports.title', 'Sports Scholarship'),
      description: t('scholarships.items.sports.description', 'For outstanding athletes and sports performers.'),
      amount: t('scholarships.items.sports.amount', 'Up to ₹40,000'),
      deadline: t('scholarships.items.sports.deadline', 'August 1, 2024'),
      requirements: [
        t('scholarships.items.sports.requirements.1', 'State/National level achievements'),
        t('scholarships.items.sports.requirements.2', 'Minimum 70% in academics'),
        t('scholarships.items.sports.requirements.3', 'Sports certificate required')
      ]
    }
  ];

  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholarship.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout
      title={t('scholarships.title', 'Available Scholarships')}
      subtitle={t('scholarships.subtitle', 'Find and apply for scholarships that match your profile')}
      heroIcon={<AcademicCapIcon width={40} height={40} />}
      gradientColors={{ from: 'rgba(99, 102, 241, 0.15)', to: 'rgba(139, 92, 246, 0.1)' }}
    >
      <div style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder={t('scholarships.searchPlaceholder', 'Search scholarships...')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--background)',
            color: 'var(--text)',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {filteredScholarships.map((scholarship, index) => (
          <AnimatedCard key={index}>
            <div style={{ padding: '24px' }}>
              <IconBlock 
                icon={<AcademicCapIcon width={32} height={32} />}
                color="var(--primary)"
                backgroundColor="rgba(99, 102, 241, 0.15)"
              />
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                marginTop: '16px',
                marginBottom: '8px',
                color: 'var(--text)'
              }}>
                {scholarship.title}
              </h3>
              <p style={{ 
                fontSize: '16px', 
                color: 'var(--text-secondary)',
                marginBottom: '16px'
              }}>
                {scholarship.description}
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '16px',
                color: 'var(--text-secondary)'
              }}>
                <span>{scholarship.amount}</span>
                <span>{t('scholarships.deadline', 'Deadline')}: {scholarship.deadline}</span>
              </div>
              <div>
                <h4 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: 'var(--text)'
                }}>
                  {t('scholarships.requirements', 'Requirements')}:
                </h4>
                <ul style={{ 
                  listStyle: 'disc',
                  paddingLeft: '20px',
                  color: 'var(--text-secondary)'
                }}>
                  {scholarship.requirements.map((req, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{req}</li>
                  ))}
                </ul>
              </div>
              <button 
                className="btn-3d"
                style={{ marginTop: '16px', width: '100%' }}
              >
                {t('scholarships.applyButton', 'Apply Now')}
              </button>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </PageLayout>
  );
};

export default Scholarships; 