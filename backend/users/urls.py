from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.viewsets import UserViewSet

app_name = 'users'

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
] 