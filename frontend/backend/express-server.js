const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const achievementsRoutes = require('./routes/achievements');
const bookmarksRoutes = require('./routes/bookmarks');
const { supabase } = require('./services/supabase');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Authentication routes
app.post('/auth/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Create user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name || '',
        },
      },
    });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: data.user.id,
          full_name: name || '',
          email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          total_points: 0,
          achievement_count: 0
        },
      ]);
      
      if (profileError) {
        console.error('Error creating profile:', profileError);
      }
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in signup:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in signin:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/auth/signout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json({ message: 'Successfully signed out' });
  } catch (error) {
    console.error('Error in signout:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/auth/reset-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.PASSWORD_RESET_REDIRECT || 'http://localhost:5173/reset-password',
    });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error in reset-password:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Use achievements routes
app.use('/achievements', achievementsRoutes);

// Use bookmarks routes
app.use('/bookmarks', bookmarksRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Aarambh Express API is running' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

module.exports = app; 