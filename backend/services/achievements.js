const { supabase } = require('./supabase');

/**
 * Service for managing user achievements and progress
 */
class AchievementsService {
  /**
   * Get all available achievements in the application
   */
  async getAllAchievements() {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('category', { ascending: true })
        .order('required_points', { ascending: true });
        
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error getting achievements:', error);
      return { data: null, error };
    }
  }

  /**
   * Get a user's earned achievements
   * @param {string} userId - The user's ID
   */
  async getUserAchievements(userId) {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          id,
          user_id,
          achievement_id,
          earned_at,
          achievements (*)
        `)
        .eq('user_id', userId)
        .order('earned_at', { ascending: false });
        
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error(`Error getting achievements for user ${userId}:`, error);
      return { data: null, error };
    }
  }

  /**
   * Get the leaderboard of users ranked by total achievement points
   * @param {number} limit - Maximum number of users to return
   */
  async getLeaderboard(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id, 
          full_name, 
          total_points, 
          achievement_count
        `)
        .order('total_points', { ascending: false })
        .limit(limit);
        
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      return { data: null, error };
    }
  }

  /**
   * Award an achievement to a user
   * @param {string} userId - The user's ID
   * @param {string} achievementId - The achievement ID
   */
  async awardAchievement(userId, achievementId) {
    try {
      // Check if user already has this achievement
      const { data: existingAchievement, error: checkError } = await supabase
        .from('user_achievements')
        .select('id')
        .eq('user_id', userId)
        .eq('achievement_id', achievementId)
        .maybeSingle();
        
      if (checkError) throw checkError;
      
      // If achievement is already earned, do nothing
      if (existingAchievement) {
        return { data: existingAchievement, error: null };
      }
      
      // Get achievement details to calculate points
      const { data: achievement, error: achievementError } = await supabase
        .from('achievements')
        .select('*')
        .eq('id', achievementId)
        .single();
        
      if (achievementError) throw achievementError;
      
      // Start a transaction
      const now = new Date().toISOString();
      
      // Insert user achievement
      const { data, error } = await supabase
        .from('user_achievements')
        .insert([
          {
            user_id: userId,
            achievement_id: achievementId,
            earned_at: now
          }
        ])
        .select()
        .single();
        
      if (error) throw error;
      
      // Update user's total points and achievement count
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          total_points: supabase.rpc('increment', { x: achievement.points }),
          achievement_count: supabase.rpc('increment', { x: 1 }),
          updated_at: now
        })
        .eq('id', userId);
        
      if (updateError) throw updateError;
      
      return { data, error: null };
    } catch (error) {
      console.error(`Error awarding achievement ${achievementId} to user ${userId}:`, error);
      return { data: null, error };
    }
  }

  /**
   * Update a user's progress toward an achievement
   * @param {string} userId - The user's ID
   * @param {string} category - The achievement category (e.g., 'learning', 'quiz')
   * @param {number} points - Points to add
   */
  async updateProgress(userId, category, points = 1) {
    try {
      // Update user's progress in the category
      const { data, error } = await supabase
        .from('user_progress')
        .upsert([
          {
            user_id: userId,
            category,
            points: supabase.rpc('increment', { x: points }),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .single();
        
      if (error) throw error;
      
      // Check if any achievements should be awarded
      const userProgress = data.points;
      
      const { data: achievementsToAward, error: achievementError } = await supabase
        .from('achievements')
        .select('id, required_points')
        .eq('category', category)
        .lte('required_points', userProgress)
        .order('required_points');
        
      if (achievementError) throw achievementError;
      
      // Award each eligible achievement
      if (achievementsToAward?.length > 0) {
        for (const achievement of achievementsToAward) {
          await this.awardAchievement(userId, achievement.id);
        }
      }
      
      return { data, error: null };
    } catch (error) {
      console.error(`Error updating progress for user ${userId}:`, error);
      return { data: null, error };
    }
  }
}

module.exports = new AchievementsService(); 