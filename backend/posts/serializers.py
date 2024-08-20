from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields = ('id', 'author', 'title', 'content', 'created_at',)
    read_only_fields = ['author'] # needed to assign user directly by backend while posting and updating
    