# Poke Catcher

A full-stack Pokemon catching application built with React/Next.js frontend and NestJS backend.

## Backend Architecture 
The main idea behind the backend was to keep it lightweight and avoid duplicating data that already exists in the PokeAPI. Instead of storing all pokemon details, I decided to only save the essential ownership information.
What we store:

- Pokemon ID (from PokeAPI)
- Pokemon name
- User who caught it
- Timestamps

### Why this approach:

Pokemon data never changes in the PokeAPI, so why store it twice?
Always get fresh, accurate pokemon data from the official source

### How it ~~works~~ was planned to work with the frontend:

When the user catches a pokemon, we save just the ID/name to our DB
When user wants to see their collection the backend returns list of caught pokemon IDs
Frontend takes those IDs and batch fetches full pokemon details from PokeAPI using Promise.all() fetching one after another. (As i understand the PokeAPI doens't provide a way to fetch multiple pokemons with details) 

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm

## Development Setup


### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd poke-catcher
npm install
```

### 2. Environment Variables
Make sure to include a .env file for inside the backend and client folders. Each folder contains a config file named .env.example. Renaming them to .env should provide you the necessary env vars.

### 3. Start Database
```bash
npm run docker:up
```

### 4. Run Database Migration
```bash
npm run start:migrate:dev
```

### 5. Start Development Servers
```bash
# Terminal 1 - Start backend server
npm run dev:server

# Terminal 2 - Start frontend client  
npm run dev:client
```

## Using the Application
By default the application runs on the following ports
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Database: PostgreSQL on localhost:5432

For testing the API you can use the postman collection json file included in the repository.
