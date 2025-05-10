import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { getCurrentUser, signIn, signOut, signUp, SignInCredentials, SignUpCredentials } from '../services/auth';
import { fastGetCurrentUser, fastSignIn, fastSignUp, fastSignOut } from '../services/fastAuth';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isInitializing: boolean;
  signIn: (credentials: SignInCredentials) => Promise<{ data: any; error: any }>;
  signUp: (credentials: SignUpCredentials) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetAuthState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Maximum time to wait for auth initialization before forcing it to complete
const AUTH_INIT_TIMEOUT = 2000; // Even shorter timeout for better UX

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to reset auth state if something goes wrong
  const resetAuthState = () => {
    console.log("Resetting auth state");
    setIsInitializing(false);
    setIsLoading(false);
    setUser(null);
    setSession(null);
  };

  useEffect(() => {
    // Simple auth initialization
    const initAuth = async () => {
      setIsInitializing(true);
      console.log("Initializing auth...");
      
      // Set a shorter timeout for faster response
      const timeoutId = setTimeout(() => {
        console.log("Auth initialization timed out");
        resetAuthState();
      }, AUTH_INIT_TIMEOUT);
      
      try {
        // Simple check for existing session
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          setSession(data.session);
          setUser(data.session.user);
        }
      } catch (error) {
        console.error("Error during auth initialization:", error);
        resetAuthState();
      } finally {
        clearTimeout(timeoutId);
        setIsInitializing(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event);
      
      if (session) {
        setUser(session.user);
        setSession(session);
      } else {
        setUser(null);
        setSession(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  // Simplified sign in handler
  const handleSignIn = async (credentials: SignInCredentials) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
      
      return { data, error };
    } catch (error: any) {
      return { data: null, error };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Simplified sign up handler
  const handleSignUp = async (credentials: SignUpCredentials) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: { 
            full_name: credentials.name,
            email_confirmed: true
          },
          emailRedirectTo: null
        }
      });
      
      return { data, error };
    } catch (error: any) {
      return { data: null, error };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Simplified sign out handler
  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error: any) {
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isInitializing,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        resetAuthState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 