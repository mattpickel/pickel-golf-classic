@echo off
REM Start backend and frontend dev servers concurrently

start "Backend" cmd /k "cd /d %~dp0pickel-golf-classic-backend && node server.js"
start "Frontend" cmd /k "cd /d %~dp0pickel-golf-classic-site-new && npm run dev"
