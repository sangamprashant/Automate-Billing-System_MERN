from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
import face_recognition
import jwt
import datetime
from dotenv import load_dotenv
import os

# Load environment variables (add error handling)
try:
    load_dotenv()
except FileNotFoundError:
    print("Error: .env file not found. Please create one.")
    exit(1)

app = Flask(__name__, template_folder='pages')
CORS(app)
bcrypt = Bcrypt(app)
# data base
client = MongoClient(os.getenv("MONGODB_URL"))
db = client[os.getenv("MONGODB_DATABASE")]
users_collection = db['users']
# Secret key for JWT token encoding
app.config['AUTH_SECRET'] = os.getenv("AUTH_SECRET")
print(app.config['AUTH_SECRET'])
# Express server api
express_api =os.getenv("EXPRESS_SERVER")

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/register", methods=["POST"])
def register_user():
    try:
        # Retrieve data
        email = request.form.get("email")
        name = request.form.get("name")
        password = request.form.get("password")
        imageURL = request.form.get("imageURL")
        face_photo = request.files.get("face_photo")

        # Validate data
        if not email or not face_photo:
            return jsonify({"error": "Email and face photo are required", "success" : False}), 400

        # Process face photo
        image = face_recognition.load_image_file(face_photo)
        face_locations = face_recognition.face_locations(image)

        if len(face_locations) == 0:
            return jsonify({"error": "No faces found in the photo", "success" : False}), 400

        face_encoding = face_recognition.face_encodings(image)[0]

        # Check if user already exists
        if users_collection.find_one({"email": email}):
            return jsonify({"error": "User with this email already exists", "success" : False}), 409

        # Check if the new face is different from all registered faces
        all_users = users_collection.find({})  # Find all documents
        for user in all_users:
            known_face_encoding = user["face_encoding"]
            match_results = face_recognition.compare_faces([known_face_encoding], face_encoding)
            if match_results[0]:
                return jsonify({"error": "Face already registered with another user", "success" : False}), 409
        
        # Encrypt the password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Save user data to database
        user_data = {"email": email, "name": name, "password": hashed_password, "isAdmin": False, "image":imageURL, "face_encoding": face_encoding.tolist()}
        result = users_collection.insert_one(user_data)
        
        return jsonify({"message": "User registered successfully", "success" : True ,})
    
    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e) , "success" : False}), 500


@app.route("/api/login", methods=["POST"])
def login_user():
    try:
        # Retrieve face photo
        face_photo = request.files.get("face_photo")

        # Validate data
        if not face_photo:
            return jsonify({"error": "Face photo is required", "success":False}), 400

        # Process face photo
        image = face_recognition.load_image_file(face_photo)
        face_locations = face_recognition.face_locations(image)

        if len(face_locations) == 0:
            return jsonify({"error": "No faces found in the photo", "success":False}), 400

        # Get face encoding from uploaded image
        face_encoding = face_recognition.face_encodings(image)[0]

        # Find all users in the database
        all_users = users_collection.find({})  # Find all documents

        # Compare uploaded face encoding with all stored encodings
        found_user = False
        user_id = None
        user_data = None
        for user in all_users:
            known_face_encoding = user["face_encoding"]
            match_results = face_recognition.compare_faces([known_face_encoding], face_encoding)
            if match_results[0]:
                found_user = True
                user_id = str(user["_id"])  # Convert ObjectId to string
                user_data = user
                break  # Exit the loop after finding a match

        if found_user:
            ## Generate JWT token with user._id as payload
            user_data["_id"] = str(user_data["_id"])
            token_payload = {'user': {"_id":user_id}, 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)}
            token = jwt.encode(token_payload, app.config['AUTH_SECRET'] )
            
            # Login successful
            return jsonify({"message": "Login successful", "token": token , "success":True})
        else:
            # No matching face found
            return jsonify({"error": "Invalid credentials", "success":False}), 401

    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred", "details": str(e), "success":False}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8000)
