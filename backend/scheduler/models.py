from django.db import models
from django.utils import timezone

class InstagramPost(models.Model):
    caption = models.TextField()
    image_url = models.URLField()
    scheduled_time = models.DateTimeField(default=timezone.now)
    is_posted = models.BooleanField(default=False)

    def __str__(self):
        return self.caption
