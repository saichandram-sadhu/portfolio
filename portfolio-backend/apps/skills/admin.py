from django.contrib import admin
from .models import Skill


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'percent', 'category', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['name', 'category']

