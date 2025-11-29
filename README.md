# 🛡️ Premium Cybersecurity Portfolio

A premium, Apple-level design portfolio website for **Saichandram Sadhu** - Cybersecurity Analyst specializing in VAPT, IDS, and Malware Forensics.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- ✨ **Apple-level UI Design** - Clean, modern, and premium aesthetics
- 🎨 **Soft Pastel Blue Gradient** - Beautiful radial gradient background with concentric circles
- 🔮 **Glass Morphism Effects** - Floating glass layers with backdrop blur
- 🎭 **Smooth Animations** - Page fade-in, parallax effects, floating animations
- 🌓 **Dark Mode Toggle** - Light and dark theme support
- 📱 **Fully Responsive** - Mobile-friendly design
- ⚡ **Pure HTML/CSS/JS** - No frameworks, fast and lightweight

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All styling and animations
├── js/
│   └── main.js        # Interactive features and animations
├── assets/
│   └── images/
│       └── avatar.mp4 # Your animated avatar video
└── README.md          # This file
```

## Setup Instructions

1. **Add Your Avatar Video**
   - Place your animated avatar as `assets/images/avatar.mp4`
   - Recommended size: 300x380px or larger (will auto-scale)
   - The video will autoplay, loop, and be muted (required for autoplay)
   - Supported formats: MP4, WebM (MP4 recommended for best compatibility)

2. **Customize Content**
   - Edit `index.html` to update your personal information
   - Modify project descriptions, metrics, and social links
   - Update email address in the contact section

3. **Run the Website**

   **Method 1: Direct Open (Easiest)**
   - Double-click `index.html` to open it in your default browser
   - Or right-click `index.html` → "Open with" → Choose your browser

   **Method 2: Local Server (Recommended)**
   - Open PowerShell or Command Prompt in this folder
   - Run one of these commands:
     ```bash
     # If you have Python installed:
     python -m http.server 8000
     
     # Or if you have Node.js installed:
     npx serve
     
     # Or using PHP (if installed):
     php -S localhost:8000
     ```
   - Then open `http://localhost:8000` in your browser

## Sections

1. **Hero Section** - Main introduction with avatar and CTA buttons
2. **About Me** - Personal information and key metrics
3. **Technical Arsenal** - Skills and expertise showcase
4. **Featured Projects** - Portfolio projects display
5. **Contact Section** - Call-to-action and social links
6. **Footer** - Copyright information

## Customization

### Colors
Edit CSS variables in `css/style.css`:
- `--accent-blue`: Primary accent color
- `--gradient-start` / `--gradient-end`: Hero background gradient
- All colors support both light and dark modes

### Animations
- Adjust animation speeds in `css/style.css` keyframes
- Modify parallax intensity in `js/main.js`

### Content
- All text content is in `index.html`
- Icons use Font Awesome (loaded via CDN)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The avatar video path is set to `assets/images/avatar.mp4`
- The video autoplays, loops, and is muted (required for browser autoplay policies)
- If the video doesn't load, a fallback placeholder will appear
- Dark mode preference is saved in localStorage
- All animations are optimized for performance

## License

© 2025 Saichandram Sadhu. All rights reserved.

