#!/bin/bash

# Start the FastAPI backend server
cd "$(dirname "$0")/game-engine-main"
uvicorn main:app --reload --host 0.0.0.0 --port 8000

