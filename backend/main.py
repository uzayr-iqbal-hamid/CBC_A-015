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
from services.auth_service import AuthService

app = FastAPI(
    title="Aarambh API",
    description="Backend API for Aarambh application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
auth_service = AuthService()

# Pydantic models for request validation
class SignUpRequest(BaseModel):
    email: str
    password: str

class SignInRequest(BaseModel):
    email: str
    password: str

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

# Authentication endpoints
@app.post("/api/auth/signup")
async def sign_up(request: SignUpRequest):
    try:
        logger.info(f"Attempting to sign up user: {request.email}")
        result = await auth_service.sign_up(request.email, request.password)
        logger.info(f"Successfully signed up user: {request.email}")
        return result
    except Exception as e:
        logger.error(f"Error in sign_up: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/auth/signin")
async def sign_in(request: SignInRequest):
    try:
        logger.info(f"Attempting to sign in user: {request.email}")
        result = await auth_service.sign_in(request.email, request.password)
        logger.info(f"Successfully signed in user: {request.email}")
        return result
    except Exception as e:
        logger.error(f"Error in sign_in: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/auth/signout")
async def sign_out(request: Request):
    try:
        token = await get_auth_token(request)
        await auth_service.sign_out(token)
        return {"message": "Successfully signed out"}
    except Exception as e:
        logger.error(f"Error in sign_out: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/auth/user")
async def get_user(request: Request):
    try:
        token = await get_auth_token(request)
        user = await auth_service.get_user(token)
        if user:
            return user
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    except Exception as e:
        logger.error(f"Error in get_user: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run(app, host=host, port=port) 