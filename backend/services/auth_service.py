from supabase import create_client, Client
from fastapi import HTTPException, status
import os
from typing import Optional, Dict, Any
import logging
from dotenv import load_dotenv

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Debug: Print environment variables
logger.debug(f"SUPABASE_URL: {os.getenv('SUPABASE_URL')}")
logger.debug(f"SUPABASE_KEY: {os.getenv('SUPABASE_KEY')}")

class AuthService:
    def __init__(self):
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_KEY")
        
        if not supabase_url or not supabase_key:
            raise ValueError("Missing required environment variables SUPABASE_URL or SUPABASE_KEY")
            
        self.supabase: Client = create_client(
            supabase_url=supabase_url,
            supabase_key=supabase_key
        )

    async def sign_up(self, email: str, password: str) -> Dict[str, Any]:
        try:
            response = self.supabase.auth.sign_up({
                "email": email,
                "password": password
            })
            
            if response.user:
                # Create profile for the new user
                self.supabase.table("profiles").insert({
                    "id": response.user.id,
                    "email": email,
                    "full_name": "",
                    "avatar_url": None
                }).execute()
                
                return {
                    "user": response.user,
                    "session": response.session
                }
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Failed to create user"
                )
        except Exception as e:
            logger.error(f"Error in sign_up: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
            )

    async def sign_in(self, email: str, password: str) -> Dict[str, Any]:
        try:
            response = self.supabase.auth.sign_in_with_password({
                "email": email,
                "password": password
            })
            
            if response.user and response.session:
                return {
                    "user": response.user,
                    "session": response.session
                }
            else:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid credentials"
                )
        except Exception as e:
            logger.error(f"Error in sign_in: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )

    async def sign_out(self, access_token: str) -> None:
        try:
            self.supabase.auth.sign_out()
        except Exception as e:
            logger.error(f"Error in sign_out: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
            )

    async def get_user(self, access_token: str) -> Optional[Dict[str, Any]]:
        try:
            user = self.supabase.auth.get_user(access_token)
            if user:
                return user
            return None
        except Exception as e:
            logger.error(f"Error in get_user: {str(e)}")
            return None

    async def reset_password(self, email: str) -> None:
        try:
            self.supabase.auth.reset_password_email(email)
        except Exception as e:
            logger.error(f"Error in reset_password: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
            )

    async def update_password(self, access_token: str, new_password: str) -> None:
        try:
            self.supabase.auth.update_user({
                "password": new_password
            })
        except Exception as e:
            logger.error(f"Error in update_password: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
            ) 