import { supabase } from '../lib/supabase';

// Simplified auth service with performance optimizations
export const fastSignIn = async (email: string, password: string) => {
  try {
    // Direct call to Supabase with minimal processing
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) return { success: false, error: error.message };
    
    // If successful, return minimal required data
    return { 
      success: true, 
      user: {
        id: data.user?.id,
        email: data.user?.email
      }
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'An error occurred during sign in' };
  }
};

export const fastSignUp = async (email: string, password: string, name: string) => {
  try {
    // Step 1: Create auth user with minimal options for faster signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { 
          full_name: name,
          email_confirmed: true
        },
        emailRedirectTo: null
      }
    });
    
    if (error) return { success: false, error: error.message };
    
    // If we have a user but no session, perform immediate sign-in
    if (data.user && !data.session) {
      console.log("User created but no session, attempting immediate sign-in");
      // Wait a short time before attempting sign-in to let Supabase complete user setup
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const signInResult = await fastSignIn(email, password);
      if (!signInResult.success) {
        console.error("Failed immediate sign-in after signup:", signInResult.error);
        // Still return success if user was created, even if sign-in fails
        return { 
          success: true, 
          user: {
            id: data.user?.id,
            email: data.user?.email
          }
        };
      }
      return signInResult;
    }
    
    // Step 2: Create profile in parallel (don't wait for it to complete)
    if (data.user) {
      // We don't await this - let it run in the background
      supabase.from('profiles').insert([{
        id: data.user.id,
        full_name: name,
        email,
        created_at: new Date(),
        total_points: 0,
        achievement_count: 0
      }]).then(({ error }) => {
        if (error) console.error('Background profile creation error:', error);
      });
    }
    
    // Return success with user information
    return { 
      success: true, 
      user: {
        id: data.user?.id,
        email: data.user?.email
      }
    };
  } catch (err: any) {
    console.error("Signup error:", err);
    return { success: false, error: err.message || 'An error occurred during sign up' };
  }
};

export const fastSignOut = async () => {
  try {
    await supabase.auth.signOut();
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const fastGetCurrentUser = async () => {
  try {
    const { data } = await supabase.auth.getUser();
    return data.user ? {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email
      }
    } : { success: false };
  } catch (err) {
    return { success: false };
  }
}; 