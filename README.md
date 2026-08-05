# Health Recommender

## Overview

A project to learn about building an app to do with health.

The goals of this project are to:

1. Building a website that enables the users to input their own data and metrics
2. When the user presses "submit", in a single turn conversation, an AI agent will recommended them a workout to follow

## Tech Stack

Frontend

- Typescript

Backend

- Python
- FastAPI
- UV Package Manager

## How to Run

You need to have [uv](https://docs.astral.sh/uv/getting-started/installation/) installed as well as [node.js](https://nodejs.org/en/download).

Create environment variable file:

```ps1
cp backend/.env.example backend/.env
```

Add in your own API_KEY to the .env file.

To run the frontend and backend, in the root repository:

```ps1
start-dev.ps1
```

Or, on macOS/Linux:

```bash
./start-dev.sh
```
