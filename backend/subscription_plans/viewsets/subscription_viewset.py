from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction

from subscription_plans.models import Subscription
from subscription_plans.serializers import SubscriptionSerializer
from subscription_plans.services import SubscriptionService


class SubscriptionViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciamento de assinaturas.
    
    Fornece funcionalidades CRUD para assinaturas, além de
    ações para listar assinaturas do usuário, cancelar, renovar, etc.
    """
    
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    
    def get_permissions(self):
        """
        Define permissões com base na ação.
        
        Retorna:
            list: Lista de permissões para a ação atual.
        """
        if self.action in ['create', 'my_subscriptions']:
            permission_classes = [permissions.IsAuthenticated]
        elif self.action in ['update', 'partial_update', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]
            
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        """
        Filtra o queryset com base no usuário autenticado.
        
        Retorna:
            QuerySet: QuerySet filtrado para o usuário.
        """
        user = self.request.user
        
        # Administradores podem ver todas as assinaturas
        if user.is_staff:
            return Subscription.objects.all()
        
        # Usuários normais só podem ver suas próprias assinaturas
        return Subscription.objects.filter(user=user)
    
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        """
        Cria uma nova assinatura com transação atômica.
        
        Args:
            request: Requisição HTTP.
            
        Returns:
            Response: Resposta HTTP com dados da assinatura criada.
        """
        # Adicionar usuário atual se não fornecido
        if 'user' not in request.data:
            request.data['user'] = request.user.id
            
        return super().create(request, *args, **kwargs)
    
    @action(detail=False, methods=['get'])
    def my_subscriptions(self, request):
        """
        Retorna as assinaturas do usuário autenticado.
        
        Args:
            request: Requisição HTTP.
            
        Returns:
            Response: Resposta HTTP com assinaturas do usuário.
        """
        subscriptions = Subscription.objects.filter(user=request.user)
        serializer = self.get_serializer(subscriptions, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """
        Cancela uma assinatura.
        
        Args:
            request: Requisição HTTP.
            pk: ID da assinatura.
            
        Returns:
            Response: Resposta HTTP com resultado da operação.
        """
        subscription = self.get_object()
        
        try:
            SubscriptionService.cancel_subscription(subscription)
            return Response({
                'message': 'Assinatura cancelada com sucesso.'
            })
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def renew(self, request, pk=None):
        """
        Renova uma assinatura.
        
        Args:
            request: Requisição HTTP.
            pk: ID da assinatura.
            
        Returns:
            Response: Resposta HTTP com resultado da operação.
        """
        subscription = self.get_object()
        
        try:
            new_subscription = SubscriptionService.renew_subscription(subscription)
            serializer = self.get_serializer(new_subscription)
            return Response(serializer.data)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST) 