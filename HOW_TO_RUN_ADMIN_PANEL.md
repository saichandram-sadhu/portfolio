# How to Run the Admin Panel

## 🚀 Quick Start Guide

The admin panel is a static website that can run locally or be deployed. Here are the different ways to access it:

---

## Option 1: Run Locally (Development)

### Using Python (Recommended)

1. **Open Terminal/PowerShell** in your portfolio directory:
   ```bash
   cd d:\portfolio
   ```

2. **Start a local server**:

   **Python 3:**
   ```bash
   python -m http.server 8000
   ```

   **Python 2:**
   ```bash
   python -m SimpleHTTPServer 8000
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:8000/admin/login.html
   ```

### Using Node.js (Alternative)

1. **Install a simple HTTP server**:
   ```bash
   npm install -g http-server
   ```

2. **Start the server**:
   ```bash
   http-server -p 8000
   ```

3. **Open your browser**:
   ```
   http://localhost:8000/admin/login.html
   ```

### Using VS Code Live Server

1. **Install the "Live Server" extension** in VS Code
2. **Right-click** on `admin/login.html`
3. **Select "Open with Live Server"**

---

## Option 2: Deploy to Cloudflare Pages (Production)

### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Add admin panel"
   ```

2. **Create a GitHub repository** and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Cloudflare Pages

1. **Go to Cloudflare Dashboard**: https://dash.cloudflare.com
2. **Navigate to**: Pages → Create a project
3. **Connect your GitHub repository**
4. **Configure build settings**:
   - **Build command**: (leave empty)
   - **Build output directory**: `/` (root)
   - **Root directory**: `/` (root)
5. **Click "Save and Deploy"**

### Step 3: Access Admin Panel

Once deployed, access it at:
```
https://your-domain.pages.dev/admin/login.html
```

---

## Option 3: Deploy to GitHub Pages

1. **Push your code to GitHub** (same as Step 1 above)

2. **Enable GitHub Pages**:
   - Go to your repository → Settings → Pages
   - Select source branch: `main`
   - Select folder: `/ (root)`
   - Click "Save"

3. **Access admin panel**:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/admin/login.html
   ```

---

## 📋 First-Time Setup (After Accessing Login Page)

### 1. Configure GitHub Integration

On the login page, you'll see a "GitHub Configuration" section:

1. **Repository Owner**: Your GitHub username
   ```
   Example: saichandram-sadhu
   ```

2. **Repository Name**: Your repository name
   ```
   Example: portfolio
   ```

3. **GitHub Personal Access Token**:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name it: "Portfolio Admin"
   - Select scope: ✅ **repo** (full control)
   - Click "Generate token"
   - **Copy the token** (starts with `ghp_`)
   - Paste it in the login form

4. **Click "Save Configuration"**

### 2. Set Admin Password

1. Enter your desired password in the "Password" field
2. Click "Sign In"
3. The password will be automatically hashed and saved

**Note**: On first login, the password will be set. Use this password for all future logins.

---

## 🔧 Troubleshooting

### "Cannot access admin panel"

**Local Development:**
- Make sure you're using a local server (not opening files directly)
- Check the URL: should be `http://localhost:8000/admin/login.html`
- Try a different port if 8000 is busy

**Deployed:**
- Verify the files are in the repository
- Check Cloudflare Pages build logs
- Ensure `/admin/` folder is in the root directory

### "GitHub API errors"

- Verify your token has `repo` scope
- Check repository owner/name are correct
- Ensure you have write access to the repository
- Token might be expired (create a new one)

### "Login not working"

- Clear browser localStorage:
  ```javascript
  // Open browser console (F12) and run:
  localStorage.clear()
  ```
- Delete `data/auth.json` from repository and login again
- Check browser console for errors

### "Data not loading"

- Verify JSON files exist in `/data/` directory
- Check browser console (F12) for fetch errors
- Ensure CORS is enabled (Cloudflare Pages handles this automatically)

---

## 🎯 Quick Access URLs

### Local Development
```
http://localhost:8000/admin/login.html
http://localhost:8000/admin/dashboard.html
```

### After Deployment
```
https://your-domain.com/admin/login.html
https://your-domain.com/admin/dashboard.html
```

---

## 📝 Important Notes

1. **Local Development**: Use a local server (not `file://` protocol) to avoid CORS issues

2. **GitHub Token**: Keep your token secure. Don't commit it to the repository.

3. **First Login**: The password you enter on first login becomes your admin password.

4. **Data Files**: Make sure `/data/` folder exists with all JSON files before using the admin panel.

5. **Cloudflare Pages**: The admin panel works perfectly on Cloudflare Pages since it's all static files.

---

## ✅ Verification Checklist

Before using the admin panel, verify:

- [ ] Admin panel files exist in `/admin/` folder
- [ ] Data files exist in `/data/` folder
- [ ] You can access `http://localhost:8000/admin/login.html` (local) or your deployed URL
- [ ] GitHub token is created with `repo` scope
- [ ] Repository owner and name are correct
- [ ] You have write access to the GitHub repository

---

## 🆘 Need Help?

1. Check browser console (F12) for errors
2. Verify all files are in the correct locations
3. Ensure you're using a local server (not opening files directly)
4. Review `ADMIN_PANEL_SETUP.md` for detailed setup instructions

---

**Ready to go!** Once you access the login page and configure GitHub, you can start managing your portfolio content. 🎉
