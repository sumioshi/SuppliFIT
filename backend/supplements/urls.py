from django.urls import path, include
from rest_framework.routers import DefaultRouter
from supplements.viewsets import SupplementViewSet, SupplementCategoryViewSet

router = DefaultRouter()
router.register(r'supplements', SupplementViewSet, basename='supplement')
router.register(r'categories', SupplementCategoryViewSet, basename='supplement-category')

app_name = 'supplements'

urlpatterns = [
    path('', include(router.urls)),
]