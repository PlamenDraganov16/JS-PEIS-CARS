JS-PEIS-CARS 🚗
![image](https://github.com/user-attachments/assets/7ce9b55b-82b7-495a-97e8-7e68b3ef092c)

JS-PEIS-CARS is a full-stack web application for managing a virtual car dealership. Built with Node.js, Express, MongoDB, and EJS.

🧩 Features
🔐 Authentication & Authorization
![image](https://github.com/user-attachments/assets/bb0e161b-a623-4f10-8889-f76ed886163a)

Admin login with JWT-based authentication

JWT stored as HTTP-only cookies for enhanced security

Routes protected from unauthorized access

Secure logout functionality

🚙 Car Management
![image](https://github.com/user-attachments/assets/a17f98e0-def7-4947-b9b7-cb4cb97a814b)
![image](https://github.com/user-attachments/assets/6a8848c4-0dbc-4408-aa0d-a524d79f2551)


Add a Car – Admins can upload a new car with images, description, brand, model, and price
![image](https://github.com/user-attachments/assets/92e35c58-8c70-4157-bb21-378f986985f1)

Edit a Car – Update car details via a prefilled edit form
![image](https://github.com/user-attachments/assets/01abf979-85f6-4017-a6e1-b0e6c4c9eeb1)

Delete a Car – Remove car listings from the database

🖼️ Image Handling
Upload multiple images per car

Each car gets a dedicated folder for its images

Uploaded images are previewed dynamically

🛒 Purchase Requests
Users can submit requests to buy cars
![image](https://github.com/user-attachments/assets/f87220b9-9afa-4a10-abe0-139ba1c4f117)

Purchase forms store relevant user and car information
![image](https://github.com/user-attachments/assets/3e362826-5d62-4994-acd4-3d11d5c44662)

Admins can view and manage all requests

⭐ User Reviews
Visitors can leave reviews on specific cars

Reviews include a username, rating, and comment
![image](https://github.com/user-attachments/assets/82ee9a98-013b-432b-baa7-28bb0d95591b)


🧭 Navigation & UI
Clean and functional UI using EJS templates

Responsive layout for desktop and mobile
![image](https://github.com/user-attachments/assets/4d5ca9ff-44a1-48b6-bc1a-57217bbdd76f)
![image](https://github.com/user-attachments/assets/ad02aa1d-a078-43c0-86d9-479a345179c3)

Navigation bar for all key actions (Home, Add Car, View Cars, Login)
![image](https://github.com/user-attachments/assets/586bc1c5-f5e4-428a-96a1-0a972afd0ec7)

Filtering and sorting (price, brand, rating)

🛠️ Tech Stack
Layer	Technology
Frontend	HTML, CSS, JavaScript, EJS
Backend	Node.js, Express.js
Database	MongoDB (via Mongoose)
Auth & Security	JWT, bcrypt, HTTP-only cookies
File Uploads	Multer (for image handling)
Logging	Morgan (HTTP request logger)

📦 Installation
Clone the Repository:

git clone https://github.com/PlamenDraganov16/JS-PEIS-CARS.git
cd JS-PEIS-CARS

Install Dependencies:
npm install

Set Up Environment Variables:
Create a .env file in the root directory:

PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secure_jwt_secret

Run the App:
nodemon server

Visit http://localhost:3000 in your browser.

🔐 Admin Auth Overview
Login route sets a secure, HTTP-only cookie with the JWT

Middleware validates the JWT for protected admin routes
Token expires after a configurable duration
Logout clears the cookie securely

📄 License
This project is licensed under the MIT License.
