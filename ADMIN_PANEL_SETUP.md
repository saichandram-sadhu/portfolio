# Admin Panel - Complete Setup Guide

## 🎉 What's Been Built

A complete admin panel for your portfolio website with the following features:

### ✅ Core Features
- **Secure Authentication**: Password-based login with SHA-256 hashing
- **GitHub Integration**: All changes saved via GitHub API (no backend needed)
- **Modern UI**: TailwindCSS + Alpine.js with dark/light mode
- **Full CRUD Operations**: Create, read, update, delete for all content types

### ✅ Management Pages
1. **Dashboard** - Overview with statistics and quick actions
2. **Blog Posts** - Full markdown editor with preview
3. **Projects** - Image uploads and tag management
4. **Testimonials** - Photo uploads and review management
5. **Skills** - Progress bars with percentage controls
6. **Messages** - Contact form messages viewer with pagination
7. **Profile** - Personal information and social links
8. **SEO Settings** - Meta tags, OG tags, and SEO optimization

### ✅ Additional Features
- Search and filters
- Pagination
- Toast notifications
- Auto-save drafts (via GitHub commits)
- Drag-and-drop image upload (base64 or Cloudflare Images)
- Markdown editor with live preview
- Responsive design

## 📁 File Structure

```
portfolio/
├── admin/                    # Admin panel (NEW)
│   ├── login.html
│   ├── dashboard.html
│   ├── blog.html
│   ├── projects.html
│   ├── testimonials.html
│   ├── skills.html
│   ├── messages.html
│   ├── profile.html
│   ├── settings.html
│   ├── js/
│   │   ├── auth.js
│   │   ├── github-api.js
│   │   ├── utils.js
│   │   └── admin-layout.js
│   └── README.md
│
├── data/                     # JSON database (NEW)
│   ├── blog.json
│   ├── projects.json
│   ├── testimonials.json
│   ├── skills.json
│   ├── messages.json
│   ├── profile.json
│   ├── seo.json
│   └── auth.json
│
├── js/
│   └── data-loader.js        # Front-end data loader (NEW)
│
└── index.html                 # Updated to load data dynamically
```

## 🚀 Quick Start

### Step 1: Access Admin Panel
Navigate to: `https://your-domain.com/admin/login.html`

### Step 2: Configure GitHub
1. Enter your GitHub username (repository owner)
2. Enter your repository name
3. Create a GitHub Personal Access Token:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select `repo` scope
   - Copy the token (starts with `ghp_`)
4. Paste the token in the login form
5. Click "Save Configuration"

### Step 3: Set Admin Password
1. Enter your desired password
2. Click "Sign In"
3. The password will be hashed and saved automatically

### Step 4: Start Managing Content
- Use the sidebar to navigate between sections
- Click "New" buttons to add content
- Edit existing items by clicking the edit icon
- Delete items by clicking the trash icon
- All changes are saved to GitHub automatically

## 📝 Data Format Examples

### Blog Post
```json
{
  "id": "abc123",
  "title": "My Blog Post",
  "category": "vapt",
  "excerpt": "Short description",
  "content": "# Markdown content here",
  "date": "2025-01-15",
  "readTime": 5,
  "slug": "my-blog-post"
}
```

### Project
```json
{
  "id": "xyz789",
  "title": "My Project",
  "description": "Project description",
  "image": "data:image/png;base64,...",
  "tags": ["Python", "AI/ML", "Security"]
}
```

## 🔒 Security Notes

- Passwords are hashed using SHA-256
- GitHub tokens stored in localStorage (consider environment variables for production)
- Sessions expire after 24 hours
- All API calls require authentication

## 🖼️ Image Upload

**Default**: Base64 encoding (images stored in JSON)
**Optional**: Cloudflare Images (configure in `admin/js/utils.js`)

To use Cloudflare Images:
1. Get your Cloudflare account ID and API token
2. Update `ImageUploader.upload()` calls to include:
   ```javascript
   {
     useCloudflare: true,
     cloudflareAccountId: 'your-account-id',
     cloudflareToken: 'your-api-token'
   }
   ```

## 🔄 How It Works

1. **Front-End**: Portfolio loads data from `/data/*.json` files
2. **Admin Panel**: Makes changes and saves via GitHub API
3. **GitHub**: Stores all JSON files in the repository
4. **Cloudflare Pages**: Serves everything as static files

## 📊 Portfolio Integration

The portfolio front-end now loads all data dynamically:

- **Blog posts** from `/data/blog.json`
- **Projects** from `/data/projects.json`
- **Testimonials** from `/data/testimonials.json`
- **Skills** from `/data/skills.json`
- **Profile** from `/data/profile.json`
- **SEO** from `/data/seo.json`

The `js/data-loader.js` script automatically:
- Loads all JSON files
- Renders content in the appropriate sections
- Updates meta tags for SEO
- Updates profile information

## 🐛 Troubleshooting

### Can't save changes?
- Verify GitHub token has `repo` scope
- Check repository owner/name are correct
- Ensure you have write access

### Images not uploading?
- Check browser console for errors
- Base64 images can be large (consider Cloudflare Images)
- Verify file is a valid image format

### Login not working?
- Clear browser localStorage
- Check `data/auth.json` exists in repository
- Try resetting password (delete `data/auth.json` and login again)

### Data not loading on front-end?
- Verify JSON files exist in `/data/` directory
- Check browser console for fetch errors
- Ensure `js/data-loader.js` is loaded in `index.html`

## 📚 Additional Resources

- See `admin/README.md` for detailed documentation
- GitHub API docs: https://docs.github.com/en/rest
- TailwindCSS docs: https://tailwindcss.com/docs
- Alpine.js docs: https://alpinejs.dev/

## ✨ Next Steps

1. **Configure GitHub**: Set up your repository and token
2. **Set Password**: Create your admin password
3. **Add Content**: Start adding blog posts, projects, etc.
4. **Customize**: Adjust colors, styles, or add features as needed

## 🎨 Customization

The admin panel uses TailwindCSS, so you can easily customize:
- Colors: Update Tailwind classes
- Layout: Modify HTML structure
- Features: Add new functionality using Alpine.js

All admin pages follow the same structure, making it easy to add new sections.

---

**Note**: The contact form on the front-end uses EmailJS. To save messages to `data/messages.json`, you can either:
1. Add them manually through the admin panel
2. Create a Cloudflare Worker to handle form submissions (optional)

Enjoy your new admin panel! 🚀
