# Portfolio Backend - Django REST API

Django backend for portfolio website with REST API endpoints for blog posts, projects, testimonials, skills, messages, profile, and SEO settings.

## 🚀 Quick Start

### Local Development

1. **Clone and setup:**
```bash
git clone <your-repo>
cd portfolio-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Setup environment variables:**
Create a `.env` file:
```env
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:8000,http://127.0.0.1:5500
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=yourpassword
PGDATABASE=portfolio_db
PGPORT=5432
```

3. **Setup PostgreSQL database:**
```bash
# Create database
createdb portfolio_db

# Or using psql:
psql -U postgres
CREATE DATABASE portfolio_db;
```

4. **Run migrations:**
```bash
python manage.py migrate
```

5. **Create superuser:**
```bash
python manage.py createsuperuser
```

6. **Import existing JSON data (optional):**
```bash
# Copy data/ directory from frontend repo to this repo root
python manage.py import_json_data --data-dir=../data
```

7. **Run server:**
```bash
python manage.py runserver
```

Access:
- API: http://localhost:8000/api/
- Admin: http://localhost:8000/admin/

## 📦 Deploy to Render

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial Django backend"
git remote add origin <your-github-repo>
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Blueprint** (or **Web Service**)
3. Connect your GitHub repository
4. Render will detect `render.yaml` and create:
   - Web Service (Python)
   - PostgreSQL Database (free tier)

### Step 3: Configure Environment Variables

In Render Dashboard → Your Web Service → Environment:

- `DJANGO_SECRET_KEY` - Generate a strong secret (Render can auto-generate)
- `DEBUG` - Set to `False`
- `ALLOWED_HOSTS` - Set to `your-service.onrender.com,localhost`
- `CORS_ALLOWED_ORIGINS` - Set to `https://saichandram-sadhu.pages.dev`
- Database vars (`PGHOST`, `PGUSER`, etc.) are auto-set by Render if using `render.yaml`

### Step 4: Run Migrations & Import Data

After first deployment, open Render Shell (or add to build command):

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
python manage.py import_json_data --data-dir=data
```

## 📡 API Endpoints

All endpoints return JSON. Base URL: `https://your-service.onrender.com/api/`

### Blog Posts
- `GET /api/blog/` - List all published posts
- `GET /api/blog/<slug>/` - Get post by slug
- `POST /api/blog/` - Create post (requires auth)
- `PUT /api/blog/<slug>/` - Update post (requires auth)
- `DELETE /api/blog/<slug>/` - Delete post (requires auth)

### Projects
- `GET /api/projects/` - List all projects
- `GET /api/projects/<id>/` - Get project by ID
- `POST /api/projects/` - Create project (requires auth)
- `PUT /api/projects/<id>/` - Update project (requires auth)
- `DELETE /api/projects/<id>/` - Delete project (requires auth)

### Testimonials
- `GET /api/testimonials/` - List all testimonials
- `GET /api/testimonials/<id>/` - Get testimonial by ID
- `POST /api/testimonials/` - Create testimonial (requires auth)
- `PUT /api/testimonials/<id>/` - Update testimonial (requires auth)
- `DELETE /api/testimonials/<id>/` - Delete testimonial (requires auth)

### Skills
- `GET /api/skills/` - List all skills
- `GET /api/skills/<id>/` - Get skill by ID
- `POST /api/skills/` - Create skill (requires auth)
- `PUT /api/skills/<id>/` - Update skill (requires auth)
- `DELETE /api/skills/<id>/` - Delete skill (requires auth)

### Messages
- `GET /api/messages/` - List all messages (requires auth)
- `POST /api/messages/` - Create message (public - contact form)
- `GET /api/messages/<id>/` - Get message (requires auth)
- `PUT /api/messages/<id>/` - Update message (requires auth)
- `DELETE /api/messages/<id>/` - Delete message (requires auth)

### Profile
- `GET /api/profile/` - Get profile
- `PUT /api/profile/` - Update profile (requires auth)

### SEO Settings
- `GET /api/seo/` - Get SEO settings
- `PUT /api/seo/` - Update SEO settings (requires auth)

## 🔐 Authentication

Currently, API endpoints use `AllowAny` for GET requests. To secure POST/PUT/DELETE:

1. Update `views.py` in each app:
```python
from rest_framework.permissions import IsAuthenticated

permission_classes = [IsAuthenticated]
```

2. Add token authentication (optional):
```python
# In settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}
```

## 📁 Project Structure

```
portfolio-backend/
├── manage.py
├── requirements.txt
├── Procfile
├── render.yaml
├── backend/              # Django project
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── apps/                 # Django apps
│   ├── blog/
│   ├── projects/
│   ├── testimonials/
│   ├── skills/
│   ├── messages/
│   ├── profile/
│   └── seo/
└── utils/                 # Management commands
    └── management/
        └── commands/
            └── import_json_data.py
```

## 🔄 Frontend Integration

Update your frontend `data-loader.js` to fetch from API:

```javascript
// Old: fetch('/data/blog.json')
// New:
const API_BASE = 'https://your-service.onrender.com/api';

async function loadBlogPosts() {
    const response = await fetch(`${API_BASE}/blog/`);
    return await response.json();
}
```

## 📝 Notes

- **Media Files**: Currently using URL fields for images. For production, consider:
  - Cloudflare Images (recommended)
  - AWS S3
  - Render's ephemeral storage (not recommended for production)

- **Free Tier Limits**: Render free tier has:
  - 750 hours/month (enough for 24/7)
  - Spins down after 15 min inactivity (first request may be slow)
  - 512MB RAM, 0.5 CPU

- **Database**: PostgreSQL on Render free tier:
  - 1GB storage
  - Automatic backups
  - 90 days retention

## 🐛 Troubleshooting

**Import fails?**
- Ensure `data/` directory exists in repo root
- Check JSON file format is valid
- Run with `--data-dir` to specify custom path

**CORS errors?**
- Verify `CORS_ALLOWED_ORIGINS` includes your frontend domain
- Check no trailing slashes in URLs

**Database connection fails?**
- Verify all `PG*` environment variables are set
- Check database is created and accessible
- Render auto-sets these if using `render.yaml`

## 📚 Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Render Documentation](https://render.com/docs)
- [WhiteNoise (Static Files)](https://whitenoise.readthedocs.io/)

