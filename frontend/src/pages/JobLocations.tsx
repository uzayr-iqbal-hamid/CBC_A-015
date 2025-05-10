/* cSpell:ignore markercluster geosearch jsearch rapidapi fintech PARTTIME spiderfy */
import React, { useState, useEffect, useRef } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  useMap,
  Circle 
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Icon, divIcon, point } from 'leaflet';
import { useTranslation } from 'react-i18next';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import { BookmarkIcon, MapPinIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import PageLayout from '../components/PageLayout';

// Add CSS for the pulse animation
const pulseMarkerStyles = `
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }

  .pulse-marker {
    animation: pulse 1.5s ease-in-out infinite;
  }

  /* Improve map marker clusters */
  .custom-marker-cluster {
    background-color: rgba(79, 70, 229, 0.7);
    border: 2px solid rgba(79, 70, 229, 0.9);
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .cluster-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  /* New job marker styling */
  .new-job-marker {
    filter: hue-rotate(120deg);
  }
  
  /* Glass card effect for map UI */
  .glass-card {
    background: rgba(var(--card-rgb), 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: var(--border-radius-lg);
    border: 1px solid rgba(var(--card-border-rgb), 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .glass-card:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(var(--card-border-rgb), 0.5);
  }
  
  /* Map container responsive styling */
  .map-container {
    height: calc(100vh - 200px);
    width: 100%;
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border);
  }
  
  @media (max-width: 768px) {
    .map-container {
      height: 50vh;
    }
  }
  
  /* Loading animation for job cards */
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

// Inject the styles into the document
const injectStyles = () => {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = pulseMarkerStyles;
  document.head.appendChild(styleElement);
  return () => {
    document.head.removeChild(styleElement);
  };
};

// Fix for default marker icon in React
const defaultIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Update the job type to include url property
type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  lat: number;
  lng: number;
  description: string;
  salary: string;
  skills: string[];
  industry: string;
  url?: string; // Optional url property
  jobType?: string; // Added job type (full-time, part-time, etc.)
  experienceLevel?: string; // Added experience level
  salaryRange?: {
    min: number;
    max: number;
  };
};

// Define a type for favorite jobs
type FavoriteJob = {
  id: number;
  dateAdded: string;
};

// Define params for the search
type SearchParams = {
  query: string;
  location?: string;
  radius?: number;  // in km
  jobType?: string;
  minSalary?: number;
  maxSalary?: number;
  experienceLevel?: string;
};

// Function to create marker clusters
// This needs to be outside of the component due to React's rendering cycle
const createClusterCustomIcon = function (cluster: any) {
  return divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true)
  });
};

// Define a component to handle location search
const LocationSearch = ({ onSelectLocation }: { onSelectLocation: (lat: number, lng: number) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const provider = new OpenStreetMapProvider();
  const { t } = useTranslation();

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      return;
    }
    
    setIsSearching(true);
    try {
      const results = await provider.search({ query: searchQuery + ' India' });
      setSearchResults(results.slice(0, 5)); // Limit to 5 results
    } catch (error) {
      console.error('Error searching locations:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationSelect = (lat: number, lng: number, displayName: string) => {
    onSelectLocation(lat, lng);
    setSearchResults([]);
    setSearchQuery(displayName);
  };

  return (
    <div style={{ position: 'relative', marginBottom: '10px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('jobLocations.searchPlaceholder', 'Search locations in India...')}
          style={{
            flex: 1,
            backgroundColor: 'var(--background-lighter)',
            color: 'var(--text)',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid var(--border)',
            outline: 'none',
            fontSize: '0.875rem',
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          style={{
            backgroundColor: isSearching ? 'var(--background-lighter)' : 'var(--primary-transparent)',
            color: isSearching ? 'var(--text-muted)' : 'var(--primary-light)',
            padding: '8px 12px',
            borderRadius: '6px',
            border: `1px solid ${isSearching ? 'var(--border)' : 'var(--primary)'}`,
            outline: 'none',
            fontSize: '0.875rem',
            cursor: isSearching ? 'default' : 'pointer',
          }}
        >
          {isSearching ? t('jobLocations.searching', 'Searching...') : t('jobLocations.search', 'Search')}
        </button>
      </div>

      {searchResults.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'var(--background-lighter)',
          borderRadius: '6px',
          border: '1px solid var(--border)',
          marginTop: '4px',
          maxHeight: '200px',
          overflowY: 'auto',
        }}>
          {searchResults.map((result, index) => (
            <div
              key={index}
              style={{
                padding: '8px 12px',
                borderBottom: index < searchResults.length - 1 ? '1px solid var(--border)' : 'none',
                cursor: 'pointer',
                color: 'var(--text)',
                fontSize: '0.875rem',
              }}
              onClick={() => handleLocationSelect(result.y, result.x, result.label)}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--hover)' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {result.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Component for setting the center of the map
const SetMapCenter = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

// Component for showing the user's location
const UserLocationMarker = ({ position }: { position: [number, number] }) => {
  return (
    <>
      <Marker
        position={position}
        icon={new Icon({
          iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0ZDdlZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iIzRmNDZlNSIgZmlsbC1vcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIiBmaWxsPSIjNGY0NmU1Ii8+PC9zdmc+',
          iconSize: [40, 40],
          iconAnchor: [20, 20],
          className: 'pulse-marker' // Add a class for the pulse animation
        })}
      >
        <Popup>
          <div style={{ padding: '8px', textAlign: 'center' }}>
            <strong style={{ color: '#4f46e5' }}>Your Location</strong>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666' }}>
              Showing jobs within 10km
            </p>
          </div>
        </Popup>
      </Marker>
      <Circle 
        center={position} 
        radius={10000} 
        pathOptions={{ 
          color: '#4f46e5', 
          fillColor: '#4f46e5', 
          fillOpacity: 0.1,
          weight: 2,
          dashArray: '5, 5'
        }} 
      />
    </>
  );
};

// Component to get user's current location
const UserLocationButton = ({ onGetLocation }: { onGetLocation: () => void }) => {
  const { t } = useTranslation();
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleGetLocation = () => {
    setIsGettingLocation(true);
    onGetLocation();
    // Reset after a timeout in case geolocation is blocked or takes too long
    setTimeout(() => setIsGettingLocation(false), 3000);
  };

  return (
    <button
      onClick={handleGetLocation}
      disabled={isGettingLocation}
      style={{
        backgroundColor: isGettingLocation ? 'var(--background-lighter)' : 'var(--primary-transparent)',
        color: isGettingLocation ? 'var(--text-muted)' : 'var(--primary-light)',
        padding: '8px 12px',
        borderRadius: '6px',
        border: `1px solid ${isGettingLocation ? 'var(--border)' : 'var(--primary)'}`,
        outline: 'none',
        fontSize: '0.875rem',
        cursor: isGettingLocation ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {isGettingLocation ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="15 85" />
          </svg>
          {t('jobLocations.locating', 'Locating...')}
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
            <path d="M12 8a4 4 0 1 0 0 8 4 4 0 1 0 0-8z" />
          </svg>
          {t('jobLocations.findNearMe', 'Find Jobs Near Me')}
        </>
      )}
    </button>
  );
};

// Add the SalaryRangeSlider component above the JobLocations component
const SalaryRangeSlider = ({ 
  value, 
  onChange 
}: { 
  value: [number, number]; 
  onChange: (value: [number, number]) => void 
}) => {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = React.useState<[number, number]>(value);
  
  // Format salary as X Lakhs
  const formatSalary = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${(value / 1000).toFixed(0)}K`;
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const newValue = [...localValue] as [number, number];
    newValue[index] = parseInt(event.target.value, 10);
    
    // Ensure min <= max
    if (index === 0 && newValue[0] > newValue[1]) {
      newValue[0] = newValue[1];
    } else if (index === 1 && newValue[1] < newValue[0]) {
      newValue[1] = newValue[0];
    }
    
    setLocalValue(newValue);
  };
  
  const handleBlur = () => {
    onChange(localValue);
  };
  
  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {formatSalary(localValue[0])}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {formatSalary(localValue[1])}
        </span>
      </div>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <input
          type="range"
          min="0"
          max="5000000"
          step="50000"
          value={localValue[0]}
          onChange={(e) => handleChange(e, 0)}
          onMouseUp={handleBlur}
          onTouchEnd={handleBlur}
          style={{ flex: 1 }}
        />
        
        <input
          type="range"
          min="0"
          max="5000000"
          step="50000"
          value={localValue[1]}
          onChange={(e) => handleChange(e, 1)}
          onMouseUp={handleBlur}
          onTouchEnd={handleBlur}
          style={{ flex: 1 }}
        />
      </div>
      
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '4px' }}>
        {t('jobLocations.salaryRange', 'Salary Range')}
      </div>
    </div>
  );
};

const JobLocations = () => {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // New state variables for enhanced features
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // Center of India
  const [mapZoom, setMapZoom] = useState(5);
  const [searchParams] = useState<SearchParams>({ query: '' });
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [favoriteJobs, setFavoriteJobs] = useState<FavoriteJob[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [experienceLevelFilter, setExperienceLevelFilter] = useState('all');
  const [salaryRangeFilter, setSalaryRangeFilter] = useState<[number, number]>([0, 5000000]); // 0 to 50 Lakhs
  const mapRef = useRef<L.Map | null>(null);
  
  // Add state for showing jobs on mobile
  const [showJobsOnMobile, setShowJobsOnMobile] = useState(false);

  // Add this state to the component to store success messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Add this state to the component to store jobs by location
  const [jobsByLocation, setJobsByLocation] = useState<Record<string, Job[]>>({});

  // Memoize filtered jobs to improve performance
  const memoizedFilteredJobs = React.useMemo(() => {
    // Apply all active filters
    let result = filteredJobs;
    
    // Filter by industry if selected
    if (selectedIndustry !== 'all') {
      result = result.filter(job => job.industry === selectedIndustry);
    }
    
    // Filter by job type if selected
    if (jobTypeFilter !== 'all') {
      result = result.filter(job => job.jobType === jobTypeFilter);
    }
    
    // Filter by experience level if selected
    if (experienceLevelFilter !== 'all') {
      result = result.filter(job => job.experienceLevel === experienceLevelFilter);
    }
    
    // Filter by salary range
    result = result.filter(job => {
      if (!job.salaryRange) return true;
      return job.salaryRange.min <= salaryRangeFilter[1] && job.salaryRange.max >= salaryRangeFilter[0];
    });
    
    // Filter favorites if showFavorites is true
    if (showFavorites) {
      result = result.filter(job => favoriteJobs.some(fav => fav.id === job.id));
    }
    
    return result;
  }, [filteredJobs, selectedIndustry, jobTypeFilter, experienceLevelFilter, salaryRangeFilter, showFavorites, favoriteJobs]);

  // Enhanced job data with more details
  const initialJobs: Job[] = [
    { 
      id: 1, 
      title: 'Software Engineer', 
      company: 'TechCorp India', 
      location: 'Bangalore', 
      lat: 12.9716, 
      lng: 77.5946,
      description: 'Full-stack developer role for recent graduates',
      salary: '₹6,00,000 - ₹8,00,000',
      skills: ['JavaScript', 'React', 'Node.js'],
      industry: 'technology',
      jobType: 'Full-time',
      experienceLevel: 'Entry-level',
      salaryRange: { min: 600000, max: 800000 },
      url: 'https://example.com/job1'
    },
    { 
      id: 2, 
      title: 'Science Teacher', 
      company: 'Delhi Public School', 
      location: 'Delhi', 
      lat: 28.7041, 
      lng: 77.1025,
      description: 'Teaching science for 8th-10th grade students',
      salary: '₹4,00,000 - ₹5,00,000',
      skills: ['Teaching', 'Science', 'Curriculum Development'],
      industry: 'education',
      jobType: 'Full-time',
      experienceLevel: 'Mid-level',
      salaryRange: { min: 400000, max: 500000 },
      url: 'https://example.com/job2'
    },
    { 
      id: 3, 
      title: 'Mechanical Engineer', 
      company: 'Tata Motors', 
      location: 'Pune', 
      lat: 18.5204, 
      lng: 73.8567,
      description: 'Entry-level mechanical engineering position',
      salary: '₹5,00,000 - ₹7,00,000',
      skills: ['CAD', 'Mechanical Design', 'Problem Solving'],
      industry: 'automotive',
      jobType: 'Full-time',
      experienceLevel: 'Entry-level',
      salaryRange: { min: 500000, max: 700000 },
      url: 'https://example.com/job3'
    },
    { 
      id: 4, 
      title: 'Data Analyst', 
      company: 'Analytics India', 
      location: 'Hyderabad', 
      lat: 17.3850, 
      lng: 78.4867,
      description: 'Entry-level data analysis position with focus on business intelligence',
      salary: '₹5,50,000 - ₹7,50,000',
      skills: ['SQL', 'Python', 'Data Visualization'],
      industry: 'analytics',
      jobType: 'Full-time',
      experienceLevel: 'Entry-level',
      salaryRange: { min: 550000, max: 750000 },
      url: 'https://example.com/job4'
    },
    { 
      id: 5, 
      title: 'Civil Engineer', 
      company: 'Infrastructure Solutions', 
      location: 'Mumbai', 
      lat: 19.0760, 
      lng: 72.8777,
      description: 'Junior civil engineer for infrastructure projects',
      salary: '₹4,50,000 - ₹6,00,000',
      skills: ['AutoCAD', 'Structural Analysis', 'Project Management'],
      industry: 'construction',
      jobType: 'Full-time',
      experienceLevel: 'Entry-level',
      salaryRange: { min: 450000, max: 600000 },
      url: 'https://example.com/job5'
    },
    { 
      id: 6, 
      title: 'Marketing Coordinator', 
      company: 'Global Brands', 
      location: 'Mumbai', 
      lat: 19.0730, 
      lng: 72.8830,
      description: 'Support marketing campaigns and social media initiatives',
      salary: '₹3,50,000 - ₹5,00,000',
      skills: ['Social Media', 'Content Marketing', 'Analytics'],
      industry: 'marketing',
      jobType: 'Part-time',
      experienceLevel: 'Entry-level',
      salaryRange: { min: 350000, max: 500000 },
      url: 'https://example.com/job6'
    },
    { 
      id: 7, 
      title: 'Senior Software Architect', 
      company: 'TechGlobal', 
      location: 'Bangalore', 
      lat: 12.9789, 
      lng: 77.5917,
      description: 'Lead architecture design for enterprise applications',
      salary: '₹25,00,000 - ₹35,00,000',
      skills: ['Java', 'Microservices', 'AWS', 'System Design'],
      industry: 'technology',
      jobType: 'Full-time',
      experienceLevel: 'Senior-level',
      salaryRange: { min: 2500000, max: 3500000 },
      url: 'https://example.com/job7'
    },
    { 
      id: 8, 
      title: 'UI/UX Designer', 
      company: 'Creative Solutions', 
      location: 'Pune', 
      lat: 18.5150, 
      lng: 73.8560,
      description: 'Design user interfaces for web and mobile applications',
      salary: '₹7,00,000 - ₹12,00,000',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      industry: 'design',
      jobType: 'Contract',
      experienceLevel: 'Mid-level',
      salaryRange: { min: 700000, max: 1200000 },
      url: 'https://example.com/job8'
    }
  ];

  // List of industries for the filter
  const industries = [
    { id: 'all', name: t('jobLocations.allIndustries', 'All Industries') },
    { id: 'technology', name: t('jobLocations.technology', 'Technology') },
    { id: 'education', name: t('jobLocations.education', 'Education') },
    { id: 'healthcare', name: t('jobLocations.healthcare', 'Healthcare') },
    { id: 'manufacturing', name: t('jobLocations.manufacturing', 'Manufacturing') },
    { id: 'automotive', name: t('jobLocations.automotive', 'Automotive') },
    { id: 'analytics', name: t('jobLocations.analytics', 'Analytics') },
    { id: 'construction', name: t('jobLocations.construction', 'Construction') },
    { id: 'marketing', name: t('jobLocations.marketing', 'Marketing') },
    { id: 'design', name: t('jobLocations.design', 'Design') }
  ];

  // Job types for filtering
  const jobTypes = [
    { id: 'all', name: t('jobLocations.allTypes', 'All Types') },
    { id: 'Full-time', name: t('jobLocations.fullTime', 'Full-time') },
    { id: 'Part-time', name: t('jobLocations.partTime', 'Part-time') },
    { id: 'Contract', name: t('jobLocations.contract', 'Contract') },
    { id: 'Freelance', name: t('jobLocations.freelance', 'Freelance') },
    { id: 'Internship', name: t('jobLocations.internship', 'Internship') }
  ];

  // Experience levels for filtering
  const experienceLevels = [
    { id: 'all', name: t('jobLocations.allLevels', 'All Levels') },
    { id: 'Entry-level', name: t('jobLocations.entryLevel', 'Entry Level') },
    { id: 'Mid-level', name: t('jobLocations.midLevel', 'Mid Level') },
    { id: 'Senior-level', name: t('jobLocations.seniorLevel', 'Senior Level') }
  ];

  // Initialize jobs on component mount
  useEffect(() => {
    // Set initial jobs
    setJobs(initialJobs);
    setFilteredJobs(initialJobs);
    
    // Load saved favorite jobs from localStorage
    const savedFavorites = localStorage.getItem('favoriteJobs');
    if (savedFavorites) {
      try {
        setFavoriteJobs(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Error loading favorite jobs:', e);
      }
    }
    
    // Inject styles for markers and animations
    const cleanup = injectStyles();
    return () => {
      cleanup();
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Filter jobs when criteria change
  useEffect(() => {
    let filtered = jobs;

    // Filter by industry
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(job => job.industry === selectedIndustry);
    }

    // Filter by job type
    if (jobTypeFilter !== 'all') {
      filtered = filtered.filter(job => job.jobType === jobTypeFilter);
    }

    // Filter by experience level
    if (experienceLevelFilter !== 'all') {
      filtered = filtered.filter(job => job.experienceLevel === experienceLevelFilter);
    }

    // Filter by salary range
    filtered = filtered.filter(job => 
      job.salaryRange && 
      job.salaryRange.min <= salaryRangeFilter[1] && 
      job.salaryRange.max >= salaryRangeFilter[0]
    );

    // Filter favorites if needed
    if (showFavorites) {
      const favoriteIds = favoriteJobs.map(fav => fav.id);
      filtered = filtered.filter(job => favoriteIds.includes(job.id));
    }

    setFilteredJobs(filtered);
  }, [selectedIndustry, jobs, jobTypeFilter, experienceLevelFilter, salaryRangeFilter, showFavorites, favoriteJobs]);

  // Handler for industry filter change
  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIndustry(e.target.value);
  };

  // Handler for job type filter change
  const handleJobTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJobTypeFilter(e.target.value);
  };

  // Handler for experience level filter change
  const handleExperienceLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExperienceLevelFilter(e.target.value);
  };

  // Handler for salary range filter change
  const handleSalaryRangeChange = (range: [number, number]) => {
    setSalaryRangeFilter(range);
  };

  // Handler for selecting a job from the list
  const handleJobClick = (jobId: number) => {
    // Toggle selection - if already selected, deselect it
    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob(null);
      return;
    }
    
    // Find and select the job
      const job = jobs.find(j => j.id === jobId);
      if (job) {
      setSelectedJob(job);
      
      // Center the map on the job's location
        setMapCenter([job.lat, job.lng]);
        setMapZoom(12);
      
      // If on mobile, show job details and hide job list
      if (isMobile) {
        setShowJobsOnMobile(false);
      }
    }
  };

  // Function to toggle favorite status
  const toggleFavorite = (jobId: number) => {
    const isCurrentlyFavorite = favoriteJobs.some(job => job.id === jobId);
    
    let newFavorites: FavoriteJob[];
    if (isCurrentlyFavorite) {
      // Remove from favorites
      newFavorites = favoriteJobs.filter(job => job.id !== jobId);
    } else {
      // Add to favorites
      newFavorites = [...favoriteJobs, { id: jobId, dateAdded: new Date().toISOString() }];
    }
    
    setFavoriteJobs(newFavorites);
    
    // Save to localStorage
    localStorage.setItem('favoriteJobs', JSON.stringify(newFavorites));
  };

  // Check if a job is a favorite
  const isFavorite = (jobId: number): boolean => {
    return favoriteJobs.some(job => job.id === jobId);
  };

  // Toggle showing only favorites
  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  // Handler for location search selection
  const handleLocationSelect = (lat: number, lng: number) => {
    setMapCenter([lat, lng]);
    setMapZoom(12);
  };

  // Modifying the handleGetUserLocation function to improve reliability and performance
  const handleGetUserLocation = () => {
    // Show loading indicator while getting location
    setIsLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      };
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Set user location and update map
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
          setMapZoom(11); // Slightly zoomed out to show more area
          setShowUserLocation(true);
          
          // Calculate distance using optimized method
          const nearbyJobs = jobs.filter(job => {
            // Calculate rough distance first (quick filter)
            const latDiff = Math.abs(job.lat - latitude);
            const lngDiff = Math.abs(job.lng - longitude);
            
            // Quick check - if too far based on lat/lng difference, skip detailed calculation
            if (latDiff > 0.5 || lngDiff > 0.5) return false;
            
            // Calculate distance using Haversine formula for more accuracy
            const R = 6371; // Earth radius in km
            const dLat = (job.lat - latitude) * Math.PI / 180;
            const dLon = (job.lng - longitude) * Math.PI / 180;
            const a = 
              Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(latitude * Math.PI / 180) * Math.cos(job.lat * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const distance = R * c;
            
            // Return jobs within the specified search radius (default: 25km)
            const searchRadius = searchParams.radius || 25;
            return distance <= searchRadius;
          });
          
          // Update displayed jobs with nearby ones
          setFilteredJobs(nearbyJobs);
          
          // Show appropriate message based on results
          if (nearbyJobs.length === 0) {
            setError(t('jobLocations.noJobsNearby', 'No jobs found near your location. Try increasing the search radius.'));
            // Keep showing the message for a bit longer
            setTimeout(() => setError(null), 5000);
          } else {
            // Show success message
            setSuccessMessage(t('jobLocations.jobsFound', `Found ${nearbyJobs.length} jobs within ${searchParams.radius || 25}km of your location.`));
            setTimeout(() => setSuccessMessage(null), 4000);
          }
          
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          let errorMessage = '';
          
          // More specific error messages
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = t('jobLocations.locationPermissionDenied', 'Location permission denied. Please enable location access in your browser settings.');
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = t('jobLocations.locationUnavailable', 'Location information is unavailable. Please try again later.');
              break;
            case error.TIMEOUT:
              errorMessage = t('jobLocations.locationTimeout', 'Location request timed out. Please try again.');
              break;
            default:
              errorMessage = t('jobLocations.locationError', 'Could not get your location. Please check browser permissions.');
          }
          
          setError(errorMessage);
          setIsLoading(false);
        },
        options
      );
    } else {
      setError(t('jobLocations.geoNotSupported', 'Geolocation is not supported by your browser.'));
      setIsLoading(false);
    }
  };

  // Function to match industry based on job title
  const matchIndustry = (title: string): string => {
    title = title.toLowerCase();
    if (title.includes('software') || title.includes('developer') || title.includes('engineer') || title.includes('tech') || title.includes('it ')) {
      return 'technology';
    } else if (title.includes('teacher') || title.includes('tutor') || title.includes('professor')) {
      return 'education';
    } else if (title.includes('doctor') || title.includes('nurse') || title.includes('health')) {
      return 'healthcare';
    } else if (title.includes('manufacturing') || title.includes('production')) {
      return 'manufacturing';
    } else if (title.includes('car') || title.includes('vehicle') || title.includes('automotive')) {
      return 'automotive';
    } else if (title.includes('data') || title.includes('analyst') || title.includes('analytics')) {
      return 'analytics';
    } else if (title.includes('construction') || title.includes('civil')) {
      return 'construction';
    } else if (title.includes('marketing') || title.includes('brand') || title.includes('sales')) {
      return 'marketing';
    } else if (title.includes('design') || title.includes('ux') || title.includes('ui')) {
      return 'design';
    } else {
      return 'technology'; // Default
    }
  };

  // Modify the fetchJobData function to improve performance
  const fetchJobData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For demo purposes using optimized mock data
      setTimeout(() => {
        const mockJobs = generateMockJobs();
        
        // Index jobs by location for faster access
        const jobsByLocation = mockJobs.reduce((acc, job) => {
          const location = job.location;
          if (!acc[location]) {
            acc[location] = [];
          }
          acc[location].push(job);
          return acc;
        }, {} as Record<string, Job[]>);
        
        setJobs(mockJobs);
        setFilteredJobs(mockJobs);
        setJobsByLocation(jobsByLocation);
        
        // If user location is already set, update the nearby jobs
        if (showUserLocation && userLocation) {
          const [lat, lng] = userLocation;
          const nearbyJobs = mockJobs.filter(job => {
            // Calculate distance using Haversine formula
            const R = 6371; // Earth radius in km
            const dLat = (job.lat - lat) * Math.PI / 180;
            const dLon = (job.lng - lng) * Math.PI / 180;
            const a = 
              Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat * Math.PI / 180) * Math.cos(job.lat * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const distance = R * c;
            
            return distance <= (searchParams.radius || 10);
          });
          
          setFilteredJobs(nearbyJobs);
        }
        
        setIsLoading(false);
      }, 1000); // Reduced simulation time for better UX
    } catch (error) {
      console.error('Error loading job data:', error);
      setError(t('jobLocations.apiError', 'Failed to load job data. Please try again.'));
      setIsLoading(false);
    }
  };

  // Create a new function to generate mock jobs for better organization
  const generateMockJobs = () => {
    const cities = [
      { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
      { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
      { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
      { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
      { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
      { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
      { name: 'Pune', lat: 18.5204, lng: 73.8567 },
      { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
      { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
      { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
      { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
      { name: 'Bhubaneswar', lat: 20.2961, lng: 85.8245 },
      { name: 'Indore', lat: 22.7196, lng: 75.8577 },
      { name: 'Coimbatore', lat: 11.0168, lng: 76.9558 }
    ];
    
    // Fix the type for jobsByCity
    const jobsByCity: Record<string, Job[]> = {};
    let allJobs: Job[] = [];
    let id = 1;
    
    // Generate a consistent set of jobs for each city
    cities.forEach(city => {
      // Generate 3-6 jobs per city
      const numJobs = Math.floor(Math.random() * 4) + 3;
      const cityJobs: Job[] = [];
      
      for (let i = 0; i < numJobs; i++) {
        // Generate job with properties
        const jobType = ['Full-time', 'Contract', 'Part-time', 'Internship'][Math.floor(Math.random() * 4)];
        const expLevel = ['Entry-level', 'Mid-level', 'Senior-level'][Math.floor(Math.random() * 3)];
        const minSalary = Math.floor(Math.random() * 1000000) + 500000;
        const maxSalary = minSalary + Math.floor(Math.random() * 1000000);
        
        // Randomize job title and company
        const industries = ['technology', 'analytics', 'healthcare', 'education', 'manufacturing', 'automotive', 'construction', 'marketing'];
        const industry = industries[Math.floor(Math.random() * industries.length)];
        
        // Generate job titles based on industry
        let title;
        switch(industry) {
          case 'technology':
            title = ['Software Developer', 'Full Stack Engineer', 'DevOps Engineer', 'Cloud Architect', 'Data Engineer'][Math.floor(Math.random() * 5)];
            break;
          case 'analytics':
            title = ['Data Scientist', 'Business Analyst', 'Data Analyst', 'Machine Learning Engineer', 'AI Researcher'][Math.floor(Math.random() * 5)];
            break;
          case 'healthcare':
            title = ['Medical Researcher', 'Biomedical Engineer', 'Clinical Data Analyst', 'Healthcare Technician', 'Pharmaceutical Scientist'][Math.floor(Math.random() * 5)];
            break;
          case 'education':
            title = ['STEM Teacher', 'Science Professor', 'Educational Technologist', 'Curriculum Developer', 'Research Assistant'][Math.floor(Math.random() * 5)];
            break;
          default:
            title = ['Project Manager', 'Research Specialist', 'Operations Lead', 'Quality Analyst', 'Process Engineer'][Math.floor(Math.random() * 5)];
        }
        
        // Company names
        const companies = [
          'TechInnovate', 'DataCrafters', 'BioGenesis', 'EcoSolutions', 
          'QuantumLabs', 'NextGen Engineering', 'FutureScience', 
          'RoboTech', 'GreenEnergy', 'CosmoTech', 'MicroTech',
          'InfinityCode', 'WebMatrix', 'CloudNova', 'DigiSphere'
        ];
        const company = companies[Math.floor(Math.random() * companies.length)];
        
        // Add small random offset to lat/lng to prevent markers from stacking exactly
        const latOffset = (Math.random() - 0.5) * 0.05;
        const lngOffset = (Math.random() - 0.5) * 0.05;
        
        const job: Job = {
          id: id++,
          title,
          company: `${company} ${city.name}`,
          location: city.name,
          lat: city.lat + latOffset,
          lng: city.lng + lngOffset,
          description: `Exciting opportunity for a ${title} at ${company} in ${city.name}. Join our growing team and work on cutting-edge projects.`,
          salary: `₹${(minSalary/100000).toFixed(1)}L - ₹${(maxSalary/100000).toFixed(1)}L`,
          skills: ['STEM', 'Research', 'Analysis', 'Problem Solving', 'Communication'],
          industry,
              jobType,
          experienceLevel: expLevel,
          salaryRange: { min: minSalary, max: maxSalary },
          url: `https://example.com/job-${id}`
        };
        
        cityJobs.push(job);
        allJobs.push(job);
      }
      
      jobsByCity[city.name] = cityJobs;
    });
    
    return allJobs;
  };

  // Add function to toggle jobs list on mobile
  const toggleJobsListOnMobile = () => {
    setShowJobsOnMobile(!showJobsOnMobile);
  };

  return (
    <PageLayout
      title={t('jobLocations.title', 'STEM Career Opportunities Map')}
      subtitle={t('jobLocations.subtitle', 'Explore job opportunities across India on the interactive map')}
      heroIcon={<MapPinIcon width={40} height={40} />}
      gradientColors={{ from: 'rgba(99, 102, 241, 0.15)', to: 'rgba(59, 130, 246, 0.1)' }}
    >
      {/* Content starts here */}
      <div style={{ marginBottom: '24px' }}>
        {/* Key statistics */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginTop: '16px'
        }}>
          <div style={{
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            padding: '12px 16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)' }}>
                {jobs.length}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {t('jobLocations.totalJobs', 'Total Jobs')}
              </div>
            </div>
          </div>

      <div style={{ 
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            padding: '12px 16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981' }}>
                {industries.length - 1}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {t('jobLocations.industries', 'Industries')}
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            padding: '12px 16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BookmarkIcon width={20} height={20} style={{ color: '#f59e0b' }} />
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b' }}>
                {favoriteJobs.length}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {t('jobLocations.savedJobs', 'Saved Jobs')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div className="glass-card" style={{ padding: '16px', marginBottom: '24px' }}>
          <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              marginBottom: '8px',
              color: 'var(--text)'
            }}>
              {t('jobLocations.jobSearch', 'Job & Location Search')}
            </h2>

            {/* Location Search - Adding the missing component */}
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ 
                fontSize: '0.875rem', 
                fontWeight: '600', 
                marginBottom: '8px',
                color: 'var(--text)'
              }}>
                {t('jobLocations.searchLocation', 'Search by Location')}
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '8px'
              }}>
                <div style={{ flex: '1' }}>
          <LocationSearch onSelectLocation={handleLocationSelect} />
                </div>
          <UserLocationButton onGetLocation={handleGetUserLocation} />
        </div>
      </div>

        <h3 style={{ 
              fontSize: '0.875rem', 
          fontWeight: '600',
              marginBottom: '8px',
              color: 'var(--text)'
        }}>
              {t('jobLocations.filterBy', 'Filter By')}
        </h3>

        <div style={{ 
          display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px' 
        }}>
            <select
              value={selectedIndustry}
              onChange={handleIndustryChange}
              style={{
                  backgroundColor: 'var(--background-lighter)',
                  color: 'var(--text)',
                padding: '8px 12px',
                borderRadius: '6px',
                  border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '0.875rem',
                  cursor: 'pointer',
                  width: '100%'
              }}
            >
              {industries.map(industry => (
                  <option key={industry.id} value={industry.id}>{industry.name}</option>
              ))}
            </select>

            <select
              value={jobTypeFilter}
              onChange={handleJobTypeChange}
              style={{
                  backgroundColor: 'var(--background-lighter)',
                  color: 'var(--text)',
                padding: '8px 12px',
                borderRadius: '6px',
                  border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '0.875rem',
                  cursor: 'pointer',
                  width: '100%'
              }}
            >
              {jobTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>

            <select
              value={experienceLevelFilter}
              onChange={handleExperienceLevelChange}
              style={{
                  backgroundColor: 'var(--background-lighter)',
                  color: 'var(--text)',
                padding: '8px 12px',
                borderRadius: '6px',
                  border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '0.875rem',
                  cursor: 'pointer',
                  width: '100%'
              }}
            >
              {experienceLevels.map(level => (
                  <option key={level.id} value={level.id}>{level.name}</option>
              ))}
            </select>

              {/* Adding salary range slider */}
              <div style={{
                backgroundColor: 'var(--background-lighter)',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid var(--border)',
              }}>
                <SalaryRangeSlider
                  value={salaryRangeFilter}
                  onChange={handleSalaryRangeChange}
                />
          </div>
        </div>
        
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              <button
                onClick={toggleShowFavorites}
                style={{
                  backgroundColor: showFavorites ? 'var(--primary-transparent)' : 'var(--background-lighter)',
                  color: showFavorites ? 'var(--primary)' : 'var(--text)',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${showFavorites ? 'var(--primary)' : 'var(--border)'}`,
                  outline: 'none',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  flex: '1'
                }}
              >
                <BookmarkIcon width={16} height={16} />
                {showFavorites ? t('jobLocations.showAll', 'All Jobs') : t('jobLocations.showFavorites', 'Saved Jobs')}
              </button>
          
          <button
            onClick={fetchJobData}
            disabled={isLoading}
            style={{
                  backgroundColor: isLoading ? 'var(--background-lighter)' : 'var(--primary-transparent)',
                  color: isLoading ? 'var(--text-muted)' : 'var(--primary-light)',
              padding: '8px 12px',
              borderRadius: '6px',
                  border: `1px solid ${isLoading ? 'var(--border)' : 'var(--primary)'}`,
              outline: 'none',
              fontSize: '0.875rem',
              cursor: isLoading ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
                  justifyContent: 'center',
              gap: '4px',
                  flex: '1'
            }}
          >
            {isLoading ? (
              <>
                    <svg width="16" height="16" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="15 85" />
                </svg>
                    {t('jobLocations.refreshing', 'Loading...')}
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                    {t('jobLocations.refresh', 'Refresh')}
              </>
            )}
          </button>
        </div>
      </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '24px' }}>
        {/* Map Container */}
        <div className="glass-card" style={{ padding: '0', overflow: 'hidden', height: '600px', borderRadius: '12px' }}>
          {isLoading ? (
      <div style={{ 
            display: 'flex',
              justifyContent: 'center', 
            alignItems: 'center',
              height: '100%',
              flexDirection: 'column',
              gap: '16px',
              color: 'var(--text-secondary)'
            }}>
              <div className="loader"></div>
              <p>{t('jobLocations.loading', 'Loading job locations...')}</p>
            </div>
          ) : error ? (
                  <div style={{ 
                    display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100%',
              flexDirection: 'column',
              gap: '16px',
              color: 'var(--text-secondary)',
              padding: '24px'
            }}>
              <p>{error}</p>
                        <button
                onClick={fetchJobData}
                          style={{
                  backgroundColor: 'var(--primary)',
                            color: 'white',
                  padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                  outline: 'none',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                }}
              >
                {t('jobLocations.retry', 'Retry')}
                        </button>
                      </div>
          ) : (
          <MapContainer 
            center={[20.5937, 78.9629]} // Initial center of India
            zoom={5} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            ref={(ref) => { mapRef.current = ref; }}
          >
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
            
            {/* User location marker */}
            {showUserLocation && userLocation && (
              <UserLocationMarker position={userLocation} />
            )}
            
            {/* Update center when mapCenter changes */}
            <SetMapCenter center={mapCenter} zoom={mapZoom} />
            
            {/* Job markers with clustering */}
            <MarkerClusterGroup
              iconCreateFunction={createClusterCustomIcon}
              maxClusterRadius={50}
              spiderfyOnMaxZoom={true}
              showCoverageOnHover={false}
            >
              {filteredJobs.map(job => (
                <Marker 
                  key={job.id} 
                  position={[job.lat, job.lng]}
                  icon={job.id > 100 ? new Icon({
                    iconUrl: markerIcon,
                    shadowUrl: markerShadow,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                    className: 'new-job-marker' // Add a class for styling
                  }) : defaultIcon}
                  eventHandlers={{
                    click: () => {
                      handleJobClick(job.id);
                    },
                  }}
                >
                  <Popup>
                    <div style={{ padding: '4px' }}>
                      <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>{job.title}</h3>
                      <p style={{ fontSize: '14px', marginBottom: '4px' }}>{job.company}</p>
                      <p style={{ fontSize: '12px', marginBottom: '4px' }}>{job.location}</p>
                      
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '4px' }}>
                        {/* Job type badge */}
                        {job.jobType && (
                          <span style={{
                            backgroundColor: '#f3f4f6',
                            borderRadius: '4px',
                            padding: '2px 6px',
                            fontSize: '10px',
                            color: '#1f2937',
                            display: 'inline-block'
                          }}>
                            {job.jobType}
                          </span>
                        )}
                        
                        {/* New badge */}
                        {job.id > 100 && (
                          <span style={{
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '4px',
                            padding: '2px 6px',
                            fontSize: '10px',
                            color: '#34d399',
                            display: 'inline-block'
                          }}>
                            {t('jobLocations.new', 'New')}
                          </span>
                        )}
                        
                        {/* Favorite badge */}
                        {isFavorite(job.id) && (
                          <span style={{
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            borderRadius: '4px',
                            padding: '2px 6px',
                            fontSize: '10px',
                            color: '#f59e0b',
                            display: 'inline-block'
                          }}>
                            {t('jobLocations.favorite', 'Favorite')}
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleJobClick(job.id)}
                        style={{
                          backgroundColor: '#4f46e5',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: 'none',
                          fontSize: '12px',
                          cursor: 'pointer',
                          width: '100%',
                          marginTop: '4px'
                        }}
                      >
                        {t('jobLocations.viewDetails', 'View Details')}
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
          )}
        </div>

        {/* Mobile toggle button for jobs list */}
        {isMobile && (
          <button
            onClick={toggleJobsListOnMobile}
            style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              marginTop: '16px'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M3 12h18M3 18h18"></path>
            </svg>
            {showJobsOnMobile ? t('jobLocations.hideJobs', 'Hide Jobs List') : t('jobLocations.showJobs', 'Show Jobs List')}
          </button>
        )}

        {/* Jobs List - updated to show on mobile when toggled */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px',
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--border)',
          height: isMobile ? (showJobsOnMobile ? 'calc(60vh)' : '0px') : '100%',
          maxHeight: isMobile ? (showJobsOnMobile ? 'calc(60vh)' : '0px') : 'calc(100vh - 200px)',
          transition: 'all 0.3s ease',
          opacity: isMobile ? (showJobsOnMobile ? 1 : 0) : 1,
        }}>
          <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: 'var(--text)', fontSize: '1rem', fontWeight: 600 }}>
              {showFavorites 
                ? t('jobLocations.savedJobs', 'Saved Jobs') 
                : t('jobLocations.availableJobs', 'Available Jobs')} 
              <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>
                ({memoizedFilteredJobs.length})
              </span>
            </h3>
            <button 
              onClick={toggleShowFavorites} 
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              <BookmarkIcon style={{ width: '16px', height: '16px' }} />
              {showFavorites 
                ? t('jobLocations.showAll', 'Show All') 
                : t('jobLocations.showSaved', 'Show Saved')}
            </button>
      </div>

          {isLoading ? (
            // Loading state
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px 0' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  backgroundColor: 'var(--background-lighter)',
                  height: '100px',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
      <div style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'linear-gradient(90deg, transparent, var(--hover), transparent)',
                    animation: 'shimmer 1.5s infinite',
                  }} />
                </div>
              ))}
            </div>
          ) : memoizedFilteredJobs.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px 0' }}>
              {memoizedFilteredJobs.map(job => (
                <div 
                  key={job.id} 
                  onClick={() => handleJobClick(job.id)} 
                  style={{
                    backgroundColor: selectedJob && selectedJob.id === job.id ? 'var(--hover)' : 'var(--background-lighter)',
                    borderRadius: 'var(--border-radius-md)',
                    padding: '12px',
                    cursor: 'pointer',
                    border: `1px solid ${selectedJob && selectedJob.id === job.id ? 'var(--primary-transparent)' : 'var(--border)'}`,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    if (!selectedJob || selectedJob.id !== job.id) {
                      e.currentTarget.style.backgroundColor = 'var(--hover-light)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!selectedJob || selectedJob.id !== job.id) {
                      e.currentTarget.style.backgroundColor = 'var(--background-lighter)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ 
                        fontWeight: 600, 
                        color: 'var(--text)', 
                        marginBottom: '4px',
        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}>
                        {job.title}
                        {job.id >= 100 && (
                          <span style={{
                            backgroundColor: 'var(--primary-transparent)',
                            color: 'var(--primary-light)',
                            fontSize: '0.65rem',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                          }}>
                            {t('jobLocations.new', 'NEW')}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2px' }}>
                        {job.company}
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--text-muted)', 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: '4px',
                        marginBottom: '4px',
                      }}>
                        <MapPinIcon style={{ width: '12px', height: '12px' }} />
                        {job.location}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(job.id);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '4px',
                        cursor: 'pointer',
                        color: isFavorite(job.id) ? 'var(--primary)' : 'var(--text-muted)',
                      }}
                    >
                      <BookmarkIcon 
                        style={{ 
                          width: '18px', 
                          height: '18px',
                          fill: isFavorite(job.id) ? 'var(--primary)' : 'none',
                        }} 
                      />
                    </button>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    gap: '6px', 
                    marginTop: '6px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      fontSize: '0.7rem',
                      backgroundColor: 'var(--background)',
                      color: 'var(--text-muted)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                    }}>
                      {job.salary}
                    </span>
                    {job.jobType && (
                      <span style={{
                        fontSize: '0.7rem',
                        backgroundColor: 'var(--background)',
                        color: 'var(--text-muted)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        border: '1px solid var(--border)',
                      }}>
                        {job.jobType}
                      </span>
                    )}
                    {job.experienceLevel && (
                      <span style={{
                        fontSize: '0.7rem',
                        backgroundColor: 'var(--background)',
                        color: 'var(--text-muted)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        border: '1px solid var(--border)',
                      }}>
                        {job.experienceLevel}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
        justifyContent: 'center',
              padding: '20px',
              color: 'var(--text-muted)',
              height: '100%',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔍</div>
              <p style={{ textAlign: 'center' }}>
                {showFavorites 
                  ? t('jobLocations.noSavedJobs', 'No saved jobs yet. Save jobs to view them here.') 
                  : t('jobLocations.noJobsFound', 'No jobs found. Try adjusting your search criteria.')}
        </p>
      </div>
          )}
    </div>
      </div>

      {/* Also display a success message in the return statement */}
      {successMessage && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(16, 185, 129, 0.9)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          zIndex: 1000,
          maxWidth: '90%',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
          {successMessage}
        </div>
      )}
    </PageLayout>
  );
};

export default JobLocations; 