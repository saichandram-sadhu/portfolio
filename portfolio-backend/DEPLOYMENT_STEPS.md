# Render Deployment - Step by Step

Complete guide to deploy your Django backend to Render.

## Prerequisites

- GitHub account
- Render account (free at render.com)
- Your Django backend code pushed to GitHub

## Step 1: Push Code to GitHub

```bash
cd portfolio-backend
git init
git add .
git commit -m "Initial Django backend"
git remote add origin https://github.com/YOUR_USERNAME/portfolio-backend.git
git push -u origin main
```

## Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)
3. Authorize Render to access your repositories

## Step 3: Deploy from render.yaml (Automatic)

### Option A: Blueprint Deployment (Recommended)

1. In Render Dashboard, click **New** → **Blueprint**
2. Connect your GitHub repository
3. Select `portfolio-backend` repository
4. Render will automatically detect `render.yaml` and create:
   - Web Service
   - PostgreSQL Database
5. Click **Apply** and wait for deployment

### Option B: Manual Service Creation

If `render.yaml` doesn't work:

1. **Create Database First:**
   - Click **New** → **PostgreSQL**
   - Name: `portfolio-db`
   - Plan: **Free**
   - Region: Choose closest to you
   - Click **Create Database**
   - Note the connection details (you'll need them)

2. **Create Web Service:**
   - Click **New** → **Web Service**
   - Connect your GitHub repository
   - Select `portfolio-backend`
   - Configure:
     - **Name**: `portfolio-backend`
     - **Region**: Same as database
     - **Branch**: `main`
     - **Root Directory**: (leave empty)
     - **Environment**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
     - **Start Command**: `gunicorn backend.wsgi --bind 0.0.0.0:$PORT`
   - Click **Advanced** → **Add Database** → Select your `portfolio-db`
   - Click **Create Web Service**

## Step 4: Configure Environment Variables

In your Web Service dashboard → **Environment** tab, add:

### Required Variables

```
DJANGO_SECRET_KEY
```
- Click **Generate** or use: `python -c "import secrets; print(secrets.token_urlsafe(50))"`
- **Value**: Generated secret key

```
DEBUG
```
- **Value**: `False` (for production)

```
ALLOWED_HOSTS
```
- **Value**: `your-service-name.onrender.com,localhost`
- Replace `your-service-name` with your actual service name

```
CORS_ALLOWED_ORIGINS
```
- **Value**: `https://saichandram-sadhu.pages.dev`
- Add multiple origins separated by commas if needed

### Database Variables (Auto-set if using render.yaml)

If you manually created the database, add these from your database dashboard:

```
PGHOST
PGUSER
PGPASSWORD
PGDATABASE
PGPORT
```

**Note**: If you used `render.yaml` with database linking, these are automatically set by Render.

## Step 5: Run Migrations

After first deployment:

1. Go to your Web Service dashboard
2. Click **Shell** tab (or use **Logs** → **Shell**)
3. Run these commands:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

4. Follow prompts to create admin user:
   - Username
   - Email
   - Password

## Step 6: Import Existing Data

If you have `data/blog.json` in your repo:

```bash
python manage.py import_json_data --data-dir=data
```

Or copy your `data/` directory to the repo root and run:

```bash
python manage.py import_json_data
```

## Step 7: Test Your API

1. Get your service URL from Render dashboard (e.g., `https://portfolio-backend.onrender.com`)

2. Test endpoints:
   - `https://your-service.onrender.com/api/blog/` → Should return JSON
   - `https://your-service.onrender.com/admin/` → Django admin login

3. Test with curl:
```bash
curl https://your-service.onrender.com/api/blog/
```

## Step 8: Update Frontend

Update your frontend `data-loader.js`:

```javascript
// Change from:
const response = await fetch('/data/blog.json');

// To:
const API_BASE = 'https://your-service.onrender.com/api';
const response = await fetch(`${API_BASE}/blog/`);
```

## Troubleshooting

### Service Won't Start

**Check logs:**
- Go to **Logs** tab in Render dashboard
- Look for error messages
- Common issues:
  - Missing environment variables
  - Database connection errors
  - Import errors

### Database Connection Fails

**Verify:**
- Database is created and running
- Environment variables are set correctly
- Database name matches `PGDATABASE`
- Check database dashboard for connection string

### Static Files Not Loading

**Solution:**
- Ensure `collectstatic` runs in build command
- Check `STATIC_ROOT` in settings.py
- Verify WhiteNoise is installed

### CORS Errors

**Fix:**
- Add your frontend domain to `CORS_ALLOWED_ORIGINS`
- No trailing slashes in URLs
- Check `CORS_ALLOW_CREDENTIALS` if using cookies

### First Request Slow

**Normal behavior:**
- Render free tier spins down after 15 min inactivity
- First request after spin-down takes 30-60 seconds
- Subsequent requests are fast
- Upgrade to paid plan to avoid spin-down

## Free Tier Limits

- **750 hours/month** (enough for 24/7)
- **512MB RAM**
- **0.5 CPU**
- **Spins down after 15 min** inactivity
- **1GB database storage**

## Next Steps

1. ✅ Test all API endpoints
2. ✅ Update frontend to use API
3. ✅ Set up authentication (see `API_AUTHENTICATION.md`)
4. ✅ Configure custom domain (optional)
5. ✅ Set up monitoring (optional)

## Support

- Render Docs: https://render.com/docs
- Django Docs: https://docs.djangoproject.com
- DRF Docs: https://www.django-rest-framework.org

