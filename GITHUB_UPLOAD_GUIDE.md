# 📤 Upload Portfolio to GitHub - Step by Step Guide

## Method 1: Using GitHub Desktop (Easiest - Recommended)

### Step 1: Install GitHub Desktop
1. Download from: https://desktop.github.com
2. Install and sign in with your GitHub account

### Step 2: Create Repository on GitHub
1. Go to https://github.com
2. Click the **+** icon → **New repository**
3. Repository name: `portfolio` (or your choice)
4. Description: "Premium Cybersecurity Portfolio Website"
5. Choose **Public** (or Private)
6. **DO NOT** initialize with README, .gitignore, or license
7. Click **Create repository**

### Step 3: Upload via GitHub Desktop
1. Open GitHub Desktop
2. Click **File** → **Add Local Repository**
3. Click **Choose** and select your portfolio folder
4. GitHub Desktop will detect it's not a git repository
5. Click **"create a repository"** link
6. Name: `portfolio`
7. Click **Create Repository**
8. You'll see all your files listed
9. At the bottom, type commit message: "Initial commit - Portfolio website"
10. Click **Commit to main**
11. Click **Publish repository**
12. Choose your GitHub account
13. Click **Publish repository**

**Done! Your portfolio is now on GitHub! 🎉**

---

## Method 2: Using Git Command Line

### Step 1: Install Git
1. Download from: https://git-scm.com/download/win
2. Install with default settings
3. Restart your terminal/PowerShell

### Step 2: Create Repository on GitHub
1. Go to https://github.com
2. Click the **+** icon → **New repository**
3. Repository name: `portfolio`
4. Description: "Premium Cybersecurity Portfolio Website"
5. Choose **Public**
6. **DO NOT** initialize with README
7. Click **Create repository**

### Step 3: Upload via Command Line

Open PowerShell in your portfolio folder and run these commands:

```powershell
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Portfolio website"

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**If asked for credentials:**
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your password)
  - Get token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
  - Select scope: `repo`
  - Copy token and use as password

---

## Method 3: Using GitHub Web Interface (No Git Required)

### Step 1: Create Repository
1. Go to https://github.com
2. Click **+** → **New repository**
3. Name: `portfolio`
4. Choose **Public**
5. **DO NOT** initialize with README
6. Click **Create repository**

### Step 2: Upload Files
1. On the repository page, click **"uploading an existing file"**
2. Drag and drop all your files and folders:
   - `index.html`
   - `css/` folder
   - `js/` folder
   - `assets/` folder
   - All `.md` files
   - `robots.txt`
   - `sitemap.xml`
   - `netlify.toml`
   - `vercel.json`
   - `.gitignore`
3. Scroll down, type commit message: "Initial commit"
4. Click **Commit changes**

**Done! Your portfolio is on GitHub! 🎉**

---

## Method 4: Using VS Code (If you have VS Code)

### Step 1: Install Git Extension
1. Open VS Code
2. Install "Git" extension (usually pre-installed)

### Step 2: Initialize Repository
1. Open your portfolio folder in VS Code
2. Click **Source Control** icon (left sidebar)
3. Click **Initialize Repository**
4. All files will appear as changes

### Step 3: Commit and Push
1. Type commit message: "Initial commit - Portfolio website"
2. Click **✓ Commit** button
3. Click **...** menu → **Publish Branch**
4. Choose GitHub
5. Sign in if needed
6. Repository name: `portfolio`
7. Choose **Public** or **Private**
8. Click **Publish**

**Done! 🎉**

---

## 🔒 Important: Before Uploading

### 1. Remove Sensitive Information
Check these files and remove/update:
- `js/contact-form.js` - EmailJS credentials (use placeholders)
- `index.html` - Google Analytics ID (use placeholder)
- Any personal API keys

### 2. Update URLs
Before committing, update:
- Domain URLs in `index.html` (or use placeholder)
- Domain URLs in `sitemap.xml`
- Domain URLs in `robots.txt`

### 3. Check File Sizes
- Large video files (`avatar.mp4`) might be too big for GitHub
- GitHub free limit: 100MB per file
- Consider using Git LFS for large files, or host videos elsewhere

---

## 📝 Recommended Repository Settings

### Repository Name Options:
- `portfolio`
- `saichandram-portfolio`
- `cybersecurity-portfolio`
- `personal-website`

### Description:
"Premium cybersecurity portfolio website built with HTML, CSS, and JavaScript. Features 3D animations, particle effects, and modern UI design."

### Topics (for discoverability):
- `portfolio`
- `cybersecurity`
- `web-development`
- `html-css-javascript`
- `threejs`
- `responsive-design`

---

## 🚀 After Uploading to GitHub

### Enable GitHub Pages (Optional):
1. Go to repository → **Settings**
2. Scroll to **Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` / `master`
5. Folder: `/ (root)`
6. Click **Save**
7. Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio`

### Connect to Netlify/Vercel:
1. **Netlify:**
   - Go to Netlify → **New site from Git**
   - Connect GitHub
   - Select your repository
   - Deploy!

2. **Vercel:**
   - Go to Vercel → **New Project**
   - Import from GitHub
   - Select your repository
   - Deploy!

---

## ✅ Post-Upload Checklist

- [ ] All files uploaded
- [ ] No sensitive credentials exposed
- [ ] README.md looks good
- [ ] Repository is public (or private if preferred)
- [ ] GitHub Pages enabled (optional)
- [ ] Connected to Netlify/Vercel (optional)

---

## 🆘 Troubleshooting

### "Git is not recognized"
- Install Git from https://git-scm.com/download/win
- Restart terminal/PowerShell

### "Authentication failed"
- Use Personal Access Token instead of password
- Create token: GitHub → Settings → Developer settings → Personal access tokens

### "File too large"
- GitHub free limit: 100MB per file
- Use Git LFS for large files
- Or host videos on external service

### "Repository already exists"
- Choose a different repository name
- Or delete the existing repository first

---

## 📚 Quick Commands Reference

```powershell
# Initialize repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Your commit message"

# Add remote
git remote add origin https://github.com/USERNAME/REPO.git

# Push to GitHub
git push -u origin main

# Check status
git status

# View commits
git log
```

---

**Choose the method that's easiest for you! GitHub Desktop is recommended for beginners.** 🚀

