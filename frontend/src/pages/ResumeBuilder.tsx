import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
  Chip,
  Snackbar,
  Alert,
  ThemeProvider,
  CssBaseline,
  createTheme,
  Switch,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { usePDF } from 'react-to-pdf';

const steps = [
  'Personal Info',
  'Education',
  'Experience',
  'Skills',
  'Achievements',
  'Certifications',
  'Courses',
  'Co-curricular',
  'Languages',
  'Preview'
];

interface FormData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  education: {
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa: string;
    description: string;
  }[];
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  achievements: {
    title: string;
    date: string;
    description: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
    link: string;
  }[];
  courses: {
    name: string;
    platform: string;
    date: string;
    link: string;
  }[];
  coCurricular: {
    title: string;
    organization: string;
    date: string;
    description: string;
  }[];
  languages: {
    language: string;
    proficiency: string;
  }[];
  selectedTemplate: string;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional design with a modern layout',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional format with a timeless look',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Unique design with creative elements',
  },
];

const templateStyles = {
  modern: {
    container: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      padding: '2rem',
      backgroundColor: '#ffffff',
    },
    header: {
      borderBottom: '2px solid #1976d2',
      paddingBottom: '1rem',
      marginBottom: '2rem',
    },
    section: {
      marginBottom: '2rem',
    },
    sectionTitle: {
      color: '#1976d2',
      fontSize: '1.5rem',
      fontWeight: 500,
      marginBottom: '1rem',
    },
    card: {
      backgroundColor: '#f5f5f5',
      padding: '1rem',
      marginBottom: '1rem',
      borderRadius: '4px',
    },
    chip: {
      backgroundColor: '#e3f2fd',
      color: '#1976d2',
    },
  },
  classic: {
    container: {
      fontFamily: '"Times New Roman", Times, serif',
      padding: '2rem',
      backgroundColor: '#ffffff',
    },
    header: {
      borderBottom: '1px solid #000000',
      paddingBottom: '1rem',
      marginBottom: '2rem',
    },
    section: {
      marginBottom: '2rem',
    },
    sectionTitle: {
      color: '#000000',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      textTransform: 'uppercase',
    },
    card: {
      borderLeft: '3px solid #000000',
      paddingLeft: '1rem',
      marginBottom: '1rem',
    },
    chip: {
      backgroundColor: '#f0f0f0',
      color: '#000000',
    },
  },
  creative: {
    container: {
      fontFamily: '"Poppins", sans-serif',
      padding: '2rem',
      backgroundColor: '#ffffff',
    },
    header: {
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      color: '#ffffff',
      padding: '2rem',
      marginBottom: '2rem',
      borderRadius: '8px',
    },
    section: {
      marginBottom: '2rem',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    sectionTitle: {
      color: '#2196F3',
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      '&::before': {
        content: '""',
        display: 'inline-block',
        width: '4px',
        height: '1.5rem',
        backgroundColor: '#2196F3',
        marginRight: '0.5rem',
        borderRadius: '2px',
      },
    },
    card: {
      backgroundColor: '#f8f9fa',
      padding: '1.5rem',
      marginBottom: '1rem',
      borderRadius: '8px',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-2px)',
      },
    },
    chip: {
      backgroundColor: '#e3f2fd',
      color: '#2196F3',
      borderRadius: '16px',
      padding: '0.5rem 1rem',
    },
  },
};

const ResumeBuilder: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [useAIEnhancement, setUseAIEnhancement] = useState(false);
  const { toPDF, targetRef } = usePDF({filename: 'resume.pdf'});
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);
  const [generatedSummaries, setGeneratedSummaries] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      linkedin: '',
      github: '',
      portfolio: '',
    },
    education: [{
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    }],
    experience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: [''],
    }],
    skills: [{
      category: 'Technical Skills',
      items: [''],
    }],
    achievements: [{
      title: '',
      date: '',
      description: '',
    }],
    certifications: [{
      name: '',
      issuer: '',
      date: '',
      link: '',
    }],
    courses: [{
      name: '',
      platform: '',
      date: '',
      link: '',
    }],
    coCurricular: [{
      title: '',
      organization: '',
      date: '',
      description: '',
    }],
    languages: [{
      language: '',
      proficiency: '',
    }],
    selectedTemplate: 'modern',
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof FormData],
        [field]: value
      }
    }));
  };

  const handleEducationChange = (index: number, field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEducation = [...formData.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: event.target.value
    };
    setFormData(prev => ({
      ...prev,
      education: newEducation
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: '',
      }]
    }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleExperienceChange = (index: number, field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newExperience = [...formData.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: event.target.value
    };
    setFormData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        achievements: [''],
      }]
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleAchievementChange = (expIndex: number, achievementIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newExperience = [...formData.experience];
    newExperience[expIndex].achievements[achievementIndex] = event.target.value;
    setFormData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const addAchievement = (expIndex: number) => {
    const newExperience = [...formData.experience];
    newExperience[expIndex].achievements.push('');
    setFormData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const removeAchievement = (expIndex: number, achievementIndex: number) => {
    const newExperience = [...formData.experience];
    newExperience[expIndex].achievements = newExperience[expIndex].achievements.filter((_, i) => i !== achievementIndex);
    setFormData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const handleSkillChange = (categoryIndex: number, skillIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSkills = [...formData.skills];
    newSkills[categoryIndex].items[skillIndex] = event.target.value;
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const addSkillCategory = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, {
        category: '',
        items: [''],
      }]
    }));
  };

  const addSkill = (categoryIndex: number) => {
    const newSkills = [...formData.skills];
    newSkills[categoryIndex].items.push('');
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const newSkills = [...formData.skills];
    newSkills[categoryIndex].items = newSkills[categoryIndex].items.filter((_, i) => i !== skillIndex);
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const handleAchievementSectionChange = (index: number, field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = {
      ...newAchievements[index],
      [field]: event.target.value
    };
    setFormData(prev => ({
      ...prev,
      achievements: newAchievements
    }));
  };

  const addAchievementSection = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, {
        title: '',
        date: '',
        description: '',
      }]
    }));
  };

  const removeAchievementSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleCertificationChange = (index: number, field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCertifications = [...formData.certifications];
    newCertifications[index] = {
      ...newCertifications[index],
      [field]: event.target.value
    };
    setFormData(prev => ({
      ...prev,
      certifications: newCertifications
    }));
  };

  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, {
        name: '',
        issuer: '',
        date: '',
        link: '',
      }]
    }));
  };

  const removeCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleCourseChange = (index: number, field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCourses = [...formData.courses];
    newCourses[index] = {
      ...newCourses[index],
      [field]: event.target.value
    };
    setFormData(prev => ({
      ...prev,
      courses: newCourses
    }));
  };

  const addCourse = () => {
    setFormData(prev => ({
      ...prev,
      courses: [...prev.courses, {
        name: '',
        platform: '',
        date: '',
        link: '',
      }]
    }));
  };

  const removeCourse = (index: number) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index)
    }));
  };

  const handleCoCurricularChange = (index: number, field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCoCurricular = [...formData.coCurricular];
    newCoCurricular[index] = {
      ...newCoCurricular[index],
      [field]: event.target.value
    };
    setFormData(prev => ({
      ...prev,
      coCurricular: newCoCurricular
    }));
  };

  const addCoCurricular = () => {
    setFormData(prev => ({
      ...prev,
      coCurricular: [...prev.coCurricular, {
        title: '',
        organization: '',
        date: '',
        description: '',
      }]
    }));
  };

  const removeCoCurricular = (index: number) => {
    setFormData(prev => ({
      ...prev,
      coCurricular: prev.coCurricular.filter((_, i) => i !== index)
    }));
  };

  const handleLanguageChange = (index: number, field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguages = [...formData.languages];
    newLanguages[index] = {
      ...newLanguages[index],
      [field]: event.target.value
    };
    setFormData(prev => ({
      ...prev,
      languages: newLanguages
    }));
  };

  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      languages: [...prev.languages, {
        language: '',
        proficiency: '',
      }]
    }));
  };

  const removeLanguage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const enhanceWithAI = async () => {
    // TODO: Implement AI enhancement logic
    setShowSuccess(true);
  };

  const handleDownload = async () => {
    try {
      await toPDF();
      setShowSuccess(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const generateAISummary = async () => {
    setIsGenerating(true);
    try {
      // TODO: Replace with actual API call to your AI service
      // This is a mock implementation
      const mockSummaries = [
        "Experienced software developer with a strong background in full-stack development and a passion for creating efficient, scalable solutions.",
        "Detail-oriented professional with expertise in web development and a track record of delivering high-quality projects on time.",
        "Innovative problem-solver with extensive experience in software development and a commitment to writing clean, maintainable code."
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setGeneratedSummaries(mockSummaries);
      setShowSummaryDialog(true);
    } catch (error) {
      console.error('Error generating summaries:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSummarySelect = (summary: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        summary
      }
    }));
    setShowSummaryDialog(false);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={formData.personalInfo.location}
                    onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField
                    fullWidth
                    label="LinkedIn Profile"
                    value={formData.personalInfo.linkedin}
                    onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField
                    fullWidth
                    label="GitHub Profile"
                    value={formData.personalInfo.github}
                    onChange={(e) => handleInputChange('personalInfo', 'github', e.target.value)}
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField
                    fullWidth
                    label="Portfolio Website"
                    value={formData.personalInfo.portfolio}
                    onChange={(e) => handleInputChange('personalInfo', 'portfolio', e.target.value)}
                  />
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">Professional Summary</Typography>
                  <Button
                    startIcon={isGenerating ? <CircularProgress size={20} /> : <SmartToyIcon />}
                    onClick={generateAISummary}
                    disabled={isGenerating}
                    variant="outlined"
                  >
                    Generate with AI
                  </Button>
                </Box>
                <TextField
                  fullWidth
                  label="Professional Summary"
                  multiline
                  rows={4}
                  value={formData.personalInfo.summary}
                  onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
                />
              </Box>
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Education
            </Typography>
            {formData.education.map((edu, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Education #{index + 1}</Typography>
                    <IconButton onClick={() => removeEducation(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="School/University"
                          value={edu.school}
                          onChange={handleEducationChange(index, 'school')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Degree"
                          value={edu.degree}
                          onChange={handleEducationChange(index, 'degree')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Field of Study"
                          value={edu.field}
                          onChange={handleEducationChange(index, 'field')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 150px' }}>
                        <TextField
                          fullWidth
                          label="GPA"
                          value={edu.gpa}
                          onChange={handleEducationChange(index, 'gpa')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 150px' }}>
                        <TextField
                          fullWidth
                          label="Start Date"
                          type="month"
                          value={edu.startDate}
                          onChange={handleEducationChange(index, 'startDate')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 150px' }}>
                        <TextField
                          fullWidth
                          label="End Date"
                          type="month"
                          value={edu.endDate}
                          onChange={handleEducationChange(index, 'endDate')}
                        />
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addEducation}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Add Education
            </Button>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Work Experience
            </Typography>
            {formData.experience.map((exp, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Experience #{index + 1}</Typography>
                    <IconButton onClick={() => removeExperience(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Company"
                          value={exp.company}
                          onChange={handleExperienceChange(index, 'company')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Position"
                          value={exp.position}
                          onChange={handleExperienceChange(index, 'position')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 150px' }}>
                        <TextField
                          fullWidth
                          label="Start Date"
                          type="month"
                          value={exp.startDate}
                          onChange={handleExperienceChange(index, 'startDate')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 150px' }}>
                        <TextField
                          fullWidth
                          label="End Date"
                          type="month"
                          value={exp.endDate}
                          onChange={handleExperienceChange(index, 'endDate')}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={3}
                        value={exp.description}
                        onChange={handleExperienceChange(index, 'description')}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addExperience}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Add Experience
            </Button>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Skills
            </Typography>
            {formData.skills.map((skillCategory, categoryIndex) => (
              <Card key={categoryIndex} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <TextField
                      label="Category"
                      value={skillCategory.category}
                      onChange={(e) => {
                        const newSkills = [...formData.skills];
                        newSkills[categoryIndex].category = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          skills: newSkills
                        }));
                      }}
                    />
                    <IconButton
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          skills: prev.skills.filter((_, i) => i !== categoryIndex)
                        }));
                      }}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {skillCategory.items.map((skill, skillIndex) => (
                      <Box key={skillIndex} sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                          fullWidth
                          label={`Skill ${skillIndex + 1}`}
                          value={skill}
                          onChange={handleSkillChange(categoryIndex, skillIndex)}
                        />
                        <IconButton
                          onClick={() => removeSkill(categoryIndex, skillIndex)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => addSkill(categoryIndex)}
                      variant="outlined"
                      size="small"
                    >
                      Add Skill
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addSkillCategory}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Add Skill Category
            </Button>
          </Box>
        );

      case 4:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Achievements
            </Typography>
            {formData.achievements.map((achievement, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Achievement #{index + 1}</Typography>
                    <IconButton onClick={() => removeAchievementSection(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Title"
                          value={achievement.title}
                          onChange={handleAchievementSectionChange(index, 'title')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Date"
                          type="month"
                          value={achievement.date}
                          onChange={handleAchievementSectionChange(index, 'date')}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={2}
                        value={achievement.description}
                        onChange={handleAchievementSectionChange(index, 'description')}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addAchievementSection}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Add Achievement
            </Button>
          </Box>
        );

      case 5:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Certifications
            </Typography>
            {formData.certifications.map((cert, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Certification #{index + 1}</Typography>
                    <IconButton onClick={() => removeCertification(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Name"
                          value={cert.name}
                          onChange={handleCertificationChange(index, 'name')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Issuing Organization"
                          value={cert.issuer}
                          onChange={handleCertificationChange(index, 'issuer')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Date"
                          type="month"
                          value={cert.date}
                          onChange={handleCertificationChange(index, 'date')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Certificate Link"
                          value={cert.link}
                          onChange={handleCertificationChange(index, 'link')}
                        />
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addCertification}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Add Certification
            </Button>
          </Box>
        );

      case 6:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Courses
            </Typography>
            {formData.courses.map((course, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Course #{index + 1}</Typography>
                    <IconButton onClick={() => removeCourse(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Course Name"
                          value={course.name}
                          onChange={handleCourseChange(index, 'name')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Platform"
                          value={course.platform}
                          onChange={handleCourseChange(index, 'platform')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Completion Date"
                          type="month"
                          value={course.date}
                          onChange={handleCourseChange(index, 'date')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Course Link"
                          value={course.link}
                          onChange={handleCourseChange(index, 'link')}
                        />
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addCourse}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Add Course
            </Button>
          </Box>
        );

      case 7:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Co-curricular Activities
            </Typography>
            {formData.coCurricular.map((activity, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Activity #{index + 1}</Typography>
                    <IconButton onClick={() => removeCoCurricular(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Title"
                          value={activity.title}
                          onChange={handleCoCurricularChange(index, 'title')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Organization"
                          value={activity.organization}
                          onChange={handleCoCurricularChange(index, 'organization')}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 300px' }}>
                        <TextField
                          fullWidth
                          label="Date"
                          type="month"
                          value={activity.date}
                          onChange={handleCoCurricularChange(index, 'date')}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={2}
                        value={activity.description}
                        onChange={handleCoCurricularChange(index, 'description')}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addCoCurricular}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Add Activity
            </Button>
          </Box>
        );

      case 8:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Languages
            </Typography>
            {formData.languages.map((lang, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Language #{index + 1}</Typography>
                    <IconButton onClick={() => removeLanguage(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ flex: '1 1 300px' }}>
                      <TextField
                        fullWidth
                        label="Language"
                        value={lang.language}
                        onChange={handleLanguageChange(index, 'language')}
                      />
                    </Box>
                    <Box sx={{ flex: '1 1 300px' }}>
                      <TextField
                        fullWidth
                        label="Proficiency Level"
                        value={lang.proficiency}
                        onChange={handleLanguageChange(index, 'proficiency')}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addLanguage}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Add Language
            </Button>
          </Box>
        );

      case 9:
        return (
          <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Select Template
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
                {templates.map((template) => (
                  <Box key={template.id}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border: selectedTemplate === template.id ? '2px solid' : '1px solid',
                        borderColor: selectedTemplate === template.id ? 'primary.main' : 'divider',
                      }}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <CardContent>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">{template.name}</FormLabel>
                          <Radio value={template.id} />
                          <Typography variant="body2" color="text.secondary">
                            {template.description}
                          </Typography>
                        </FormControl>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box 
              ref={targetRef} 
              sx={{
                ...templateStyles[selectedTemplate as keyof typeof templateStyles].container,
                '& .resume-header': {
                  ...templateStyles[selectedTemplate as keyof typeof templateStyles].header,
                },
                '& .resume-section': {
                  ...templateStyles[selectedTemplate as keyof typeof templateStyles].section,
                },
                '& .resume-section-title': {
                  ...templateStyles[selectedTemplate as keyof typeof templateStyles].sectionTitle,
                },
                '& .resume-card': {
                  ...templateStyles[selectedTemplate as keyof typeof templateStyles].card,
                },
                '& .resume-chip': {
                  ...templateStyles[selectedTemplate as keyof typeof templateStyles].chip,
                },
              }}
            >
              <Box className="resume-header">
                <Typography variant="h4" gutterBottom>
                  {formData.personalInfo.fullName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {formData.personalInfo.email} | {formData.personalInfo.phone} | {formData.personalInfo.location}
                </Typography>
                {formData.personalInfo.linkedin && (
                  <Typography variant="body2" gutterBottom>
                    LinkedIn: {formData.personalInfo.linkedin}
                  </Typography>
                )}
                {formData.personalInfo.github && (
                  <Typography variant="body2" gutterBottom>
                    GitHub: {formData.personalInfo.github}
                  </Typography>
                )}
                {formData.personalInfo.portfolio && (
                  <Typography variant="body2" gutterBottom>
                    Portfolio: {formData.personalInfo.portfolio}
                  </Typography>
                )}
                <Typography variant="body1" paragraph>
                  {formData.personalInfo.summary}
                </Typography>
              </Box>

              <Box className="resume-section">
                <Typography className="resume-section-title">
                  Education
                </Typography>
                {formData.education.map((edu, index) => (
                  <Box key={index} className="resume-card">
                    <Typography variant="h6">{edu.school}</Typography>
                    <Typography variant="subtitle1">
                      {edu.degree} in {edu.field}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {edu.startDate} - {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}
                    </Typography>
                    <Typography variant="body2">{edu.description}</Typography>
                  </Box>
                ))}
              </Box>

              <Box className="resume-section">
                <Typography className="resume-section-title">
                  Experience
                </Typography>
                {formData.experience.map((exp, index) => (
                  <Box key={index} className="resume-card">
                    <Typography variant="h6">{exp.company}</Typography>
                    <Typography variant="subtitle1">{exp.position}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {exp.startDate} - {exp.endDate}
                    </Typography>
                    <Typography variant="body2">{exp.description}</Typography>
                    {exp.achievements.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="subtitle2">Key Achievements:</Typography>
                        <ul>
                          {exp.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex}>
                              <Typography variant="body2">{achievement}</Typography>
                            </li>
                          ))}
                        </ul>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>

              {formData.skills.map((skillCategory, index) => (
                <Box key={index} className="resume-section">
                  <Typography className="resume-section-title">
                    {skillCategory.category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skillCategory.items.map((skill, skillIndex) => (
                      <Chip
                        key={skillIndex}
                        label={skill}
                        className="resume-chip"
                      />
                    ))}
                  </Box>
                </Box>
              ))}

              {formData.achievements.length > 0 && (
                <Box className="resume-section">
                  <Typography className="resume-section-title">
                    Achievements
                  </Typography>
                  {formData.achievements.map((achievement, index) => (
                    <Box key={index} className="resume-card">
                      <Typography variant="h6">{achievement.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {achievement.date}
                      </Typography>
                      <Typography variant="body2">{achievement.description}</Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {formData.certifications.length > 0 && (
                <Box className="resume-section">
                  <Typography className="resume-section-title">
                    Certifications
                  </Typography>
                  {formData.certifications.map((cert, index) => (
                    <Box key={index} className="resume-card">
                      <Typography variant="h6">{cert.name}</Typography>
                      <Typography variant="subtitle1">{cert.issuer}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {cert.date}
                      </Typography>
                      {cert.link && (
                        <Typography variant="body2">
                          <a href={cert.link} target="_blank" rel="noopener noreferrer">
                            View Certificate
                          </a>
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              )}

              {formData.courses.length > 0 && (
                <Box className="resume-section">
                  <Typography className="resume-section-title">
                    Courses
                  </Typography>
                  {formData.courses.map((course, index) => (
                    <Box key={index} className="resume-card">
                      <Typography variant="h6">{course.name}</Typography>
                      <Typography variant="subtitle1">{course.platform}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.date}
                      </Typography>
                      {course.link && (
                        <Typography variant="body2">
                          <a href={course.link} target="_blank" rel="noopener noreferrer">
                            View Course
                          </a>
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              )}

              {formData.coCurricular.length > 0 && (
                <Box className="resume-section">
                  <Typography className="resume-section-title">
                    Co-curricular Activities
                  </Typography>
                  {formData.coCurricular.map((activity, index) => (
                    <Box key={index} className="resume-card">
                      <Typography variant="h6">{activity.title}</Typography>
                      <Typography variant="subtitle1">{activity.organization}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.date}
                      </Typography>
                      <Typography variant="body2">{activity.description}</Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {formData.languages.length > 0 && (
                <Box className="resume-section">
                  <Typography className="resume-section-title">
                    Languages
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.languages.map((lang, index) => (
                      <Chip
                        key={index}
                        label={`${lang.language} (${lang.proficiency})`}
                        className="resume-chip"
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom align="center">
            Resume Builder
          </Typography>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {renderStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {activeStep === steps.length - 1 && (
                <>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={useAIEnhancement}
                        onChange={(e) => setUseAIEnhancement(e.target.checked)}
                      />
                    }
                    label="Use AI Enhancement"
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AutoAwesomeIcon />}
                    onClick={enhanceWithAI}
                    disabled={!useAIEnhancement}
                  >
                    Enhance with AI
                  </Button>
                </>
              )}
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                >
                  Download PDF
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert severity="success" onClose={() => setShowSuccess(false)}>
            Resume downloaded successfully!
          </Alert>
        </Snackbar>
        <Dialog
          open={showSummaryDialog}
          onClose={() => setShowSummaryDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Choose a Generated Summary</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              {generatedSummaries.map((summary, index) => (
                <Card key={index}>
                  <CardContent>
                    <Typography variant="body1" paragraph>
                      {summary}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleSummarySelect(summary)}
                      fullWidth
                    >
                      Use This Summary
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSummaryDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default ResumeBuilder; 