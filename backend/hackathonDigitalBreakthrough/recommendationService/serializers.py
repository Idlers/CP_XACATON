from rest_framework import serializers
from .models import Category, Video

"""
Сериализаторы для работы с видео и категориями
"""

# Сериализатор для модели Category
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']  # Поля, которые будут сериализоваться

# Сериализатор для модели Video
class VideoSerializer(serializers.ModelSerializer):
    # Получает имя категории через связь с моделью Category
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Video
        fields = [
            'id',              # Уникальный идентификатор видео
            'uid',             # Уникальный идентификатор (например, внешний)
            'title',           # Заголовок видео
            'category_name',   # Имя категории (только для чтения)
            'has_liked',       # Флаг, указывающий, понравилось ли видео
            'has_disliked',    # Флаг, указывающий, не понравилось ли видео
            'created_at'      # Дата создания видео
        ]