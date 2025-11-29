# 🚀 Quick GitHub Upload Guide

## ⚡ Fastest Method (5 Minutes)

### Step 1: Install Git (2 minutes)
1. Download: https://git-scm.com/download/win
2. Install with **default settings**
3. **Restart PowerShell** after installation

### Step 2: Create GitHub Repository (1 minute)
1. Go to: https://github.com/new
2. Repository name: `portfolio` (or your choice)
3. Description: "Premium Cybersecurity Portfolio"
4. Choose **Public**
5. **DO NOT** check "Initialize with README"
6. Click **Create repository**
7. **Copy the repository URL** (e.g., `https://github.com/yourusername/portfolio.git`)

### Step 3: Run Upload Script (2 minutes)
1. Open PowerShell in your portfolio folder
2. Run: `.\upload-to-github.ps1`
3. Paste your repository URL when asked
4. Enter your GitHub credentials when prompted
   - Username: Your GitHub username
   - Password: Use a **Personal Access Token** (see below)

**Done! Your portfolio is on GitHub! 🎉**

---

## 🔑 Get Personal Access Token

GitHub requires a token instead of password:

1. Go to: https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Note: "Portfolio Upload"
4. Select scope: **`repo`** (check the box)
5. Click **Generate token**
6. **Copy the token immediately** (you won't see it again!)
7. Use this token as your password when pushing

---

## 📋 Manual Method (If Script Doesn't Work)

Open PowerShell and run these commands one by one:

```powershell
# 1. Initialize Git
git init

# 2. Add all files
git add .

# 3. Create commit
git commit -m "Initial commit - Premium Cybersecurity Portfolio"

# 4. Add remote (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# 5. Rename branch
git branch -M main

# 6. Push to GitHub
git push -u origin main
```

When asked for credentials:
- **Username**: Your GitHub username
- **Password**: Your Personal Access Token (not your password!)

---

## 🎯 Alternative: GitHub Desktop (Easiest - No Commands)

### If you prefer a visual interface:

1. **Download GitHub Desktop**: https://desktop.github.com
2. **Install and sign in** with your GitHub account
3. **Create repository on GitHub.com** (as in Step 2 above)
4. In GitHub Desktop:
   - Click **File** → **Clone Repository**
   - Or click **File** → **Add Local Repository**
   - Select your portfolio folder
   - If it's not a Git repo, click "create a repository"
5. **Commit**: Type message "Initial commit"
6. **Publish**: Click "Publish repository"
7. **Done!** 🎉

---

## ✅ Verify Upload

After uploading, check:
1. Go to your GitHub repository page
2. You should see all your files
3. Click on files to view them
4. Your portfolio is now on GitHub!

---

## 🔗 Next Steps

### Enable GitHub Pages (Free Hosting):
1. Go to repository → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **master**
4. Folder: **/ (root)**
5. Click **Save**
6. Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio`

### Connect to Netlify (Better Hosting):
1. Go to: https://www.netlify.com
2. Sign up/Login
3. Click **New site from Git**
4. Connect GitHub
5. Select your repository
6. Click **Deploy**
7. Your site is live with a custom domain option!

---

## 🆘 Troubleshooting

### "Git is not recognized"
- Install Git from https://git-scm.com/download/win
- Restart PowerShell after installation

### "Authentication failed"
- Use Personal Access Token (not password)
- Create token: GitHub → Settings → Developer settings → Personal access tokens

### "Repository not found"
- Make sure you created the repository on GitHub first
- Check the repository URL is correct

### "Permission denied"
- Make sure you're using the correct GitHub username
- Verify your Personal Access Token has `repo` scope

---

## 📝 What Gets Uploaded

All these files will be uploaded:
- ✅ `index.html`
- ✅ `css/style.css`
- ✅ `js/main.js` and `js/contact-form.js`
- ✅ `assets/images/avatar.mp4`
- ✅ All `.md` documentation files
- ✅ `robots.txt`, `sitemap.xml`
- ✅ `netlify.toml`, `vercel.json`
- ✅ `.gitignore`

**Note**: `.gitignore` excludes unnecessary files like `node_modules`, `.env`, etc.

---

## 🎉 Success!

Once uploaded, your portfolio code is:
- ✅ Version controlled
- ✅ Backed up on GitHub
- ✅ Shareable with others
- ✅ Ready for deployment
- ✅ Professional portfolio showcase

**Congratulations! Your portfolio is now on GitHub!** 🚀

