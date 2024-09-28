from django.db import models
from django.utils import timezone

"""
Модель для хранения категорий
"""
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Название категории

    def __str__(self):
        return self.name


"""
Модель для хранения информации о видео
"""
class Video(models.Model):
    title = models.CharField(max_length=255)  # Название видео
    has_liked = models.BooleanField(default=False)  # Лайк от пользователя
    has_disliked = models.BooleanField(default=False)  # Дизлайк от пользователя
    category = models.ForeignKey(Category, on_delete=models.CASCADE)  # Связь с категорией
    created_at = models.DateField(default=timezone.now)  # Дата публикации видео

    def __str__(self):
        return self.title

