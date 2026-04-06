#!/bin/bash
# Start backend and frontend dev servers concurrently

cd "$(dirname "$0")"

(cd pickel-golf-classic-backend && echo "=== Starting Backend (port 3000) ===" && node server.js) &
(cd pickel-golf-classic-site-new && echo "=== Starting Frontend (port 5173) ===" && npm run dev) &

wait
