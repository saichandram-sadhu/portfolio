from django.db import models


class Skill(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    percent = models.IntegerField(default=0)
    category = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-percent', 'name']

    def __str__(self):
        return f"{self.name} ({self.percent}%)"

