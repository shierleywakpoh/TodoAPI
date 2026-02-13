# TODO LIST API

Todo List API is a RESTful API that allows users to create, update, delete, and retrieve todo items.

This system includes features such as robust error handling, secure JWT authentication, a refresh token mechanism, filtering, sorting, pagination, rate limiting, throttling, and unit testing.

## FEATURES
### Authentication & Authorization
- User registration with hashed passwords (bcrypt)
- Login using JWT access token
- Refresh token mechanism
- Protected routes using Bearer authentication
- Secure logout (refresh token invalidation)

### To-Do Management (CRUD)
- Create a new todo
- Retrieve todo list (with filtering, sorting, and pagination)
- Update a todo
- Delete a todo
Each user can only access and modify their own todos.

### Refresh Token Mechanism
Authentication flow:
User logs in and receives:
- Short-lived Access Token
- Long-lived Refresh Token
When the access token expires:
- The client sends the refresh token to /api/refresh
- The server validates the refresh token
- A new access token is issued
Logout invalidates the refresh token.

This mechanism improves security while maintaining a good user experience.

### Rate Limiting and Throttling
- Global request limit per IP (50 requests per minute)
- Stricter rate limiting on authentication endpoints
- Returns HTTP 429 Too Many Requests when the limit is exceeded

Example response:
{
    "message": "Too many requests, please try again later"
}

### Testing
Unit testing implemented using Jest and Supertest.
Test coverage includes:
- Input validation
- Proper HTTP status codes
- Edge cases and error handling

## TECH STACK
- Node.js
- Express.js
- MySQL 
- JWT
- Bcrypt
- Jest & Supertest
- Express Rate Limit
- Express Slow Down

installation
1. Clone the repository:
    git clone
2. Install the dependencies:
    npm install
3. Set up environment variables
    Create a .env file in the root directory and add:
    - DB_HOST=(your db host)
    - DB_USER=(your db user)
    - DB_PASSWORD=(your db password)
    - DB_DATABASE=todo_API
    - JWT_SECRET=(your jwt secret key)
    - JWT_REFRESH_TOKEN=(your jwt refresh secret key)

4. Start the server:
    npm start
5. unit testing 
    npm test

## USAGE
This section documents the main API endpoints, including required parameters, request bodies, and example responses.

You can interact with the API using tools such as Postman.

### User Registration 
Register a new user  
Endpoint: POST /api/register

Request body:  
{
    "name" : "newUser",
    "email": "newUser@email.com",
    "password":"userPassword"
}

Response:  
{
    "message": "register successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmV3VXNlciIsImVtYWlsIjoibmV3VXNlckBlbWFpbC5jb20iLCJpYXQiOjE3NzA5NjE2NDMsImV4cCI6MTc3MDk2MTgyM30.YzQuVbMAyi3YaUbuGdRRadqgkuu9dF5tpkP_aakpgq8"
}

### User Login 
Authenticate a user  
Endpoint: POST /api/login

Request body:  
{
    "email": "newUser@email.com",
    "password":"userPassword"
}

Response :  
{
    "message": "login sucessfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld1VzZXJAZW1haWwuY29tIiwiaWF0IjoxNzcwOTYyMjcwLCJleHAiOjE3NzA5NjI0NTB9.S6dhIM3-QbH-ck7udj8H2wUvnv6HQyFK2wxtxTODKO8"
}

### Create Todo List 
Create a new todo item   
Endpoint: POST /api/todos

Headers:  
{
  "Authorization": "Bearer your-jwt-token"
}

Request body:  
{
  "title": "Buy electronics",
  "description": "Buy dish washer and oven "
}

Response :  
[
    {
        "id": 37,
        "title": "Buy electronics",
        "description": "Buy dish washer and oven "
    }
]

### Update Todo List   
Update an existing todo item  
Endpoint: PUT /api/todos/:id


Headers:  
{
  "Authorization": "Bearer your-jwt-token"
}

Request body:  
{
  "title": "Buy groceries",
  "description": "Buy sugar, milk, eggs, bread, and cheese"
}

Response :  
{
    "id": 20,
    "title": "Buy groceries",
    "description": "Buy sugar, milk, eggs, bread, and cheese"
}

### Delete Todo List  
Delete a todo item  
Endpoint : DELETE /api/todos/:id

Headers:  
{
  "Authorization": "Bearer your-jwt-token"
}

Response :  
{
    "message": "succesfully"
}

### Get Todo Items (Pagination)  
Retrieve a list of todo items with pagination.  
Endpoint : GET /api/todos?page=3&limit=10

Headers:  
{
  "Authorization": "Bearer your-jwt-token"
}

Response :  
{
    "data": [
        {
            "id": 37,
            "title": "Buy electronics",
            "description": "Buy dish washer and oven "
        }
    ],
    "page": 3,
    "limit": 10,
    "total": 1
}

### Filtering    
Retrieve specific todo items based on a column value  
Endpoint: GET /api/todos?column=description&value=washer

Headers:  
{
  "Authorization": "Bearer your-jwt-token"
}

Response :  
{
    "result": [
        {
            "id": 37,
            "title": "Buy electronics",
            "description": "Buy dish washer and oven "
        }
    ]
}

### Sorting   
Sort todo items  
Endpoint: GET /api/todos?column=id&sort=desc  

Headers:  
{
  "Authorization": "Bearer your-jwt-token"
}

Response :  
 "result": [
        {
            "id": 37,
            "title": "Buy electronics",
            "description": "Buy dish washer and oven "
        },
        {
            "id": 36,
            "title": "Buy bebek",
            "description": "bebek goreng"
        },
        {
            "id": 35,
            "title": "Buy bebek",
            "description": "bebek panggang"
        }
]

## Project URL
https://roadmap.sh/projects/todo-list-api

