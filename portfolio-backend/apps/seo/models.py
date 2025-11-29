from django.db import models


class SEOSettings(models.Model):
    id = models.CharField(max_length=100, primary_key=True, default='seo')
    title = models.CharField(max_length=70)
    description = models.CharField(max_length=155)
    og_image = models.URLField(blank=True)
    twitter_image = models.URLField(blank=True)
    ga_measurement_id = models.CharField(max_length=20, blank=True)
    meta_keywords = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'SEO Settings'
        verbose_name_plural = 'SEO Settings'

    def __str__(self):
        return 'SEO Settings'

    def save(self, *args, **kwargs):
        # Ensure only one SEO instance
        self.id = 'seo'
        super().save(*args, **kwargs)

