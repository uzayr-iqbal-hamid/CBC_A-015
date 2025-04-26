# Aarambh Database Setup Guide

This guide explains how to set up your Supabase database for the Aarambh application.

## Requirements

1. A Supabase account (free tier works fine)
2. Access to Supabase SQL Editor

## Setup Steps

### 1. Create a Supabase Project

1. Sign up or log in to [Supabase](https://supabase.com/)
2. Create a new project with a name of your choice
3. Wait for the database to be ready

### 2. Set Up Tables and Policies

1. In your Supabase dashboard, navigate to the SQL Editor
2. Create a new query and paste the contents of `database_schema.sql` from this directory
3. Run the query to create all required tables and security policies

### 3. Get API Credentials

1. Go to Project Settings > API
2. Copy the URL and anon/public key
3. Set these values in your `.env` files:
   - In `backend/.env`: Set `SUPABASE_URL` and `SUPABASE_KEY`
   - In `frontend/.env`: Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY`

## Database Structure

The Aarambh database includes the following tables:

### profiles
Extends Supabase Auth users with additional profile information and gamification data.

### achievements
Stores available achievements that users can earn.

### user_achievements
Junction table connecting users with their earned achievements.

### user_progress
Tracks user progress in different categories toward earning achievements.

### bookmarks
Stores resources that users have bookmarked for later reference.

### quiz_results
Stores results of quizzes taken by users, including career assessment results.

### calendar_events
Stores calendar events created by users.

## Row Level Security

The schema includes Row Level Security (RLS) policies to ensure users can only:
- View all profiles but only update their own
- View all achievements
- View only their own achievements, progress, bookmarks, quiz results, and calendar events
- Create, update, or delete only their own bookmarks and calendar events

## Sample Data

The schema file includes commented sample achievement data that you can uncomment and run to populate the achievements table.

## Troubleshooting

If you encounter errors with the SQL script:

1. Make sure you're running the script in the Supabase SQL Editor
2. If you get foreign key constraint errors, make sure the tables are created in the correct order
3. If you get "relation already exists" errors, you may need to drop existing tables first

For more help, refer to the [Supabase documentation](https://supabase.com/docs/guides/database). 