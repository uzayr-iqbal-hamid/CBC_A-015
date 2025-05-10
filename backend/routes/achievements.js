const express = require('express');
const router = express.Router();
const achievementsService = require('../services/achievements');
const { supabase } = require('../services/supabase');

// Middleware to verify user authentication
const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error || !data.user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Authentication failed' });
  }
};

// Get all available achievements
router.get('/', async (req, res) => {
  try {
    const { data, error } = await achievementsService.getAllAchievements();
    
    if (error) {
      return res.status(500).json({ error: 'Failed to fetch achievements' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in GET /achievements:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get authenticated user's achievements
router.get('/user', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { data, error } = await achievementsService.getUserAchievements(userId);
    
    if (error) {
      return res.status(500).json({ error: 'Failed to fetch user achievements' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in GET /achievements/user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get achievement leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const { data, error } = await achievementsService.getLeaderboard(limit);
    
    if (error) {
      return res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in GET /achievements/leaderboard:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user progress for an achievement category
router.post('/progress', requireAuth, async (req, res) => {
  try {
    const { category, points } = req.body;
    const userId = req.user.id;
    
    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }
    
    const parsedPoints = parseInt(points) || 1;
    
    const { data, error } = await achievementsService.updateProgress(userId, category, parsedPoints);
    
    if (error) {
      return res.status(500).json({ error: 'Failed to update progress' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in POST /achievements/progress:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 