# PowerShell script to run both backend (FastAPI with uv) and frontend (Vite React)
# Run this from the root of your repository

$OriginalLocation = $PWD

# Start backend in background (same terminal, non-blocking)
# First sync dependencies
Set-Location backend
uv sync
Set-Location ..
Start-Process -FilePath "uv" -ArgumentList "run fastapi dev" -WorkingDirectory "backend" -NoNewWindow

# Start frontend (Vite) in the current window
try {
    Set-Location frontend
    npm run dev
} finally {
    Set-Location $OriginalLocation
}