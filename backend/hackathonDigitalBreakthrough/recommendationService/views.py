from rest_framework import viewsets
from .models import Category, Video
from .serializers import CategorySerializer, VideoSerializer

"""
API для работы с видео и категориями
"""

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    def update(self, request, *args, **kwargs):
        video = self.get_object()
        video.liked_by_user = request.data.get('has_liked', video.has_liked)
        video.disliked_by_user = request.data.get('has_disliked', video.has_disliked)
        video.save()
        serializer = self.get_serializer(video)
        return Response(serializer.data)
