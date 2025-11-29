# 🚀 Complete Deployment Checklist

## ✅ Pre-Deployment Verification

### Files Check
- [x] `requirements.txt` - All dependencies listed
- [x] `Procfile` - Gunicorn command correct
- [x] `render.yaml` - Auto-deployment config
- [x] `backend/settings.py` - Production-ready
- [x] All 7 apps have models, serializers, views, URLs, admin
- [x] JWT authentication configured
- [x] CORS configured for frontend domain
- [x] WhiteNoise for static files
- [x] Database URL handling (dj-database-url)

## 📦 Step 1: Push to GitHub

```bash
cd portfolio-backend
git init
git add .
git commit -m "Complete Django backend - production ready"
git remote add origin https://github.com/YOUR_USERNAME/portfolio-backend.git
git push -u origin main
```

## 🔧 Step 2: Deploy to Render

### Option A: Blueprint Deployment (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Blueprint**
3. Connect GitHub repository
4. Select `portfolio-backend` repo
5. Render will auto-detect `render.yaml`
6. Click **Apply** - Render creates:
   - Web Service
   - PostgreSQL Database
   - All environment variables

### Option B: Manual Deployment

1. **Create Database:**
   - **New** → **PostgreSQL**
   - Name: `portfolio-db`
   - Plan: **Free**
   - Region: **Oregon** (or closest)
   - Click **Create Database**
   - Copy `Internal Database URL` (starts with `postgresql://`)

2. **Create Web Service:**
   - **New** → **Web Service**
   - Connect GitHub repo: `portfolio-backend`
   - Branch: `main`
   - Root Directory: (leave empty)
   - Environment: **Python 3**
   - Build Command: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
   - Start Command: `gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT`
   - Plan: **Free**

3. **Add Environment Variables:**
   - Go to **Environment** tab
   - Add these variables:

```
SECRET_KEY = <generate-strong-secret>
DJANGO_SECRET_KEY = <same-as-SECRET_KEY>
DEBUG = False
ALLOWED_HOSTS = portfolio-backend.onrender.com,localhost
CORS_ALLOWED_ORIGINS = https://saichandram-sadhu.pages.dev
DATABASE_URL = <from-database-dashboard>
```

4. **Link Database:**
   - In Web Service → **Environment** → **Add Database**
   - Select `portfolio-db`
   - Render auto-sets `DATABASE_URL`

5. **Deploy:**
   - Click **Create Web Service**
   - Wait for build to complete (2-5 minutes)

## 🔑 Step 3: Generate SECRET_KEY

Run locally:
```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```

Copy the output and paste into Render environment variable `SECRET_KEY` and `DJANGO_SECRET_KEY`.

## 🗄️ Step 4: Run Migrations & Setup

After first deployment succeeds:

1. **Open Render Shell:**
   - Go to your Web Service dashboard
   - Click **Shell** tab (or use **Logs** → **Shell**)

2. **Run Commands:**
```bash
# Run migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Create superuser
python manage.py createsuperuser
# Follow prompts: username, email, password

# Import existing JSON data (if you have data/ directory)
python manage.py import_json_data --data-dir=data
```

## ✅ Step 5: Verify Deployment

### Test API Endpoints

1. **Public Endpoints (No Auth):**
```bash
# Test blog list
curl https://portfolio-backend.onrender.com/api/blog/

# Test profile
curl https://portfolio-backend.onrender.com/api/profile/

# Test projects
curl https://portfolio-backend.onrender.com/api/projects/
```

2. **Admin Endpoints (Requires Auth):**
```bash
# Get JWT token
curl -X POST https://portfolio-backend.onrender.com/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "your_username", "password": "your_password"}'

# Response: {"access": "...", "refresh": "..."}

# Use token to create post
curl -X POST https://portfolio-backend.onrender.com/api/blog/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "id": "test-post",
    "title": "Test Post",
    "slug": "test-post",
    "excerpt": "Test",
    "content": "Test content",
    "date": "2025-01-30",
    "read_time": 5,
    "status": "published"
  }'
```

3. **Django Admin:**
   - Visit: `https://portfolio-backend.onrender.com/admin/`
   - Login with superuser credentials
   - Verify all models are visible

## 🔗 Step 6: Update Frontend

Update your Cloudflare Pages frontend to use the API:

### Update `js/data-loader.js`:

```javascript
// Change from:
const response = await fetch('/data/blog.json');

// To:
const API_BASE = 'https://portfolio-backend.onrender.com/api';
const response = await fetch(`${API_BASE}/blog/`);
```

### Update Admin Panel:

Replace GitHub API calls with Django API:

```javascript
// Old: GitHub API
await window.GitHubAPI.saveFile('data/blog.json', posts, 'Update');

// New: Django API
const token = localStorage.getItem('admin_api_token');
await fetch(`${API_BASE}/blog/`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(postData)
});
```

## 🐛 Troubleshooting

### Build Fails
- Check logs in Render dashboard
- Verify `requirements.txt` is correct
- Ensure Python version is compatible

### Database Connection Error
- Verify `DATABASE_URL` is set in environment
- Check database is running (green status)
- Ensure database is linked to web service

### 400 Bad Request
- Check `ALLOWED_HOSTS` includes your Render domain
- Verify `DEBUG=False` in production

### Static Files 404
- Ensure `collectstatic` ran successfully
- Check WhiteNoise is in `MIDDLEWARE`
- Verify `STATIC_ROOT` is set

### CORS Errors
- Verify `CORS_ALLOWED_ORIGINS` includes frontend domain
- Check no trailing slashes in URLs
- Ensure `corsheaders` is in `INSTALLED_APPS`

### Token Authentication Fails
- Verify `djangorestframework-simplejwt` is installed
- Check token endpoint: `/api/auth/login/`
- Ensure token is in `Authorization: Bearer <token>` header

## 🔒 Security Checklist

- [x] `DEBUG=False` in production
- [x] Strong `SECRET_KEY` generated
- [x] `ALLOWED_HOSTS` set correctly
- [x] CORS limited to frontend domain only
- [x] HTTPS enabled (Render auto-handles)
- [x] Strong admin password
- [x] JWT tokens expire (24 hours)

## 📊 Post-Deployment

1. ✅ All API endpoints return 200
2. ✅ Admin panel accessible at `/admin/`
3. ✅ JWT login works
4. ✅ Frontend can fetch data
5. ✅ CORS configured correctly
6. ✅ Static files loading
7. ✅ Database migrations applied
8. ✅ Superuser created

## 🎯 Next Steps

1. **Test all endpoints** - Verify GET/POST/PUT/DELETE work
2. **Update frontend** - Replace JSON file reads with API calls
3. **Update admin panel** - Replace GitHub API with Django API
4. **Monitor logs** - Check Render logs for errors
5. **Set up monitoring** - Optional: Add error tracking (Sentry)

## 📚 Resources

- [Render Docs](https://render.com/docs)
- [Django Deployment](https://docs.djangoproject.com/en/4.2/howto/deployment/)
- [DRF JWT](https://django-rest-framework-simplejwt.readthedocs.io/)

---

**Your backend is now production-ready! 🚀**

