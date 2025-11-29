from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'read', 'created_at']
    list_filter = ['read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['id', 'created_at']  # ID is auto-generated, make it read-only
    fields = ['id', 'name', 'email', 'subject', 'message', 'read', 'created_at']
    actions = ['mark_as_read', 'mark_as_unread']

    def mark_as_read(self, request, queryset):
        queryset.update(read=True)
    mark_as_read.short_description = "Mark selected messages as read"

    def mark_as_unread(self, request, queryset):
        queryset.update(read=False)
    mark_as_unread.short_description = "Mark selected messages as unread"

