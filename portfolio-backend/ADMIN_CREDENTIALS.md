# Django Admin Credentials

## Default Admin Account

**Username:** `admin`  
**Password:** `admin123456`

## Login URL

- Local: http://localhost:8000/admin/
- Production: https://your-service.onrender.com/admin/

## Change Password

To change the password, run:

```bash
python manage.py changepassword admin
```

Or programmatically:

```bash
python manage.py shell
```

Then in the shell:
```python
from django.contrib.auth.models import User
u = User.objects.get(username='admin')
u.set_password('your_new_password')
u.save()
```

## Create New Superuser

```bash
python manage.py createsuperuser
```

## Security Note

⚠️ **IMPORTANT:** Change the default password immediately in production!

For production deployment on Render:
1. Use a strong, unique password
2. Never commit passwords to git
3. Consider using environment variables for sensitive data

