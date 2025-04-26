import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

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
  console.log("Starting signUp service function");
  const startTime = Date.now();
  
  try {
    console.time('supabase-auth-signup');
    // Use a more direct approach - sign up with immediate sign in
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          emailConfirmed: true
        },
        emailRedirectTo: null // Disable email confirmation
      },
    });
    console.timeEnd('supabase-auth-signup');
    console.log(`Auth signup call took ${Date.now() - startTime}ms`);

    if (signUpError) {
      console.error("Sign up error from Supabase:", signUpError);
      throw signUpError;
    }

    // If we have a user but no session, try to sign in immediately
    if (signUpData.user && !signUpData.session) {
      console.log("User created but no session, signing in...");
      console.time('immediate-signin');
      
      try {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        console.timeEnd('immediate-signin');
        
        if (signInError) {
          console.error("Error during immediate sign in:", signInError);
          // If sign-in fails, we still return the signup data
          return { data: signUpData, error: null };
        }
        
        // Return the sign-in data which will have the user and session
        return { data: signInData, error: null };
      } catch (signInCatchError) {
        console.error("Caught error during immediate sign in:", signInCatchError);
        // Return original signup data
        return { data: signUpData, error: null };
      }
    }

    // If we have a user and session from signup, update their profile if needed
    if (signUpData.user) {
      console.log("User created with session, updating profile");
      console.time('profile-update');
      
      // Create profile record if needed
      try {
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: signUpData.user.id,
            full_name: name,
            email,
            created_at: new Date(),
            total_points: 0,
            achievement_count: 0
          },
        ]);
        
        console.timeEnd('profile-update');
        
        if (profileError) {
          console.error('Error creating profile:', profileError);
          // Non-blocking error - still return successful signup
        }
      } catch (profileCatchError) {
        console.error('Caught error creating profile:', profileCatchError);
        // Non-blocking error - still return successful signup
      }
    }

    console.log(`Total signUp service took ${Date.now() - startTime}ms`);
    return { data: signUpData, error: null };
  } catch (error: any) {
    console.error(`signUp service error after ${Date.now() - startTime}ms:`, error);
    return { data: null, error };
  }
};

export const signIn = async ({ email, password }: SignInCredentials) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error };
  }
};

export const getCurrentSession = async (): Promise<{ session: Session | null; error: any }> => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session: data.session, error: null };
  } catch (error: any) {
    return { session: null, error };
  }
};

export const getCurrentUser = async (): Promise<{ user: User | null; error: any }> => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user: data.user, error: null };
  } catch (error: any) {
    return { user: null, error };
  }
};

export const resetPassword = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const updatePassword = async (password: string) => {
  try {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error };
  }
}; 