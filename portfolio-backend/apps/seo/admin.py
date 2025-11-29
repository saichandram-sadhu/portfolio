from django.contrib import admin
from .models import SEOSettings


@admin.register(SEOSettings)
class SEOSettingsAdmin(admin.ModelAdmin):
    list_display = ['title', 'updated_at']
    fields = ['title', 'description', 'og_image', 'twitter_image', 'ga_measurement_id', 'meta_keywords']

