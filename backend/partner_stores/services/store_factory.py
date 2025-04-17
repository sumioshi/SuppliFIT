from typing import Dict, Any
from ..models import PartnerStore
from users.models import User

class StoreCreator:
    """Factory Method para criação de diferentes tipos de lojas"""
    
    @staticmethod
    def create_store(store_type: str, data: Dict[str, Any], owner: User) -> PartnerStore:
        """
        Método factory para criar diferentes tipos de lojas
        """
        if store_type == "regular":
            return RegularStoreCreator.create_store(data, owner)
        elif store_type == "premium":
            return PremiumStoreCreator.create_store(data, owner)
        elif store_type == "enterprise":
            return EnterpriseStoreCreator.create_store(data, owner)
        else:
            raise ValueError(f"Tipo de loja desconhecido: {store_type}")

class RegularStoreCreator:
    @staticmethod
    def create_store(data: Dict[str, Any], owner: User) -> PartnerStore:
        """Cria uma loja regular"""
        return PartnerStore.objects.create(
            name=data['name'],
            cnpj=data['cnpj'],
            owner=owner,
            address=data['address'],
            phone=data['phone'],
            email=data['email'],
            description=data.get('description', ''),
            status='pending',
            store_type='regular',
            commission_rate=0.05  # 5% de comissão padrão
        )

class PremiumStoreCreator:
    @staticmethod
    def create_store(data: Dict[str, Any], owner: User) -> PartnerStore:
        """Cria uma loja premium"""
        return PartnerStore.objects.create(
            name=data['name'],
            cnpj=data['cnpj'],
            owner=owner,
            address=data['address'],
            phone=data['phone'],
            email=data['email'],
            description=data.get('description', ''),
            status='pending',
            store_type='premium',
            commission_rate=0.03,  # 3% de comissão reduzida
            featured=True
        )

class EnterpriseStoreCreator:
    @staticmethod
    def create_store(data: Dict[str, Any], owner: User) -> PartnerStore:
        """Cria uma loja enterprise"""
        return PartnerStore.objects.create(
            name=data['name'],
            cnpj=data['cnpj'],
            owner=owner,
            address=data['address'],
            phone=data['phone'],
            email=data['email'],
            description=data.get('description', ''),
            status='pending',
            store_type='enterprise',
            commission_rate=0.02,  # 2% de comissão mínima
            featured=True,
            priority_support=True
        ) 