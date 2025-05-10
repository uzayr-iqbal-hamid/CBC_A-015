# Google Calendar Integration Setup

This guide will help you set up the Google Calendar API for the Aarambh application to track academic deadlines and events.

## Prerequisites

1. A Google account
2. Access to [Google Cloud Console](https://console.cloud.google.com/)

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top of the page
3. Click on "New Project"
4. Enter a project name (e.g., "Aarambh Calendar")
5. Click "Create"
6. Wait for the project to be created and then select it from the project dropdown

## Step 2: Enable the Google Calendar API

1. In your project dashboard, navigate to "APIs & Services" > "Library"
2. Search for "Google Calendar API"
3. Click on the Google Calendar API result
4. Click "Enable"

## Step 3: Configure OAuth Consent Screen

1. Navigate to "APIs & Services" > "OAuth consent screen"
2. Select "External" as the user type (or "Internal" if you're using Google Workspace)
3. Click "Create"
4. Fill in the required information:
   - App name: "Aarambh"
   - User support email: Your email address
   - Developer contact information: Your email address
5. Click "Save and Continue"
6. Under "Scopes," click "Add or Remove Scopes"
7. Add the following scope: `https://www.googleapis.com/auth/calendar`
8. Click "Save and Continue"
9. Add test users if needed (your Google email)
10. Click "Save and Continue"
11. Review the summary and click "Back to Dashboard"

## Step 4: Create OAuth 2.0 Credentials

1. Navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Desktop app" as the application type
4. Enter a name for the OAuth client (e.g., "Aarambh Calendar Client")
5. Click "Create"
6. You'll see a modal with your client ID and client secret
7. Download the JSON file (you'll need this information later)

## Step 5: Configure Your Application

1. Copy the `.env.example` file to `.env` in the backend directory
2. Open the `.env` file and update the following values from your OAuth client JSON:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_PROJECT_ID=your_project_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```

## Step 6: First Run and Authorization

The first time you run the application and try to create a calendar event, you will:

1. Be prompted to authorize the application by opening a browser
2. Sign in with your Google account
3. Grant permissions to the application to access your Google Calendar
4. Upon successful authorization, a `token.json` file will be created in the backend directory
5. Subsequent runs will use this token file for authentication

## Troubleshooting

- If you get authentication errors, delete the `token.json` file and try again
- Make sure your OAuth consent screen is properly configured
- Check that you've added your email as a test user if your app is in the "Testing" mode

## Security Considerations

- Never commit the `.env` file or `token.json` to version control
- In a production environment, consider using a more secure method to store credentials 