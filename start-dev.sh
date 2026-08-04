#!/usr/bin/env bash
# Run both backend (FastAPI via uv) and frontend (Vite React).
# Bash equivalent of start-dev.ps1. Run from the repo root.
#
# Backend runs in the background; the frontend runs in the foreground.
# Ctrl+C stops the frontend and the trap cleans up the backend.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_PID=""

cleanup() {
  if [[ -n "$BACKEND_PID" ]] && kill -0 "$BACKEND_PID" 2>/dev/null; then
    echo -e "\nStopping backend (pid $BACKEND_PID)..."
    kill "$BACKEND_PID" 2>/dev/null || true
    wait "$BACKEND_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

# Start backend: sync deps, then run FastAPI in dev mode (background)
echo "Syncing backend dependencies..."
( cd "$REPO_ROOT/backend" && uv sync )
echo "Starting backend (FastAPI)..."
( cd "$REPO_ROOT/backend" && uv run fastapi dev ) &
BACKEND_PID=$!

# Start frontend (Vite) in the foreground
echo "Starting frontend (Vite)..."
cd "$REPO_ROOT/frontend"
npm run dev
