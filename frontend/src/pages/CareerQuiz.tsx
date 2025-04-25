import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ArrowRightIcon, ArrowLeftIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ 
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '16px',
                backgroundImage: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Career Discovery Quiz
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ 
                fontSize: '18px',
                color: '#d1d5db',
                marginBottom: '24px',
              }}
            >
              Discover career paths that match your interests and strengths through our interactive quiz
            </motion.p>
          </div>
        </div>
      </section>

      {/* Quiz Container */}
      <section style={{ 
        maxWidth: '800px',
        margin: '0 auto 48px',
        padding: '0 16px',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            backgroundColor: '#1f2937',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid #374151',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {!quizStarted ? (
            // Quiz introduction
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                marginBottom: '16px',
                color: '#e5e7eb' 
              }}>
                Find Your Ideal Career Path
              </h2>
              <p style={{ 
                color: '#9ca3af', 
                marginBottom: '24px',
                fontSize: '16px',
                lineHeight: '1.6'
              }}>
                Answer a few questions about your interests and preferences to get personalized career recommendations and learning resources.
              </p>
              <button
                onClick={startQuiz}
                style={{
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '500',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#4338ca' }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#4f46e5' }}
              >
                Start Quiz
                <ArrowRightIcon width={18} height={18} />
              </button>
            </div>
          ) : showResults ? (
            // Results view
            <div>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                marginBottom: '24px',
                color: '#e5e7eb',
                textAlign: 'center'
              }}>
                Your Career Recommendations
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                gap: '24px',
                marginBottom: '32px'
              }}>
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.2 }}
                    style={{
                      backgroundColor: 'rgba(31, 41, 55, 0.8)',
                      borderRadius: '12px',
                      padding: '24px',
                      border: '1px solid #374151',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{
                        backgroundColor: 'rgba(79, 70, 229, 0.1)',
                        padding: '10px',
                        borderRadius: '8px',
                        marginRight: '12px',
                        color: '#818cf8'
                      }}>
                        {rec.icon}
                      </div>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#e5e7eb' }}>
                        {rec.title}
                      </h3>
                    </div>
                    
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#9ca3af', 
                      marginBottom: '16px',
                      lineHeight: '1.6'
                    }}>
                      {rec.description}
                    </p>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ 
                        fontSize: '15px', 
                        fontWeight: '600', 
                        color: '#d1d5db',
                        marginBottom: '8px'
                      }}>
                        Key Skills:
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {rec.skills.map((skill, i) => (
                          <span 
                            key={i}
                            style={{
                              fontSize: '12px',
                              padding: '4px 8px',
                              backgroundColor: 'rgba(79, 70, 229, 0.1)',
                              borderRadius: '4px',
                              color: '#a5b4fc',
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 style={{ 
                        fontSize: '15px', 
                        fontWeight: '600', 
                        color: '#d1d5db',
                        marginBottom: '8px'
                      }}>
                        Recommended Courses:
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {rec.courses.map((course, i) => (
                          <li 
                            key={i}
                            style={{
                              fontSize: '14px',
                              color: '#9ca3af',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              marginBottom: '4px'
                            }}
                          >
                            <CheckCircleIcon width={16} height={16} style={{ color: '#818cf8' }} />
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <button
                  onClick={restartQuiz}
                  style={{
                    backgroundColor: '#374151',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#4b5563' }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#374151' }}
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          ) : (
            // Quiz questions view
            <div>
              {/* Progress bar */}
              <div style={{ 
                width: '100%',
                backgroundColor: '#374151',
                borderRadius: '9999px',
                height: '8px',
                marginBottom: '24px'
              }}>
                <div 
                  style={{ 
                    width: `${progress}%`,
                    backgroundColor: '#4f46e5',
                    borderRadius: '9999px',
                    height: '100%',
                    transition: 'width 0.3s ease'
                  }} 
                />
              </div>
              
              <div style={{ marginBottom: '32px' }}>
                <div style={{ 
                  fontSize: '14px', 
                  color: '#9ca3af',
                  marginBottom: '8px' 
                }}>
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                <h2 style={{ 
                  fontSize: '22px', 
                  fontWeight: '600', 
                  color: '#e5e7eb',
                  marginBottom: '24px'
                }}>
                  {questions[currentQuestion].question}
                </h2>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px'
                }}>
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      style={{
                        backgroundColor: answers[currentQuestion] === index ? 'rgba(79, 70, 229, 0.2)' : 'rgba(55, 65, 81, 0.5)',
                        color: answers[currentQuestion] === index ? '#a5b4fc' : '#e5e7eb',
                        padding: '16px',
                        borderRadius: '8px',
                        border: `1px solid ${answers[currentQuestion] === index ? '#4f46e5' : '#4b5563'}`,
                        textAlign: 'left',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onMouseOver={(e) => { 
                        if (answers[currentQuestion] !== index) {
                          e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.8)' 
                        }
                      }}
                      onMouseOut={(e) => { 
                        if (answers[currentQuestion] !== index) {
                          e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.5)' 
                        }
                      }}
                    >
                      <span style={{ marginRight: '12px', fontSize: '20px' }}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                      {answers[currentQuestion] === index && (
                        <CheckCircleIcon width={20} height={20} style={{ marginLeft: 'auto', color: '#818cf8' }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: '24px' 
              }}>
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  style={{
                    backgroundColor: currentQuestion === 0 ? '#1f2937' : '#374151',
                    color: currentQuestion === 0 ? '#6b7280' : 'white',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '500',
                    cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseOver={(e) => { 
                    if (currentQuestion !== 0) {
                      e.currentTarget.style.backgroundColor = '#4b5563' 
                    }
                  }}
                  onMouseOut={(e) => { 
                    if (currentQuestion !== 0) {
                      e.currentTarget.style.backgroundColor = '#374151' 
                    }
                  }}
                >
                  <ArrowLeftIcon width={16} height={16} />
                  Previous
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={answers[currentQuestion] === undefined}
                  style={{
                    backgroundColor: answers[currentQuestion] === undefined ? '#1f2937' : '#4f46e5',
                    color: answers[currentQuestion] === undefined ? '#6b7280' : 'white',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '500',
                    cursor: answers[currentQuestion] === undefined ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseOver={(e) => { 
                    if (answers[currentQuestion] !== undefined) {
                      e.currentTarget.style.backgroundColor = '#4338ca' 
                    }
                  }}
                  onMouseOut={(e) => { 
                    if (answers[currentQuestion] !== undefined) {
                      e.currentTarget.style.backgroundColor = '#4f46e5' 
                    }
                  }}
                >
                  {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                  <ArrowRightIcon width={16} height={16} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default CareerQuiz; 