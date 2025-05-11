import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon, MicrophoneIcon, StopIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

// Define the Message interface
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Local responses for common queries
const LOCAL_RESPONSES = {
  greeting: [
    "Hello! I'm Aarambh, your STEM education assistant. How can I help you today?",
    "Hi there! I'm here to help you with your STEM education journey. What would you like to know?",
    "Welcome! I'm your guide to STEM education. How can I assist you?",
    "Namaste! I'm here to help you explore STEM education. What can I do for you today?"
  ],
  navigation: {
    home: "You can find the home page by clicking the Aarambh logo in the top left corner.",
    courses: "Our courses are available in the 'Courses' section. You can browse by subject or difficulty level.",
    resources: "Check out the 'Resources' section for study materials, practice problems, and learning guides.",
    about: "Learn more about Aarambh in the 'About' section, including our mission and team.",
    contact: "Need help? Visit the 'Contact' page to reach out to our support team."
  },
  subjects: [
    "We offer courses in Mathematics, Physics, Chemistry, Biology, Computer Science, and more!",
    "Our curriculum covers all major STEM subjects, from basic concepts to advanced topics.",
    "You can explore different subjects through our interactive courses and learning materials."
  ],
  careers: [
    "STEM careers offer exciting opportunities in research, technology, healthcare, engineering, and more!",
    "We provide career guidance and resources to help you explore different STEM career paths.",
    "Our platform helps you understand various STEM careers and the skills needed to succeed."
  ],
  exams: [
    "We offer preparation materials for various entrance exams including JEE, NEET, and more.",
    "Our exam preparation resources include practice tests, study guides, and expert tips.",
    "You can find exam-specific courses and materials in our 'Exam Preparation' section."
  ],
  scholarships: [
    "We provide information about various STEM scholarships and financial aid opportunities.",
    "Check our 'Scholarships' section for current opportunities and application guidelines.",
    "Our platform helps connect students with relevant scholarship programs in STEM fields."
  ],
  fallback: [
    "I'm here to help you with your STEM education journey. Could you please rephrase your question?",
    "I'm still learning, but I'll do my best to help. Could you try asking that differently?",
    "Let me help you explore our platform. What specific aspect of STEM education interests you?"
  ]
};

// Function to get local responses for common queries
const getLocalResponse = (message: string): string | null => {
  const lowercaseMsg = message.toLowerCase();

  // Check for greetings
  if (lowercaseMsg.match(/\b(hi|hello|hey|greetings|namaste|howdy)\b/)) {
    return LOCAL_RESPONSES.greeting[Math.floor(Math.random() * LOCAL_RESPONSES.greeting.length)];
  }

  // Check for navigation queries
  if (lowercaseMsg.includes('how to') || lowercaseMsg.includes('where to') || lowercaseMsg.includes('where is')) {
    if (lowercaseMsg.includes('home') || lowercaseMsg.includes('main page')) {
      return LOCAL_RESPONSES.navigation.home;
    }
    if (lowercaseMsg.includes('course')) {
      return LOCAL_RESPONSES.navigation.courses;
    }
    if (lowercaseMsg.includes('resource')) {
      return LOCAL_RESPONSES.navigation.resources;
    }
    if (lowercaseMsg.includes('about')) {
      return LOCAL_RESPONSES.navigation.about;
    }
    if (lowercaseMsg.includes('contact') || lowercaseMsg.includes('help') || lowercaseMsg.includes('support')) {
      return LOCAL_RESPONSES.navigation.contact;
    }
  }

  // Check for subject related questions
  if (lowercaseMsg.match(/\b(subject|course|study|learn|topic)\b/)) {
    return LOCAL_RESPONSES.subjects[Math.floor(Math.random() * LOCAL_RESPONSES.subjects.length)];
  }

  // Check for career related questions
  if (lowercaseMsg.match(/\b(career|job|profession|work|employment|occupation)\b/)) {
    return LOCAL_RESPONSES.careers[Math.floor(Math.random() * LOCAL_RESPONSES.careers.length)];
  }

  // Check for exam related questions
  if (lowercaseMsg.match(/\b(exam|test|entrance|admission|jee|neet)\b/)) {
    return LOCAL_RESPONSES.exams[Math.floor(Math.random() * LOCAL_RESPONSES.exams.length)];
  }

  // Check for scholarship related questions
  if (lowercaseMsg.match(/\b(scholarship|financial|aid|stipend|fellowship|fund)\b/)) {
    return LOCAL_RESPONSES.scholarships[Math.floor(Math.random() * LOCAL_RESPONSES.scholarships.length)];
  }

  // No local response found
  return null;
};

const Chatbot: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Aarambh assistant. I can help you with:\n• Navigating the website\n• Finding learning resources\n• Understanding STEM concepts\n• Career guidance and roadmaps\n\nHow can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAIAvailable, setIsAIAvailable] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const genAIRef = useRef<any>(null);
  const modelRef = useRef<any>(null);

  // Initialize Gemini API
  useEffect(() => {
    const initializeGemini = async () => {
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
          console.warn('Gemini API key not found. Chatbot will use local responses only.');
          return;
        }

        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        genAIRef.current = new GoogleGenerativeAI(apiKey);
        
        // Initialize the model with the correct configuration
        modelRef.current = genAIRef.current.getGenerativeModel({ 
          model: "gemini-pro",  // This is the correct model name
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        });

        // Test the model with a simple prompt to verify it works
        const testResult = await modelRef.current.generateContent("Hello");
        if (testResult && testResult.response) {
          setIsAIAvailable(true);
          console.log('Gemini AI initialized and tested successfully');
        } else {
          throw new Error('Model test failed');
        }
      } catch (error) {
        console.error('Failed to initialize Gemini API:', error);
        setIsAIAvailable(false);
      }
    };

    initializeGemini();
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // First try to get a response from local responses
      const localResponse = getLocalResponse(text);
      if (localResponse) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: localResponse,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        return;
      }

      // If no local response and AI is available, use it
      if (!isAIAvailable || !modelRef.current) {
        throw new Error('AI model not available. Using local responses only.');
      }

      // Create a chat session with proper history format
      const chatHistory = messages.slice(-4).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // Ensure the first message is from the user
      if (chatHistory.length > 0 && chatHistory[0].role === 'model') {
        chatHistory.shift(); // Remove the first message if it's from the model
      }

      const chat = modelRef.current.startChat({
        history: chatHistory,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      // Prepare the prompt with context
      const prompt = `You are Aarambh, an advanced AI assistant for a STEM education platform. 
      Your role is to help students with their educational journey.
      
      Current query: "${text}"
      
      Guidelines:
      1. Provide detailed, accurate information about STEM subjects
      2. Help with website navigation and finding resources
      3. Offer personalized learning roadmaps
      4. Give career guidance in STEM fields
      5. Keep responses friendly but professional
      6. Use examples and analogies when explaining concepts
      7. If unsure, acknowledge limitations and suggest alternative resources
      
      Respond as Aarambh:`;

      try {
        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const botResponse = response.text();

        if (botResponse && botResponse.length > 5) {
          // Clean up and format the response
          const formattedResponse = botResponse
            .replace(/^Aarambh:\s*/i, '') // Remove Aarambh prefix if present
            .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
            .trim();

          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: formattedResponse,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
        } else {
          throw new Error('Empty or invalid response from AI');
        }
      } catch (error) {
        console.error('Gemini API error:', error);
        throw new Error('Failed to get a response from the AI. Using local response instead.');
      }

    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      
      // More specific error messages based on the error type
      let errorMessage = "I apologize, but I'm having trouble connecting to my AI brain right now. ";
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          errorMessage = "I'm not properly configured yet. Please make sure the VITE_GEMINI_API_KEY is set in your .env file.";
        } else if (error.message.includes('rate limit')) {
          errorMessage = "I'm getting too many requests right now. Please try again in a few moments.";
        } else if (error.message.includes('not available')) {
          errorMessage = "I'm currently using my basic responses. For more advanced features, please check if the API key is correctly configured.";
        }
      }
      
      // Add a fallback response from local responses
      const fallbackResponse = LOCAL_RESPONSES.fallback[Math.floor(Math.random() * LOCAL_RESPONSES.fallback.length)];
      errorMessage += "\n\n" + fallbackResponse;

      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          color: 'white',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 6px 24px rgba(0, 0, 0, 0.25)'
        }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <XMarkIcon style={{ width: '28px', height: '28px' }} />
        ) : (
          <ChatBubbleLeftRightIcon style={{ width: '28px', height: '28px' }} />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '96px',
              right: '24px',
              width: '400px',
              height: '600px',
              backgroundColor: 'var(--background)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 9999,
              overflow: 'hidden',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}
          >
            {/* Chat Header */}
            <div style={{
              padding: '16px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'var(--background-lighter)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ChatBubbleLeftRightIcon style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
                <h3 style={{ 
                  fontWeight: '600',
                  color: 'var(--foreground)',
                  margin: 0,
                  fontSize: '16px'
                }}>Aarambh Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '8px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--muted-foreground)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--background)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <XMarkIcon style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            {/* Messages Container */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '100%'
                  }}
                >
                  <div style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    backgroundColor: message.sender === 'user' 
                      ? 'var(--primary)' 
                      : 'var(--muted)',
                    color: message.sender === 'user' 
                      ? 'var(--primary-foreground)' 
                      : 'var(--muted-foreground)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    position: 'relative'
                  }}>
                    <p style={{ 
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                      fontSize: '14px',
                      lineHeight: '1.5'
                    }}>{message.text}</p>
                    <span style={{
                      fontSize: '11px',
                      opacity: 0.7,
                      marginTop: '4px',
                      display: 'block'
                    }}>
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{
              padding: '16px',
              borderTop: '1px solid var(--border)',
              backgroundColor: 'var(--background)',
              display: 'flex',
              gap: '8px'
            }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--muted)',
                  color: 'var(--foreground)',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage(input)}
                disabled={isLoading || !input.trim()}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: isLoading || !input.trim() ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading && input.trim()) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading && input.trim()) {
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                {isLoading ? (
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid var(--primary-foreground)',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                ) : (
                  <PaperAirplaneIcon style={{ width: '20px', height: '20px' }} />
                )}
              </button>
              <button
                onClick={toggleListening}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: isListening ? 'var(--destructive)' : 'var(--muted)',
                  color: isListening ? 'var(--destructive-foreground)' : 'var(--muted-foreground)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isListening) {
                    e.currentTarget.style.backgroundColor = 'var(--muted-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isListening) {
                    e.currentTarget.style.backgroundColor = 'var(--muted)';
                  }
                }}
              >
                {isListening ? (
                  <StopIcon style={{ width: '20px', height: '20px' }} />
                ) : (
                  <MicrophoneIcon style={{ width: '20px', height: '20px' }} />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default Chatbot; 