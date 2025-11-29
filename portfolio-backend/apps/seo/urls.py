from django.urls import path
from .views import SEOSettingsView

urlpatterns = [
    path('', SEOSettingsView.as_view(), name='seo'),
]

