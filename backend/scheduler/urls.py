from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InstagramPostViewSet

router = DefaultRouter()
router.register(r'instagram-posts', InstagramPostViewSet, basename='instagram-post')

urlpatterns = [
    path('', include(router.urls)),
]
