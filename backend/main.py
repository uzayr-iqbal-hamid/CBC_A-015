from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List, Optional, Any
from datetime import datetime
import os
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import our calendar service
from services.calendar_service import CalendarService

app = FastAPI(
    title="CareerConnect API",
    description="Backend API for CareerConnect application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development - replace with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
calendar_service = CalendarService()

# Pydantic models for request validation
class CalendarEventCreate(BaseModel):
    summary: str = Field(..., description="Event title")
    description: str = Field(..., description="Event description")
    location: Optional[str] = Field(None, description="Event location")
    start_time: str = Field(..., description="Start datetime in ISO format")
    end_time: str = Field(..., description="End datetime in ISO format")
    timezone: Optional[str] = Field("Asia/Kolkata", description="Timezone")
    reminder_minutes: Optional[List[int]] = Field([60, 1440], description="Reminder minutes before event")

class CalendarEvent(BaseModel):
    id: str
    summary: str
    description: Optional[str] = None
    location: Optional[str] = None
    start: Any
    link: str

class ErrorResponse(BaseModel):
    detail: str

# Health check endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to CareerConnect API"}

# Calendar endpoints
@app.post(
    "/api/calendar/event", 
    response_model=CalendarEvent,
    status_code=status.HTTP_201_CREATED
)
async def create_calendar_event(event_data: CalendarEventCreate):
    try:
        created_event = calendar_service.create_event(event_data.dict())
        return created_event
    except Exception as e:
        logger.error(f"Error creating calendar event: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get(
    "/api/calendar/events", 
    response_model=List[CalendarEvent]
)
async def get_calendar_events(max_results: int = 10):
    try:
        events = calendar_service.get_upcoming_events(max_results)
        return events
    except Exception as e:
        logger.error(f"Error fetching calendar events: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Scholarship endpoints (placeholder)
@app.get("/api/scholarships")
async def get_scholarships():
    return {"message": "Scholarship data will be implemented"}

# Chatbot endpoints (placeholder)
@app.post("/api/chatbot")
async def chatbot_interaction():
    return {"message": "Chatbot interaction will be implemented"}

# WhatsApp notification endpoints (placeholder)
@app.post("/api/whatsapp/notify")
async def send_whatsapp_notification():
    return {"message": "WhatsApp notification will be implemented"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run(app, host=host, port=port) 