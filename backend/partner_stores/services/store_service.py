from typing import Dict, Any, List, Optional
from django.db.models import Q
from ..models import PartnerStore
from users.models import User
from decimal import Decimal
from .store_factory import StoreCreator
from .commission_strategy import CommissionContext


class PartnerStoreService:
    @staticmethod
    def create_store(data: Dict[str, Any], owner: User) -> PartnerStore:
        """
        Cria uma nova loja parceira usando o Factory Method.
        """
        store_type = data.get('store_type', 'regular')
        return StoreCreator.create_store(store_type, data, owner)

    @staticmethod
    def update_store(store_id: int, data: Dict[str, Any]) -> Optional[PartnerStore]:
        """
        Atualiza uma loja parceira existente.
        """
        try:
            store = PartnerStore.objects.get(id=store_id)
            
            for key, value in data.items():
                if hasattr(store, key) and key not in ['owner', 'created_at', 'updated_at']:
                    setattr(store, key, value)
            
            store.save()
            return store
        except PartnerStore.DoesNotExist:
            return None

    @staticmethod
    def change_store_status(store_id: int, new_status: str) -> Optional[PartnerStore]:
        """
        Muda o status de uma loja parceira.
        """
        try:
            store = PartnerStore.objects.get(id=store_id)
            
            if new_status in dict(PartnerStore.STORE_STATUS_CHOICES):
                store.status = new_status
                store.save()
                return store
            return None
        except PartnerStore.DoesNotExist:
            return None

    @staticmethod
    def get_stores_by_owner(owner_id: int) -> List[PartnerStore]:
        """
        Retorna todas as lojas de um proprietário específico.
        """
        return PartnerStore.objects.filter(owner_id=owner_id)

    @staticmethod
    def search_stores(query: str) -> List[PartnerStore]:
        """
        Pesquisa lojas por nome, CNPJ ou localização.
        """
        return PartnerStore.objects.filter(
            Q(name__icontains=query) | 
            Q(cnpj__icontains=query) | 
            Q(address__icontains=query)
        )
    
    @staticmethod
    def calculate_sale_commission(store_id: int, sale_amount: Decimal) -> Optional[Decimal]:
        """
        Calcula a comissão de uma venda usando o padrão Strategy.
        """
        try:
            store = PartnerStore.objects.get(id=store_id)
            return CommissionContext.calculate_commission(store, sale_amount)
        except PartnerStore.DoesNotExist:
            return None 