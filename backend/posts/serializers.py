from rest_framework import serializers
from .models import Post, CustomUser

class PostSerializer(serializers.ModelSerializer):
  author_name = serializers.CharField(source='author.username', read_only=True)
  author_profile_pic = serializers.ImageField(source='author.profile_pic', read_only=True)

  class Meta:
    model = Post
    fields = '__all__'
    read_only_fields = ['author'] # needed to assign user directly by backend while posting and updating
    
  def create(self, validated_data):
    # set the author to the current user
    validated_data['author'] = self.context['request'].user
    return super().create(validated_data)
  

class CustomUserSerialzer(serializers.ModelSerializer):
  class Meta:
    model = CustomUser
    fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile_pic']
    read_only_fields = ['id', 'username', 'email']