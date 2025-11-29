from django.contrib import admin
from .models import Testimonial


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'company', 'rating', 'created_at']
    search_fields = ['name', 'role', 'company', 'text']
    list_filter = ['rating', 'created_at']
    fields = ['id', 'name', 'role', 'company', 'photo', 'text', 'rating']
    readonly_fields = ['id']  # ID is auto-generated, make it read-only

