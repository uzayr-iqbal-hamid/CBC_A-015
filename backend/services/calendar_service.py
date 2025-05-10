import os
import json
import logging
from datetime import datetime, timedelta
import uuid

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class CalendarService:
    """
    A simplified calendar service implementation that works in demo mode
    without requiring Google Calendar API credentials
    """
    
    def __init__(self):
        self.events = []
        # Create some demo events immediately
        self._create_demo_events()
        logger.info("Calendar service initialized in demo mode with sample events")
    
    def _create_demo_events(self):
        """Create sample events for demo purposes"""
        today = datetime.now()
        
        demo_events = [
            {
                "summary": "JEE Advanced Entrance Exam",
                "description": "Joint Entrance Examination for IITs",
                "start_time": (today + timedelta(days=7)).isoformat(),
                "end_time": (today + timedelta(days=7, hours=3)).isoformat(),
                "location": "Examination Centers Across India",
                "timezone": "Asia/Kolkata"
            },
            {
                "summary": "NEET Application Deadline",
                "description": "Last date to apply for NEET medical entrance exam",
                "start_time": (today + timedelta(days=14)).isoformat(),
                "end_time": (today + timedelta(days=14, hours=1)).isoformat(),
                "location": "Online",
                "timezone": "Asia/Kolkata"
            },
            {
                "summary": "Class 12 Board Exams",
                "description": "CBSE Class 12 Board Examinations",
                "start_time": (today + timedelta(days=30)).isoformat(),
                "end_time": (today + timedelta(days=30, hours=4)).isoformat(),
                "location": "School Examination Centers",
                "timezone": "Asia/Kolkata"
            }
        ]
        
        # Process and store events
        for event_data in demo_events:
            self.events.append(self._format_event(event_data))

    def _format_event(self, event_data):
        """Format event data consistently"""
        event_id = str(uuid.uuid4())
        
        return {
            "id": event_id,
            "summary": event_data["summary"],
            "description": event_data.get("description", ""),
            "location": event_data.get("location", ""),
            "start": event_data["start_time"],
            "end": event_data["end_time"],
            "link": f"https://calendar.google.com/calendar/event?eid={event_id}"
        }
    
    def create_event(self, event_data):
        """
        Create a new calendar event (in memory only for demo)
        
        Args:
            event_data: Dictionary with event details
            
        Returns:
            The created event data
        """
        try:
            # Format the event data
            new_event = self._format_event(event_data)
            
            # Add to our in-memory events list
            self.events.append(new_event)
            
            logger.info(f"Created demo event: {new_event['summary']}")
            return new_event
        except Exception as e:
            logger.error(f"Error creating event: {str(e)}")
            raise
    
    def get_upcoming_events(self, max_results=10):
        """
        Get upcoming events
        
        Args:
            max_results: Maximum number of events to return
            
        Returns:
            List of events
        """
        try:
            # Sort events by start date
            sorted_events = sorted(
                self.events,
                key=lambda x: x["start"]
            )
            
            # Return the requested number of events
            return sorted_events[:max_results]
        except Exception as e:
            logger.error(f"Error getting events: {str(e)}")
            raise 