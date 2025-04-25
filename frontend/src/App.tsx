import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Learning from './pages/Learning';
import { useTranslation } from 'react-i18next';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import './i18n';
import Scholarships from './pages/Scholarships';
import Chatbot from './pages/Chatbot';
import Loading from './components/Loading';
import StemAssistant from './pages/StemAssistant';
import CareerQuiz from './pages/CareerQuiz';
import GamificationPage from './pages/Gamification';
import Profile from './pages/Profile';

// Helper component to conditionally render navbar based on route
const AppContent = () => {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're on the chatbot page
  const isChatbotPage = location.pathname === '/chatbot';

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div style={{ 
      backgroundColor: darkMode ? '#111827' : '#f3f4f6',
      color: darkMode ? '#f3f4f6' : '#111827',
      minHeight: '100vh',
      transition: 'all 0.3s ease',
    }}>
      {/* Only render navbar if not on chatbot page */}
      {!isChatbotPage && <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}
      
      <div style={{ 
        paddingTop: isChatbotPage ? 0 : '64px'
      }}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/stem-assistant" element={<StemAssistant />} />
            <Route path="/career-quiz" element={<CareerQuiz />} />
            <Route path="/achievements" element={<GamificationPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Suspense>
      </div>

      {/* Don't show floating chat button on chatbot page */}
      {!isChatbotPage && (
        <>
          {/* Floating Chatbot Button - Present on all pages except chatbot */}
          <button
            onClick={toggleChat}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#4f46e5',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
              zIndex: 50,
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <ChatBubbleLeftRightIcon width={24} height={24} />
          </button>

          {/* Chatbot Modal */}
          {isChatOpen && (
            <div style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: '350px',
              height: '500px',
              backgroundColor: darkMode ? '#1f2937' : 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 1000,
              border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
            }}>
              {/* Chat Header */}
              <div style={{
                padding: '12px 16px',
                backgroundColor: darkMode ? '#111827' : '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px' 
                }}>
                  <ChatBubbleLeftRightIcon width={20} height={20} />
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: '16px', 
                    fontWeight: 600 
                  }}>
                    {t('chatbot.title', 'STEM Assist')}
                  </h3>
                </div>
                <button
                  onClick={toggleChat}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              {/* Chat Content - using iframe to embed the actual chatbot */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <iframe 
                  src="/chatbot" 
                  title="STEM Assist Chatbot"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
