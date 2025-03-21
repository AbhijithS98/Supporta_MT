BACKEND MACHINE TASK

Project Overview

This is a backend application built using Node.js, Express.js, and MongoDB. It includes:

*User authentication (JWT-based login, refresh tokens)
*Brand & Product management
*Blocking & Unblocking system
*Product filtering, sorting, and access control

Tech Stack

*Node.js (Backend)
*Express.js (Framework)
*MongoDB (Database)
*Mongoose (ODM for MongoDB)
*bcrypt.js (Password hashing)
*jsonwebtoken (JWT) (Authentication)
*Multer (File uploads)


Setup & Installation

1. Clone the Repository
git clone <repo-url>
cd backend

2. Install Dependencies
npm install

3. Configure Environment Variables
Create a .env file in the root directory and add:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/supportta-mt
JWT_SECRET=841f593c4e8a4eba18eeaa4aea5078a8891cf79c8587560e421ce481caa1fbdf
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

4. Start the Server
npm start
Server will run on http://localhost:5000.



API Endpoints

1. Authentication
Method                 Endpoint                           Description

POST                   /api/auth/register                 Register a new user
POST                   /api/auth/login                    User login
POST                   /api/auth/refresh-token            Get new access token using refresh token
POST                   /api/auth/logout                   Logout user (clears refresh token)


2. Profile Management
Method                 Endpoint                           Description

PUT                    /api/user/profile/:id              Updates user's profile
DELETE                 /api/user/profile/:id              Deletes user's profile


3. Brand Management
Method                 Endpoint                           Description

POST                   /api/brand/add-brand               Create a new brand
GET                    /api/brand/list-brands             List all brands


3. Product Management
Method                 Endpoint                           Description

POST                   /api/product/add-product           Create a product
GET                    /api/product/list-products         Get all products with blocking system (with/without filter & sorting)
GET                    /api/product/my-products           Get logged-in user's products
PUT                    /api/product/update/:id            Update a product (only own product of a user)
DELETE                 /api/product/delete/:id            Delete a product (only own product of a user)


4. Blocking System
Method                 Endpoint                           Description

POST                   /api/user/block                    Block a user
POST                   /api/user/unblock                  Unblock a user





Sample API Request & Response

Register User:

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "iamjohn"
}

Response:

{
    "message": "User registered successfully",
    "user": {
        "username": "john_doe",
        "email": "john@example.com",
        "password": "$2b$10$HsWsPqcUMD7NWlk2FYe7beSEqpNZFf1YN51zPO50chjF2e0DBGHd6",
        "profilePhoto": "",
        "blockedUsers": [],
        "_id": "37dae123a02e0923f496f4ew",
        "createdAt": "2025-03-19T15:22:16.545Z",
        "updatedAt": "2025-03-19T15:22:16.545Z",
        "__v": 0
    }
}




For more sample requests & responses, check the Postman collection given in the Repo.