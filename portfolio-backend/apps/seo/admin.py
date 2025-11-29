from django.contrib import admin
from .models import SEOSettings


@admin.register(SEOSettings)
class SEOSettingsAdmin(admin.ModelAdmin):
    list_display = ['title', 'updated_at']
    fields = ['id', 'title', 'description', 'og_image', 'twitter_image', 'ga_measurement_id', 'meta_keywords']
    readonly_fields = ['id']  # ID is auto-set to 'seo', make it read-only

