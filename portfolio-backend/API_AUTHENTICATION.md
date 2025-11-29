# API Authentication Setup

This guide shows how to add token-based authentication for your admin panel to securely POST/PUT/DELETE data.

## Step 1: Update requirements.txt

Add to `requirements.txt`:
```
djangorestframework-simplejwt>=5.3.0
```

## Step 2: Update settings.py

Add to `INSTALLED_APPS`:
```python
'rest_framework_simplejwt',
```

Add to `REST_FRAMEWORK`:
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',  # Require auth by default
    ],
}
```

## Step 3: Update urls.py

Add JWT endpoints:
```python
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # ... existing patterns
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

## Step 4: Update views.py

Make GET public, POST/PUT/DELETE require auth:
```python
from rest_framework.permissions import IsAuthenticated, AllowAny

class BlogList(generics.ListCreateAPIView):
    queryset = Blog.objects.filter(published=True)
    serializer_class = BlogSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
```

## Step 5: Frontend Integration

In your admin panel JavaScript:

```javascript
// Store token in localStorage after login
const API_BASE = 'https://your-service.onrender.com/api';
let authToken = localStorage.getItem('admin_api_token');

// Login function
async function loginToAPI(username, password) {
    const response = await fetch(`${API_BASE}/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.access) {
        localStorage.setItem('admin_api_token', data.access);
        authToken = data.access;
        return true;
    }
    return false;
}

// API request helper
async function apiRequest(url, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);
    
    const response = await fetch(`${API_BASE}${url}`, options);
    return await response.json();
}

// Example: Create blog post
async function createBlogPost(postData) {
    return await apiRequest('/blog/', 'POST', postData);
}

// Example: Update blog post
async function updateBlogPost(slug, postData) {
    return await apiRequest(`/blog/${slug}/`, 'PUT', postData);
}

// Example: Delete blog post
async function deleteBlogPost(slug) {
    return await apiRequest(`/blog/${slug}/`, 'DELETE');
}
```

