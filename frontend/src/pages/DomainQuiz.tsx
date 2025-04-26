import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Interfaces for quiz data structure
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface DomainQuiz {
  domain: string;
  description: string;
  icon: string;
  questions: QuizQuestion[];
}

const DomainQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<DomainQuiz | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  
  // Sample quiz data for different domains
  const domainQuizzes: DomainQuiz[] = [
    {
      domain: "Computer Science",
      description: "Test your knowledge of programming, algorithms, and computer systems",
      icon: "💻",
      questions: [
        {
          question: "What does CPU stand for?",
          options: ["Central Processing Unit", "Computer Personal Unit", "Central Process Uniform", "Central Processor Unlimited"],
          correctAnswer: "Central Processing Unit",
          explanation: "CPU stands for Central Processing Unit, which is the primary component of a computer that performs most of the processing."
        },
        {
          question: "Which of the following is not a programming language?",
          options: ["Java", "Python", "HTML", "Firewall"],
          correctAnswer: "Firewall",
          explanation: "Firewall is a network security system, not a programming language. Java, Python, and HTML are all programming or markup languages."
        },
        {
          question: "What is the time complexity of binary search?",
          options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
          correctAnswer: "O(log n)",
          explanation: "Binary search has a time complexity of O(log n) because it divides the search interval in half with each step."
        }
      ]
    },
    {
      domain: "Mathematics",
      description: "Challenge yourself with problems in algebra, calculus, and geometry",
      icon: "📊",
      questions: [
        {
          question: "What is the derivative of e^x?",
          options: ["e^x", "xe^x", "e^x + C", "1/e^x"],
          correctAnswer: "e^x",
          explanation: "The derivative of e^x is e^x, which is a unique property of the exponential function with base e."
        },
        {
          question: "What is the value of π (pi) to two decimal places?",
          options: ["3.14", "3.16", "3.12", "3.18"],
          correctAnswer: "3.14",
          explanation: "π (pi) is approximately equal to 3.14159..., so to two decimal places it's 3.14."
        },
        {
          question: "What is the Pythagorean theorem?",
          options: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "a × b = c"],
          correctAnswer: "a² + b² = c²",
          explanation: "The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse (c) equals the sum of squares of the other two sides (a and b)."
        }
      ]
    },
    {
      domain: "Physics",
      description: "Explore the fundamental laws of nature and physical phenomena",
      icon: "⚛️",
      questions: [
        {
          question: "What is Newton's Second Law of Motion?",
          options: ["F = ma", "E = mc²", "F = G(m₁m₂)/r²", "v = u + at"],
          correctAnswer: "F = ma",
          explanation: "Newton's Second Law states that the force (F) acting on an object is equal to the mass (m) of the object multiplied by its acceleration (a)."
        },
        {
          question: "Which particle has a positive charge?",
          options: ["Electron", "Proton", "Neutron", "Photon"],
          correctAnswer: "Proton",
          explanation: "Protons have a positive charge, electrons have a negative charge, neutrons have no charge, and photons are uncharged particles of light."
        },
        {
          question: "What is the SI unit of energy?",
          options: ["Watt", "Newton", "Joule", "Pascal"],
          correctAnswer: "Joule",
          explanation: "The Joule (J) is the SI unit of energy, work, and heat. One Joule is the work done by a force of one newton when its point of application moves one meter in the direction of the force."
        }
      ]
    }
  ];

  // Function to navigate back
  const goBack = () => {
    navigate(-1);
  };

  // Function to select a domain
  const handleDomainSelect = (domain: string) => {
    const quiz = domainQuizzes.find(q => q.domain === domain) || null;
    setSelectedDomain(domain);
    setCurrentQuiz(quiz);
    setQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setIsQuizComplete(false);
  };

  // Function to handle option selection
  const handleOptionSelect = (option: string) => {
    if (isAnswerCorrect !== null) return; // Prevent changing answer after checking
    setSelectedOption(option);
  };

  // Function to check the selected answer
  const checkAnswer = () => {
    if (!selectedOption || !currentQuiz) return;
    
    const currentQuestion = currentQuiz.questions[questionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    setIsAnswerCorrect(isCorrect);
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };

  // Function to move to the next question
  const nextQuestion = () => {
    if (!currentQuiz) return;
    
    if (questionIndex < currentQuiz.questions.length - 1) {
      setQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setIsAnswerCorrect(null);
    } else {
      setIsQuizComplete(true);
      saveQuizResult();
    }
  };

  // Function to save quiz result to database
  const saveQuizResult = async () => {
    try {
      if (!supabase) {
        console.warn('Supabase client not initialized. Quiz result not saved.');
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && currentQuiz) {
        const { error } = await supabase
          .from('quiz_results')
          .insert({
            user_id: user.id,
            domain: currentQuiz.domain,
            score: score,
            total_questions: currentQuiz.questions.length,
            completed_at: new Date().toISOString(),
          });
        
        if (error) {
          console.error('Error saving quiz result:', error);
        }
      } else {
        // If user is not logged in, just log the result
        console.log('Quiz completed but not saved: ', {
          domain: currentQuiz?.domain,
          score: score,
          total_questions: currentQuiz?.questions.length,
        });
      }
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={goBack}
          className="mb-6 flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Domain Quiz
        </h1>
        
        {!selectedDomain ? (
          <div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
              Select a domain to start a quiz:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {domainQuizzes.map((quiz) => (
                <motion.div
                  key={quiz.domain}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer"
                  onClick={() => handleDomainSelect(quiz.domain)}
                >
                  <div className="p-6">
                    <div className="text-4xl mb-4 text-center">
                      {quiz.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {quiz.domain}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {quiz.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : !isQuizComplete && currentQuiz ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentQuiz.domain}
              </h2>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Question {questionIndex + 1} of {currentQuiz.questions.length}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {currentQuiz.questions[questionIndex].question}
              </h3>
              
              <div className="space-y-3">
                {currentQuiz.questions[questionIndex].options.map((option) => (
                  <div
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className={`p-4 rounded-lg cursor-pointer border transition-colors
                      ${selectedOption === option
                        ? isAnswerCorrect === null
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                          : isAnswerCorrect
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : option === currentQuiz.questions[questionIndex].correctAnswer
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 dark:text-gray-200">{option}</span>
                      {selectedOption === option && isAnswerCorrect !== null && (
                        isAnswerCorrect ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <FaTimesCircle className="text-red-500" />
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {isAnswerCorrect !== null && (
              <div className={`mb-6 p-4 rounded-lg ${isAnswerCorrect ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'}`}>
                <p className="font-medium mb-1">
                  {isAnswerCorrect ? 'Correct!' : 'Incorrect!'}
                </p>
                <p>{currentQuiz.questions[questionIndex].explanation}</p>
              </div>
            )}
            
            <div className="flex justify-center">
              {selectedOption && isAnswerCorrect === null ? (
                <button
                  onClick={checkAnswer}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors"
                >
                  Check Answer
                </button>
              ) : isAnswerCorrect !== null ? (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors"
                >
                  {questionIndex < currentQuiz.questions.length - 1 ? 'Next Question' : 'See Results'}
                </button>
              ) : null}
            </div>
          </div>
        ) : isQuizComplete && currentQuiz ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
          >
            <div className="text-5xl mb-6 mx-auto">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Quiz Complete!
            </h2>
            <p className="text-xl mb-6 text-gray-700 dark:text-gray-300">
              You scored <span className="font-bold text-indigo-600 dark:text-indigo-400">{score}</span> out of <span className="font-bold">{currentQuiz.questions.length}</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button
                onClick={() => handleDomainSelect(currentQuiz.domain)}
                className="px-5 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
              >
                Retry Quiz
              </button>
              <button
                onClick={() => setSelectedDomain(null)}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Try Another Domain
              </button>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default DomainQuiz; 