from django.db import models


class Testimonial(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    company = models.CharField(max_length=100, blank=True)
    photo = models.URLField(blank=True)  # Cloudflare Images URL or base64
    text = models.TextField()
    rating = models.IntegerField(default=5, choices=[(i, i) for i in range(1, 6)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.role}"

    def save(self, *args, **kwargs):
        if not self.id:
            # Auto-generate ID if not provided
            import uuid
            self.id = f"testimonial-{uuid.uuid4().hex[:8]}"
        super().save(*args, **kwargs)

