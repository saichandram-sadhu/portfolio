# Admin Panel Documentation

## Overview

This is a complete admin panel for managing your portfolio website. All data is stored in JSON files and saved via GitHub API, making it fully compatible with Cloudflare Pages (no backend required).

## Features

- ✅ Secure login system with password hashing
- ✅ Blog post management (CRUD)
- ✅ Project management with image uploads
- ✅ Testimonials management
- ✅ Skills management with progress bars
- ✅ Contact messages viewer
- ✅ Profile settings
- ✅ SEO settings
- ✅ Dark/light mode
- ✅ Search and filters
- ✅ Pagination
- ✅ Toast notifications
- ✅ Markdown editor for blog posts
- ✅ Drag-and-drop image upload (base64 or Cloudflare Images)

## Setup Instructions

### 1. Initial Configuration

1. Navigate to `/admin/login.html`
2. Configure your GitHub repository:
   - **Repository Owner**: Your GitHub username
   - **Repository Name**: Your repository name (e.g., "portfolio")
   - **GitHub Personal Access Token**: Create one at https://github.com/settings/tokens
     - Required scopes: `repo` (full control of private repositories)

### 2. Set Admin Password

1. After configuring GitHub, enter your desired password
2. The password will be hashed and saved to `data/auth.json`
3. Use this password for future logins

### 3. GitHub Personal Access Token

To create a GitHub Personal Access Token:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name (e.g., "Portfolio Admin")
4. Select the `repo` scope
5. Click "Generate token"
6. Copy the token (starts with `ghp_`)
7. Paste it in the login page configuration

## File Structure

```
/admin/
  ├── login.html          # Login page
  ├── dashboard.html     # Dashboard overview
  ├── blog.html          # Blog management
  ├── projects.html      # Projects management
  ├── testimonials.html  # Testimonials management
  ├── skills.html        # Skills management
  ├── messages.html      # Messages viewer
  ├── profile.html       # Profile settings
  ├── settings.html      # SEO settings
  └── js/
      ├── auth.js        # Authentication service
      ├── github-api.js  # GitHub API service
      ├── utils.js       # Utility functions
      └── admin-layout.js # Shared layout logic

/data/
  ├── blog.json          # Blog posts
  ├── projects.json      # Projects
  ├── testimonials.json   # Testimonials
  ├── skills.json        # Skills
  ├── messages.json      # Contact messages
  ├── profile.json       # Profile data
  ├── seo.json           # SEO settings
  └── auth.json          # Authentication data
```

## Data Format

### Blog Posts (`data/blog.json`)
```json
[
  {
    "id": "unique-id",
    "title": "Post Title",
    "category": "vapt",
    "excerpt": "Short description",
    "content": "Markdown content",
    "date": "2025-01-15",
    "readTime": 5,
    "slug": "post-title"
  }
]
```

### Projects (`data/projects.json`)
```json
[
  {
    "id": "unique-id",
    "title": "Project Name",
    "description": "Project description",
    "image": "base64-or-url",
    "tags": ["Python", "AI/ML"]
  }
]
```

### Testimonials (`data/testimonials.json`)
```json
[
  {
    "id": "unique-id",
    "name": "John Doe",
    "role": "CEO",
    "photo": "base64-or-url",
    "text": "Testimonial text"
  }
]
```

### Skills (`data/skills.json`)
```json
[
  {
    "id": "unique-id",
    "name": "Python Programming",
    "percent": 85
  }
]
```

## Image Upload

The admin panel supports two image upload methods:

1. **Base64 Encoding** (Default): Images are converted to base64 and stored directly in JSON
2. **Cloudflare Images**: Configure in `admin/js/utils.js` by setting `useCloudflare: true` and providing your Cloudflare account ID and token

## Contact Messages

**Note**: The contact form on the front-end uses EmailJS to send emails. To save messages to `data/messages.json`, you have two options:

1. **Manual Entry**: Add messages manually through the admin panel
2. **Serverless Function**: Create a Cloudflare Worker or similar to save messages (optional)

## Security Notes

- Passwords are hashed using SHA-256
- GitHub tokens are stored in localStorage (consider using environment variables in production)
- All API calls require authentication
- Session expires after 24 hours

## Cloudflare Pages Deployment

The admin panel is fully compatible with Cloudflare Pages:

1. Push your code to GitHub
2. Connect your repository to Cloudflare Pages
3. Set build command: (none needed - static files)
4. Set output directory: `/`
5. Deploy!

## Troubleshooting

### Can't save changes
- Verify your GitHub token has `repo` scope
- Check that repository owner and name are correct
- Ensure you have write access to the repository

### Images not uploading
- Check browser console for errors
- Verify file size (base64 encoding can be large)
- Consider using Cloudflare Images for better performance

### Login not working
- Clear browser localStorage
- Check that `data/auth.json` exists in your repository
- Try resetting your password

## Support

For issues or questions, check the main portfolio repository or create an issue.
