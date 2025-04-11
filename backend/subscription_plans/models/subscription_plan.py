from django.db import models


class SubscriptionPlan(models.Model):
    """
    Modelo que representa um plano de assinatura.
    
    Define as características e preços dos planos disponíveis
    no SuppliFit.
    """
    
    BASIC = 'basic'
    PRO = 'pro'
    ELITE = 'elite'
    
    PLAN_TYPES = [
        (BASIC, 'Básico'),
        (PRO, 'Pro'),
        (ELITE, 'Elite'),
    ]
    
    name = models.CharField(
        max_length=100,
        verbose_name='Nome'
    )
    
    plan_type = models.CharField(
        max_length=10,
        choices=PLAN_TYPES,
        default=BASIC,
        verbose_name='Tipo de Plano'
    )
    
    description = models.TextField(
        verbose_name='Descrição'
    )
    
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Preço (R$)'
    )
    
    supplements_per_month = models.PositiveIntegerField(
        verbose_name='Suplementos por Mês'
    )
    
    features = models.JSONField(
        default=list,
        verbose_name='Características'
    )
    
    is_active = models.BooleanField(
        default=True,
        verbose_name='Ativo'
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Criado em'
    )
    
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Atualizado em'
    )
    
    def __str__(self):
        return f"{self.name} - R$ {self.price}"
    
    class Meta:
        verbose_name = 'Plano de Assinatura'
        verbose_name_plural = 'Planos de Assinatura'
        ordering = ['price'] 