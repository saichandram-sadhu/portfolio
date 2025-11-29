# 📊 Google Analytics Setup Guide

## ✅ What's Already Done

- Google Analytics code is already in your `index.html`
- Form submission tracking is implemented
- Event tracking for resume downloads is added

## 🔧 What You Need to Do

### Step 1: Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create an Account Name (e.g., "Saichandram Portfolio")
5. Click "Next"

### Step 2: Create Property

1. Property name: "Portfolio Website"
2. Reporting time zone: Select your timezone
3. Currency: Select your currency
4. Click "Next"

### Step 3: Business Information

1. Industry category: Select "Technology"
2. Business size: Select appropriate size
3. How you intend to use Google Analytics: Select options
4. Click "Create"

### Step 4: Accept Terms

1. Accept the Data Processing Terms
2. Accept the Measurement Controller-Controller Data Protection Terms
3. Click "I Accept"

### Step 5: Get Your Measurement ID

1. You'll see "Web" as a data stream
2. Click on it or add a new stream
3. Enter your website URL: `https://saichandram-sadhu.pages.dev`
4. Stream name: "Portfolio Website"
5. Click "Create stream"
6. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 6: Update Your Website

1. Open `index.html`
2. Find these two lines (around line 1013 and 1018):
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```
   and
   ```html
   gtag('config', 'G-XXXXXXXXXX');
   ```
3. Replace `G-XXXXXXXXXX` with your actual Measurement ID
4. Save and push to GitHub

### Step 7: Verify It's Working

1. Deploy your updated site
2. Visit your website
3. Go to Google Analytics → Realtime reports
4. You should see your visit appear within a few seconds

## 📈 What's Being Tracked

- **Page views** - Automatic
- **Form submissions** - When someone submits contact form
- **Resume downloads** - When someone clicks "Download Resume"
- **Form errors** - If form submission fails

## 🎯 Next Steps

After setup, you can:
- View visitor statistics
- See which sections are most popular
- Track form conversion rates
- Monitor resume downloads

---

**Note:** It may take 24-48 hours for full data to appear in standard reports, but real-time data is available immediately.

