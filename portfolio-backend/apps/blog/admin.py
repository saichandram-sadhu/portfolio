from django.contrib import admin
from .models import BlogPost


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'date', 'status', 'created_at']
    list_filter = ['status', 'category', 'date']
    search_fields = ['title', 'excerpt', 'content']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'date'
    fields = ['id', 'title', 'slug', 'category', 'excerpt', 'content', 'date', 'read_time', 'status']
    readonly_fields = ['id']  # ID is auto-generated, make it read-only

