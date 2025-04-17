from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PartnerStoreViewSet, PartnerStoreView, StoreCommissionView

router = DefaultRouter()
router.register(r'', PartnerStoreViewSet, basename='partner-stores')

urlpatterns = [
    # ViewSet URLs
    path('api/', include(router.urls)),
    
    # Factory Method e Singleton Pattern
    path('api/v2/stores/', PartnerStoreView.as_view(), name='store-factory'),
    path('api/v2/stores/<int:store_id>/', PartnerStoreView.as_view(), name='store-detail'),
    
    # Strategy Pattern
    path('api/v2/stores/<int:store_id>/commission/', StoreCommissionView.as_view(), name='store-commission'),
] 