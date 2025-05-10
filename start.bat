@echo off
echo Starting CareerConnect application...

REM Start the backend server
cd backend
start cmd /k "uvicorn main:app --reload --port 8000"

REM Start the frontend development server
cd ../frontend
start cmd /k "npm run dev"

echo Both servers are starting up...
echo Backend will be available at: http://localhost:8000
echo Frontend will be available at: http://localhost:5173 