from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction

from users.models import User
from users.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciamento de usuários.
    
    Fornece funcionalidades CRUD para usuários, além de ações adicionais
    como perfil, alteração de senha, etc.
    """
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        """
        Define permissões com base na ação.
        
        Retorna:
            list: Lista de permissões para a ação atual.
        """
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        elif self.action in ['retrieve', 'update', 'partial_update']:
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
        
        # Administradores podem ver todos os usuários
        if user.is_staff:
            return User.objects.all()
        
        # Usuários normais só podem ver seu próprio perfil
        return User.objects.filter(id=user.id)
    
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        """
        Cria um novo usuário com transação atômica.
        
        Args:
            request: Requisição HTTP.
            
        Returns:
            Response: Resposta HTTP com dados do usuário criado.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED, 
            headers=headers
        )
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        """
        Retorna o perfil do usuário autenticado.
        
        Args:
            request: Requisição HTTP.
            
        Returns:
            Response: Resposta HTTP com dados do usuário autenticado.
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data) 