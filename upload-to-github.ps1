# GitHub Upload Script
# Run this script after installing Git and creating a GitHub repository

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GitHub Upload Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version
    Write-Host "✓ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "2. Install with default settings" -ForegroundColor Yellow
    Write-Host "3. Restart PowerShell and run this script again" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit
}

Write-Host ""
Write-Host "Before proceeding, make sure you have:" -ForegroundColor Yellow
Write-Host "1. Created a repository on GitHub.com" -ForegroundColor Yellow
Write-Host "2. Have your repository URL ready (e.g., https://github.com/username/portfolio.git)" -ForegroundColor Yellow
Write-Host ""

$repoUrl = Read-Host "Enter your GitHub repository URL (or press Enter to skip)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host ""
    Write-Host "Skipping remote setup. You can add it later with:" -ForegroundColor Yellow
    Write-Host "git remote add origin YOUR_REPO_URL" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Repository URL: $repoUrl" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Initializing Git repository..." -ForegroundColor Cyan

# Initialize Git
if (Test-Path .git) {
    Write-Host "✓ Git repository already initialized" -ForegroundColor Green
} else {
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "Adding all files..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit - Premium Cybersecurity Portfolio Website"

Write-Host ""
Write-Host "✓ Commit created successfully!" -ForegroundColor Green

if (-not [string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host ""
    Write-Host "Setting up remote repository..." -ForegroundColor Cyan
    
    # Check if remote already exists
    $remoteExists = git remote get-url origin 2>$null
    if ($remoteExists) {
        Write-Host "Remote 'origin' already exists. Updating..." -ForegroundColor Yellow
        git remote set-url origin $repoUrl
    } else {
        git remote add origin $repoUrl
    }
    
    Write-Host "✓ Remote repository configured" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Renaming branch to 'main'..." -ForegroundColor Cyan
    git branch -M main
    
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
    Write-Host "You may be asked for your GitHub credentials." -ForegroundColor Yellow
    Write-Host "Use a Personal Access Token as password (not your GitHub password)" -ForegroundColor Yellow
    Write-Host ""
    
    git push -u origin main
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✓ Successfully uploaded to GitHub!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host "  Local repository ready!" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To push to GitHub, run:" -ForegroundColor Cyan
    Write-Host "  git remote add origin YOUR_REPO_URL" -ForegroundColor White
    Write-Host "  git branch -M main" -ForegroundColor White
    Write-Host "  git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "Done! Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

