#!/bin/bash

# Kill any existing servers
echo "Stopping any running servers..."
pkill -f "uvicorn main:app" || true
pkill -f "npm run dev" || true

# Start backend server
echo "Starting backend server..."
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 &
BACKEND_PID=$!

# Start frontend server
echo "Starting frontend server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Function to kill processes on exit
cleanup() {
  echo "Shutting down servers..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
  exit 0
}

# Register the cleanup function on exit
trap cleanup INT TERM EXIT

echo ""
echo "==============================================================="
echo "Servers started successfully!"
echo "- Backend API: http://localhost:8000"
echo "- Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "==============================================================="
echo ""

# Wait for any process to exit
wait 