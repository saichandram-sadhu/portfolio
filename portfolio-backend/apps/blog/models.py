from django.db import models
from django.utils.text import slugify


class BlogPost(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=220)
    slug = models.SlugField(unique=True, blank=True)
    category = models.CharField(max_length=50, default='General')
    excerpt = models.TextField(blank=True)
    content = models.TextField()
    date = models.DateField()
    read_time = models.IntegerField(default=5)
    status = models.CharField(max_length=20, default='published', choices=[
        ('published', 'Published'),
        ('draft', 'Draft'),
    ])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.id:
            # Auto-generate ID if not provided
            import uuid
            self.id = f"blog-{uuid.uuid4().hex[:8]}"
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.date:
            from django.utils import timezone
            self.date = timezone.now().date()
        super().save(*args, **kwargs)

