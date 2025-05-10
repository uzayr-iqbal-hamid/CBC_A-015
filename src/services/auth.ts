import { Session, User } from '@supabase/supabase-js';

const API_URL = 'http://localhost:8000/api';

export type SignUpCredentials = {
  email: string;
  password: string;
  name?: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export const signUp = async ({ email, password, name }: SignUpCredentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to sign up');
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    console.error('Sign up error:', error);
    return { data: null, error };
  }
};

export const signIn = async ({ email, password }: SignInCredentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to sign in');
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    console.error('Sign in error:', error);
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to sign out');
    }

    return { error: null };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return { error };
  }
};

export const getCurrentUser = async (): Promise<{ user: User | null; error: any }> => {
  try {
    const response = await fetch(`${API_URL}/auth/user`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get user');
    }

    const data = await response.json();
    return { user: data.user, error: null };
  } catch (error: any) {
    console.error('Get user error:', error);
    return { user: null, error };
  }
};

export const resetPassword = async (email: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to reset password');
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    console.error('Reset password error:', error);
    return { data: null, error };
  }
};

export const updatePassword = async (password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/update-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to update password');
    }

    return { error: null };
  } catch (error: any) {
    console.error('Update password error:', error);
    return { error };
  }
}; 