import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Maximum time to wait for auth operations before forcing completion
const AUTH_OPERATION_TIMEOUT = 5000; // 5 seconds

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isInitializing, signIn, signUp, isLoading } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
  });

  // Get the intended destination from location state or default to home
  const from = (location.state as any)?.from?.pathname || '/';

  // If user is already authenticated, redirect to home or intended destination
  useEffect(() => {
    if (!isInitializing && user) {
      navigate(from, { replace: true });
    }
  }, [user, isInitializing, navigate, from]);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      setError(t('auth.emailRequired', 'Email is required'));
      return false;
    }
    
    if (!form.password.trim() || form.password.length < 6) {
      setError(t('auth.passwordLength', 'Password must be at least 6 characters'));
      return false;
    }
    
    if (isSignUp && !form.name.trim()) {
      setError(t('auth.nameRequired', 'Name is required'));
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (isSignUp) {
        // Use the AuthContext's signUp method
        const { error, data } = await signUp({
          email: form.email,
          password: form.password,
          name: form.name,
        });
        
        if (error) throw error;
        
        // Navigate on success
        if (data?.user) {
          navigate(from, { replace: true });
        }
      } else {
        // Use the AuthContext's signIn method
        const { error, data } = await signIn({
          email: form.email,
          password: form.password,
        });
        
        if (error) throw error;
        
        // Navigate on success
        if (data?.user) {
          navigate(from, { replace: true });
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err.message || t('auth.genericError', 'An error occurred during authentication'));
    }
  };

  // Show a simplified loading while initializing auth
  if (isInitializing) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '24px',
      backgroundColor: '#111827'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '32px',
          borderRadius: '12px',
          backgroundColor: '#1F2937',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #374151'
        }}
      >
        <h1 style={{ 
          fontSize: '1.75rem', 
          fontWeight: 'bold', 
          marginBottom: '24px', 
          textAlign: 'center',
          color: '#F9FAFB'
        }}>
          {isSignUp 
            ? t('auth.createAccount', 'Create Account') 
            : t('auth.signIn', 'Sign In')}
        </h1>
        
        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: '#EF4444',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div style={{ marginBottom: '16px' }}>
              <label 
                htmlFor="name"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#D1D5DB'
                }}
              >
                {t('auth.fullName', 'Full Name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  backgroundColor: '#111827',
                  border: '1px solid #374151',
                  color: '#F3F4F6',
                  fontSize: '1rem'
                }}
                placeholder={t('auth.enterName', 'Enter your full name')}
              />
            </div>
          )}
          
          <div style={{ marginBottom: '16px' }}>
            <label 
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#D1D5DB'
              }}
            >
              {t('auth.email', 'Email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: '#111827',
                border: '1px solid #374151',
                color: '#F3F4F6',
                fontSize: '1rem'
              }}
              placeholder={t('auth.enterEmail', 'Enter your email')}
            />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label 
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#D1D5DB'
              }}
            >
              {t('auth.password', 'Password')}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: '#111827',
                border: '1px solid #374151',
                color: '#F3F4F6',
                fontSize: '1rem'
              }}
              placeholder={t('auth.enterPassword', 'Enter your password')}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              backgroundColor: '#4F46E5',
              color: 'white',
              fontWeight: '500',
              border: 'none',
              cursor: isLoading ? 'default' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              fontSize: '1rem',
              marginBottom: '16px'
            }}
          >
            {isLoading 
              ? t('auth.processing', 'Processing...') 
              : isSignUp 
                ? t('auth.createAccount', 'Create Account') 
                : t('auth.signIn', 'Sign In')}
          </button>
          
          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={toggleMode}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#6366F1',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              {isSignUp 
                ? t('auth.alreadyHaveAccount', 'Already have an account? Sign In') 
                : t('auth.noAccount', 'Don\'t have an account? Sign Up')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Auth; 