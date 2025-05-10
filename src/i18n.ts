import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        careerQuiz: 'Career Quiz',
        scholarships: 'Scholarships',
        courses: 'Courses',
        login: 'Login',
        signup: 'Sign Up',
        profile: 'Profile',
        logout: 'Logout',
        signIn: 'Sign In',
        signOut: 'Sign Out',
        lightMode: 'Light Mode',
        darkMode: 'Dark Mode',
        achievements: 'Achievements',
        stemAssistant: 'STEM Assistant',
        apkDownloads: 'APK Downloads',
        jobLocations: 'Job Locations',
        attentiveness: 'Attentiveness'
      },
      resumeBuilder: 'Resume Builder',
      learning: 'Learning',
      home: {
        title: 'Welcome to Aarambh',
        subtitle: 'Your journey to a successful career starts here',
        features: {
          careerQuiz: {
            title: 'Career Discovery Quiz',
            description: 'Take our comprehensive quiz to discover career paths that match your interests and skills.'
          },
          scholarships: {
            title: 'Scholarship Finder',
            description: 'Find and apply for scholarships that match your profile and academic goals.'
          },
          courses: {
            title: 'Course Recommendations',
            description: 'Get personalized course recommendations based on your career interests and goals.'
          }
        },
        getAssistanceButton: 'Ask STEM Assistant',
        newFeature: 'New: Interactive Job Locations Map',
        welcomeTitle: 'Your Career Journey Starts with Aarambh',
        welcomeSubtitle: 'Empowering rural students with personalized career guidance, scholarship opportunities, and interactive learning resources',
        startQuizButton: 'Start Career Quiz'
      },
      scholarships: {
        title: 'Available Scholarships',
        subtitle: 'Find and apply for scholarships that match your profile',
        searchPlaceholder: 'Search scholarships...',
        deadline: 'Deadline',
        requirements: 'Requirements',
        applyButton: 'Apply Now',
        items: {
          merit: {
            title: 'Merit Scholarship',
            description: 'Based on academic excellence and achievements.',
            amount: 'Up to ₹50,000',
            deadline: 'June 30, 2024',
            requirements: {
              1: 'Minimum 85% in previous year',
              2: 'No backlogs',
              3: 'Good conduct certificate'
            }
          },
          need: {
            title: 'Need-Based Scholarship',
            description: 'For students with financial constraints.',
            amount: 'Up to ₹75,000',
            deadline: 'July 15, 2024',
            requirements: {
              1: 'Income proof required',
              2: 'Minimum 75% in previous year',
              3: 'No backlogs'
            }
          },
          sports: {
            title: 'Sports Scholarship',
            description: 'For outstanding athletes and sports performers.',
            amount: 'Up to ₹40,000',
            deadline: 'August 1, 2024',
            requirements: {
              1: 'State/National level achievements',
              2: 'Minimum 70% in academics',
              3: 'Sports certificate required'
            }
          }
        }
      },
      careerQuiz: {
        pageTitle: 'Career Discovery Quiz',
        pageSubtitle: 'Find career paths that match your interests, skills, and preferences',
        title: 'Discover Your Ideal Career Path',
        description: 'Answer a few questions about your interests, skills, and preferences to get personalized career recommendations. This quiz takes about 5 minutes to complete.',
        startButton: 'Start Quiz',
        resultsTitle: 'Your Career Recommendations',
        resultsDescription: 'Based on your answers, here are career paths that might be a good fit for you:',
        keySkills: 'Key Skills:',
        recommendedCourses: 'Recommended Courses:',
        retakeButton: 'Retake Quiz',
        questionNumber: 'Question {currentQuestion} of {total}',
        previousButton: 'Previous',
        nextButton: 'Next',
        seeResultsButton: 'See Results',
        comingSoon: 'Quiz content coming soon...'
      },
      jobLocations: {
        title: 'Job Locations',
        subtitle: 'Find jobs near you and explore opportunities across India',
        jobSearch: 'Job & Location Search',
        searchLocation: 'Search by Location',
        filterBy: 'Filter By',
        allIndustries: 'All Industries',
        technology: 'Technology',
        education: 'Education',
        healthcare: 'Healthcare',
        manufacturing: 'Manufacturing',
        automotive: 'Automotive',
        analytics: 'Analytics',
        construction: 'Construction',
        marketing: 'Marketing',
        design: 'Design',
        findNearMe: 'Find Jobs Near Me',
        locating: 'Locating...',
        loading: 'Loading job locations...',
        refreshing: 'Loading...',
        refresh: 'Refresh',
        retry: 'Retry',
        noJobsNearby: 'No jobs found near your location. Try increasing the search radius.',
        jobsFound: 'Found {{count}} jobs within {{radius}}km of your location.',
        locationPermissionDenied: 'Location permission denied. Please enable location access in your browser settings.',
        locationUnavailable: 'Location information is unavailable. Please try again later.',
        locationTimeout: 'Location request timed out. Please try again.',
        locationError: 'Could not get your location. Please check browser permissions.',
        new: 'New',
        favorite: 'Favorite',
        viewDetails: 'View Details',
        hideJobs: 'Hide Jobs List',
        showJobs: 'Show Jobs List',
        savedJobs: 'Saved Jobs',
        availableJobs: 'Available Jobs',
        showAll: 'Show All',
        showSaved: 'Show Saved'
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: 'होम',
        careerQuiz: 'कैरियर क्विज़',
        scholarships: 'छात्रवृत्ति',
        courses: 'कोर्स',
        login: 'लॉग इन',
        signup: 'साइन अप',
        profile: 'प्रोफ़ाइल',
        logout: 'लॉग आउट',
        signIn: 'साइन इन',
        signOut: 'साइन आउट',
        lightMode: 'लाइट मोड',
        darkMode: 'डार्क मोड',
        achievements: 'उपलब्धियां',
        stemAssistant: 'स्टेम असिस्टेंट',
        apkDownloads: 'एपीके डाउनलोड',
        jobLocations: 'नौकरी स्थान',
        attentiveness: 'ध्यान'
      },
      resumeBuilder: 'रेज़्यूमे बिल्डर',
      learning: 'सीखना',
      home: {
        title: 'आरंभ में आपका स्वागत है',
        subtitle: 'एक सफल कैरियर की आपकी यात्रा यहीं से शुरू होती है',
        features: {
          careerQuiz: {
            title: 'कैरियर डिस्कवरी क्विज़',
            description: 'अपनी रुचियों और कौशलों से मेल खाते कैरियर पथों की खोज के लिए हमारी व्यापक क्विज़ लें।'
          },
          scholarships: {
            title: 'छात्रवृत्ति खोजक',
            description: 'अपनी प्रोफ़ाइल और शैक्षणिक लक्ष्यों से मेल खाती छात्रवृत्तियों को खोजें और आवेदन करें।'
          },
          courses: {
            title: 'कोर्स सिफारिशें',
            description: 'अपनी कैरियर रुचियों और लक्ष्यों के आधार पर व्यक्तिगत कोर्स सिफारिशें प्राप्त करें।'
          }
        },
        getAssistanceButton: 'स्टेम असिस्टेंट से पूछें',
        newFeature: 'नया: इंटरैक्टिव जॉब लोकेशन्स मैप',
        welcomeTitle: 'आपकी कैरियर यात्रा आरंभ से शुरू होती है',
        welcomeSubtitle: 'ग्रामीण छात्रों को व्यक्तिगत कैरियर मार्गदर्शन, छात्रवृत्ति अवसरों और इंटरैक्टिव शिक्षण संसाधनों के साथ सशक्त बनाना',
        startQuizButton: 'कैरियर क्विज़ शुरू करें'
      },
      scholarships: {
        title: 'उपलब्ध छात्रवृत्तियां',
        subtitle: 'अपनी प्रोफ़ाइल से मेल खाती छात्रवृत्तियों को खोजें और आवेदन करें',
        searchPlaceholder: 'छात्रवृत्तियां खोजें...',
        deadline: 'अंतिम तिथि',
        requirements: 'आवश्यकताएं',
        applyButton: 'अभी आवेदन करें',
        items: {
          merit: {
            title: 'मेरिट छात्रवृत्ति',
            description: 'शैक्षणिक उत्कृष्टता और उपलब्धियों के आधार पर।',
            amount: '₹50,000 तक',
            deadline: '30 जून, 2024',
            requirements: {
              1: 'पिछले वर्ष में न्यूनतम 85%',
              2: 'कोई बैकलॉग नहीं',
              3: 'अच्छे आचरण का प्रमाण पत्र'
            }
          },
          need: {
            title: 'आवश्यकता-आधारित छात्रवृत्ति',
            description: 'आर्थिक बाधाओं वाले छात्रों के लिए।',
            amount: '₹75,000 तक',
            deadline: '15 जुलाई, 2024',
            requirements: {
              1: 'आय प्रमाण आवश्यक',
              2: 'पिछले वर्ष में न्यूनतम 75%',
              3: 'कोई बैकलॉग नहीं'
            }
          },
          sports: {
            title: 'खेल छात्रवृत्ति',
            description: 'उत्कृष्ट एथलीटों और खेल प्रदर्शनकर्ताओं के लिए।',
            amount: '₹40,000 तक',
            deadline: '1 अगस्त, 2024',
            requirements: {
              1: 'राज्य/राष्ट्रीय स्तर की उपलब्धियां',
              2: 'शैक्षणिक में न्यूनतम 70%',
              3: 'खेल प्रमाण पत्र आवश्यक'
            }
          }
        }
      },
      careerQuiz: {
        pageTitle: 'कैरियर डिस्कवरी क्विज़',
        pageSubtitle: 'अपनी रुचियों, कौशल और प्राथमिकताओं के अनुसार कैरियर पथ खोजें',
        title: 'अपना आदर्श कैरियर पथ खोजें',
        description: 'व्यक्तिगत कैरियर सिफारिशें प्राप्त करने के लिए अपनी रुचियों, कौशल और प्राथमिकताओं के बारे में कुछ प्रश्नों का उत्तर दें। इस क्विज़ को पूरा होने में लगभग 5 मिनट लगते हैं।',
        startButton: 'क्विज़ शुरू करें',
        resultsTitle: 'आपकी कैरियर सिफारिशें',
        resultsDescription: 'आपके उत्तरों के आधार पर, यहां कुछ कैरियर पथ हैं जो आपके लिए उपयुक्त हो सकते हैं:',
        keySkills: 'मुख्य कौशल:',
        recommendedCourses: 'अनुशंसित पाठ्यक्रम:',
        retakeButton: 'क्विज़ दोबारा लें',
        questionNumber: 'प्रश्न {currentQuestion} / {total}',
        previousButton: 'पिछला',
        nextButton: 'अगला',
        seeResultsButton: 'परिणाम देखें',
        comingSoon: 'क्विज़ सामग्री जल्द आ रही है...'
      },
      jobLocations: {
        title: 'नौकरी स्थान',
        subtitle: 'अपने आस-पास की नौकरियां खोजें और पूरे भारत में अवसरों का पता लगाएं',
        jobSearch: 'नौकरी और स्थान खोज',
        searchLocation: 'स्थान के अनुसार खोजें',
        filterBy: 'फ़िल्टर करें',
        allIndustries: 'सभी उद्योग',
        technology: 'प्रौद्योगिकी',
        education: 'शिक्षा',
        healthcare: 'स्वास्थ्य सेवा',
        manufacturing: 'विनिर्माण',
        automotive: 'ऑटोमोटिव',
        analytics: 'एनालिटिक्स',
        construction: 'निर्माण',
        marketing: 'मार्केटिंग',
        design: 'डिज़ाइन',
        findNearMe: 'मेरे पास की नौकरियां खोजें',
        locating: 'स्थान खोज रहे हैं...',
        loading: 'नौकरी स्थान लोड हो रहे हैं...',
        refreshing: 'लोड हो रहा है...',
        refresh: 'रिफ्रेश करें',
        retry: 'पुनः प्रयास करें',
        noJobsNearby: 'आपके स्थान के पास कोई नौकरी नहीं मिली। खोज त्रिज्या बढ़ाने का प्रयास करें।',
        jobsFound: 'आपके स्थान के {{radius}} किमी के भीतर {{count}} नौकरियां मिलीं।',
        locationPermissionDenied: 'स्थान की अनुमति अस्वीकृत। कृपया अपनी ब्राउज़र सेटिंग्स में स्थान पहुंच सक्षम करें।',
        locationUnavailable: 'स्थान की जानकारी उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।',
        locationTimeout: 'स्थान अनुरोध समय सीमा समाप्त। कृपया पुनः प्रयास करें।',
        locationError: 'आपका स्थान प्राप्त नहीं किया जा सका। कृपया ब्राउज़र अनुमतियां जांचें।',
        new: 'नया',
        favorite: 'पसंदीदा',
        viewDetails: 'विवरण देखें',
        hideJobs: 'नौकरियों की सूची छिपाएं',
        showJobs: 'नौकरियों की सूची दिखाएं',
        savedJobs: 'सहेजी गई नौकरियां',
        availableJobs: 'उपलब्ध नौकरियां',
        showAll: 'सभी दिखाएं',
        showSaved: 'सहेजे गए दिखाएं'
      }
    }
  },
  kn: {
    translation: {
      nav: {
        home: 'ಮುಖಪುಟ',
        careerQuiz: 'ವೃತ್ತಿ ಪರೀಕ್ಷೆ',
        scholarships: 'ಅನುದಾನಗಳು',
        courses: 'ಕೋರ್ಸ್‌ಗಳು',
        login: 'ಲಾಗಿನ್',
        signup: 'ಸೈನ್ ಅಪ್',
        profile: 'ಪ್ರೊಫೈಲ್',
        logout: 'ಲಾಗ್ ಔಟ್',
        signIn: 'ಸೈನ್ ಇನ್',
        signOut: 'ಸೈನ್ ಔಟ್',
        lightMode: 'ಲೈಟ್ ಮೋಡ್',
        darkMode: 'ಡಾರ್ಕ್ ಮೋಡ್',
        achievements: 'ಸಾಧನೆಗಳು',
        stemAssistant: 'ಸ್ಟೆಮ್ ಅಸಿಸ್ಟೆಂಟ್',
        apkDownloads: 'ಎಪಿಕೆ ಡೌನ್‌ಲೋಡ್‌ಗಳು',
        jobLocations: 'ಉದ್ಯೋಗ ಸ್ಥಳಗಳು',
        attentiveness: 'ಗಮನ'
      },
      resumeBuilder: 'ರೆಜ್ಯೂಮೆ ಬಿಲ್ಡರ್',
      learning: 'ಕಲಿಸು',
      home: {
        title: 'ಆರಂಭಕ್ಕೆ ಸುಸ್ವಾಗತ',
        subtitle: 'ಯಶಸ್ವಿ ವೃತ್ತಿಗೆ ನಿಮ್ಮ ಪ್ರಯಾಣ ಇಲ್ಲಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ',
        features: {
          careerQuiz: {
            title: 'ವೃತ್ತಿ ಪರೀಕ್ಷೆ',
            description: 'ನಿಮ್ಮ ಆಸಕ್ತಿಗಳು ಮತ್ತು ಕೌಶಲ್ಯಗಳಿಗೆ ಹೊಂದಿಕೊಳ್ಳುವ ವೃತ್ತಿ ಮಾರ್ಗಗಳನ್ನು ಹುಡುಕಲು ನಮ್ಮ ವ್ಯಾಪಕ ಪರೀಕ್ಷೆಯನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.'
          },
          scholarships: {
            title: 'ಅನುದಾನ ಹುಡುಕು',
            description: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಗುರಿಗಳಿಗೆ ಹೊಂದಿಕೊಳ್ಳುವ ಅನುದಾನಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.'
          },
          courses: {
            title: 'ಕೋರ್ಸ್ ಶಿಫಾರಸುಗಳು',
            description: 'ನಿಮ್ಮ ವೃತ್ತಿ ಆಸಕ್ತಿಗಳು ಮತ್ತು ಗುರಿಗಳ ಆಧಾರದ ಮೇಲೆ ವೈಯಕ್ತಿಕ ಕೋರ್ಸ್ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ.'
          }
        },
        getAssistanceButton: 'ಸ್ಟೆಮ್ ಅಸಿಸ್ಟೆಂಟ್‌ನನ್ನು ಕೇಳಿ',
        newFeature: 'ಹೊಸ: ಇಂಟರ್ಯಾಕ್ಟಿವ್ ಜಾಬ್ ಲೊಕೇಶನ್ಸ್ ಮ್ಯಾಪ್',
        welcomeTitle: 'ನಿಮ್ಮ ವೃತ್ತಿ ಪ್ರಯಾಣ ಆರಂಭದೊಂದಿಗೆ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ',
        welcomeSubtitle: 'ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವೈಯಕ್ತಿಕ ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶನ, ಅನುದಾನ ಅವಕಾಶಗಳು ಮತ್ತು ಇಂಟರ್ಯಾಕ್ಟಿವ್ ಕಲಿಕೆ ಸಂಪನ್ಮೂಲಗಳೊಂದಿಗೆ ಸಬಲೀಕರಣ',
        startQuizButton: 'ವೃತ್ತಿ ಪರೀಕ್ಷೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ'
      },
      scholarships: {
        title: 'ಲಭ್ಯವಿರುವ ಅನುದಾನಗಳು',
        subtitle: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್‌ಗೆ ಹೊಂದಿಕೊಳ್ಳುವ ಅನುದಾನಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
        searchPlaceholder: 'ಅನುದಾನಗಳನ್ನು ಹುಡುಕಿ...',
        deadline: 'ಕೊನೆಯ ದಿನಾಂಕ',
        requirements: 'ಅಗತ್ಯತೆಗಳು',
        applyButton: 'ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
        items: {
          merit: {
            title: 'ಮೆರಿಟ್ ಅನುದಾನ',
            description: 'ಶೈಕ್ಷಣಿಕ ಶ್ರೇಷ್ಠತೆ ಮತ್ತು ಸಾಧನೆಗಳ ಆಧಾರದ ಮೇಲೆ.',
            amount: '₹50,000 ವರೆಗೆ',
            deadline: 'ಜೂನ್ 30, 2024',
            requirements: {
              1: 'ಹಿಂದಿನ ವರ್ಷದಲ್ಲಿ ಕನಿಷ್ಠ 85%',
              2: 'ಬ್ಯಾಕ್‌ಲಾಗ್‌ಗಳಿಲ್ಲ',
              3: 'ಉತ್ತಮ ನಡವಳಿಕೆಯ ಪ್ರಮಾಣಪತ್ರ'
            }
          },
          need: {
            title: 'ಅಗತ್ಯ-ಆಧಾರಿತ ಅನುದಾನ',
            description: 'ಹಣಕಾಸಿನ ನಿರ್ಬಂಧಗಳಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ.',
            amount: '₹75,000 ವರೆಗೆ',
            deadline: 'ಜುಲೈ 15, 2024',
            requirements: {
              1: 'ಆದಾಯ ಪುರಾವೆ ಅಗತ್ಯ',
              2: 'ಹಿಂದಿನ ವರ್ಷದಲ್ಲಿ ಕನಿಷ್ಠ 75%',
              3: 'ಬ್ಯಾಕ್‌ಲಾಗ್‌ಗಳಿಲ್ಲ'
            }
          },
          sports: {
            title: 'ಕ್ರೀಡಾ ಅನುದಾನ',
            description: 'ಅತ್ಯುತ್ತಮ ಕ್ರೀಡಾಪಟುಗಳು ಮತ್ತು ಕ್ರೀಡಾ ಪ್ರದರ್ಶಕರಿಗೆ.',
            amount: '₹40,000 ವರೆಗೆ',
            deadline: 'ಆಗಸ್ಟ್ 1, 2024',
            requirements: {
              1: 'ರಾಜ್ಯ/ರಾಷ್ಟ್ರೀಯ ಮಟ್ಟದ ಸಾಧನೆಗಳು',
              2: 'ಶೈಕ್ಷಣಿಕದಲ್ಲಿ ಕನಿಷ್ಠ 70%',
              3: 'ಕ್ರೀಡಾ ಪ್ರಮಾಣಪತ್ರ ಅಗತ್ಯ'
            }
          }
        }
      },
      careerQuiz: {
        pageTitle: 'ವೃತ್ತಿ ಪರೀಕ್ಷೆ',
        pageSubtitle: 'ನಿಮ್ಮ ಆಸಕ್ತಿಗಳು, ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಆದ್ಯತೆಗಳಿಗೆ ಹೊಂದಿಕೊಳ್ಳುವ ವೃತ್ತಿ ಮಾರ್ಗಗಳನ್ನು ಹುಡುಕಿ',
        title: 'ನಿಮ್ಮ ಆದರ್ಶ ವೃತ್ತಿ ಮಾರ್ಗವನ್ನು ಹುಡುಕಿ',
        description: 'ವೈಯಕ್ತಿಕ ವೃತ್ತಿ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಆಸಕ್ತಿಗಳು, ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಆದ್ಯತೆಗಳ ಬಗ್ಗೆ ಕೆಲವು ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ. ಈ ಪರೀಕ್ಷೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ಸುಮಾರು 5 ನಿಮಿಷಗಳು ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ.',
        startButton: 'ಪರೀಕ್ಷೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ',
        resultsTitle: 'ನಿಮ್ಮ ವೃತ್ತಿ ಶಿಫಾರಸುಗಳು',
        resultsDescription: 'ನಿಮ್ಮ ಉತ್ತರಗಳ ಆಧಾರದ ಮೇಲೆ, ನಿಮಗೆ ಸೂಕ್ತವಾಗಬಹುದಾದ ವೃತ್ತಿ ಮಾರ್ಗಗಳು ಇಲ್ಲಿವೆ:',
        keySkills: 'ಪ್ರಮುಖ ಕೌಶಲ್ಯಗಳು:',
        recommendedCourses: 'ಶಿಫಾರಸು ಮಾಡಲಾದ ಕೋರ್ಸ್‌ಗಳು:',
        retakeButton: 'ಪರೀಕ್ಷೆಯನ್ನು ಮತ್ತೆ ತೆಗೆದುಕೊಳ್ಳಿ',
        questionNumber: 'ಪ್ರಶ್ನೆ {currentQuestion} / {total}',
        previousButton: 'ಹಿಂದಿನ',
        nextButton: 'ಮುಂದಿನ',
        seeResultsButton: 'ಫಲಿತಾಂಶಗಳನ್ನು ನೋಡಿ',
        comingSoon: 'ಪರೀಕ್ಷೆಯ ವಿಷಯಗಳು ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿವೆ...'
      },
      jobLocations: {
        title: 'ಉದ್ಯೋಗ ಸ್ಥಳಗಳು',
        subtitle: 'ನಿಮ್ಮ ಸುತ್ತಲಿನ ಉದ್ಯೋಗಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಭಾರತದಾದ್ಯಂತ ಅವಕಾಶಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
        jobSearch: 'ಉದ್ಯೋಗ ಮತ್ತು ಸ್ಥಳ ಹುಡುಕಾಟ',
        searchLocation: 'ಸ್ಥಳದಿಂದ ಹುಡುಕಿ',
        filterBy: 'ಫಿಲ್ಟರ್ ಮಾಡಿ',
        allIndustries: 'ಎಲ್ಲಾ ಉದ್ಯಮಗಳು',
        technology: 'ತಂತ್ರಜ್ಞಾನ',
        education: 'ಶಿಕ್ಷಣ',
        healthcare: 'ಆರೋಗ್ಯ ಸೇವೆ',
        manufacturing: 'ತಯಾರಿಕೆ',
        automotive: 'ಆಟೋಮೋಟಿವ್',
        analytics: 'ವಿಶ್ಲೇಷಣೆ',
        construction: 'ನಿರ್ಮಾಣ',
        marketing: 'ಮಾರ್ಕೆಟಿಂಗ್',
        design: 'ವಿನ್ಯಾಸ',
        findNearMe: 'ನನ್ನ ಸುತ್ತಲಿನ ಉದ್ಯೋಗಗಳನ್ನು ಹುಡುಕಿ',
        locating: 'ಸ್ಥಳವನ್ನು ಹುಡುಕುತ್ತಿದೆ...',
        loading: 'ಉದ್ಯೋಗ ಸ್ಥಳಗಳನ್ನು ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
        refreshing: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
        refresh: 'ರಿಫ್ರೆಶ್ ಮಾಡಿ',
        retry: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
        noJobsNearby: 'ನಿಮ್ಮ ಸ್ಥಳದ ಸುತ್ತಲಿನಲ್ಲಿ ಯಾವುದೇ ಉದ್ಯೋಗಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಹುಡುಕಾಟ ವ್ಯಾಪ್ತಿಯನ್ನು ಹೆಚ್ಚಿಸಲು ಪ್ರಯತ್ನಿಸಿ.',
        jobsFound: 'ನಿಮ್ಮ ಸ್ಥಳದ {{radius}} ಕಿಮೀ ಒಳಗೆ {{count}} ಉದ್ಯೋಗಗಳು ಕಂಡುಬಂದಿವೆ.',
        locationPermissionDenied: 'ಸ್ಥಳ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಸ್ಥಳ ಪಹುಂಚವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ.',
        locationUnavailable: 'ಸ್ಥಳ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
        locationTimeout: 'ಸ್ಥಳ ವಿನಂತಿ ಸಮಯ ಮೀರಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
        locationError: 'ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಬ್ರೌಸರ್ ಅನುಮತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
        new: 'ಹೊಸ',
        favorite: 'ಮೆಚ್ಚಿನ',
        viewDetails: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
        hideJobs: 'ಉದ್ಯೋಗಗಳ ಪಟ್ಟಿಯನ್ನು ಮರೆಮಾಡಿ',
        showJobs: 'ಉದ್ಯೋಗಗಳ ಪಟ್ಟಿಯನ್ನು ತೋರಿಸಿ',
        savedJobs: 'ಉಳಿಸಿದ ಉದ್ಯೋಗಗಳು',
        availableJobs: 'ಲಭ್ಯವಿರುವ ಉದ್ಯೋಗಗಳು',
        showAll: 'ಎಲ್ಲಾ ತೋರಿಸಿ',
        showSaved: 'ಉಳಿಸಿದವುಗಳನ್ನು ತೋರಿಸಿ'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'kn'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n; 