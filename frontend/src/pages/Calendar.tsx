import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CalendarIcon, ArrowLeftIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import axios from 'axios';

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const Calendar = () => {
  const { t } = useTranslation();
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState({
    summary: '',
    description: '',
    location: '',
    start_date: '',
    start_time: '',
    end_date: '', 
    end_time: '',
    reminder_minutes: [60, 1440] // Default: 1 hour and 1 day
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    // Validate required fields
    if (!eventForm.summary.trim()) {
      setFormError("Event title is required");
      return false;
    }
    
    if (!eventForm.description.trim()) {
      setFormError("Event description is required");
      return false;
    }
    
    if (!eventForm.start_date || !eventForm.start_time) {
      setFormError("Start date and time are required");
      return false;
    }
    
    if (!eventForm.end_date || !eventForm.end_time) {
      setFormError("End date and time are required");
      return false;
    }
    
    // Validate dates
    const startDateTime = new Date(`${eventForm.start_date}T${eventForm.start_time}:00`);
    const endDateTime = new Date(`${eventForm.end_date}T${eventForm.end_time}:00`);
    
    if (isNaN(startDateTime.getTime())) {
      setFormError("Invalid start date or time");
      return false;
    }
    
    if (isNaN(endDateTime.getTime())) {
      setFormError("Invalid end date or time");
      return false;
    }
    
    if (endDateTime <= startDateTime) {
      setFormError("End time must be after start time");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setFormLoading(true);
    
    try {
      // Format start and end times for the API
      const startDateTime = new Date(`${eventForm.start_date}T${eventForm.start_time}:00`);
      const endDateTime = new Date(`${eventForm.end_date}T${eventForm.end_time}:00`);
      
      const eventData = {
        summary: eventForm.summary,
        description: eventForm.description,
        location: eventForm.location,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        timezone: "Asia/Kolkata",
        reminder_minutes: eventForm.reminder_minutes
      };
      
      // Call the API
      await axios.post(`${API_BASE_URL}/api/calendar/event`, eventData);
      
      // Reset form
      setEventForm({
        summary: '',
        description: '',
        location: '',
        start_date: '',
        start_time: '',
        end_date: '',
        end_time: '',
        reminder_minutes: [60, 1440]
      });
      
      setFormSuccess(true);
      setTimeout(() => {
        setFormSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error creating event:', error);
      
      // Handle different types of errors
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          setFormError("Network error. Please check your connection and try again.");
        } else {
          setFormError(error.response.data?.detail || "Failed to create event. Please try again.");
        }
      } else {
        setFormError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '32px 16px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#1f2937',
            color: '#d1d5db',
            textDecoration: 'none'
          }}>
            <ArrowLeftIcon style={{ width: '20px', height: '20px' }} />
          </Link>
          
          <h1 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '700', 
            color: '#ffffff',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <CalendarIcon style={{ width: '24px', height: '24px', color: '#3b82f6' }} />
            {t('calendar.createEvent', 'Add Academic Calendar Event')}
          </h1>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          padding: '24px',
          borderRadius: '12px',
          backgroundColor: '#1f2937',
          border: '1px solid #374151'
        }}
      >
        {formSuccess ? (
          <div style={{
            padding: '32px 16px',
            textAlign: 'center',
            color: '#10b981',
            borderRadius: '8px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            marginBottom: '16px'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" style={{ width: '48px', height: '48px', margin: '0 auto 16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>Event Created Successfully!</h3>
            <p style={{ marginBottom: '16px' }}>Your event has been added to the academic calendar.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link to="/" style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                display: 'inline-block'
              }}>
                Back to Home
              </Link>
              <button 
                onClick={() => setFormSuccess(false)}
                style={{
                  backgroundColor: '#374151',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Add Another Event
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label 
                htmlFor="summary"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#9ca3af',
                  marginBottom: '8px'
                }}
              >
                {t('calendar.eventTitle', 'Event Title')} *
              </label>
              <input
                type="text"
                id="summary"
                name="summary"
                value={eventForm.summary}
                onChange={handleFormChange}
                required
                placeholder="Enter event title"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #4b5563',
                  backgroundColor: '#111827',
                  color: '#e5e7eb',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label 
                htmlFor="description"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#9ca3af',
                  marginBottom: '8px'
                }}
              >
                {t('calendar.description', 'Description')} *
              </label>
              <textarea
                id="description"
                name="description"
                value={eventForm.description}
                onChange={handleFormChange}
                required
                placeholder="Enter event description"
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #4b5563',
                  backgroundColor: '#111827',
                  color: '#e5e7eb',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label 
                htmlFor="location"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#9ca3af',
                  marginBottom: '8px'
                }}
              >
                {t('calendar.location', 'Location (Optional)')}
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={eventForm.location}
                onChange={handleFormChange}
                placeholder="Enter location"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #4b5563',
                  backgroundColor: '#111827',
                  color: '#e5e7eb',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginBottom: '24px'
            }}>
              {/* Start Date & Time */}
              <div>
                <label 
                  htmlFor="start_date"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#9ca3af',
                    marginBottom: '8px'
                  }}
                >
                  {t('calendar.startDate', 'Start Date')} *
                </label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={eventForm.start_date}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #4b5563',
                    backgroundColor: '#111827',
                    color: '#e5e7eb',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label 
                  htmlFor="start_time"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#9ca3af',
                    marginBottom: '8px'
                  }}
                >
                  {t('calendar.startTime', 'Start Time')} *
                </label>
                <input
                  type="time"
                  id="start_time"
                  name="start_time"
                  value={eventForm.start_time}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #4b5563',
                    backgroundColor: '#111827',
                    color: '#e5e7eb',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginBottom: '32px'
            }}>
              {/* End Date & Time */}
              <div>
                <label 
                  htmlFor="end_date"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#9ca3af',
                    marginBottom: '8px'
                  }}
                >
                  {t('calendar.endDate', 'End Date')} *
                </label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={eventForm.end_date}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #4b5563',
                    backgroundColor: '#111827',
                    color: '#e5e7eb',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label 
                  htmlFor="end_time"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#9ca3af',
                    marginBottom: '8px'
                  }}
                >
                  {t('calendar.endTime', 'End Time')} *
                </label>
                <input
                  type="time"
                  id="end_time"
                  name="end_time"
                  value={eventForm.end_time}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #4b5563',
                    backgroundColor: '#111827',
                    color: '#e5e7eb',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
            
            {formError && (
              <div style={{
                marginBottom: '24px',
                padding: '12px',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                color: '#ef4444',
                borderRadius: '8px',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ExclamationCircleIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                {formError}
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link to="/" style={{
                padding: '12px 24px',
                borderRadius: '8px',
                backgroundColor: '#374151',
                color: 'white',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                textDecoration: 'none',
                textAlign: 'center',
                flex: '1'
              }}>
                Cancel
              </Link>
              
              <button
                type="submit"
                disabled={formLoading}
                style={{
                  flex: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: formLoading ? '#60a5fa' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: formLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: formLoading ? 0.7 : 1,
                }}
              >
                {formLoading ? 'Creating Event...' : 'Create Event'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Calendar; 