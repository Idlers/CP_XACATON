# Импортируем нужные модули и классы
from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VideoViewSet

# Создаем объект маршрутизатора
router = DefaultRouter()
# Регистрируем маршруты для категорий и видео
router.register('categories', views.CategoryViewSet)
router.register('videos', views.VideoViewSet)

# Определяем URL-шаблоны
urlpatterns = [
    # URL для получения списка видео и создания нового видео
    path('api/videos/', VideoViewSet.as_view({'get': 'list', 'post': 'create'}), name='video-view-set'),
    
    # URL для обновления лайков и дизлайков для видео
    path('videos/update_likes_dislikes/', views.VideoViewSet.as_view({'post': 'update'}), name='update-likes-dislikes'),
]

# Использование маршрутизатора для включения автоматически созданных маршрутов
# (можно добавить, если решите использовать router в будущем)
# path('api/', include(router.urls)),
