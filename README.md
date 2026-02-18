# TCOL Server

> REST API backend for the TCOL application.

Handles user authentication, exercise management, session submission, progress tracking, and orchestrates communication with the voice processor microservice.

## Tech Stack

- **Node.js + Express**
- **MongoDB + Mongoose** — data persistence
- **JWT** — stateless authentication
- **bcryptjs** — password hashing
- **Helmet + CORS** — security middleware
- **Morgan** — HTTP request logging
- **Axios** — voice processor communication

## API Routes

### Auth — `/api/auth`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Create new account | Public |
| POST | `/login` | Login, returns JWT | Public |
| GET | `/me` | Get current user | Protected |

### Exercises — `/api/exercises`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/daily` | Get today's exercise | Protected |
| GET | `/` | Browse all exercises | Protected |
| GET | `/:id` | Get single exercise | Protected |

### Sessions — `/api/sessions`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Submit a session | Protected |
| GET | `/` | Get session history | Protected |
| GET | `/progress` | Get progress data | Protected |

## Data Models

- **User** — auth fields, `currentStage`, `difficultyTier`, `stats` (streak, avg score, total sessions), `impromptuUnlocked`
- **Exercise** — `type` (guided-reading / impromptu-speaking), `difficulty`, `content`, `wordCount`
- **Session** — links User + Exercise, stores `transcript`, `duration`, `feedback` (scores + tips)

## Progression System

Impromptu Speaking unlocks when:
- `totalSessions >= 5` AND
- `averageScore >= 60`

## Setup

```bash
npm install

cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

npm run seed   # populate initial exercises
npm run dev    # development (nodemon)
npm start      # production
```

## Environment Variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tcol
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
VOICE_PROCESSOR_URL=http://localhost:5001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```
