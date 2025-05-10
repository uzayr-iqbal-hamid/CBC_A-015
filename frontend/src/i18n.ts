import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        scholarships: 'Scholarships',
        chatbot: 'Career Chatbot',
        learning: 'Learning Resources',
        jobLocations: 'Job Locations'
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
      },
      jobLocations: {
        title: 'Explore Job Opportunities',
        description: 'Discover job opportunities across India. Use the map to explore positions in different cities and filter by industry to find the perfect match for your skills and interests.',
        filterByIndustry: 'Industry:',
        filterByJobType: 'Job Type:',
        filterByExperience: 'Experience:',
        filterBySalary: 'Salary Range:',
        availableJobs: 'Available Jobs',
        noJobsFound: 'No jobs found for the selected criteria.',
        salary: 'Salary',
        applyNow: 'Apply Now',
        viewDetails: 'View Details',
        dataDisclaimer: 'Job data is updated regularly. Last updated: October 2023. Apply for jobs directly through the employer websites.',
        allIndustries: 'All Industries',
        allTypes: 'All Types',
        allLevels: 'All Levels',
        fullTime: 'Full-time',
        partTime: 'Part-time',
        contract: 'Contract',
        freelance: 'Freelance',
        internship: 'Internship',
        entryLevel: 'Entry Level',
        midLevel: 'Mid Level',
        seniorLevel: 'Senior Level',
        technology: 'Technology',
        education: 'Education',
        healthcare: 'Healthcare',
        manufacturing: 'Manufacturing',
        automotive: 'Automotive',
        analytics: 'Analytics',
        construction: 'Construction',
        marketing: 'Marketing',
        design: 'Design',
        refresh: 'Refresh Jobs',
        loading: 'Loading...',
        loadingJobs: 'Loading jobs...',
        refreshing: '(Refreshing...)',
        new: 'New',
        favorite: 'Favorite',
        showFavorites: 'Show Favorites Only',
        addToFavorites: 'Add to favorites',
        removeFromFavorites: 'Remove from favorites',
        filters: 'Filter Jobs',
        found: 'found',
        searchPlaceholder: 'Search locations in India...',
        search: 'Search',
        searching: 'Searching...',
        findNearMe: 'Find Jobs Near Me',
        locating: 'Locating...',
        locationError: 'Could not get your location. Please check browser permissions.',
        geoNotSupported: 'Geolocation is not supported by your browser.',
        fetchError: 'Failed to fetch job data. Please try again later.'
      },
      chatbot: {
        startConversation: 'Start a conversation',
        askAnything: 'Ask me anything about education, career paths, or STEM opportunities',
        typeMessage: 'Type your message...',
        sendMessage: 'Send message',
        startListening: 'Start listening',
        stopListening: 'Stop listening',
        speak: 'Speak message',
        stopSpeaking: 'Stop speaking',
        voiceControls: 'Voice Controls Available',
        clickMicToSpeak: 'Click the microphone to speak',
        microphoneBlocked: 'Microphone access blocked',
        speechRecognitionNotSupported: 'Speech recognition is not supported in your browser',
        microphonePermissionRequired: 'Microphone permission is required',
        microphoneNotAllowed: 'Microphone permission denied',
        recognitionAborted: 'Speech recognition was aborted',
        networkError: 'Network error occurred',
        noSpeech: 'No speech detected',
        recognitionError: 'Speech recognition error',
        startListeningFailed: 'Failed to start speech recognition',
        speechSynthesisNotSupported: 'Speech synthesis is not supported in your browser',
        speechSynthesisError: 'Error occurred during speech synthesis',
        startSpeakingFailed: 'Failed to start speech synthesis'
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: 'होम',
        scholarships: 'छात्रवृत्ति',
        chatbot: 'करियर चैटबॉट',
        learning: 'सीखने के संसाधन',
        jobLocations: 'नौकरी स्थान'
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
      },
      jobLocations: {
        title: 'रोजगार के अवसर खोजें',
        description: 'पूरे भारत में रोजगार के अवसर खोजें। विभिन्न शहरों में पदों का पता लगाने के लिए मानचित्र का उपयोग करें और अपने कौशल और रुचियों के लिए सही मिलान खोजने के लिए उद्योग के अनुसार फ़िल्टर करें।',
        filterByIndustry: 'उद्योग:',
        filterByJobType: 'नौकरी प्रकार:',
        filterByExperience: 'अनुभव:',
        filterBySalary: 'वेतन सीमा:',
        availableJobs: 'उपलब्ध नौकरियां',
        noJobsFound: 'चयनित मापदंडों के लिए कोई नौकरी नहीं मिली।',
        salary: 'वेतन',
        applyNow: 'अभी आवेदन करें',
        viewDetails: 'विवरण देखें',
        dataDisclaimer: 'नौकरी डेटा नियमित रूप से अपडेट किया जाता है। अंतिम अपडेट: अक्टूबर 2023। नियोक्ता वेबसाइटों के माध्यम से सीधे नौकरियों के लिए आवेदन करें।',
        allIndustries: 'सभी उद्योग',
        allTypes: 'सभी प्रकार',
        allLevels: 'सभी स्तर',
        fullTime: 'पूर्णकालिक',
        partTime: 'अंशकालिक',
        contract: 'अनुबंध',
        freelance: 'फ्रीलांस',
        internship: 'इंटर्नशिप',
        entryLevel: 'प्रारंभिक स्तर',
        midLevel: 'मध्य स्तर',
        seniorLevel: 'वरिष्ठ स्तर',
        technology: 'प्रौद्योगिकी',
        education: 'शिक्षा',
        healthcare: 'स्वास्थ्य सेवा',
        manufacturing: 'विनिर्माण',
        automotive: 'ऑटोमोटिव',
        analytics: 'विश्लेषण',
        construction: 'निर्माण',
        marketing: 'मार्केटिंग',
        design: 'डिज़ाइन',
        refresh: 'नौकरियां रिफ्रेश करें',
        loading: 'लोड हो रहा है...',
        loadingJobs: 'नौकरियां लोड हो रही हैं...',
        refreshing: '(रिफ्रेश हो रहा है...)',
        new: 'नई',
        favorite: 'पसंदीदा',
        showFavorites: 'केवल पसंदीदा दिखाएं',
        addToFavorites: 'पसंदीदा में जोड़ें',
        removeFromFavorites: 'पसंदीदा से हटाएं',
        filters: 'नौकरियां फ़िल्टर करें',
        found: 'मिला',
        searchPlaceholder: 'भारत में स्थान खोजें...',
        search: 'खोजें',
        searching: 'खोज रहा है...',
        findNearMe: 'मेरे पास नौकरियां खोजें',
        locating: 'स्थान पता कर रहा है...',
        locationError: 'आपका स्थान प्राप्त नहीं कर सका। कृपया ब्राउज़र अनुमतियों की जांच करें।',
        geoNotSupported: 'जियोलोकेशन आपके ब्राउज़र द्वारा समर्थित नहीं है।',
        fetchError: 'नौकरी डेटा प्राप्त करने में विफल। कृपया बाद में पुनः प्रयास करें।'
      },
      chatbot: {
        startConversation: 'बातचीत शुरू करें',
        askAnything: 'शिक्षा, करियर पथ, या स्टेम अवसरों के बारे में कुछ भी पूछें',
        typeMessage: 'अपना संदेश लिखें...',
        sendMessage: 'संदेश भेजें',
        startListening: 'सुनना शुरू करें',
        stopListening: 'सुनना बंद करें',
        speak: 'संदेश बोलें',
        stopSpeaking: 'बोलना बंद करें',
        voiceControls: 'वॉयस कंट्रोल उपलब्ध',
        clickMicToSpeak: 'बोलने के लिए माइक्रोफोन पर क्लिक करें',
        microphoneBlocked: 'माइक्रोफोन एक्सेस अवरुद्ध',
        speechRecognitionNotSupported: 'आपके ब्राउज़र में स्पीच रिकग्निशन समर्थित नहीं है',
        microphonePermissionRequired: 'माइक्रोफोन अनुमति आवश्यक है',
        microphoneNotAllowed: 'माइक्रोफोन की अनुमति नहीं है',
        recognitionAborted: 'स्पीच रिकग्निशन रद्द कर दिया गया',
        networkError: 'नेटवर्क त्रुटि हुई',
        noSpeech: 'कोई भाषण नहीं मिला',
        recognitionError: 'स्पीच रिकग्निशन त्रुटि',
        startListeningFailed: 'स्पीच रिकग्निशन शुरू करने में विफल',
        speechSynthesisNotSupported: 'आपके ब्राउज़र में स्पीच सिंथेसिस समर्थित नहीं है',
        speechSynthesisError: 'स्पीच सिंथेसिस के दौरान त्रुटि हुई',
        startSpeakingFailed: 'स्पीच सिंथेसिस शुरू करने में विफल'
      }
    }
  },
  kn: {
    translation: {
      nav: {
        home: 'Home',
        scholarships: 'Scholarships',
        chatbot: 'Career Chatbot',
        learning: 'Learning Resources',
        jobLocations: 'ಉದ್ಯೋಗ ಸ್ಥಳಗಳು'
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
      },
      jobLocations: {
        title: 'ಉದ್ಯೋಗ ಅವಕಾಶಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
        description: 'ಭಾರತಾದ್ಯಂತ ಉದ್ಯೋಗ ಅವಕಾಶಗಳನ್ನು ಅನ್ವೇಷಿಸಿ. ವಿಭಿನ್ನ ನಗರಗಳಲ್ಲಿನ ಹುದ್ದೆಗಳನ್ನು ಅನ್ವೇಷಿಸಲು ನಕ್ಷೆಯನ್ನು ಬಳಸಿ ಮತ್ತು ನಿಮ್ಮ ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಆಸಕ್ತಿಗಳಿಗೆ ಸರಿಹೊಂದುವ ಹುಡುಕಲು ಉದ್ಯಮದ ಮೂಲಕ ಫಿಲ್ಟರ್ ಮಾಡಿ.',
        filterByIndustry: 'ಉದ್ಯಮ:',
        filterByJobType: 'ಉದ್ಯೋಗ ಪ್ರಕಾರ:',
        filterByExperience: 'ಅನುಭವ:',
        filterBySalary: 'ಸಂಬಳ ಶ್ರೇಣಿ:',
        availableJobs: 'ಲಭ್ಯವಿರುವ ಉದ್ಯೋಗಗಳು',
        noJobsFound: 'ಆಯ್ಕೆ ಮಾಡಿದ ಮಾನದಂಡಗಳಿಗೆ ಯಾವುದೇ ಉದ್ಯೋಗಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
        salary: 'ಸಂಬಳ',
        applyNow: 'ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
        viewDetails: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
        dataDisclaimer: 'ಉದ್ಯೋಗ ಡೇಟಾವನ್ನು ನಿಯಮಿತವಾಗಿ ನವೀಕರಿಸಲಾಗುತ್ತದೆ. ಕೊನೆಯ ನವೀಕರಣ: ಅಕ್ಟೋಬರ್ 2023. ಉದ್ಯೋಗದಾತರ ವೆಬ್‌ಸೈಟ್‌ಗಳ ಮೂಲಕ ನೇರವಾಗಿ ಉದ್ಯೋಗಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
        allIndustries: 'ಎಲ್ಲಾ ಉದ್ಯಮಗಳು',
        allTypes: 'ಎಲ್ಲಾ ಪ್ರಕಾರಗಳು',
        allLevels: 'ಎಲ್ಲಾ ಹಂತಗಳು',
        fullTime: 'ಪೂರ್ಣಾವಧಿ',
        partTime: 'ಪಾರ್ಟ್-ಟೈಮ್',
        contract: 'ಒಪ್ಪಂದ',
        freelance: 'ಫ್ರೀಲಾನ್ಸ್',
        internship: 'ಇಂಟರ್ನ್‌ಶಿಪ್',
        entryLevel: 'ಎಂಟ್ರಿ ಲೆವೆಲ್',
        midLevel: 'ಮಧ್ಯಮ ಹಂತ',
        seniorLevel: 'ಹಿರಿಯ ಹಂತ',
        technology: 'ತಂತ್ರಜ್ಞಾನ',
        education: 'ಶಿಕ್ಷಣ',
        healthcare: 'ಆರೋಗ್ಯ ರಕ್ಷಣೆ',
        manufacturing: 'ಉತ್ಪಾದನೆ',
        automotive: 'ಆಟೋಮೋಟಿವ್',
        analytics: 'ವಿಶ್ಲೇಷಣೆ',
        construction: 'ನಿರ್ಮಾಣ',
        marketing: 'ಮಾರ್ಕೆಟಿಂಗ್',
        design: 'ಡಿಸೈನ್',
        refresh: 'ಉದ್ಯೋಗಗಳನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ',
        loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
        loadingJobs: 'ಉದ್ಯೋಗಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ...',
        refreshing: '(ರಿಫ್ರೆಶ್ ಆಗುತ್ತಿದೆ...)',
        new: 'ಹೊಸ',
        favorite: 'ಮೆಚ್ಚಿನ',
        showFavorites: 'ಮೆಚ್ಚಿನವುಗಳನ್ನು ಮಾತ್ರ ತೋರಿಸಿ',
        addToFavorites: 'ಮೆಚ್ಚಿನವುಗಳಿಗೆ ಸೇರಿಸಿ',
        removeFromFavorites: 'ಮೆಚ್ಚಿನವುಗಳಿಂದ ತೆಗೆದುಹಾಕಿ',
        filters: 'ಉದ್ಯೋಗಗಳನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಿ',
        found: 'ಕಂಡುಬಂದಿದೆ',
        searchPlaceholder: 'ಭಾರತದಲ್ಲಿ ಸ್ಥಳಗಳನ್ನು ಹುಡುಕಿ...',
        search: 'ಹುಡುಕಿ',
        searching: 'ಹುಡುಕುತ್ತಿದೆ...',
        findNearMe: 'ನನ್ನ ಹತ್ತಿರದಲ್ಲಿ ಉದ್ಯೋಗಗಳನ್ನು ಹುಡುಕಿ',
        locating: 'ಸ್ಥಳವನ್ನು ಪತ್ತೆ ಮಾಡುತ್ತಿದೆ...',
        locationError: 'ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಬ್ರೌಸರ್ ಅನುಮತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
        geoNotSupported: 'ಜಿಯೋಲೊಕೇಶನ್ ನಿಮ್ಮ ಬ್ರೌಸರ್ ಮೂಲಕ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.',
        fetchError: 'ಉದ್ಯೋಗ ಡೇಟಾವನ್ನು ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
      },
      chatbot: {
        startConversation: 'ಸಂಭಾಷಣೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ',
        askAnything: 'ಶಿಕ್ಷಣ, ವೃತ್ತಿಪರ ಮಾರ್ಗಗಳು ಅಥವಾ STEM ಅವಕಾಶಗಳ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ',
        typeMessage: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...',
        sendMessage: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
        startListening: 'ಆಲಿಸಲು ಪ್ರಾರಂಭಿಸಿ',
        stopListening: 'ಆಲಿಸುವುದನ್ನು ನಿಲ್ಲಿಸಿ',
        speak: 'ಸಂದೇಶವನ್ನು ಮಾತನಾಡಿ',
        stopSpeaking: 'ಮಾತನಾಡುವುದನ್ನು ನಿಲ್ಲಿಸಿ',
        voiceControls: 'ಧ್ವನಿ ನಿಯಂತ್ರಣಗಳು ಲಭ್ಯವಿದೆ',
        clickMicToSpeak: 'ಮಾತನಾಡಲು ಮೈಕ್ರೋಫೋನ್ ಕ್ಲಿಕ್ ಮಾಡಿ',
        microphoneBlocked: 'ಮೈಕ್ರೋಫೋನ್ ಪ್ರವೇಶ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ',
        speechRecognitionNotSupported: 'ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸ್ಪೀಚ್ ರೆಕಗ್ನಿಷನ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ',
        microphonePermissionRequired: 'ಮೈಕ್ರೋಫೋನ್ ಅನುಮತಿ ಅಗತ್ಯವಿದೆ',
        microphoneNotAllowed: 'ಮೈಕ್ರೋಫೋನ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ',
        recognitionAborted: 'ಸ್ಪೀಚ್ ರೆಕಗ್ನಿಷನ್ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ',
        networkError: 'ನೆಟ್‌ವರ್ಕ್ ದೋಷ ಸಂಭವಿಸಿದೆ',
        noSpeech: 'ಯಾವುದೇ ಮಾತು ಪತ್ತೆಯಾಗಿಲ್ಲ',
        recognitionError: 'ಸ್ಪೀಚ್ ರೆಕಗ್ನಿಷನ್ ದೋಷ',
        startListeningFailed: 'ಸ್ಪೀಚ್ ರೆಕಗ್ನಿಷನ್ ಪ್ರಾರಂಭಿಸಲು ವಿಫಲವಾಗಿದೆ',
        speechSynthesisNotSupported: 'ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸ್ಪೀಚ್ ಸಿಂಥೆಸಿಸ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ',
        speechSynthesisError: 'ಸ್ಪೀಚ್ ಸಿಂಥೆಸಿಸ್ ಸಮಯದಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ',
        startSpeakingFailed: 'ಸ್ಪೀಚ್ ಸಿಂಥೆಸಿಸ್ ಪ್ರಾರಂಭಿಸಲು ವಿಫಲವಾಗಿದೆ'
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