from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Post, CustomUser
from .serializers import PostSerializer, CustomUserSerialzer
from .permissions import IsAuthorOrReadOnly

class PostViewSet(viewsets.ModelViewSet):
  permission_classes = [IsAuthorOrReadOnly]
  queryset = Post.objects.all()
  serializer_class = PostSerializer

  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  def list_user_posts(self, request, *args, **kwargs):
    self.queryset = self.queryset.filter(author=request.user)
    return super().list(request, *args, **kwargs)
  
  def perform_create(self, serializer):
    serializer.save(author=self.request.user)


class CustomUserViewSet(viewsets.ModelViewSet):
  permission_classes = [IsAuthenticated]
  queryset = CustomUser.objects.all()
  serializer_class = CustomUserSerialzer

  def get_queryset(self):
    # Only allow users to see their own profile
    return CustomUser.objects.filter(id=self.request.user.id)
  
  def perform_update(self, serializer):
    # Ensure that only the owner can update their profile picture
    serializer.save(user=self.request.user)