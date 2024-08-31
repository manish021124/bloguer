from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import PostViewSet, CustomUserViewSet

router = SimpleRouter()
router.register('post', PostViewSet, basename='posts')
router.register('profile', CustomUserViewSet, basename='profile')

urlpatterns = [
  path('', include(router.urls)),
  path('my-posts/', PostViewSet.as_view({'get': 'list_user_posts'}, name='user-posts')),
]