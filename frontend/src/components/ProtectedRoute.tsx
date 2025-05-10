import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loading from './Loading';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * A wrapper component for routes that require authentication
 * Redirects to login page if user is not authenticated
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isInitializing } = useAuth();
  const location = useLocation();

  // While checking authentication status, show loading spinner
  if (isInitializing) {
    return <Loading />;
  }

  // If not authenticated, redirect to the auth page
  if (!user) {
    // Save the current path to redirect back after login
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
} 