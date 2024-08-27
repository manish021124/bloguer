from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import PostViewSet, CustomUserViewSet

router = SimpleRouter()
router.register('post', PostViewSet, basename='posts')
router.register('profile', CustomUserViewSet, basename='profile')

urlpatterns = router.urls