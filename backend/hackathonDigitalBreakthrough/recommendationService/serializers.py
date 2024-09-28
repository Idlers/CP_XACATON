from rest_framework import serializers
from .models import Category, Video

"""
Сериализатор для работы с видео и категориями
"""
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'title', 'category', 'has_liked', 'has_disliked', 'created_at']
