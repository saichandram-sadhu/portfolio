# Quick Start - Complete Backend Verification

## ✅ What's Included

### All 7 Apps (Complete)
- ✅ **blog** - Models, Serializers, Views, URLs, Admin
- ✅ **projects** - Models, Serializers, Views, URLs, Admin
- ✅ **testimonials** - Models, Serializers, Views, URLs, Admin
- ✅ **skills** - Models, Serializers, Views, URLs, Admin
- ✅ **messages** - Models, Serializers, Views, URLs, Admin
- ✅ **profile** - Models, Serializers, Views, URLs, Admin
- ✅ **seo** - Models, Serializers, Views, URLs, Admin

### Authentication (Option A - Username + Password)
- ✅ JWT Token Authentication
- ✅ Login endpoint: `POST /api/auth/login/`
- ✅ Token refresh: `POST /api/auth/refresh/`
- ✅ GET endpoints: Public (no auth required)
- ✅ POST/PUT/DELETE: Require JWT token

### API Endpoints (All Working)

```
# Public (No Auth)
GET  /api/blog/                    # List all published posts
GET  /api/blog/<slug>/              # Get post by slug
GET  /api/projects/                 # List all projects
GET  /api/projects/<id>/            # Get project by ID
GET  /api/testimonials/             # List all testimonials
GET  /api/testimonials/<id>/        # Get testimonial by ID
GET  /api/skills/                   # List all skills
GET  /api/skills/<id>/              # Get skill by ID
GET  /api/profile/                  # Get profile
GET  /api/seo/                      # Get SEO settings
POST /api/messages/                 # Send message (public)

# Admin Only (Requires JWT Token)
POST   /api/blog/                   # Create blog post
PUT    /api/blog/<slug>/            # Update blog post
DELETE /api/blog/<slug>/            # Delete blog post
POST   /api/projects/               # Create project
PUT    /api/projects/<id>/          # Update project
DELETE /api/projects/<id>/          # Delete project
POST   /api/testimonials/           # Create testimonial
PUT    /api/testimonials/<id>/      # Update testimonial
DELETE /api/testimonials/<id>/      # Delete testimonial
POST   /api/skills/                 # Create skill
PUT    /api/skills/<id>/            # Update skill
DELETE /api/skills/<id>/            # Delete skill
PUT    /api/profile/                # Update profile
PUT    /api/seo/                    # Update SEO settings
GET    /api/messages/               # List messages (admin only)
GET    /api/messages/<id>/          # Get message (admin only)
PUT    /api/messages/<id>/          # Update message (admin only)
DELETE /api/messages/<id>/          # Delete message (admin only)

# Authentication
POST /api/auth/login/               # Get JWT token (username + password)
POST /api/auth/refresh/            # Refresh JWT token
```

## 🚀 Local Setup

```bash
# 1. Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Setup environment variables
# Create .env file:
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:8000
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=yourpassword
PGDATABASE=portfolio_db
PGPORT=5432

# 4. Create database
createdb portfolio_db

# 5. Run migrations
python manage.py migrate

# 6. Create superuser
python manage.py createsuperuser

# 7. Import existing data (optional)
python manage.py import_json_data --data-dir=../data

# 8. Run server
python manage.py runserver
```

## 🔐 Get JWT Token

```bash
# Login to get token
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "your_username", "password": "your_password"}'

# Response:
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

## 📡 Use Token in Requests

```bash
# Create blog post (requires token)
curl -X POST http://localhost:8000/api/blog/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "id": "post-1",
    "title": "My First Post",
    "slug": "my-first-post",
    "excerpt": "This is my first post",
    "content": "Full content here",
    "date": "2025-01-30",
    "read_time": 5,
    "status": "published"
  }'
```

## ✅ Verification Checklist

- [x] All 7 apps have models
- [x] All 7 apps have serializers
- [x] All 7 apps have views (List, Create, Retrieve, Update, Delete)
- [x] All 7 apps have URLs
- [x] All 7 apps have admin registrations
- [x] JWT authentication configured
- [x] GET endpoints are public
- [x] POST/PUT/DELETE require authentication
- [x] CORS configured for frontend
- [x] Import command for existing JSON data
- [x] Render deployment config (render.yaml, Procfile)
- [x] Production-ready settings

## 🎯 Everything Works

The backend is **100% complete** and ready to deploy. All endpoints are functional, authentication is configured, and everything is production-ready.

