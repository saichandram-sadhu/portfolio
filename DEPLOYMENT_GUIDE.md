# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: Netlify (Recommended - Easiest)

1. **Sign up/Login** to [Netlify](https://www.netlify.com)

2. **Deploy:**
   - Drag and drop your project folder to Netlify dashboard
   - OR connect to GitHub for automatic deployments

3. **Configure:**
   - Site name: `saichandram-sadhu` (or your choice)
   - Build command: (leave empty for static site)
   - Publish directory: `.` (root)

4. **Custom Domain (Optional):**
   - Go to Domain settings
   - Add your custom domain
   - Follow DNS setup instructions

5. **Environment Variables:**
   - Go to Site settings → Environment variables
   - Add:
     - `EMAILJS_SERVICE_ID`
     - `EMAILJS_TEMPLATE_ID`
     - `EMAILJS_PUBLIC_KEY`
     - `GOOGLE_ANALYTICS_ID`

**Your site will be live at:** `https://saichandram-sadhu.pages.dev`

---

### Option 2: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Or use GitHub:**
   - Push to GitHub
   - Import project on [Vercel](https://vercel.com)
   - Auto-deploys on every push

**Your site will be live at:** `https://saichandram-sadhu.vercel.app`

---

### Option 3: GitHub Pages

1. **Create GitHub repository**

2. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `main` / `master`
   - Folder: `/ (root)`

**Your site will be live at:** `https://yourusername.github.io/portfolio`

---

## 📧 EmailJS Setup (For Contact Form)

1. **Sign up** at [EmailJS](https://www.emailjs.com) (Free tier available)

2. **Create Email Service:**
   - Go to Email Services
   - Add service (Gmail, Outlook, etc.)
   - Connect your email account

3. **Create Email Template:**
   - Go to Email Templates
   - Create new template
   - Use variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
   - Save template ID

4. **Get Public Key:**
   - Go to Account → API Keys
   - Copy your Public Key

5. **Update `js/contact-form.js`:**
   ```javascript
   const EMAILJS_SERVICE_ID = 'your_service_id';
   const EMAILJS_TEMPLATE_ID = 'your_template_id';
   const EMAILJS_PUBLIC_KEY = 'your_public_key';
   ```

---

## 📊 Google Analytics Setup

1. **Create Google Analytics Account:**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create account and property
   - Get your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Update `index.html`:**
   - Find the Google Analytics script
   - Replace `G-XXXXXXXXXX` with your actual ID

3. **Verify:**
   - Visit your site
   - Check Google Analytics Real-time reports

---

## 🔒 Security Headers

Both `netlify.toml` and `vercel.json` include security headers:
- X-Frame-Options
- X-XSS-Protection
- Content-Security-Policy
- Strict-Transport-Security

These are automatically applied when deployed.

---

## 📝 Pre-Deployment Checklist

- [ ] Update all URLs in `index.html` (replace `saichandram-sadhu.pages.dev` with your actual domain)
- [ ] Update `sitemap.xml` with your actual domain
- [ ] Set up EmailJS and update credentials
- [ ] Set up Google Analytics and update ID
- [ ] Test contact form locally
- [ ] Optimize images (use WebP format)
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Verify dark mode works
- [ ] Test loading screen
- [ ] Check particle system performance

---

## 🎯 Post-Deployment

1. **Submit to Google Search Console:**
   - Add your site
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`

2. **Test Everything:**
   - Contact form
   - All animations
   - Mobile responsiveness
   - Dark mode
   - Social links

3. **Monitor:**
   - Google Analytics
   - Form submissions
   - Page speed (PageSpeed Insights)

---

## 🆘 Troubleshooting

### Contact Form Not Working?
- Check EmailJS credentials are correct
- Verify EmailJS service is active
- Check browser console for errors

### Analytics Not Tracking?
- Verify Google Analytics ID is correct
- Check if ad blockers are interfering
- Wait 24-48 hours for data to appear

### Build Errors?
- Check file paths are correct
- Verify all assets are included
- Check for syntax errors in JS/CSS

---

## 📚 Additional Resources

- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [EmailJS Docs](https://www.emailjs.com/docs)
- [Google Analytics Docs](https://support.google.com/analytics)

---

**Need help?** Check the documentation or reach out for support!

