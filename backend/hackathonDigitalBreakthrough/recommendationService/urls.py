from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('categories', views.CategoryViewSet)
router.register('videos', views.VideoViewSet)

urlpatterns = [
    path('', include(router.urls))
]
