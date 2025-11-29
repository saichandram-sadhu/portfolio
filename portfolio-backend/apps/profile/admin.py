from django.contrib import admin
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email', 'updated_at']
    fields = ['name', 'title', 'about', 'phone', 'email', 'avatar', 'location', 'social']

