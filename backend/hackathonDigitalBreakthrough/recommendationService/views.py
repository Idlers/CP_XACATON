from rest_framework import viewsets
from .models import Category, Video
from .serializers import CategorySerializer, VideoSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

"""
API для работы с видео и категориями
"""

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()  # Получаем все категории
    serializer_class = CategorySerializer  # Используем сериализатор для категорий


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()  # Получаем все видео
    serializer_class = VideoSerializer  # Используем сериализатор для видео

    # Метод для обновления состояния лайков и дизлайков видео
    # @action(detail=False, methods=['post'])
    def update(self, request):
        aggregated_data = []  # Список для хранения собранных данных о видео

        for video_data in request.data:
            # Извлекаем данные о видео из запроса
            uid = video_data.get('uid')
            has_liked = video_data.get('has_liked')
            has_disliked = video_data.get('has_disliked')

            try:
                # Получаем видео по уникальному идентификатору
                video = Video.objects.get(uid=uid)
                
                # Обновляем состояние лайка и дизлайка, если данные предоставлены
                video.has_liked = has_liked if has_liked is not None else video.has_liked
                video.has_disliked = has_disliked if has_disliked is not None else video.has_disliked
                video.save()  # Сохраняем изменения в базе данных

                # Собираем данные о видео для дальнейшего использования
                aggregated_data.append({
                    'uid': uid,
                    'total_likes': 1 if video.has_liked else 0,  # Считаем общее количество лайков
                    'total_dislikes': 1 if video.has_disliked else 0,  # Считаем общее количество дизлайков
                })

            except Video.DoesNotExist:
                # Если видео не найдено, продолжаем со следующего
                continue

        # Выводим собранные данные о лайках и дизлайках
        print(aggregated_data)

        # Возвращаем ответ с информацией об обновлении
        return Response({"status": "updated"})