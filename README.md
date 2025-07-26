# Poke Catcher

A full-stack Pokemon catching application built with React/Next.js frontend and NestJS backend.

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
