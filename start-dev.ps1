# PowerShell script to run both backend (FastAPI with uv) and frontend (Vite React)
# Run this from the root of your repository

# Start backend in background (same terminal, non-blocking)
Start-Process -FilePath "uv" -ArgumentList "run fastapi dev" -WorkingDirectory "backend" -NoNewWindow

# Start frontend (Vite) in the current window
cd frontend
npm run dev
