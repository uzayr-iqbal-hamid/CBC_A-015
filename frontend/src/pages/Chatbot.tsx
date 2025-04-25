import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MicrophoneIcon, StopIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Message {
  text: string;
  isUser: boolean;
}

const Chatbot = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    synthesisRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if (synthesisRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      synthesisRef.current.speak(utterance);
    }
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = { text: message, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botResponse: Message = {
        text: `I understand you're interested in ${message}. Let me help you explore career options in this field.`,
        isUser: false,
      };
      setMessages((prev) => [...prev, botResponse]);
      speak(botResponse.text);
    }, 1000);

    setInput('');
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
              AI Career Assistant
            </h1>
            <p style={{ 
              fontSize: '18px',
              color: '#d1d5db',
              marginBottom: '24px',
            }}>
              Chat with our AI assistant to get personalized career guidance and answers to your questions
            </p>
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      <section style={{ 
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          backgroundColor: '#1f2937',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #374151',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          {/* Chat Messages Area */}
          <div style={{
            height: '500px',
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
                  Start a conversation
                </h3>
                <p style={{ marginTop: '8px', fontSize: '14px' }}>
                  Ask me anything about education, career paths, or STEM opportunities
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={index}
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
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                  }}>
                    {message.text}
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
              placeholder="Type your message..."
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
            />
            <button
              onClick={() => handleSendMessage(input)}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                cursor: 'pointer',
                marginRight: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              <PaperAirplaneIcon style={{ width: '20px', height: '20px' }} />
            </button>
            <button
              onClick={isListening ? stopListening : startListening}
              style={{
                backgroundColor: isListening ? '#ef4444' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => {
                if (isListening) {
                  e.currentTarget.style.backgroundColor = '#dc2626';
                } else {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }
              }}
              onMouseOut={(e) => {
                if (isListening) {
                  e.currentTarget.style.backgroundColor = '#ef4444';
                } else {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
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
        </div>
      </section>
    </div>
  );
};

export default Chatbot; 