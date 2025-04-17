from abc import ABC, abstractmethod
from ..models import PartnerStore
from decimal import Decimal

class CommissionStrategy(ABC):
    """Interface para estratégias de cálculo de comissão"""
    
    @abstractmethod
    def calculate_commission(self, sale_amount: Decimal) -> Decimal:
        """Calcula a comissão com base no valor da venda"""
        pass

class RegularCommissionStrategy(CommissionStrategy):
    """Estratégia de comissão para lojas regulares"""
    
    def __init__(self, store: PartnerStore):
        self.store = store
        self.base_rate = Decimal(str(store.commission_rate))
    
    def calculate_commission(self, sale_amount: Decimal) -> Decimal:
        return sale_amount * self.base_rate

class PremiumCommissionStrategy(CommissionStrategy):
    """Estratégia de comissão para lojas premium com desconto por volume"""
    
    def __init__(self, store: PartnerStore):
        self.store = store
        self.base_rate = Decimal(str(store.commission_rate))
    
    def calculate_commission(self, sale_amount: Decimal) -> Decimal:
        # Volume discount tiers
        if sale_amount > Decimal('10000'):
            rate = self.base_rate * Decimal('0.8')  # 20% desconto para vendas grandes
        elif sale_amount > Decimal('5000'):
            rate = self.base_rate * Decimal('0.9')  # 10% desconto para vendas médias
        else:
            rate = self.base_rate
        
        return sale_amount * rate

class EnterpriseCommissionStrategy(CommissionStrategy):
    """Estratégia de comissão para lojas enterprise com cap mensal"""
    
    def __init__(self, store: PartnerStore):
        self.store = store
        self.base_rate = Decimal(str(store.commission_rate))
        self.monthly_cap = Decimal('5000')  # Cap mensal de R$5000
        
    def calculate_commission(self, sale_amount: Decimal) -> Decimal:
        # Verificar se atingiu o cap mensal
        # (Aqui seria necessário verificar o total já cobrado no mês)
        # Esta é uma implementação simplificada
        commission = sale_amount * self.base_rate
        return min(commission, self.monthly_cap)

class CommissionContext:
    """Contexto que utiliza uma estratégia de comissão"""
    
    @staticmethod
    def get_strategy(store: PartnerStore) -> CommissionStrategy:
        """Factory para obter a estratégia correta baseada no tipo de loja"""
        if store.store_type == 'premium':
            return PremiumCommissionStrategy(store)
        elif store.store_type == 'enterprise':
            return EnterpriseCommissionStrategy(store)
        else:
            return RegularCommissionStrategy(store)
    
    @staticmethod
    def calculate_commission(store: PartnerStore, sale_amount: Decimal) -> Decimal:
        """Calcula a comissão usando a estratégia apropriada"""
        strategy = CommissionContext.get_strategy(store)
        return strategy.calculate_commission(sale_amount) 