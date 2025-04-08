# JS-PEIS-CARS

![image](https://github.com/user-attachments/assets/b9b87a33-5377-4afa-9985-8c797503f4ee)
![image](https://github.com/user-attachments/assets/2129e0bb-4333-40f9-bc17-b8fc1a2536c7)
![image](https://github.com/user-attachments/assets/d7bae18e-c427-4b1f-8787-c98a3c999f17)


A web application for a car store, built using EJS, JavaScript, CSS, Express, and MongoDB.

## Features

- **Car Catalogue**: Browse a list of available cars with details.

- ![image](https://github.com/user-attachments/assets/b6d7def5-47f3-4e0b-aa5d-662fbb71d9cc)
- ![image](https://github.com/user-attachments/assets/6c4c8cae-48b6-4388-b586-1dd37a359f1e)

- **Add New Cars**: Admins can add new cars with images and descriptions.

- ![image](https://github.com/user-attachments/assets/6ea97682-1d69-486f-9407-dcbfd602fb64)

- **Edit Car Details**: Update information about existing cars.

- ![image](https://github.com/user-attachments/assets/ec0f1d6b-c140-484b-bd87-32bec5c529d4)

- **Purchase Cars**: Users can submit purchase requests.
- **Reviews**: Users can leave reviews for cars.

- ![image](https://github.com/user-attachments/assets/97a25eb0-ce73-47f3-8541-5938eab6a76d)

## Technologies Used

- **Frontend**: EJS, JavaScript, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Middleware**: Multer for file uploads, Morgan for logging

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/PlamenDraganov16/JS-PEIS-CARS.git

Usage
Home Page: Navigate to http://localhost:3000/home to view the homepage.

About Page: Learn more about the store at http://localhost:3000/about.

Catalogue: View all cars at http://localhost:3000/catalogue.

Add Car: Admins can add new cars at http://localhost:3000/addcar.

Edit Car: Edit existing car details at http://localhost:3000/editcar/:id.

Project Structure
models/: Contains Mongoose models for the application.

public/: Static files like CSS, images, and client-side JavaScript.

views/: EJS templates for rendering pages.

server.js: Main server file where routes and middleware are defined.

Dependencies
express: Web framework for Node.js.

mongoose: ODM for MongoDB.

dotenv: Loads environment variables from a .env file.

multer: Middleware for handling file uploads.

morgan: HTTP request logger middleware.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.
