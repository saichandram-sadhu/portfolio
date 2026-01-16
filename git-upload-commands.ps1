# Git Upload Commands for GitHub
# Run these commands after Git is installed

# Note: We're skipping the echo command since README.md already exists and is good
# If you want to append, uncomment the line below:
# echo "# portfolio" >> README.md

Write-Host "Initializing Git repository..." -ForegroundColor Cyan
git init

Write-Host "Adding all files..." -ForegroundColor Cyan
git add .

Write-Host "Creating initial commit..." -ForegroundColor Cyan
git commit -m "first commit"

Write-Host "Renaming branch to main..." -ForegroundColor Cyan
git branch -M main

Write-Host "Adding remote repository..." -ForegroundColor Cyan
git remote add origin https://github.com/saichandram-sadhu/portfolio.git

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "You will be asked for your GitHub credentials." -ForegroundColor Yellow
Write-Host "Username: saichandram-sadhu" -ForegroundColor Yellow
Write-Host "Password: Use a Personal Access Token (not your GitHub password)" -ForegroundColor Yellow
Write-Host ""
git push -u origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Success! Portfolio uploaded to GitHub!" -ForegroundColor Green
Write-Host "  View at: https://github.com/saichandram-sadhu/portfolio" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

