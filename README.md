# JS-PEIS-CARS

A web application for a car store, built using EJS, JavaScript, CSS, Express, and MongoDB.

## Features

- **Car Catalogue**: Browse a list of available cars with details.
- **Add New Cars**: Admins can add new cars with images and descriptions.
- **Edit Car Details**: Update information about existing cars.
- **Purchase Cars**: Users can submit purchase requests.
- **Reviews**: Users can leave reviews for cars.

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
