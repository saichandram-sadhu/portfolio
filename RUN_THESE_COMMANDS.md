# 🚀 Run These Commands to Upload to GitHub

## ⚠️ First: Install Git

Git is not currently installed. Please install it first:

1. **Download Git**: https://git-scm.com/download/win
2. **Install** with default settings
3. **Restart PowerShell** after installation
4. **Verify**: Run `git --version` to confirm it's installed

---

## 📋 Commands to Run

After Git is installed, open PowerShell in this folder and run:

```powershell
# Initialize Git repository
git init

# Add all files (not just README.md - we want everything!)
git add .

# Create initial commit
git commit -m "first commit"

# Rename branch to main
git branch -M main

# Add your GitHub repository as remote
git remote add origin https://github.com/saichandram-sadhu/portfolio.git

# Push to GitHub
git push -u origin main
```

---

## 🔑 Authentication

When you run `git push`, you'll be asked for credentials:

- **Username**: `saichandram-sadhu`
- **Password**: Use a **Personal Access Token** (NOT your GitHub password)

### Get Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Note: "Portfolio Upload"
4. Select scope: **`repo`** ✅
5. Click **Generate token**
6. **Copy the token** (you won't see it again!)
7. Use this token as your password

---

## ✅ Alternative: Use the Script

I've created `git-upload-commands.ps1` that runs all commands automatically:

```powershell
.\git-upload-commands.ps1
```

---

## 📝 Note About README.md

I'm skipping the `echo "# portfolio" >> README.md` command because:
- Your README.md already exists and has great content
- We don't want to overwrite it with just "# portfolio"
- We'll add all files including the existing README.md

If you really want to append, you can run it manually:
```powershell
echo "# portfolio" >> README.md
```

---

## 🎯 What Gets Uploaded

All these files will be uploaded:
- ✅ `index.html`
- ✅ `css/style.css`
- ✅ `js/main.js` and `js/contact-form.js`
- ✅ `assets/images/avatar.mp4`
- ✅ All documentation files (`.md` files)
- ✅ `robots.txt`, `sitemap.xml`
- ✅ `netlify.toml`, `vercel.json`
- ✅ `.gitignore`
- ✅ `README.md` (your existing one)

---

## 🆘 Troubleshooting

### "Git is not recognized"
- Install Git from https://git-scm.com/download/win
- Restart PowerShell after installation

### "Authentication failed"
- Make sure you're using Personal Access Token (not password)
- Token must have `repo` scope

### "Repository not found"
- Make sure the repository exists at: https://github.com/saichandram-sadhu/portfolio
- Check the URL is correct

### "Permission denied"
- Verify your GitHub username is correct
- Check your Personal Access Token has `repo` permissions

---

## 🎉 After Upload

Once uploaded, your portfolio will be at:
**https://github.com/saichandram-sadhu/portfolio**

You can then:
1. Enable GitHub Pages for free hosting
2. Connect to Netlify for better hosting
3. Share your portfolio link!

---

**Ready? Install Git first, then run the commands above!** 🚀

