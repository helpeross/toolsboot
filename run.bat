@echo off
cd /d D:\mysite\toolsboot
start http://localhost:1313
.\hugo.exe server -D
pause
