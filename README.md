# Aarambh 2.0

## Problem Statement
Millions of students in rural India face limited access to career counseling, scholarship opportunities, and structured learning resources. This lack of exposure significantly impacts their career outcomes and future potential.

## Features

- 🤖 AI-powered career guidance chatbot with voice support
- 📚 Real-time Indian scholarships & career opportunities
- 📱 Parent communication via WhatsApp
- 📅 Calendar event creation
- 🌐 Multilingual support (English, Hindi, Kannada)
- 🎓 Learning resources integration
- 👁️‍🗨️ Real-time attentiveness detection using webcam and AI

## Tech Stack

- Frontend: React (Vite), Tailwind CSS, React Router, i18next, MediaPipe
- Backend: FastAPI (Python), Uvicorn
- Database: Supabase (PostgreSQL & Storage)
- Integrations: Web Speech API, Twilio, Google Calendar API, A-Frame
## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Supabase account
- Twilio account
- Google Cloud account (for Calendar API)

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   - Create `.env` file in frontend directory
   - Create `.env` file in backend directory
   - Add necessary API keys and credentials

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

## Project Structure

```
careerconnect/
│
├── backend/
│   └── main.py (FastAPI routes)
│   └── services/ (scraping logic, WhatsApp, calendar)
│
├── frontend/
│   └── src/
│       └── components/ (Chatbot, Navbar, Cards, AttentivenessOverlay.jsx)
│       └── pages/ (Home, Scholarships, Chatbot, Learning)
│       └── hooks/ (useAttentiveness.js)
│       └── App.jsx
│       └── i18n.js
│
├── start.sh
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
