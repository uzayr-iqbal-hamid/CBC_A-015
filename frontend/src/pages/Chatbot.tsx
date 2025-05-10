import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MicrophoneIcon, StopIcon, PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// Add type declarations for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
    speechSynthesis: SpeechSynthesis;
  }
}

interface Message {
  text: string;
  isUser: boolean;
  isLoading?: boolean;
  id?: number; 
  timestamp?: Date;
}

// Define interface for speech recognition states
interface SpeechState {
  isListening: boolean;
  isSpeaking: boolean;
  hasListenPermission: boolean;
  supportsSpeechRecognition: boolean;
  supportsSpeechSynthesis: boolean;
  recognitionError: string | null;
  synthesizerError: string | null;
}

// API endpoint - replace with your actual API URL
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Local fallback responses
const LOCAL_RESPONSES: Record<string, string[]> = {
  greeting: [
    "Hello! Welcome to Aarambh. How can I help with your education and career questions?",
    "Hi there! I'm your STEM assistant. What would you like to know about today?",
    "Greetings! I'm here to help with your educational journey. What are you curious about?",
    "Welcome to Aarambh! I'm ready to assist with your learning and career exploration."
  ],
  careers: [
    "There are many exciting career paths in STEM! Some popular options include software development, data science, engineering, healthcare, and research.",
    "STEM careers offer great opportunities. You might consider fields like artificial intelligence, biotechnology, renewable energy, or cybersecurity.",
    "Career options in STEM are diverse and rewarding. You could explore paths in computer science, mathematics, engineering disciplines, or healthcare technology."
  ],
  subjects: [
    "The main STEM subjects include Mathematics, Physics, Chemistry, Biology, Computer Science, and various Engineering fields.",
    "Key subjects to focus on include Mathematics (algebra, calculus), Sciences (physics, chemistry, biology), and technology-related courses like programming and electronics.",
    "Important STEM subjects include Mathematics, Physical Sciences, Life Sciences, Computer Science, and Engineering fundamentals."
  ],
  exams: [
    "Common entrance exams for STEM fields include JEE (for engineering), NEET (for medical), GATE (for postgraduate studies), and various university-specific tests.",
    "There are several important entrance examinations like JEE Main & Advanced, NEET, BITSAT, and CUET for undergraduate programs in India.",
    "Important exams include JEE for engineering, NEET for medical courses, KVPY for science research, and various state-level entrance tests."
  ],
  scholarships: [
    "Many scholarships are available for STEM students, including government schemes like INSPIRE, Post-Matric Scholarships, and numerous private foundation opportunities.",
    "You can explore scholarships such as KVPY, INSPIRE, Kishore Vaigyanik Protsahan Yojana, and various state and central government schemes.",
    "There are numerous scholarship opportunities including merit-based awards, need-based financial aid, and specialized scholarships for women in STEM."
  ],
  fallback: [
    "That's an interesting question! Let me help you explore this topic further.",
    "I'd be happy to assist with your query about this subject.",
    "Great question! Here's what I can tell you about this topic.",
    "I'm here to help with questions like this. Let's explore this together."
  ]
};

// Add roadmap content database
const ROADMAPS: Record<string, string> = {
  programming: `Here's a roadmap for learning programming:

1. Fundamentals: Learn a beginner-friendly language like Python or JavaScript
2. Data Structures & Algorithms: Understand arrays, lists, loops, and basic problem-solving
3. Version Control: Learn Git and GitHub basics
4. Web Development: HTML, CSS, and basic frontend frameworks
5. Backend Basics: Learn about servers, APIs, and databases
6. Project Building: Create small projects to apply your skills
7. Advanced Topics: Choose a specialization (mobile apps, web, data science)
8. Professional Skills: Code reviews, testing, and deployment
9. Open Source: Contribute to open-source projects`,

  "data science": `Here's a roadmap for data science:

1. Prerequisites: Learn Python and basic statistics
2. Data Analysis: Master Pandas and NumPy libraries
3. Data Visualization: Learn Matplotlib, Seaborn, and visualization principles
4. Statistics & Math: Probability, hypothesis testing, and linear algebra
5. Machine Learning: Scikit-learn and basic ML algorithms
6. Deep Learning: Neural networks with TensorFlow or PyTorch
7. Projects: Build a portfolio of data analysis projects
8. Specialization: Choose NLP, computer vision, or another focus area
9. Professional Skills: Learn data ethics and effective communication`,

  "web development": `Here's a roadmap for web development:

1. HTML & CSS: Master the basics of web structure and styling
2. JavaScript: Learn core concepts and DOM manipulation
3. Responsive Design: Make websites work on all devices
4. Frontend Framework: Learn React, Vue, or Angular
5. Backend Development: Node.js, Express, or another backend
6. Databases: SQL and/or NoSQL database skills
7. APIs: How to create and consume APIs
8. Deployment: Learn hosting, CI/CD, and cloud services
9. Advanced Topics: Performance optimization, security, accessibility`,

  engineering: `Here's a roadmap for engineering:

1. Mathematics Foundation: Calculus, linear algebra, and statistics
2. Core Sciences: Physics, chemistry, and/or biology depending on field
3. Engineering Fundamentals: Mechanics, thermodynamics, materials
4. Specialization Courses: Focus on your specific engineering discipline
5. Computer Skills: CAD software and programming basics
6. Laboratory Experience: Hands-on experimentation and testing
7. Design Projects: Apply knowledge to solve real problems
8. Internships: Gain practical experience in the field
9. Professional Certification: Prepare for relevant licensing exams`,

  default: `Here's a general learning roadmap:

1. Foundation: Master the fundamental concepts and terminology
2. Structured Learning: Follow courses, tutorials, or books on the subject
3. Practical Application: Apply knowledge through projects or exercises
4. Community Engagement: Join forums, groups, or classes to learn from others
5. Specialization: Focus on specific areas that interest you most
6. Advanced Concepts: Tackle more complex topics after basics are solid
7. Teaching/Sharing: Reinforce learning by explaining to others
8. Real-world Projects: Build a portfolio of completed work
9. Continuous Learning: Stay updated with the latest developments`
};

// Add website navigation references
const WEBSITE_PAGES = [
  {
    keywords: ['career', 'quiz', 'assessment', 'test', 'career quiz', 'profession', 'aptitude'],
    name: 'Career Quiz',
    description: 'Take our interactive Career Quiz to discover suitable career paths based on your interests and aptitudes.',
    link: '/career-quiz',
    icon: '🧠'
  },
  {
    keywords: ['learning', 'resources', 'courses', 'study material', 'videos', 'articles', 'learn'],
    name: 'Learning Resources',
    description: 'Access a curated collection of educational resources including videos, articles, and courses.',
    link: '/learning',
    icon: '📚'
  },
  {
    keywords: ['scholarship', 'financial aid', 'funding', 'grants', 'money', 'support', 'finance'],
    name: 'Scholarships',
    description: 'Explore available scholarships and financial aid opportunities for your education.',
    link: '/scholarships',
    icon: '💰'
  },
  {
    keywords: ['stem', 'assistant', 'ai helper', 'tutor', 'homework', 'help', 'science', 'math'],
    name: 'STEM Assistant',
    description: 'Get personalized help with STEM subjects through our interactive AI assistant.',
    link: '/stem-assistant',
    icon: '🤖'
  },
  {
    keywords: ['achievement', 'gamification', 'badges', 'rewards', 'points', 'levels', 'progress'],
    name: 'Learning Achievements',
    description: 'Track your progress, earn badges, and view your learning achievements.',
    link: '/achievements',
    icon: '🏆'
  },
  {
    keywords: ['profile', 'account', 'settings', 'personal', 'information', 'details'],
    name: 'User Profile',
    description: 'View and update your profile information and account settings.',
    link: '/profile',
    icon: '👤'
  },
  {
    keywords: ['home', 'main', 'landing', 'front', 'dashboard', 'overview'],
    name: 'Home Page',
    description: 'Return to the main Aarambh dashboard.',
    link: '/',
    icon: '🏠'
  }
];

// Update the website navigation response format
const getWebsiteNavigation = (message: string): string | null => {
  const lowercaseMsg = message.toLowerCase();
  
  // Skip website navigation if this is a roadmap request
  if (lowercaseMsg.includes('roadmap') || 
      (lowercaseMsg.includes('how') && lowercaseMsg.includes('learn')) ||
      (lowercaseMsg.includes('steps') && lowercaseMsg.includes('become')) ||
      (lowercaseMsg.includes('guide') && lowercaseMsg.includes('learning'))) {
    return null;
  }
  
  // First check for direct navigation requests
  if (lowercaseMsg.includes('go to') || 
      lowercaseMsg.includes('navigate to') || 
      lowercaseMsg.includes('show me') || 
      lowercaseMsg.includes('open') || 
      lowercaseMsg.includes('take me to') ||
      lowercaseMsg.includes('where is') ||
      lowercaseMsg.includes('how to find') ||
      lowercaseMsg.includes('link')) {
    
    // Find matching pages based on keywords
    const matchingPages = WEBSITE_PAGES.filter(page => 
      page.keywords.some(keyword => lowercaseMsg.includes(keyword))
    );
    
    if (matchingPages.length > 0) {
      // Sort by most keyword matches if multiple pages match
      matchingPages.sort((a, b) => {
        const aMatches = a.keywords.filter(keyword => lowercaseMsg.includes(keyword)).length;
        const bMatches = b.keywords.filter(keyword => lowercaseMsg.includes(keyword)).length;
        return bMatches - aMatches;
      });
      
      const page = matchingPages[0];
      return `${page.icon} **${page.name}**\n\n${page.description}\n\n⚠️ Clicking the link below will navigate away from this chat:\n\n[➡️ Go to ${page.name} page](${page.link})`;
    }
  }
  
  // Check for any mention of website keywords even without navigation intent
  for (const page of WEBSITE_PAGES) {
    // Skip roadmap-related keywords for general detection too
    if (lowercaseMsg.includes('roadmap') || 
        lowercaseMsg.includes('how to learn') || 
        lowercaseMsg.includes('learning path')) {
      continue;
    }
    
    if (page.keywords.some(keyword => lowercaseMsg.includes(keyword))) {
      return `Are you looking for our ${page.name} page? ${page.icon}\n\n${page.description}\n\n⚠️ Clicking the button below will exit this chat:\n\n[➡️ Navigate to ${page.name}](${page.link})`;
    }
  }
  
  // Special case for general website questions
  if ((lowercaseMsg.includes('website') || 
       lowercaseMsg.includes('aarambh') || 
       lowercaseMsg.includes('platform') || 
       lowercaseMsg.includes('app')) &&
      // Exclude roadmap queries from general website info too
      !lowercaseMsg.includes('roadmap') && 
      !lowercaseMsg.includes('how to learn')) {
    
    return `Welcome to Aarambh! Here are the main sections of our platform:\n\n` +
      WEBSITE_PAGES.map(page => `${page.icon} [${page.name}](${page.link}) - ${page.description.split('.')[0]}`).join('\n\n') +
      `\n\n⚠️ Clicking any link above will navigate away from this chat.`;
  }
  
  return null;
};

// Update the link handling in formatMessageText
const formatMessageText = (text: string): React.ReactNode => {
  if (!text) return text;
  
  // Replace markdown links with anchor tags
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  
  while ((match = linkPattern.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    // Add the link
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <a 
        key={match.index}
        href={linkUrl}
        onClick={(e) => {
          e.preventDefault();
          
          // For internal links, redirect to the page
          if (linkUrl.startsWith('/')) {
            // Use window.location.href for full page navigation
            window.location.href = linkUrl;
          } else {
            // For external links, open in new tab
            window.open(linkUrl, '_blank');
          }
        }}
        style={{
          color: '#3b82f6',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.textDecoration = 'underline';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.textDecoration = 'none';
        }}
      >
        {linkText}
      </a>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  // Apply basic formatting
  return parts.map((part, index) => {
    if (typeof part === 'string') {
      // Handle bold text with **text**
      const boldedText = part.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // If the text has HTML tags from bold formatting, use dangerouslySetInnerHTML
      if (boldedText !== part) {
        return <span key={index} dangerouslySetInnerHTML={{ __html: boldedText }} />;
      }
      
      // Regular text
      return part;
    }
    return part;
  });
};

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  
  // Speech states
  const [speechState, setSpeechState] = useState<SpeechState>({
    isListening: false,
    isSpeaking: false,
    hasListenPermission: true,
    supportsSpeechRecognition: false,
    supportsSpeechSynthesis: false,
    recognitionError: null,
    synthesizerError: null
  });
  
  const [isApiLoading, setIsApiLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Check for SpeechRecognition support
    const hasSpeechRecognition = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    // Check for SpeechSynthesis support
    const hasSpeechSynthesis = 'speechSynthesis' in window;
    
    setSpeechState(prev => ({
      ...prev,
      supportsSpeechRecognition: hasSpeechRecognition,
      supportsSpeechSynthesis: hasSpeechSynthesis
    }));

    // Initialize speech recognition
    if (hasSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // Set language based on current i18n language
      const currentLang = i18n.language;
      let recognitionLang = 'en-US';
      
      // Map i18n language codes to Web Speech API language codes
      if (currentLang === 'hi') {
        recognitionLang = 'hi-IN';
      } else if (currentLang === 'kn') {
        recognitionLang = 'kn-IN';
      }
      
      recognitionRef.current.lang = recognitionLang;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        // Auto-send message when speech recognition completes
        handleSendMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setSpeechState(prev => ({ ...prev, isListening: false }));
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        
        let errorMessage = '';
        switch (event.error) {
          case 'not-allowed':
            errorMessage = t('chatbot.microphoneNotAllowed', 'Microphone permission denied');
            setSpeechState(prev => ({ ...prev, hasListenPermission: false }));
            break;
          case 'aborted':
            errorMessage = t('chatbot.recognitionAborted', 'Speech recognition was aborted');
            break;
          case 'network':
            errorMessage = t('chatbot.networkError', 'Network error occurred');
            break;
          case 'no-speech':
            errorMessage = t('chatbot.noSpeech', 'No speech detected');
            break;
          default:
            errorMessage = t('chatbot.recognitionError', 'Speech recognition error');
        }
        
        setSpeechState(prev => ({ 
          ...prev, 
          isListening: false,
          recognitionError: errorMessage 
        }));
        
        // Clear error after 3 seconds
        setTimeout(() => {
          setSpeechState(prev => ({ ...prev, recognitionError: null }));
        }, 3000);
      };
    }

    // Initialize speech synthesis
    if (hasSpeechSynthesis) {
      synthesisRef.current = window.speechSynthesis;
      
      // Get available voices
      const loadVoices = () => {
        const voices = synthesisRef.current?.getVoices() || [];
        setAvailableVoices(voices);
        
        // Try to select a voice matching the current language
        const currentLang = i18n.language;
        let langCode = currentLang === 'hi' ? 'hi' : (currentLang === 'kn' ? 'kn' : 'en');
        
        // Find a matching voice or default to the first one
        const matchingVoice = voices.find(voice => voice.lang.startsWith(langCode)) || 
                             (voices.length > 0 ? voices[0] : null);
        
        setSelectedVoice(matchingVoice);
      };
      
      // Chrome loads voices asynchronously
      if (synthesisRef.current.onvoiceschanged !== undefined) {
        synthesisRef.current.onvoiceschanged = loadVoices;
      }
      
      // Initial load of voices
      loadVoices();
    }

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current && utteranceRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, [i18n.language, t]);

  // Effect for updating voice when language changes
  useEffect(() => {
    if (synthesisRef.current && availableVoices.length > 0) {
      const currentLang = i18n.language;
      let langCode = currentLang === 'hi' ? 'hi' : (currentLang === 'kn' ? 'kn' : 'en');
      
      // Find a matching voice or default to the first one
      const matchingVoice = availableVoices.find(voice => voice.lang.startsWith(langCode)) || 
                           (availableVoices.length > 0 ? availableVoices[0] : null);
      
      setSelectedVoice(matchingVoice);
    }
  }, [i18n.language, availableVoices]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Hide navbar when this component mounts (by using negative margin)
    document.body.style.overflow = 'hidden';
    
    // Restore when unmounting
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Enhanced startListening function with error handling
  const startListening = () => {
    if (!speechState.supportsSpeechRecognition) {
      setSpeechState(prev => ({ 
        ...prev, 
        recognitionError: t('chatbot.speechRecognitionNotSupported', 'Speech recognition is not supported in your browser') 
      }));
      return;
    }
    
    if (!speechState.hasListenPermission) {
      setSpeechState(prev => ({ 
        ...prev, 
        recognitionError: t('chatbot.microphonePermissionRequired', 'Microphone permission is required') 
      }));
      return;
    }
    
    if (recognitionRef.current) {
      try {
        // Update recognition language to match current i18n language
        const currentLang = i18n.language;
        let recognitionLang = 'en-US';
        
        if (currentLang === 'hi') {
          recognitionLang = 'hi-IN';
        } else if (currentLang === 'kn') {
          recognitionLang = 'kn-IN';
        }
        
        recognitionRef.current.lang = recognitionLang;
        
        recognitionRef.current.start();
        setSpeechState(prev => ({ ...prev, isListening: true, recognitionError: null }));
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        setSpeechState(prev => ({ 
          ...prev, 
          isListening: false,
          recognitionError: t('chatbot.startListeningFailed', 'Failed to start speech recognition') 
        }));
      }
    }
  };

  // Enhanced stopListening function
  const stopListening = () => {
    if (recognitionRef.current && speechState.isListening) {
      try {
        recognitionRef.current.stop();
        setSpeechState(prev => ({ ...prev, isListening: false }));
      } catch (error) {
        console.error('Failed to stop speech recognition:', error);
      }
    }
  };

  // Enhanced speak function with voice selection
  const speak = (text: string) => {
    if (!speechState.supportsSpeechSynthesis) {
      setSpeechState(prev => ({ 
        ...prev, 
        synthesizerError: t('chatbot.speechSynthesisNotSupported', 'Speech synthesis is not supported in your browser') 
      }));
      return;
    }
    
    if (synthesisRef.current) {
      // Cancel any ongoing speech
      if (speechState.isSpeaking) {
        synthesisRef.current.cancel();
      }
      
      try {
        // Clean text for speaking (remove markdown, urls, etc.)
        const cleanText = text
          .replace(/\*\*/g, '') // Remove bold markdown
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace markdown links with just the text
          .replace(/https?:\/\/\S+/g, '') // Remove URLs
          .replace(/\n\n/g, '. ') // Replace double newlines with period and space
          .replace(/\n/g, ' '); // Replace single newlines with space
        
        utteranceRef.current = new SpeechSynthesisUtterance(cleanText);
        
        // Set voice if available
        if (selectedVoice) {
          utteranceRef.current.voice = selectedVoice;
        }
        
        // Set language based on current i18n language
        const currentLang = i18n.language;
        if (currentLang === 'hi') {
          utteranceRef.current.lang = 'hi-IN';
        } else if (currentLang === 'kn') {
          utteranceRef.current.lang = 'kn-IN';
        } else {
          utteranceRef.current.lang = 'en-US';
        }
        
        // Set speed and pitch
        utteranceRef.current.rate = 1.0; // Normal speed
        utteranceRef.current.pitch = 1.0; // Normal pitch
        
        // Event handlers
        utteranceRef.current.onstart = () => {
          setSpeechState(prev => ({ ...prev, isSpeaking: true }));
        };
        
        utteranceRef.current.onend = () => {
          setSpeechState(prev => ({ ...prev, isSpeaking: false }));
        };
        
        utteranceRef.current.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          setSpeechState(prev => ({ 
            ...prev, 
            isSpeaking: false,
            synthesizerError: t('chatbot.speechSynthesisError', 'Error occurred during speech synthesis') 
          }));
        };
        
        synthesisRef.current.speak(utteranceRef.current);
      } catch (error) {
        console.error('Failed to start speech synthesis:', error);
        setSpeechState(prev => ({ 
          ...prev, 
          synthesizerError: t('chatbot.startSpeakingFailed', 'Failed to start speech synthesis') 
        }));
      }
    }
  };

  // Function to stop speaking
  const stopSpeaking = () => {
    if (synthesisRef.current && speechState.isSpeaking) {
      synthesisRef.current.cancel();
      setSpeechState(prev => ({ ...prev, isSpeaking: false }));
    }
  };

  // Update the getLocalResponse function to prioritize roadmap detection
  const getLocalResponse = (message: string): string => {
    const lowercaseMsg = message.toLowerCase();
    
    // First check if it's a roadmap request - highest priority
    if (lowercaseMsg.includes('roadmap') || 
        (lowercaseMsg.includes('how') && lowercaseMsg.includes('learn')) ||
        (lowercaseMsg.includes('steps') && lowercaseMsg.includes('become')) ||
        (lowercaseMsg.includes('guide') && lowercaseMsg.includes('learning')) ||
        lowercaseMsg.includes('learning path')) {
      
      // Check for specific roadmap topics without creating links
      if (lowercaseMsg.includes('programming') || lowercaseMsg.includes('coding') || 
          lowercaseMsg.includes('developer') || lowercaseMsg.includes('software')) {
        return ROADMAPS.programming;
      }
      
      if (lowercaseMsg.includes('data science') || lowercaseMsg.includes('machine learning') || 
          lowercaseMsg.includes('ai') || lowercaseMsg.includes('artificial intelligence')) {
        return ROADMAPS["data science"];
      }
      
      if (lowercaseMsg.includes('web') || lowercaseMsg.includes('website') || 
          lowercaseMsg.includes('frontend') || lowercaseMsg.includes('backend')) {
        return ROADMAPS["web development"];
      }
      
      if (lowercaseMsg.includes('engineering') || lowercaseMsg.includes('engineer')) {
        return ROADMAPS.engineering;
      }
      
      // Extract potential topic from request (after "for" or "to learn")
      let topic = "";
      const forMatch = lowercaseMsg.match(/roadmap for ([\w\s]+)/);
      const toLearnMatch = lowercaseMsg.match(/how to learn ([\w\s]+)/);
      const becomeMatch = lowercaseMsg.match(/become an? ([\w\s]+)/);
      const pathMatch = lowercaseMsg.match(/learning path for ([\w\s]+)/);
      
      if (forMatch && forMatch[1]) {
        topic = forMatch[1].trim();
      } else if (toLearnMatch && toLearnMatch[1]) {
        topic = toLearnMatch[1].trim();
      } else if (becomeMatch && becomeMatch[1]) {
        topic = becomeMatch[1].trim();
      } else if (pathMatch && pathMatch[1]) {
        topic = pathMatch[1].trim();
      }
      
      // Generate a customized response using the default roadmap - no links
      if (topic) {
        return `Here's a roadmap for learning ${topic}:

1. Basics: Start with fundamental concepts and principles of ${topic}
2. Structured Learning: Follow online courses or books specifically about ${topic}
3. Practice: Apply your knowledge through regular exercises and small projects
4. Community: Join forums, communities, or study groups focused on ${topic}
5. Advanced Concepts: Deepen your understanding with more complex ${topic} topics
6. Specialization: Focus on a specific area within ${topic} that interests you most
7. Projects: Build a portfolio demonstrating your ${topic} skills
8. Networking: Connect with professionals working in ${topic}
9. Continuous Learning: Stay updated with the latest trends in ${topic}`;
      }
      
      // Default roadmap if no specific topic detected - no links
      return ROADMAPS.default;
    }
    
    // Then check if it's a website navigation request
    const navigationResponse = getWebsiteNavigation(message);
    if (navigationResponse) {
      return navigationResponse;
    }
    
    // Check for greetings
    if (lowercaseMsg.match(/\b(hi|hello|hey|greetings|namaste|howdy)\b/)) {
      return LOCAL_RESPONSES.greeting[Math.floor(Math.random() * LOCAL_RESPONSES.greeting.length)];
    }
    
    // Check for career related questions
    if (lowercaseMsg.match(/\b(career|job|profession|work|employment|occupation)\b/)) {
      return LOCAL_RESPONSES.careers[Math.floor(Math.random() * LOCAL_RESPONSES.careers.length)];
    }
    
    // Check for subject related questions
    if (lowercaseMsg.match(/\b(subject|course|study|learn|topic)\b/)) {
      return LOCAL_RESPONSES.subjects[Math.floor(Math.random() * LOCAL_RESPONSES.subjects.length)];
    }
    
    // Check for exam related questions
    if (lowercaseMsg.match(/\b(exam|test|entrance|admission|jee|neet)\b/)) {
      return LOCAL_RESPONSES.exams[Math.floor(Math.random() * LOCAL_RESPONSES.exams.length)];
    }
    
    // Check for scholarship related questions
    if (lowercaseMsg.match(/\b(scholarship|financial|aid|stipend|fellowship|fund)\b/)) {
      return LOCAL_RESPONSES.scholarships[Math.floor(Math.random() * LOCAL_RESPONSES.scholarships.length)];
    }
    
    // Fallback to generic responses
    return LOCAL_RESPONSES.fallback[Math.floor(Math.random() * LOCAL_RESPONSES.fallback.length)];
  };

  // Function to fetch response from API
  const fetchBotResponse = async (userMessage: string) => {
    setIsApiLoading(true);
    
    try {
      // Add a temporary loading message
      const loadingMessageId = Date.now();
      setMessages(prev => [...prev, { 
        text: 'Loading...', 
        isUser: false, 
        isLoading: true,
        id: loadingMessageId 
      } as any]);

      console.log('Attempting to fetch from AI API...');
      
      // Try Hugging Face Inference API for text generation (free tier)
      try {
        const isRoadmapRequest = userMessage.toLowerCase().includes('roadmap') || 
                                (userMessage.toLowerCase().includes('how') && 
                                userMessage.includes('learn'));
        
        // Custom prompt based on request type
        let prompt = isRoadmapRequest 
          ? `Create a step-by-step roadmap for learning ${userMessage.replace('roadmap', '').replace('for', '').trim()}. Include 5-9 specific steps. Do not include any links or URLs in your response.`
          : `Answer this educational question: ${userMessage}. Provide a helpful, concise response about education or careers.`;
        
        const response = await fetch(
          "https://api-inference.huggingface.co/models/google/flan-t5-small",
          {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              // No auth token required for public models with limited usage
            },
            body: JSON.stringify({
              inputs: prompt,
              parameters: {
                max_length: 500,
                temperature: 0.7
              }
            }),
          }
        );
        
        // Remove the loading message
        setMessages(prev => prev.filter((msg: any) => !msg.isLoading));
        
        // If API call is successful, use the AI response
        if (response.ok) {
          const result = await response.text();
          console.log('AI API response successful:', result);
          
          // Use the AI response directly if it's meaningful (more than 5 characters)
          if (result && result.length > 5) {
            setMessages(prev => [...prev, { text: result, isUser: false }]);
            speak(result);
            return;
          } else {
            throw new Error('AI response too short or empty');
          }
        } else {
          throw new Error('AI API response not OK');
        }
      } catch (aiError) {
        console.error('Error with AI API call:', aiError);
        
        // Try quote API as second option
        try {
          console.log('Falling back to quotes API...');
          const quoteResponse = await fetch(`https://api.quotable.io/random`);
          
          if (quoteResponse.ok) {
            const data = await quoteResponse.json();
            console.log('Quotes API response successful:', data);
            
            // Add a relevant response prefix based on message content
            let prefix = getLocalResponse(userMessage);
            const botText = `${prefix} Here's a thought that might inspire you: "${data.content}" - ${data.author}`;
            
            setMessages(prev => prev.filter((msg: any) => !msg.isLoading));
            setMessages(prev => [...prev, { text: botText, isUser: false }]);
            speak(botText);
            return;
          } else {
            throw new Error('Quote API response not OK');
          }
        } catch (quoteError) {
          console.error('Error with quotes API fallback:', quoteError);
          throw quoteError; // Pass to the final fallback
        }
      }
    } catch (error) {
      console.error('Error in fetchBotResponse:', error);
      
      // Final fallback to local response system
      const localResponse = getLocalResponse(userMessage);
      
      // Remove the loading message
      setMessages(prev => prev.filter((msg: any) => !msg.isLoading));
      
      // Add the local response
      setMessages(prev => [...prev, { text: localResponse, isUser: false }]);
      speak(localResponse);
    } finally {
      setIsApiLoading(false);
    }
  };

  // Enhanced handleSendMessage function
  const handleSendMessage = (message: string) => {
    if (!message.trim() || isApiLoading) return;

    // Stop any ongoing speech when sending a new message
    if (speechState.isSpeaking) {
      stopSpeaking();
    }

    // Add user message with timestamp
    const userMessage: Message = { 
      text: message, 
      isUser: true,
      timestamp: new Date(),
      id: Date.now()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Fetch response from API with local fallback
    fetchBotResponse(message);
    
    setInput('');
  };

  return (
    <div style={{ 
      height: '100vh',
      width: '100%',
      backgroundColor: '#111827',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      {/* Speech functionality status bar */}
      {(speechState.recognitionError || speechState.synthesizerError) && (
        <div style={{
          padding: '8px 16px',
          backgroundColor: '#ef4444',
          color: 'white',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          {speechState.recognitionError || speechState.synthesizerError}
        </div>
      )}
      
      {/* Chat Interface - Full Height */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1f2937',
        overflow: 'hidden'
      }}>
        {/* Chat Messages Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          backgroundColor: '#1f2937'
        }}>
          {messages.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#9ca3af',
              textAlign: 'center',
              padding: '0 20px'
            }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <h3 style={{ marginTop: '16px', fontSize: '18px', fontWeight: '500' }}>
                {t('chatbot.startConversation', 'Start a conversation')}
              </h3>
              <p style={{ marginTop: '8px', fontSize: '14px' }}>
                {t('chatbot.askAnything', 'Ask me anything about education, career paths, or STEM opportunities')}
              </p>
              
              {/* Show voice controls info if speech is supported */}
              {(speechState.supportsSpeechRecognition || speechState.supportsSpeechSynthesis) && (
                <div style={{ 
                  marginTop: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <p style={{ fontSize: '14px', fontWeight: '500' }}>
                    {t('chatbot.voiceControls', 'Voice Controls Available')}
                  </p>
                  {speechState.supportsSpeechRecognition && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px' 
                    }}>
                      <MicrophoneIcon style={{ width: '16px', height: '16px' }} />
                      {t('chatbot.clickMicToSpeak', 'Click the microphone to speak')}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                  marginBottom: '16px'
                }}
              >
                <div style={{
                  maxWidth: '70%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: message.isUser ? '#3b82f6' : '#374151',
                  color: 'white',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: message.isLoading ? 'center' : 'flex-start',
                  gap: '8px',
                  flexDirection: 'column',
                  position: 'relative'
                }}>
                  {message.isLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ArrowPathIcon 
                        style={{ 
                          width: '16px', 
                          height: '16px',
                          animation: 'spin 1s linear infinite'
                        }} 
                      />
                      <style>
                        {`
                          @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                          }
                          @keyframes pulse {
                            0% { opacity: 0.4; }
                            50% { opacity: 1; }
                            100% { opacity: 0.4; }
                          }
                        `}
                      </style>
                      <span>{message.text}</span>
                    </div>
                  ) : (
                    <>
                      <div style={{ lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                        {formatMessageText(message.text)}
                      </div>
                      
                      {/* Speech button for bot messages */}
                      {!message.isUser && speechState.supportsSpeechSynthesis && (
                        <button
                          onClick={() => speechState.isSpeaking ? stopSpeaking() : speak(message.text)}
                          style={{
                            position: 'absolute',
                            bottom: '-8px',
                            right: '-8px',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: speechState.isSpeaking ? '#ef4444' : '#3b82f6',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            padding: 0
                          }}
                          title={speechState.isSpeaking ? t('chatbot.stopSpeaking', 'Stop speaking') : t('chatbot.speak', 'Speak message')}
                        >
                          {speechState.isSpeaking ? (
                            <StopIcon style={{ width: '12px', height: '12px', color: 'white' }} />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                            </svg>
                          )}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          borderTop: '1px solid #374151',
          backgroundColor: '#111827'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
            placeholder={t('chatbot.typeMessage', 'Type your message...')}
            style={{
              flex: 1,
              padding: '12px 16px',
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: 'white',
              outline: 'none',
              marginRight: '12px'
            }}
            disabled={isApiLoading}
          />
          
          {/* Send button */}
          <button
            onClick={() => handleSendMessage(input)}
            style={{
              backgroundColor: isApiLoading ? '#4b5563' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              cursor: isApiLoading ? 'not-allowed' : 'pointer',
              marginRight: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              if (!isApiLoading) e.currentTarget.style.backgroundColor = '#2563eb';
            }}
            onMouseOut={(e) => {
              if (!isApiLoading) e.currentTarget.style.backgroundColor = '#3b82f6';
            }}
            disabled={isApiLoading}
            title={t('chatbot.sendMessage', 'Send message')}
          >
            {isApiLoading ? (
              <ArrowPathIcon 
                style={{ 
                  width: '20px', 
                  height: '20px',
                  animation: 'spin 1s linear infinite'
                }} 
              />
            ) : (
              <PaperAirplaneIcon style={{ width: '20px', height: '20px' }} />
            )}
          </button>
          
          {/* Microphone button - only show if speech recognition is supported */}
          {speechState.supportsSpeechRecognition && (
            <button
              onClick={speechState.isListening ? stopListening : startListening}
              style={{
                backgroundColor: speechState.isListening ? '#ef4444' : 
                                 (!speechState.hasListenPermission ? '#4b5563' : '#3b82f6'),
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                cursor: (!speechState.hasListenPermission || isApiLoading) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isApiLoading ? 0.7 : 1,
                position: 'relative'
              }}
              onMouseOver={(e) => {
                if (!isApiLoading && speechState.hasListenPermission) {
                  if (speechState.isListening) {
                    e.currentTarget.style.backgroundColor = '#dc2626';
                  } else {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                  }
                }
              }}
              onMouseOut={(e) => {
                if (!isApiLoading && speechState.hasListenPermission) {
                  if (speechState.isListening) {
                    e.currentTarget.style.backgroundColor = '#ef4444';
                  } else {
                    e.currentTarget.style.backgroundColor = '#3b82f6';
                  }
                }
              }}
              disabled={isApiLoading || !speechState.hasListenPermission}
              title={
                !speechState.hasListenPermission ? t('chatbot.microphoneBlocked', 'Microphone access blocked') :
                speechState.isListening ? t('chatbot.stopListening', 'Stop listening') :
                t('chatbot.startListening', 'Start listening')
              }
            >
              {speechState.isListening ? (
                <StopIcon style={{ width: '20px', height: '20px' }} />
              ) : (
                <MicrophoneIcon style={{ width: '20px', height: '20px' }} />
              )}
              
              {/* Listening animation */}
              {speechState.isListening && (
                <div style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  bottom: '-4px',
                  left: '-4px',
                  borderRadius: '10px',
                  border: '2px solid #ef4444',
                  animation: 'pulse 1.5s infinite ease-in-out'
                }} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot; 