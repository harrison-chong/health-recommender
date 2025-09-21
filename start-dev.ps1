# PowerShell script to run both backend (FastAPI with uv) and frontend (Vite React)
# Run this from the root of your repository

# Start backend (FastAPI) in a new window using uv run
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd backend; uv pip install; uv run fastapi dev'

# Start frontend (Vite) in the current window
cd frontend
npm run dev
