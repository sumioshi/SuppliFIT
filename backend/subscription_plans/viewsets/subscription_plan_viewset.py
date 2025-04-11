from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from subscription_plans.models import SubscriptionPlan
from subscription_plans.serializers import SubscriptionPlanSerializer


class SubscriptionPlanViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciamento de planos de assinatura.
    
    Fornece funcionalidades CRUD para planos de assinatura,
    além de ações para listar planos ativos.
    """
    
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer
    
    def get_permissions(self):
        """
        Define permissões com base na ação.
        
        Retorna:
            list: Lista de permissões para a ação atual.
        """
        if self.action in ['list', 'retrieve', 'active']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
            
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """
        Retorna apenas planos ativos.
        
        Args:
            request: Requisição HTTP.
            
        Returns:
            Response: Resposta HTTP com planos ativos.
        """
        plans = SubscriptionPlan.objects.filter(is_active=True)
        serializer = self.get_serializer(plans, many=True)
        return Response(serializer.data) 