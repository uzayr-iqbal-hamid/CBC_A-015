from fastapi import FastAPI, HTTPException, status, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict
from datetime import datetime
import os
import logging
import httpx
import json

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import our services
from services.calendar_service import CalendarService

app = FastAPI(
    title="Aarambh API",
    description="Backend API for Aarambh application",
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

# Get the Express server URL from environment variable or use default
EXPRESS_SERVER_URL = os.getenv("EXPRESS_SERVER_URL", "http://localhost:3000")

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

# Helper function to get auth token from request
async def get_auth_token(request: Request):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authorization header"
        )
    return auth_header.split(' ')[1]

# Health check endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to Aarambh API"}

# Proxy route for authentication - forwards requests to Express server
@app.post("/api/auth/{endpoint:path}")
async def auth_proxy(endpoint: str, request: Request):
    try:
        body = await request.json()
        headers = {key: value for key, value in request.headers.items() 
                   if key.lower() not in ('host', 'content-length')}
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{EXPRESS_SERVER_URL}/auth/{endpoint}",
                json=body,
                headers=headers
            )
            
            return JSONResponse(
                content=response.json(),
                status_code=response.status_code
            )
    except Exception as e:
        logger.error(f"Error in auth proxy: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

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

# Proxy route for achievements - forwards requests to Express server
@app.get("/api/achievements/{endpoint:path}")
@app.post("/api/achievements/{endpoint:path}")
async def achievements_proxy(endpoint: str, request: Request):
    try:
        method = request.method.lower()
        url = f"{EXPRESS_SERVER_URL}/achievements/{endpoint}"
        
        # Extract query parameters
        params = {k: v for k, v in request.query_params.items()}
        
        # Extract headers
        headers = {key: value for key, value in request.headers.items() 
                   if key.lower() not in ('host', 'content-length')}
        
        # Get request body for POST requests
        body = await request.body()
        body = json.loads(body) if body else None
        
        async with httpx.AsyncClient() as client:
            if method == "get":
                response = await client.get(url, params=params, headers=headers)
            elif method == "post":
                response = await client.post(url, json=body, headers=headers)
            else:
                raise HTTPException(status_code=405, detail="Method not allowed")
            
            return JSONResponse(
                content=response.json(),
                status_code=response.status_code
            )
    except Exception as e:
        logger.error(f"Error in achievements proxy: {str(e)}")
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