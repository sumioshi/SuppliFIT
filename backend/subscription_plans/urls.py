from django.urls import path, include
from rest_framework.routers import DefaultRouter
from subscription_plans.viewsets import SubscriptionPlanViewSet, SubscriptionViewSet

app_name = 'subscription_plans'

router = DefaultRouter()
router.register(r'plans', SubscriptionPlanViewSet, basename='plans')
router.register(r'subscriptions', SubscriptionViewSet, basename='subscriptions')

urlpatterns = [
    path('', include(router.urls)),
] 