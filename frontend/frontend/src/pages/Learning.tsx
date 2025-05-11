import React, { useState, useMemo } from 'react';
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
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    borderColor: 'var(--primary)',
    '&::before': {
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

const learningResources = [
  {
    title: 'Khan Academy',
    description: 'Free online courses, lessons, and practice in math, science, and more.',
    url: 'https://www.khanacademy.org',
    category: 'General Education',
    icon: '📚'
  },
  {
    title: 'Coursera',
    description: 'Access to free courses from top universities and companies.',
    url: 'https://www.coursera.org',
    category: 'Higher Education',
    icon: '🎓'
  },
  {
    title: 'edX',
    description: 'Free courses from the world\'s best universities and institutions.',
    url: 'https://www.edx.org',
    category: 'Higher Education',
    icon: '🌐'
  },
  {
    title: 'Codecademy',
    description: 'Free coding lessons and interactive exercises.',
    url: 'https://www.codecademy.com',
    category: 'Programming',
    icon: '💻'
  },
  {
    title: 'Duolingo',
    description: 'Free language learning platform with interactive lessons.',
    url: 'https://www.duolingo.com',
    category: 'Languages',
    icon: '🗣️'
  },
  {
    title: 'MIT OpenCourseWare',
    description: 'Free access to MIT\'s course materials.',
    url: 'https://ocw.mit.edu',
    category: 'Higher Education',
    icon: '🎯'
  },
  {
    title: 'YouTube EDU',
    description: 'Educational content from top educators and institutions.',
    url: 'https://www.youtube.com/education',
    category: 'Video Learning',
    icon: '🎥'
  },
  {
    title: 'Google Digital Garage',
    description: 'Free digital skills training and certification.',
    url: 'https://learndigital.withgoogle.com/digitalgarage',
    category: 'Digital Skills',
    icon: '🔧'
  },
  {
    title: 'OpenLearn',
    description: 'Free learning resources from The Open University.',
    url: 'https://www.open.edu/openlearn',
    category: 'Higher Education',
    icon: '📖'
  }
];

const Learning: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = useMemo(() => 
    Array.from(new Set(learningResources.map(resource => resource.category))),
    []
  );

  // Filter resources based on search and category
  const filteredResources = useMemo(() => {
    return learningResources.filter(resource => {
      const matchesSearch = 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || resource.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box 
          sx={{ 
            mb: 6, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--secondary-rgb), 0.1) 100%)',
            borderRadius: '30px',
            padding: '64px 24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(var(--primary-rgb), 0.2)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at top right, rgba(var(--primary-rgb), 0.1), transparent 70%)',
              zIndex: 0,
            },
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <SchoolIcon sx={{ 
              fontSize: 80, 
              color: 'var(--primary)',
              mb: 3,
              filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))'
            }} />
          </motion.div>
          <Typography 
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
              position: 'relative',
              zIndex: 1,
            }}
          >
            Free Learning Resources
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'var(--text-muted)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.8,
              position: 'relative',
              zIndex: 1,
            }} 
            paragraph
          >
            Discover a world of knowledge with our curated collection of free educational resources. 
            From programming to languages, find the perfect platform to fuel your learning journey.
          </Typography>
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
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <SearchField
                fullWidth
                variant="outlined"
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <FilterListIcon sx={{ color: 'var(--text-muted)' }} />
                {categories.map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CategoryChip
                      label={category}
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      color={selectedCategory === category ? 'primary' : 'default'}
                    />
                  </motion.div>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>

      {/* Resources Grid */}
      <Grid container spacing={3}>
        {filteredResources.map((resource, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ResourceCard>
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Box 
                    className="resource-icon"
                    sx={{ 
                      mb: 3,
                      fontSize: '56px',
                      textAlign: 'center',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {resource.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="div" 
                    gutterBottom 
                    sx={{ 
                      color: 'var(--text)',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      mb: 2,
                    }}
                  >
                    {resource.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 3, 
                      color: 'var(--text-muted)',
                      textAlign: 'center',
                      lineHeight: 1.8,
                    }}
                  >
                    {resource.description}
                  </Typography>
                  <Divider sx={{ my: 3, borderColor: 'var(--border)' }} />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block', 
                      mb: 3, 
                      color: 'var(--text-muted)',
                      textAlign: 'center',
                      fontWeight: 500,
                    }}
                  >
                    Category: {resource.category}
                  </Typography>
                  <Button
                    className="visit-button"
                    variant="contained"
                    color="primary"
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    sx={{
                      background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
                      borderRadius: '16px',
                      py: 2,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, var(--primary-dark), var(--secondary-dark))',
                      },
                    }}
                  >
                    Visit Platform
                  </Button>
                </CardContent>
              </ResourceCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* No Results Message */}
      {filteredResources.length === 0 && (
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
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'var(--text-muted)',
                mb: 2,
                fontWeight: 'bold',
              }}
            >
              No resources found matching your criteria
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'var(--text-muted)',
                maxWidth: '400px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Try adjusting your search or filter settings to find what you're looking for
            </Typography>
          </Box>
        </motion.div>
      )}
    </Container>
  );
};

export default Learning; 