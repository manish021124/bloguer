from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
  author_name = serializers.CharField(source='author.username', read_only=True)

  class Meta:
    model = Post
    fields = ['id', 'author', 'author_name', 'title', 'content', 'created_at', 'updated_at',]
    read_only_fields = ['author'] # needed to assign user directly by backend while posting and updating
    