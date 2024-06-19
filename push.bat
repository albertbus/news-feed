@echo off
setlocal

REM Set the path to your repository
cd /d C:\Users\alber\Desktop\rss-feed

REM Add all files in the folder
git add .

REM Commit the changes
git commit -m "Automated commit of all files in the folder"

REM Push the changes
git push origin main

endlocal
