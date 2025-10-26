from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import os
from dotenv import load_dotenv
from functools import wraps

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Create Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialize Flask app
app = Flask(__name__)
CORS(app)


# Decorator to protect routes
def require_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error": "Missing Authorization header"}), 401
        
        try:
            # Remove 'Bearer ' prefix if present
            token = token.replace("Bearer ", "")
            # Verify token
            user = supabase.auth.get_user(token)
            request.user = user.user  # Attach user to request
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({"error": "Invalid or expired token"}), 401
    
    return decorated_function


@app.route("/")
def home():
    return jsonify({"message": "Flask + Supabase backend running ✅"})


# -------- AUTH ROUTES ----------

@app.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        name = data.get("name")  # Optional: capture name
        
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        
        # Prepare user metadata
        user_metadata = {}
        if name:
            user_metadata["full_name"] = name
        
        # Sign up user with metadata
        signup_data = {
            "email": email,
            "password": password
        }
        
        if user_metadata:
            signup_data["options"] = {
                "data": user_metadata
            }
        
        response = supabase.auth.sign_up(signup_data)
        
        # Check if user was created
        if response.user:
            return jsonify({
                "message": "Signup successful! Please check your email to verify your account.",
                "user": {
                    "id": response.user.id,
                    "email": response.user.email
                }
            }), 201
        else:
            return jsonify({"error": "Signup failed"}), 400
            
    except Exception as e:
        error_message = str(e)
        # Handle common Supabase errors
        if "already registered" in error_message.lower():
            return jsonify({"error": "This email is already registered"}), 400
        return jsonify({"error": error_message}), 400


@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        
        # Sign in user
        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        
        # Check if login was successful
        if response.session:
            return jsonify({
                "message": "Login successful",
                "access_token": response.session.access_token,
                "refresh_token": response.session.refresh_token,
                "user": {
                    "id": response.user.id,
                    "email": response.user.email
                }
            }), 200
        else:
            return jsonify({"error": "Login failed"}), 400
            
    except Exception as e:
        error_message = str(e)
        # Handle common authentication errors
        if "invalid" in error_message.lower():
            return jsonify({"error": "Invalid email or password"}), 401
        return jsonify({"error": error_message}), 400


@app.route("/logout", methods=["POST"])
@require_auth
def logout():
    try:
        token = request.headers.get("Authorization").replace("Bearer ", "")
        supabase.auth.sign_out()
        return jsonify({"message": "Logged out successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/profile", methods=["GET"])
@require_auth
def get_profile():
    try:
        # User is already attached to request by decorator
        user = request.user
        return jsonify({
            "user": {
                "id": user.id,
                "email": user.email,
                "created_at": user.created_at
            }
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/refresh", methods=["POST"])
def refresh_token():
    try:
        data = request.get_json()
        refresh_token = data.get("refresh_token")
        
        if not refresh_token:
            return jsonify({"error": "Refresh token is required"}), 400
        
        response = supabase.auth.refresh_session(refresh_token)
        
        if response.session:
            return jsonify({
                "access_token": response.session.access_token,
                "refresh_token": response.session.refresh_token
            }), 200
        else:
            return jsonify({"error": "Token refresh failed"}), 400
            
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True, port=int(os.getenv("PORT", 5000)))