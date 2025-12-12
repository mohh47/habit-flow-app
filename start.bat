@echo off
title Tawakkal App Server
echo Starting Local Server at http://localhost:8000...
echo DO NOT CLOSE THIS WINDOW
powershell -ExecutionPolicy Bypass -File server.ps1
pause
