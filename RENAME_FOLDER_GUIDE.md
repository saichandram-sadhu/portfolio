# 📁 How to Rename Your Folder (Fix Deployment Issue)

## 🎯 Goal

Rename `portfolio withe cursor` → `portfolio`

## Method 1: Windows File Explorer (Easiest)

1. **Close all programs** using the folder (VS Code, terminal, etc.)

2. **Open File Explorer**
   - Press `Win + E`

3. **Navigate to parent folder**
   - Go to: `D:\`
   - Find folder: `portfolio withe cursor`

4. **Rename**
   - Right-click the folder
   - Select "Rename"
   - Type: `portfolio`
   - Press `Enter`

5. **Reopen in VS Code**
   - File → Open Folder
   - Select: `D:\portfolio`

## Method 2: PowerShell (Command Line)

```powershell
# Navigate to parent directory
cd D:\

# Rename folder
Rename-Item "portfolio withe cursor" "portfolio"

# Navigate into renamed folder
cd portfolio

# Verify you're in the right place
pwd
```

## Method 3: Command Prompt

```cmd
cd D:\
ren "portfolio withe cursor" portfolio
cd portfolio
```

## ✅ After Renaming

### 1. Update Git (if already initialized)

```powershell
# If git repo exists
git add .
git commit -m "fix: rename folder to remove spaces"
git push
```

### 2. Reinitialize Git (if needed)

```powershell
git init
git add .
git commit -m "Initial commit - portfolio website"
git remote add origin https://github.com/saichandram-sadhu/portfolio.git
git branch -M main
git push -u origin main
```

### 3. Update Netlify

- Go to Netlify dashboard
- Your site should auto-redeploy
- Or manually trigger a new deploy

### 4. Test Locally

```powershell
python -m http.server 8000
```

Visit: `http://localhost:8000`

Check browser console (F12) - should see:
- ✅ `main.js loaded successfully`
- ✅ `contact-form.js loaded successfully`
- ✅ `blog-newsletter.js loaded successfully`
- ❌ NO 404 errors

## 🔍 Verify Fix

### Check Browser Console

1. Open your deployed site
2. Press `F12` (DevTools)
3. Go to Console tab
4. Should see:
   ```
   ✅ main.js loaded successfully
   ✅ contact-form.js loaded successfully
   ✅ blog-newsletter.js loaded successfully
   ```

5. **NO errors like:**
   ```
   ❌ Failed to load resource: net::ERR_ABORTED
   ❌ 404 js/main.js not found
   ```

### Test Features

- [ ] Dark mode toggle works
- [ ] Animations play smoothly
- [ ] Particle system visible
- [ ] Scroll effects work
- [ ] Icons display correctly
- [ ] Contact form works
- [ ] Blog filtering works
- [ ] Newsletter form works

## 🚨 If Still Having Issues

### Check File Paths

All paths in `index.html` should be relative:
- ✅ `js/main.js` (correct)
- ✅ `css/style.css` (correct)
- ❌ `/js/main.js` (wrong - absolute path)

### Clear Browser Cache

1. Press `Ctrl + Shift + Delete`
2. Clear cached images and files
3. Hard refresh: `Ctrl + F5`

### Check Netlify Build Logs

1. Netlify Dashboard → Deploys
2. Click latest deploy
3. Check build logs for errors
4. Look for 404s or path issues

---

## 📝 Quick Reference

**Before:**
```
D:\portfolio withe cursor\
```

**After:**
```
D:\portfolio\
```

**That's it!** Just remove the space. 🚀

