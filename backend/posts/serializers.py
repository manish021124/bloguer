from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
  author_name = serializers.CharField(source='author.username', read_only=True)

  class Meta:
    model = Post
    fields = '__all__'
    read_only_fields = ['author'] # needed to assign user directly by backend while posting and updating
    
  def create(self, validated_data):
    # set the author to the current user
    validated_data['author'] = self.context['request'].user
    return super().create(validated_data)