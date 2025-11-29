from django.db import models


class Profile(models.Model):
    id = models.CharField(max_length=100, primary_key=True, default='profile')
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    about = models.TextField()
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField()
    avatar = models.URLField(blank=True)  # Video or image URL
    location = models.CharField(max_length=200, blank=True)
    social = models.JSONField(default=dict, blank=True)  # {github: url, linkedin: url}
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Profile'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Ensure only one profile instance
        self.id = 'profile'
        super().save(*args, **kwargs)

