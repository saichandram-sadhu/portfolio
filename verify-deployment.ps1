# Deployment Verification Script
# Run this after renaming your folder to check everything is working

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Deployment Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check folder name
$currentFolder = Split-Path -Leaf (Get-Location)
Write-Host "Current folder: $currentFolder" -ForegroundColor Yellow

if ($currentFolder -match '\s') {
    Write-Host "❌ WARNING: Folder name contains spaces!" -ForegroundColor Red
    Write-Host "   This can cause issues on Netlify." -ForegroundColor Red
    Write-Host "   Please rename folder to remove spaces." -ForegroundColor Red
    Write-Host ""
} else {
    Write-Host "✅ Folder name is good (no spaces)" -ForegroundColor Green
    Write-Host ""
}

# Check required files
Write-Host "Checking required files..." -ForegroundColor Cyan

$requiredFiles = @(
    "index.html",
    "css/style.css",
    "js/main.js",
    "js/contact-form.js",
    "js/blog-newsletter.js",
    "robots.txt",
    "sitemap.xml",
    "site.webmanifest"
)

$allFilesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file - MISSING!" -ForegroundColor Red
        $allFilesExist = $false
    }
}

Write-Host ""

# Check assets
if (Test-Path "assets/images") {
    Write-Host "✅ assets/images/ folder exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  assets/images/ folder not found" -ForegroundColor Yellow
}

Write-Host ""

# Check for spaces in file paths
Write-Host "Checking for problematic file names..." -ForegroundColor Cyan
$filesWithSpaces = Get-ChildItem -Recurse -File | Where-Object { $_.Name -match '\s' -or $_.FullName -match '\s' }
if ($filesWithSpaces) {
    Write-Host "⚠️  Files/folders with spaces found:" -ForegroundColor Yellow
    $filesWithSpaces | ForEach-Object { Write-Host "   $($_.FullName)" -ForegroundColor Yellow }
} else {
    Write-Host "✅ No files with spaces found" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Next Steps" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. If folder has spaces, rename it:" -ForegroundColor Yellow
Write-Host "   Rename 'portfolio withe cursor' → 'portfolio'" -ForegroundColor White
Write-Host ""
Write-Host "2. Test locally:" -ForegroundColor Yellow
Write-Host "   python -m http.server 8000" -ForegroundColor White
Write-Host "   Open: http://localhost:8000" -ForegroundColor White
Write-Host ""
Write-Host "3. Check browser console (F12):" -ForegroundColor Yellow
Write-Host "   Should see: ✅ main.js loaded successfully" -ForegroundColor White
Write-Host ""
Write-Host "4. Push to GitHub and Netlify will auto-deploy" -ForegroundColor Yellow
Write-Host ""

