#!/bin/bash

# Start the backend server
cd backend
uvicorn main:app --reload --port 8000 &

# Start the frontend development server
cd ../frontend
npm run dev

# Wait for any process to exit
wait

# Exit with status of process that exited first
exit $? 