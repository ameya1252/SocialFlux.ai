from rest_framework import viewsets
from django.utils import timezone
from rest_framework.response import Response
from .models import InstagramPost
from .serializers import InstagramPostSerializer
from .tasks import schedule_instagram_post

class InstagramPostViewSet(viewsets.ModelViewSet):
    queryset = InstagramPost.objects.all()
    serializer_class = InstagramPostSerializer

    def create(self, request, *args, **kwargs):
        post_data = request.data
        serializer = self.get_serializer(data=post_data)
        if serializer.is_valid():
            post = serializer.save()
            if post.scheduled_time > timezone.now():
                schedule_instagram_post(post.id, post.scheduled_time)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
