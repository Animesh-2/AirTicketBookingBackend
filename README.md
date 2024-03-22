# Air Ticket Booking Backend

This repository contains the backend code for an Air Ticket Booking system. It is built using Node.js, Express.js, and MongoDB (NEM) as the backend stack.

## Models

### User Model

{
  _id: ObjectId,
  name: String,
  email: String,
  password: String
}

### Flight Model
{
  _id: ObjectId,
  airline: String,
  flightNo: String,
  departure: String,
  arrival: String,
  departureTime: Date,
  arrivalTime: Date,
  seats: Number,
  price: Number
}

### Booking Model
{
  _id: ObjectId,
  user: { type: ObjectId, ref: 'User' },
  flight: { type: ObjectId, ref: 'Flight' }
}

## API Endpoints

### User Authentication

- **POST** /api/register

  - **Description**: Register a new user.
  - **Request Body**: 
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  - **Response**: 
    - **Status Code**: 201
    - **Body**: User object

- **POST** /api/login

  - **Description**: Log in with existing credentials.
  - **Request Body**: 
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  - **Response**: 
    - **Status Code**: 200
    - **Body**: JWT token

### Flights

- **GET** /api/flights

  - **Description**: Get all available flights.
  - **Response**: 
    - **Status Code**: 200
    - **Body**: Array of flight objects

- **GET** /api/flights/:id

  - **Description**: Get details of a specific flight by ID.
  - **Response**: 
    - **Status Code**: 200
    - **Body**: Flight object

- **POST** /api/flights

  - **Description**: Add a new flight to the system.
  - **Request Body**: Flight object
  - **Response**: 
    - **Status Code**: 201
    - **Body**: Created flight object

- **PUT / PATCH** /api/flights/:id

  - **Description**: Update details of a specific flight by ID.
  - **Request Body**: Updated flight object
  - **Response**: 
    - **Status Code**: 204

- **DELETE** /api/flights/:id

  - **Description**: Delete a specific flight by ID.
  - **Response**: 
    - **Status Code**: 202

### Booking

- **POST** /api/booking

  - **Description**: Book a flight.
  - **Request Body**: 
    ```json
    {
      "user": "user_id",
      "flight": "flight_id"
    }
    ```
  - **Response**: 
    - **Status Code**: 201
    - **Body**: Created booking object

### Dashboard

- **GET** /api/dashboard

  - **Description**: Get all bookings with user and flight details.
  - **Response**: 
    - **Status Code**: 200
    - **Body**: Array of booking objects with populated user and flight details

- **PUT / PATCH** /api/dashboard/:id

  - **Description**: Update a booking by ID.
  - **Request Body**: Updated booking object
  - **Response**: 
    - **Status Code**: 204

- **DELETE** /api/dashboard/:id

  - **Description**: Delete a booking by ID.
  - **Response**: 
    - **Status Code**: 202

Backend deployed link: [https://airticketbookingbackend.onrender.com](Backend Deployed Link)

