"""
URL configuration for portfolio backend project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    # JWT Authentication
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # API Endpoints
    path('api/blog/', include('apps.blog.urls')),
    path('api/projects/', include('apps.projects.urls')),
    path('api/testimonials/', include('apps.testimonials.urls')),
    path('api/skills/', include('apps.skills.urls')),
    path('api/messages/', include('apps.messages.urls')),
    path('api/profile/', include('apps.profile.urls')),
    path('api/seo/', include('apps.seo.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

