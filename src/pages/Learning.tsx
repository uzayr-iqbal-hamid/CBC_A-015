import React, { useState, useMemo, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Button, 
  Container, 
  Box,
  TextField,
  Chip,
  InputAdornment,
  Fade,
  useTheme,
  Paper,
  Divider,
  Zoom
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SchoolIcon from '@mui/icons-material/School';
import { motion } from 'framer-motion';
import PlusIcon from '@mui/icons-material/Add';
import PlayIcon from '@mui/icons-material/PlayArrow';
import { useTranslation } from 'react-i18next';

const ResourceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: 'var(--background-lighter)',
  color: 'var(--text)',
  border: '1px solid var(--border)',
  borderRadius: '20px',
  overflow: 'hidden',
  position: 'relative',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  background: 'rgba(255, 255, 255, 0.7)',
  boxShadow: 
    '0 4px 15px rgba(0, 0, 0, 0.1),' +
    '0 0 0 1px rgba(255, 255, 255, 0.1),' +
    'inset 0 0 20px rgba(255, 255, 255, 0.05),' +
    '0 0 20px rgba(99, 102, 241, 0.2)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -50,
    left: -50,
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: 
      '0 20px 40px rgba(0, 0, 0, 0.2),' +
      '0 0 0 1px rgba(255, 255, 255, 0.2),' +
      'inset 0 0 30px rgba(255, 255, 255, 0.1),' +
      '0 0 30px rgba(99, 102, 241, 0.3)',
    borderColor: 'var(--primary)',
    '&::before': {
      opacity: 1,
    },
    '&::after': {
      opacity: 1,
    },
    '& .resource-icon': {
      transform: 'scale(1.15) rotate(5deg)',
    },
    '& .visit-button': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  '&.MuiTypography-h1, &.MuiTypography-h2, &.MuiTypography-h3, &.MuiTypography-h4, &.MuiTypography-h5, &.MuiTypography-h6': {
    fontFamily: '"Poppins", sans-serif !important',
    fontWeight: 600,
  },
  '&.MuiTypography-body1, &.MuiTypography-body2, &.MuiTypography-caption': {
    fontFamily: '"Roboto", sans-serif !important',
  },
})) as typeof Typography;

const CategoryChip = styled(Chip)(({ theme }) => ({
  margin: '4px',
  backgroundColor: 'var(--background)',
  color: 'var(--text)',
  border: '1px solid var(--border)',
  borderRadius: '20px',
  padding: '4px 12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&.Mui-selected': {
    background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(45deg, var(--primary-dark), var(--secondary-dark))',
    },
  },
  '&:hover': {
    backgroundColor: 'var(--background-hover)',
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'var(--background)',
    color: 'var(--text)',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: 'var(--border)',
      transition: 'all 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: 'var(--primary)',
      borderWidth: '2px',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--primary)',
      borderWidth: '2px',
    },
  },
}));

interface LearningResource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  icon: string;
  image: string;
  rating: string;
  modules: number;
  duration: number;
  level: string;
  isFavorite: boolean;
}

const Learning: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModule, setShowAddModule] = useState(false);
  const [learningResources, setLearningResources] = useState<LearningResource[]>([
    {
      id: '1',
      title: 'Mathematics Fundamentals',
      description: 'Master the basics of algebra and calculus with interactive lessons',
      url: '/learning/math',
      category: 'Mathematics',
      icon: '📐',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.8',
      modules: 12,
      duration: 24,
      level: 'Beginner',
      isFavorite: false
    },
    {
      id: '2',
      title: 'Physics for Engineers',
      description: 'Comprehensive physics course with practical applications',
      url: '/learning/physics',
      category: 'Physics',
      icon: '⚡',
      image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.7',
      modules: 8,
      duration: 16,
      level: 'Intermediate',
      isFavorite: false
    },
    {
      id: '3',
      title: 'Programming Basics',
      description: 'Learn programming fundamentals with hands-on projects',
      url: '/learning/programming',
      category: 'Computer Science',
      icon: '💻',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.9',
      modules: 10,
      duration: 20,
      level: 'Beginner',
      isFavorite: false
    },
    {
      id: '4',
      title: 'Khan Academy',
      description: 'Free online courses, lessons, and practice in math, science, and more. Perfect for students of all ages.',
      url: 'https://www.khanacademy.org',
      category: 'General Education',
      icon: '📚',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.9',
      modules: 1000,
      duration: 0,
      level: 'All Levels',
      isFavorite: false
    },
    {
      id: '5',
      title: 'Coursera',
      description: 'Access to free courses from top universities and companies worldwide. Earn certificates to boost your career.',
      url: 'https://www.coursera.org',
      category: 'Higher Education',
      icon: '🎓',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.8',
      modules: 5000,
      duration: 0,
      level: 'All Levels',
      isFavorite: false
    },
    {
      id: '6',
      title: 'edX',
      description: 'Free courses from the world\'s best universities and institutions. Learn at your own pace.',
      url: 'https://www.edx.org',
      category: 'Higher Education',
      icon: '🌐',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.7',
      modules: 3000,
      duration: 0,
      level: 'All Levels',
      isFavorite: false
    },
    {
      id: '7',
      title: 'Codecademy',
      description: 'Free coding lessons and interactive exercises. Perfect for beginners in programming.',
      url: 'https://www.codecademy.com',
      category: 'Programming',
      icon: '💻',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.6',
      modules: 200,
      duration: 0,
      level: 'Beginner',
      isFavorite: false
    },
    {
      id: '8',
      title: 'Duolingo',
      description: 'Free language learning platform with interactive lessons. Learn a new language in a fun way.',
      url: 'https://www.duolingo.com',
      category: 'Languages',
      icon: '🗣️',
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.8',
      modules: 100,
      duration: 0,
      level: 'All Levels',
      isFavorite: false
    },
    {
      id: '9',
      title: 'MIT OpenCourseWare',
      description: 'Free access to MIT\'s course materials. High-quality educational content from a world-renowned institution.',
      url: 'https://ocw.mit.edu',
      category: 'Higher Education',
      icon: '🎯',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.9',
      modules: 2500,
      duration: 0,
      level: 'Advanced',
      isFavorite: false
    },
    {
      id: '10',
      title: 'YouTube EDU',
      description: 'Educational content from top educators and institutions. Learn through engaging video content.',
      url: 'https://www.youtube.com/education',
      category: 'Video Learning',
      icon: '🎥',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.7',
      modules: 10000,
      duration: 0,
      level: 'All Levels',
      isFavorite: false
    },
    {
      id: '11',
      title: 'Google Digital Garage',
      description: 'Free digital skills training and certification. Boost your career with essential digital skills.',
      url: 'https://learndigital.withgoogle.com/digitalgarage',
      category: 'Digital Skills',
      icon: '🔧',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.8',
      modules: 150,
      duration: 0,
      level: 'All Levels',
      isFavorite: false
    },
    {
      id: '12',
      title: 'OpenLearn',
      description: 'Free learning resources from The Open University. Quality education accessible to everyone.',
      url: 'https://www.open.edu/openlearn',
      category: 'Higher Education',
      icon: '📖',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.6',
      modules: 1000,
      duration: 0,
      level: 'All Levels',
      isFavorite: false
    },
    {
      id: '13',
      title: 'Machine Learning by Stanford University',
      description: 'Learn the fundamentals of machine learning and AI from Stanford professors. Covers supervised learning, unsupervised learning, and best practices in ML.',
      url: 'https://www.coursera.org/learn/machine-learning',
      category: 'Computer Science',
      icon: '🤖',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.9',
      modules: 11,
      duration: 60,
      level: 'Intermediate',
      isFavorite: false
    },
    {
      id: '14',
      title: 'Introduction to Computer Science and Programming',
      description: 'MIT\'s introductory course to computer science and programming. Learn Python and computational thinking.',
      url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/',
      category: 'Computer Science',
      icon: '💻',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.8',
      modules: 24,
      duration: 40,
      level: 'Beginner',
      isFavorite: false
    },
    {
      id: '15',
      title: 'Data Science: Machine Learning',
      description: 'Build a movie recommendation system and learn the science behind one of the most popular and successful data science techniques.',
      url: 'https://www.edx.org/course/data-science-machine-learning',
      category: 'Data Science',
      icon: '📊',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.7',
      modules: 8,
      duration: 16,
      level: 'Intermediate',
      isFavorite: false
    },
    {
      id: '16',
      title: 'Deep Learning Specialization',
      description: 'Master Deep Learning, and Break into AI. Learn from Andrew Ng, the pioneer of machine learning education.',
      url: 'https://www.coursera.org/specializations/deep-learning',
      category: 'Artificial Intelligence',
      icon: '🧠',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.9',
      modules: 5,
      duration: 80,
      level: 'Advanced',
      isFavorite: false
    },
    {
      id: '17',
      title: 'Web Development Bootcamp',
      description: 'Learn HTML, CSS, JavaScript, Node.js, and more. Build real-world projects and become a full-stack developer.',
      url: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
      category: 'Web Development',
      icon: '🌐',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.8',
      modules: 45,
      duration: 65,
      level: 'Beginner',
      isFavorite: false
    },
    {
      id: '18',
      title: 'Data Structures and Algorithms',
      description: 'Master the fundamentals of data structures and algorithms. Essential for technical interviews and software development.',
      url: 'https://www.coursera.org/specializations/data-structures-algorithms',
      category: 'Computer Science',
      icon: '⚡',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: '4.7',
      modules: 6,
      duration: 40,
      level: 'Intermediate',
      isFavorite: false
    }
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Get unique categories
  const categories = useMemo(() => 
    Array.from(new Set(learningResources.map(resource => resource.category))),
    [learningResources]
  );

  const handleSaveModule = () => {
    // Implementation of handleSaveModule
  };

  const handleStartModule = (url: string) => {
    window.location.href = url;
  };

  const handleAddToFavorites = (id: string) => {
    setLearningResources(prevResources => 
      prevResources.map(resource => 
        resource.id === id 
          ? { ...resource, isFavorite: !resource.isFavorite }
          : resource
      )
    );
  };

  const platformResources = learningResources.filter(resource => 
    ['Khan Academy', 'Coursera', 'edX', 'Codecademy', 'Duolingo', 
     'MIT OpenCourseWare', 'YouTube EDU', 'Google Digital Garage', 'OpenLearn']
    .includes(resource.title)
  );

  const courseResources = learningResources.filter(resource => {
    const isCourse = ['Machine Learning by Stanford University', 
     'Introduction to Computer Science and Programming',
     'Data Science: Machine Learning',
     'Deep Learning Specialization',
     'Web Development Bootcamp',
     'Data Structures and Algorithms']
    .includes(resource.title);

    if (!isCourse) return false;

    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <SchoolIcon sx={{ 
              fontSize: 48, 
              color: 'var(--primary)',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
            }} />
            <StyledTypography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                color: 'var(--text)',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
              }}
            >
              Free Learning Resources
            </StyledTypography>
          </Box>
        </Box>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Paper 
          elevation={0}
          sx={{ 
            mb: 6,
            p: 4,
            borderRadius: '20px',
            background: 'linear-gradient(135deg, var(--background-lighter) 0%, var(--background) 100%)',
            border: '1px solid var(--border)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <SearchField
                fullWidth
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'var(--text-muted)' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <FilterListIcon sx={{ color: 'var(--text-muted)' }} />
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? 'all' : category)}
                    color={selectedCategory === category ? 'primary' : 'default'}
                    sx={{
                      backgroundColor: selectedCategory === category
                        ? 'var(--primary)'
                        : 'var(--background-lighter)',
                      color: selectedCategory === category
                        ? 'white'
                        : 'var(--text)',
                      '&:hover': {
                        backgroundColor: selectedCategory === category
                          ? 'var(--primary-dark)'
                          : 'var(--background-light)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      </motion.div>

      {/* Main Content Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr',
        gap: '80px',
        marginTop: '24px'
      }}>
        {/* Learning Platforms Section */}
        <div style={{
          background: 'var(--background-lighter)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid var(--border)'
        }}>
          <Box sx={{ mb: 4 }}>
            <StyledTypography variant="h4" component="h1" gutterBottom>
              Learning Platforms
            </StyledTypography>
          </Box>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '24px'
          }}>
            {platformResources.map((resource) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card card-glow"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  background: 'var(--background-lighter)',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{
                  y: -5,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                }}
              >
                {/* Resource Image */}
                <div style={{
                  position: 'relative',
                  height: '200px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))'
                  }} />
                  
                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: 'rgba(99, 102, 241, 0.9)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backdropFilter: 'blur(4px)'
                  }}>
                    {resource.category}
                  </div>

                  {/* Rating Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backdropFilter: 'blur(4px)'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    {resource.rating}
                  </div>
                </div>

                {/* Content */}
                <div style={{ 
                  padding: '24px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <StyledTypography 
                    variant="h3" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '12px',
                      color: 'var(--text)'
                    }}
                  >
                    {resource.title}
                  </StyledTypography>

                  <StyledTypography 
                    variant="body1" 
                    sx={{ 
                      color: 'var(--text-secondary)',
                      marginBottom: '20px',
                      lineHeight: '1.6',
                      flex: 1
                    }}
                  >
                    {resource.description}
                  </StyledTypography>

                  {/* Stats */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    padding: '12px',
                    backgroundColor: 'var(--background)',
                    borderRadius: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: 'var(--primary)'
                      }}>
                        {resource.modules}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        color: 'var(--text-muted)'
                      }}>
                        Modules
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: 'var(--primary)'
                      }}>
                        {resource.duration}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        color: 'var(--text-muted)'
                      }}>
                        Hours
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: 'var(--primary)'
                      }}>
                        {resource.level}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        color: 'var(--text-muted)'
                      }}>
                        Level
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '12px'
                  }}>
                    <button
                      onClick={() => handleStartModule(resource.url)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary-dark)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary)';
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 3l14 9-14 9V3z"/>
                      </svg>
                      Start Learning
                    </button>
                    <button
                      onClick={() => handleAddToFavorites(resource.id)}
                      style={{
                        padding: '12px',
                        backgroundColor: resource.isFavorite ? 'var(--primary-light)' : 'var(--background)',
                        color: resource.isFavorite ? 'var(--primary)' : 'var(--text-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = resource.isFavorite ? 'var(--primary-light)' : 'var(--background-lighter)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = resource.isFavorite ? 'var(--primary-light)' : 'var(--background)';
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={resource.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Courses Section */}
        <div style={{
          background: 'var(--background-lighter)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid var(--border)'
        }}>
          <Box sx={{ mb: 4 }}>
            <StyledTypography variant="h4" component="h1" gutterBottom>
              Featured Courses
            </StyledTypography>
          </Box>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            {courseResources.map((resource) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card card-glow"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  background: 'var(--background-lighter)',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{
                  y: -5,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                }}
              >
                {/* Resource Image */}
                <div style={{
                  position: 'relative',
                  height: '200px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))'
                  }} />
                  
                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: 'rgba(99, 102, 241, 0.9)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backdropFilter: 'blur(4px)'
                  }}>
                    {resource.category}
                  </div>

                  {/* Rating Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backdropFilter: 'blur(4px)'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    {resource.rating}
                  </div>
                </div>

                {/* Content */}
                <div style={{ 
                  padding: '24px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <StyledTypography 
                    variant="h3" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '12px',
                      color: 'var(--text)'
                    }}
                  >
                    {resource.title}
                  </StyledTypography>

                  <StyledTypography 
                    variant="body1" 
                    sx={{ 
                      color: 'var(--text-secondary)',
                      marginBottom: '20px',
                      lineHeight: '1.6',
                      flex: 1
                    }}
                  >
                    {resource.description}
                  </StyledTypography>

                  {/* Stats */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    padding: '12px',
                    backgroundColor: 'var(--background)',
                    borderRadius: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: 'var(--primary)'
                      }}>
                        {resource.modules}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        color: 'var(--text-muted)'
                      }}>
                        Modules
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: 'var(--primary)'
                      }}>
                        {resource.duration}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        color: 'var(--text-muted)'
                      }}>
                        Hours
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: 'var(--primary)'
                      }}>
                        {resource.level}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        color: 'var(--text-muted)'
                      }}>
                        Level
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '12px'
                  }}>
                    <button
                      onClick={() => handleStartModule(resource.url)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary-dark)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary)';
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 3l14 9-14 9V3z"/>
                      </svg>
                      Start Learning
                    </button>
                    <button
                      onClick={() => handleAddToFavorites(resource.id)}
                      style={{
                        padding: '12px',
                        backgroundColor: resource.isFavorite ? 'var(--primary-light)' : 'var(--background)',
                        color: resource.isFavorite ? 'var(--primary)' : 'var(--text-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = resource.isFavorite ? 'var(--primary-light)' : 'var(--background-lighter)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = resource.isFavorite ? 'var(--primary-light)' : 'var(--background)';
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={resource.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* No Results Message */}
      {courseResources.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 8,
              px: 4,
              background: 'linear-gradient(135deg, var(--background-lighter) 0%, var(--background) 100%)',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            <StyledTypography 
              variant="h5" 
              sx={{ 
                color: 'var(--text-muted)',
                mb: 2,
                fontWeight: 'bold',
              }}
            >
              No resources found matching your criteria
            </StyledTypography>
            <StyledTypography 
              variant="body1" 
              sx={{ 
                color: 'var(--text-muted)',
                maxWidth: '400px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Try adjusting your search or filter settings to find what you're looking for
            </StyledTypography>
          </Box>
        </motion.div>
      )}

      {/* Add Module Modal */}
      {showAddModule && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box 
            sx={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Paper 
              elevation={3}
              sx={{ 
                p: 4,
                borderRadius: '20px',
                background: 'var(--background)',
                maxWidth: '400px',
                width: '100%',
              }}
            >
              <StyledTypography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  color: 'var(--text)',
                  fontWeight: 'bold',
                }}
              >
                Add New Module
              </StyledTypography>
              <button 
                onClick={() => setShowAddModule(false)}
                className="btn-glossy btn-secondary"
                style={{
                  marginRight: '8px',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveModule}
                className="btn-glossy btn-primary"
                style={{
                  fontSize: '14px'
                }}
              >
                Save Module
              </button>
            </Paper>
          </Box>
        </motion.div>
      )}
    </Container>
  );
};

export default Learning; 