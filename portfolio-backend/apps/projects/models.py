from django.db import models


class Project(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.URLField(blank=True)  # Store Cloudflare Images URL or base64
    tags = models.JSONField(default=list, blank=True)
    link = models.URLField(blank=True)
    github = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.id:
            # Auto-generate ID if not provided
            import uuid
            self.id = f"project-{uuid.uuid4().hex[:8]}"
        super().save(*args, **kwargs)

