from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer
from .permissions import IsAuthorOrReadOnly

# Create your views here.
class PostViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAuthorOrReadOnly,)
  queryset = Post.objects.all()
  serializer_class = PostSerializer