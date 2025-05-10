# Supabase Setup Instructions

This project uses Supabase as a backend database service. Follow these steps to set up your environment:

## 1. Create a Supabase Account and Project

1. Go to [Supabase](https://supabase.com/) and sign up for an account
2. Create a new project
3. Take note of your project URL and anon/public key

## 2. Set Up Environment Variables

1. Create a `.env` file in the frontend directory of your project
2. Add the following variables to your `.env` file:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_project_url` and `your_supabase_anon_key` with your actual Supabase project URL and anon key.

## 3. Create Required Database Tables

You'll need to create the following tables in your Supabase database:

### Quiz Results Table

Create a table called `quiz_results` with the following columns:

- `id`: uuid, primary key, default: `uuid_generate_v4()`
- `user_id`: uuid, not null, references `auth.users.id`
- `domain`: text, not null
- `score`: integer, not null
- `total_questions`: integer, not null
- `completed_at`: timestamp with time zone, not null
- `created_at`: timestamp with time zone, default: `now()`

## 4. Set Up Authentication

This project uses Supabase Authentication. You can configure various authentication providers through the Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to Authentication → Providers
3. Enable the providers you want to use (Email, Google, GitHub, etc.)

## Troubleshooting

If you encounter issues with Supabase:

1. Make sure your environment variables are correctly set
2. Check that your Supabase project is active
3. Verify that the required tables have been created
4. Check browser console for any authentication or database errors 