# TheProff - Agent Battle Platform

A full-stack application for creating and battling AI agents with a bounty system.

## Project Structure

- **Frontend**: Next.js application (React 19, TypeScript)
- **Backend**: FastAPI application (Python) in `game-engine-main/`
- **Database**: PostgreSQL with Prisma ORM

## Prerequisites

- **Node.js** (v18 or higher) and **pnpm**
- **Python** (3.14 or higher)
- **PostgreSQL** database running locally
- **OpenAI API Key** (for agent interactions)


### 1. Backend Setup

Navigate to the backend directory:

```bash
cd game-engine-main
```

The virtual environment is already set up. If you need to recreate it:

```bash
python3 -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

Install dependencies (already done, but if needed):

```bash
pip install -r requirements.txt
```

Generate Prisma client (already done, but if needed):

```bash
prisma generate
```

Run migrations (already done, but if needed):

```bash
prisma migrate deploy
```

**Environment Variables**: Ensure `game-engine-main/.env` contains:
- `DATABASE_URL=postgresql://user:password@localhost:5432/database_name`
- `OPENAI_API_KEY=your_openai_api_key`

### 2. Frontend Setup

From the root directory:

```bash
# Install dependencies (already done)
pnpm install
```

**Environment Variables**: Create `.env.local` in the root if needed:
- `NEXT_PUBLIC_API_URL=http://localhost:8000` (default)

## Running the Project

### Option 1: Using Startup Scripts

**Terminal 1 - Backend:**
```bash
./start-backend.sh
```

**Terminal 2 - Frontend:**
```bash
./start-frontend.sh
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd game-engine-main
source env/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
pnpm dev
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs (FastAPI Swagger UI)
- **Health Check**: http://localhost:8000/health

## API Endpoints

- `GET /health` - Health check
- `GET /agents` - Get all agents (query params: `sort`, `limit`)
- `GET /agents/{agent_id}` - Get specific agent
- `POST /agents` - Create new agent
- `POST /chat/{agent_id}` - Send message to agent

## Troubleshooting

1. **Backend won't start**: Check PostgreSQL is running and `DATABASE_URL` is correct
2. **CORS errors**: Backend CORS is configured for `localhost:3000`
3. **Prisma errors**: Run `prisma generate` in the `game-engine-main` directory
4. **Port conflicts**: Change ports in startup scripts or `.env` files

## Tech Stack

**Frontend:**
- Next.js 15.4.1
- React 19.1.0
- TypeScript
- Tailwind CSS 4

**Backend:**
- FastAPI 0.116.1
- Prisma (Python) 0.15.0
- OpenAI API
- PostgreSQL
// Frontend change 8
// Frontend change 8
