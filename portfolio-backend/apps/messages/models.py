from django.db import models


class ContactMessage(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'

    def __str__(self):
        return f"{self.name} - {self.subject or 'No Subject'}"

    def save(self, *args, **kwargs):
        if not self.id:
            # Auto-generate ID if not provided
            import uuid
            self.id = f"message-{uuid.uuid4().hex[:8]}"
        super().save(*args, **kwargs)

