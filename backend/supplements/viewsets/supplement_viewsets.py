from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from supplements.models import Supplement, SupplementCategory
from supplements.serializers import SupplementSerializer, SupplementCategorySerializer


class SupplementCategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet para visualização e edição de categorias de suplementos.
    """
    queryset = SupplementCategory.objects.all()
    serializer_class = SupplementCategorySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']
    

class SupplementViewSet(viewsets.ModelViewSet):
    """
    ViewSet para visualização e edição de suplementos.
    """
    queryset = Supplement.objects.all()
    serializer_class = SupplementSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['available', 'category', 'type', 'brand']
    search_fields = ['name', 'description', 'brand', 'ingredients', 'benefits']
    ordering_fields = ['name', 'price', 'created_at']