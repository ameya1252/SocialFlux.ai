from django.utils import timezone
from .models import InstagramPost
from django.conf import settings
import requests

def schedule_instagram_post(post_id, scheduled_time):
    # In reality, you'd want to use a task scheduler like Celery.
    post = InstagramPost.objects.get(id=post_id)
    delay = (scheduled_time - timezone.now()).total_seconds()
    if delay > 0:
        # Use something like Celery to delay the task
        pass

def post_to_instagram(post):
    access_token = settings.INSTAGRAM_ACCESS_TOKEN
    url = f"https://graph.instagram.com/v11.0/{post.user_id}/media"
    payload = {
        'image_url': post.image_url,
        'caption': post.caption,
        'access_token': access_token
    }
    response = requests.post(url, data=payload)
    if response.status_code == 200:
        post.is_posted = True
        post.save()
