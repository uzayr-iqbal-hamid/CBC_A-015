import React, { useState, useEffect } from 'react';
import AttentivenessDetector from '../components/AttentivenessDetector';
import { useTranslation } from 'react-i18next';

const Attentiveness: React.FC = () => {
  const { t } = useTranslation();
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);

  const handleStartSession = () => {
    setIsSessionActive(true);
    setSessionStartTime(Date.now());
  };

  const handleEndSession = () => {
    setIsSessionActive(false);
    setSessionStartTime(null);
  };

  const handleInattentiveEvent = () => {
    setShowReminder(true);
  };

  const handleContinueSession = () => {
    setShowReminder(false);
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours > 0 ? `${hours}h ` : ''}${minutes % 60}m ${seconds % 60}s`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Focus Session</h1>
      
      <div className="max-w-4xl mx-auto">
        {!isSessionActive ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Start a Focus Session</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Begin a focused work session with subtle attentiveness monitoring.
            </p>
            <button
              onClick={handleStartSession}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Start Focus Session
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Active Focus Session</h2>
              <div className="text-sm text-gray-500">
                {sessionStartTime && formatDuration(Date.now() - sessionStartTime)}
              </div>
            </div>
            <button
              onClick={handleEndSession}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              End Session
            </button>
          </div>
        )}

        {/* Reminder Modal */}
        {showReminder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4">
              <h3 className="text-xl font-semibold mb-4">Time to Refocus!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Take a moment to recenter and continue your focus session.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleEndSession}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  End Session
                </button>
                <button
                  onClick={handleContinueSession}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Attentiveness Detector */}
        <AttentivenessDetector
          isActive={isSessionActive}
          onInattentiveEvent={handleInattentiveEvent}
          onSessionEnd={handleEndSession}
        />
      </div>
    </div>
  );
};

export default Attentiveness; 