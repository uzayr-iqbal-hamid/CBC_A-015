import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ArrowRightIcon, ArrowLeftIcon, AcademicCapIcon, BriefcaseIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import PageLayout from '../components/PageLayout';
import AnimatedCard from '../components/AnimatedCard';
import IconBlock from '../components/IconBlock';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

interface CareerRecommendation {
  title: string;
  description: string;
  skills: string[];
  courses: string[];
  icon: React.ReactNode;
}

const CareerQuiz = () => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [quizStarted, setQuizStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Define quiz questions
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which of these activities do you enjoy the most?",
      options: [
        "Solving mathematical problems",
        "Creating art or designs",
        "Helping and teaching others",
        "Building or fixing things"
      ]
    },
    {
      id: 2,
      question: "How do you prefer to work?",
      options: [
        "Independently on complex problems",
        "In a creative team environment",
        "Directly with people in a helping role",
        "Hands-on with practical projects"
      ]
    },
    {
      id: 3,
      question: "Which subject interests you the most?",
      options: [
        "Mathematics and Computer Science",
        "Arts and Design",
        "Social Sciences and Languages",
        "Physical Sciences and Engineering"
      ]
    },
    {
      id: 4,
      question: "What type of problems do you enjoy solving?",
      options: [
        "Technical and analytical problems",
        "Design and visual challenges",
        "People and social issues",
        "Practical, hands-on problems"
      ]
    },
    {
      id: 5,
      question: "In a group project, which role do you naturally take?",
      options: [
        "The planner who organizes everything",
        "The creative one with innovative ideas",
        "The communicator who brings people together",
        "The implementer who gets things done"
      ]
    },
    {
      id: 6,
      question: "What achievement would make you most proud?",
      options: [
        "Developing a new technology or system",
        "Creating something beautiful or meaningful",
        "Making a positive impact on people's lives",
        "Building or improving something tangible"
      ]
    },
    {
      id: 7,
      question: "Which work environment appeals to you most?",
      options: [
        "A tech company with cutting-edge technology",
        "A creative studio or design agency",
        "A school, hospital, or social service organization",
        "A lab, workshop, or outdoor setting"
      ]
    }
  ];

  // Career paths based on quiz results
  const careerPaths = [
    {
      type: "Tech & IT",
      title: "Technology & IT",
      description: "You have a strong analytical mind and enjoy solving complex technical problems. A career in technology would be fulfilling for you.",
      skills: ["Programming", "Data Analysis", "Problem-solving", "Logical thinking"],
      courses: ["Computer Science", "Data Science", "Software Engineering", "AI & Machine Learning"],
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    },
    {
      type: "Creative",
      title: "Creative & Design",
      description: "You have a natural creative talent and enjoy expressing yourself through design and visual communication.",
      skills: ["Creativity", "Visual Communication", "Design Thinking", "Aesthetic Sense"],
      courses: ["Graphic Design", "UX/UI Design", "Animation", "Digital Media"],
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    },
    {
      type: "Social",
      title: "Social & Educational",
      description: "You are a natural communicator who enjoys helping others. Consider careers where you can make a positive impact on people's lives.",
      skills: ["Communication", "Empathy", "Teaching", "People Management"],
      courses: ["Education", "Psychology", "Social Work", "Public Health"],
      icon: <AcademicCapIcon width={24} height={24} />
    },
    {
      type: "Practical",
      title: "Engineering & Applied Sciences",
      description: "You enjoy hands-on work and solving practical problems. Engineering and applied sciences would be great fields for you.",
      skills: ["Technical Skills", "Spatial Reasoning", "Practical Problem-solving", "Attention to Detail"],
      courses: ["Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Robotics"],
      icon: <BriefcaseIcon width={24} height={24} />
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setProgress((currentQuestion / questions.length) * 100);
    }
  }, [currentQuestion, questions.length]);

  const handleOptionSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      generateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1 && answers[currentQuestion] !== undefined) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuestion === questions.length - 1 && answers[currentQuestion] !== undefined) {
      generateResults();
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setAnswers(Array(questions.length).fill(undefined));
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const restartQuiz = () => {
    setQuizStarted(true);
    setAnswers(Array(questions.length).fill(undefined));
    setCurrentQuestion(0);
    setShowResults(false);
    setRecommendations([]);
  };

  const generateResults = () => {
    // Simple algorithm to process answers and suggest careers
    const counts = [0, 0, 0, 0]; // Four career types (Tech, Creative, Social, Practical)
    
    answers.forEach(answer => {
      if (answer !== undefined) {
        counts[answer]++;
      }
    });
    
    // Find primary and secondary career paths based on answer counts
    let primary = counts.indexOf(Math.max(...counts));
    counts[primary] = -1; // Remove the primary from consideration for secondary
    let secondary = counts.indexOf(Math.max(...counts));
    
    // Generate recommendations
    const recommendations = [
      careerPaths[primary],
      careerPaths[secondary]
    ];
    
    setRecommendations(recommendations);
    setShowResults(true);
  };

  const renderContent = () => {
    if (!quizStarted) {
      return (
        <AnimatedCard>
          <div style={{ padding: '32px', textAlign: 'center' }}>
            <IconBlock 
              icon={<DocumentTextIcon width={32} height={32} />}
              color="var(--primary)"
              backgroundColor="rgba(99, 102, 241, 0.15)"
            />
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: 'var(--text)' }}>
              {t('careerQuiz.title', 'Discover Your Ideal Career Path')}
            </h2>
            <p style={{ 
              fontSize: '16px', 
              color: 'var(--text-secondary)', 
              marginBottom: '32px',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto 32px'
            }}>
              {t('careerQuiz.description', 'Answer a few questions about your interests, skills, and preferences to get personalized career recommendations. This quiz takes about 5 minutes to complete.')}
            </p>
            <button 
              onClick={startQuiz}
              className="btn-3d"
            >
              {t('careerQuiz.startButton', 'Start Quiz')}
            </button>
          </div>
        </AnimatedCard>
      );
    }

    if (showResults) {
      return (
        <div>
          <div style={{ 
            marginBottom: '24px', 
            textAlign: 'center' 
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              marginBottom: '16px',
              color: 'var(--text)' 
            }}>
              {t('careerQuiz.resultsTitle', 'Your Career Recommendations')}
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              {t('careerQuiz.resultsDescription', 'Based on your answers, here are career paths that might be a good fit for you:')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '24px',
            marginBottom: '32px'
          }}>
            {recommendations.map((career, index) => (
              <AnimatedCard key={index} delay={index * 0.1}>
                <div style={{ padding: '24px' }}>
                  <IconBlock icon={career.icon} />
                  
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    marginBottom: '16px',
                    color: 'var(--text)' 
                  }}>
                    {career.title}
                  </h3>
                  
                  <p style={{ 
                    fontSize: '16px', 
                    color: 'var(--text-secondary)', 
                    marginBottom: '24px',
                    lineHeight: '1.6'
                  }}>
                    {career.description}
                  </p>
                  
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      marginBottom: '8px',
                      color: 'var(--text)' 
                    }}>
                      {t('careerQuiz.keySkills', 'Key Skills:')}
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {career.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="badge"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 style={{ 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      marginBottom: '8px',
                      color: 'var(--text)' 
                    }}>
                      {t('careerQuiz.recommendedCourses', 'Recommended Courses:')}
                    </h4>
                    <ul style={{ 
                      paddingLeft: '20px', 
                      color: 'var(--text-secondary)',
                      marginBottom: '0'
                    }}>
                      {career.courses.map((course, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>{course}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={restartQuiz}
              className="btn-3d"
            >
              {t('careerQuiz.retakeButton', 'Retake Quiz')}
            </button>
          </div>
        </div>
      );
    }

    return (
      <AnimatedCard>
        <div style={{ padding: '32px' }}>
          {/* Progress Bar */}
          <div style={{ 
            marginBottom: '32px',
            borderRadius: '8px',
            height: '8px',
            width: '100%',
            backgroundColor: 'var(--background-lighter)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              height: '100%', 
              width: `${progress}%`, 
              backgroundColor: 'var(--primary)',
              borderRadius: '8px',
              transition: 'width 0.3s ease'
            }} />
          </div>
          
          {/* Question */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              marginBottom: '8px',
              color: 'var(--text)' 
            }}>
              {t('careerQuiz.questionNumber', 'Question {currentQuestion + 1} of {questions.length}')}
            </h2>
            <p style={{ 
              fontSize: '18px', 
              fontWeight: '500',
              color: 'var(--text)'
            }}>
              {questions[currentQuestion].question}
            </p>
          </div>
          
          {/* Options */}
          <div style={{ marginBottom: '32px' }}>
            {questions[currentQuestion].options.map((option, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: answers[currentQuestion] === index ? 'rgba(99, 102, 241, 0.15)' : 'var(--background-lighter)',
                  border: `1px solid ${answers[currentQuestion] === index ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onClick={() => handleOptionSelect(index)}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: `2px solid ${answers[currentQuestion] === index ? 'var(--primary)' : 'var(--border)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}>
                  {answers[currentQuestion] === index && (
                    <CheckCircleIcon style={{ color: 'var(--primary)' }} width={16} height={16} />
                  )}
                </div>
                <span style={{ color: 'var(--text)' }}>{option}</span>
              </div>
            ))}
          </div>
          
          {/* Navigation */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between'
          }}>
            <button
              onClick={handlePrevious}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--background-lighter)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: currentQuestion > 0 ? 'pointer' : 'not-allowed',
                opacity: currentQuestion > 0 ? 1 : 0.5,
              }}
              disabled={currentQuestion === 0}
            >
              <ArrowLeftIcon width={16} height={16} />
              {t('careerQuiz.previousButton', 'Previous')}
            </button>
            
            <button
              onClick={handleNext}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: answers[currentQuestion] !== undefined ? 'var(--primary)' : 'var(--background-lighter)',
                color: answers[currentQuestion] !== undefined ? 'white' : 'var(--text-muted)',
                border: '1px solid',
                borderColor: answers[currentQuestion] !== undefined ? 'var(--primary)' : 'var(--border)',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: answers[currentQuestion] !== undefined ? 'pointer' : 'not-allowed',
              }}
              disabled={answers[currentQuestion] === undefined}
            >
              {currentQuestion === questions.length - 1 ? t('careerQuiz.seeResultsButton', 'See Results') : t('careerQuiz.nextButton', 'Next')}
              {currentQuestion < questions.length - 1 && <ArrowRightIcon width={16} height={16} />}
            </button>
          </div>
        </div>
      </AnimatedCard>
    );
  };

  return (
    <PageLayout
      title={t('careerQuiz.pageTitle', 'Career Discovery Quiz')}
      subtitle={t('careerQuiz.pageSubtitle', 'Find career paths that match your interests, skills, and preferences')}
      heroIcon={<DocumentTextIcon width={40} height={40} />}
      gradientColors={{ from: 'rgba(99, 102, 241, 0.15)', to: 'rgba(139, 92, 246, 0.1)' }}
    >
      {renderContent()}
    </PageLayout>
  );
};

export default CareerQuiz; 