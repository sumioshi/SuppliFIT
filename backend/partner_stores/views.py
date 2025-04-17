from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import PartnerStore
from .serializers import PartnerStoreSerializer
from .services.store_service import PartnerStoreService
from django.http import JsonResponse
from rest_framework.views import APIView
from decimal import Decimal
from core.db_connection import DatabaseConnection

class PartnerStoreViewSet(viewsets.ModelViewSet):
    queryset = PartnerStore.objects.all()
    serializer_class = PartnerStoreSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Usar o service para criar a loja
        data = serializer.validated_data
        store = PartnerStoreService.create_store(data, self.request.user)
        return store

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return PartnerStore.objects.all()
        return PartnerStoreService.get_stores_by_owner(user.id)

    @action(detail=True, methods=['post'])
    def change_status(self, request, pk=None):
        new_status = request.data.get('status')
        
        if new_status not in dict(PartnerStore.STORE_STATUS_CHOICES):
            return Response({'error': 'Status inválido'}, status=status.HTTP_400_BAD_REQUEST)
        
        updated_store = PartnerStoreService.change_store_status(pk, new_status)
        
        if not updated_store:
            return Response({'error': 'Loja não encontrada'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(updated_store)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.query_params.get('q', '')
        if not query:
            return Response({'error': 'Parâmetro de pesquisa vazio'}, status=status.HTTP_400_BAD_REQUEST)
        
        stores = PartnerStoreService.search_stores(query)
        serializer = self.get_serializer(stores, many=True)
        return Response(serializer.data)

class PartnerStoreView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        """Cria uma nova loja parceira usando o Factory Method"""
        serializer = PartnerStoreSerializer(data=request.data)
        if serializer.is_valid():
            store = PartnerStoreService.create_store(
                serializer.validated_data, 
                request.user
            )
            return Response(
                PartnerStoreSerializer(store).data, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, store_id=None):
        """Lista lojas ou retorna detalhes de uma loja específica"""
        if store_id:
            # Usando o Singleton para estatísticas de DB
            db = DatabaseConnection.get_instance()
            store_data = db.execute_raw_sql(
                "SELECT * FROM partner_stores_partnerstore WHERE id = %s", 
                [store_id]
            )
            if not store_data:
                return Response(
                    {"error": "Loja não encontrada"}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            # Em um cenário real, você retornaria dados serializados
            return Response({"store_found": True, "db_stats": db.get_stats()})
        else:
            # Listar lojas do usuário atual
            stores = PartnerStoreService.get_stores_by_owner(request.user.id)
            return Response(PartnerStoreSerializer(stores, many=True).data)

class StoreCommissionView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, store_id):
        """Calcula comissão usando o padrão Strategy"""
        try:
            # Validação básica
            if 'amount' not in request.data:
                return Response(
                    {"error": "Campo 'amount' é obrigatório"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Converte para Decimal
            sale_amount = Decimal(str(request.data['amount']))
            
            # Calcula comissão usando o Strategy Pattern
            commission = PartnerStoreService.calculate_sale_commission(
                store_id, 
                sale_amount
            )
            
            if commission is None:
                return Response(
                    {"error": "Loja não encontrada"}, 
                    status=status.HTTP_404_NOT_FOUND
                )
                
            return Response({
                "sale_amount": sale_amount,
                "commission": commission,
                "net_amount": sale_amount - commission
            })
            
        except (ValueError, TypeError) as e:
            return Response(
                {"error": f"Erro no cálculo: {str(e)}"}, 
                status=status.HTTP_400_BAD_REQUEST
            ) 