from django.contrib import admin
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email', 'updated_at']
    fields = ['id', 'name', 'title', 'about', 'phone', 'email', 'avatar', 'location', 'social']
    readonly_fields = ['id']  # ID is auto-set to 'profile', make it read-only

