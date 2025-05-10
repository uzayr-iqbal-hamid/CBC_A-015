const express = require('express');
const router = express.Router();
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

// Get all bookmarks for a user
router.get('/', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      return res.status(500).json({ error: 'Failed to fetch bookmarks' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in GET /bookmarks:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new bookmark
router.post('/', requireAuth, async (req, res) => {
  try {
    const { resource_type, resource_id, title, description, thumbnail_url } = req.body;
    const userId = req.user.id;
    
    // Validate required fields
    if (!resource_type || !resource_id || !title) {
      return res.status(400).json({ error: 'Resource type, ID, and title are required' });
    }
    
    // Check for existing bookmark
    const { data: existingBookmark, error: checkError } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', userId)
      .eq('resource_type', resource_type)
      .eq('resource_id', resource_id)
      .maybeSingle();
    
    if (checkError) {
      return res.status(500).json({ error: 'Failed to check for existing bookmark' });
    }
    
    if (existingBookmark) {
      return res.status(409).json({ error: 'Resource already bookmarked', id: existingBookmark.id });
    }
    
    // Create the bookmark
    const { data, error } = await supabase
      .from('bookmarks')
      .insert([
        {
          user_id: userId,
          resource_type,
          resource_id,
          title,
          description: description || null,
          thumbnail_url: thumbnail_url || null,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();
    
    if (error) {
      return res.status(500).json({ error: 'Failed to create bookmark' });
    }
    
    return res.status(201).json(data);
  } catch (error) {
    console.error('Error in POST /bookmarks:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a bookmark
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Check if bookmark exists and belongs to the user
    const { data: bookmark, error: checkError } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle();
    
    if (checkError) {
      return res.status(500).json({ error: 'Failed to check bookmark' });
    }
    
    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found or does not belong to user' });
    }
    
    // Delete the bookmark
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id);
    
    if (error) {
      return res.status(500).json({ error: 'Failed to delete bookmark' });
    }
    
    return res.status(200).json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    console.error(`Error in DELETE /bookmarks/${req.params.id}:`, error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Check if a resource is bookmarked
router.get('/check', requireAuth, async (req, res) => {
  try {
    const { resource_type, resource_id } = req.query;
    const userId = req.user.id;
    
    if (!resource_type || !resource_id) {
      return res.status(400).json({ error: 'Resource type and ID are required' });
    }
    
    const { data, error } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', userId)
      .eq('resource_type', resource_type)
      .eq('resource_id', resource_id)
      .maybeSingle();
    
    if (error) {
      return res.status(500).json({ error: 'Failed to check bookmark status' });
    }
    
    return res.status(200).json({
      isBookmarked: !!data,
      bookmarkId: data ? data.id : null
    });
  } catch (error) {
    console.error('Error in GET /bookmarks/check:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 