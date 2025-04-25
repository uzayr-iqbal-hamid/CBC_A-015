import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        scholarships: 'Scholarships',
        chatbot: 'Career Chatbot',
        learning: 'Learning Resources'
      },
      home: {
        title: 'Welcome to CareerConnect',
        subtitle: 'Your Gateway to Educational Opportunities',
        features: {
          chatbot: 'AI Career Guidance',
          scholarships: 'Real-time Scholarships',
          learning: 'Learning Resources',
          calendar: 'Event Calendar'
        }
      },
      footer: {
        copyright: 'All rights reserved'
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: 'होम',
        scholarships: 'छात्रवृत्ति',
        chatbot: 'करियर चैटबॉट',
        learning: 'सीखने के संसाधन'
      },
      home: {
        title: 'CareerConnect में आपका स्वागत है',
        subtitle: 'शैक्षिक अवसरों का आपका प्रवेश द्वार',
        features: {
          chatbot: 'एआई करियर मार्गदर्शन',
          scholarships: 'रीयल-टाइम छात्रवृत्ति',
          learning: 'सीखने के संसाधन',
          calendar: 'इवेंट कैलेंडर'
        }
      },
      footer: {
        copyright: 'सर्वाधिकार सुरक्षित'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 