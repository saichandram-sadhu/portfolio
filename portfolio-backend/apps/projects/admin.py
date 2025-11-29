from django.contrib import admin
from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at']
    search_fields = ['title', 'description', 'tags']
    list_filter = ['created_at']
    fields = ['id', 'title', 'description', 'image', 'tags', 'link', 'github']
    readonly_fields = ['id']  # ID is auto-generated, make it read-only

