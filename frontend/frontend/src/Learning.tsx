import React from 'react';
import { Card, CardContent, Typography, Grid, Button, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ResourceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[4],
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
  }
];

const Learning: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Free Learning Resources
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Access high-quality educational content from various platforms
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {learningResources.map((resource, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ResourceCard>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                  {resource.icon}
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                  {resource.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {resource.description}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  Category: {resource.category}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                >
                  Visit Platform
                </Button>
              </CardContent>
            </ResourceCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Learning; 