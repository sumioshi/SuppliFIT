from django.db import models
from django.conf import settings


class Subscription(models.Model):
    """
    Modelo que representa uma assinatura de um cliente.
    
    Relaciona um usuário a um plano de assinatura e mantém
    informações sobre o status da assinatura.
    """
    
    ACTIVE = 'active'
    CANCELLED = 'cancelled'
    EXPIRED = 'expired'
    PENDING = 'pending'
    
    STATUS_CHOICES = [
        (ACTIVE, 'Ativa'),
        (CANCELLED, 'Cancelada'),
        (EXPIRED, 'Expirada'),
        (PENDING, 'Pendente'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='subscriptions',
        verbose_name='Usuário'
    )
    
    plan = models.ForeignKey(
        'subscription_plans.SubscriptionPlan',
        on_delete=models.PROTECT,
        related_name='subscriptions',
        verbose_name='Plano'
    )
    
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default=PENDING,
        verbose_name='Status'
    )
    
    start_date = models.DateField(
        verbose_name='Data de Início'
    )
    
    end_date = models.DateField(
        verbose_name='Data de Término'
    )
    
    remaining_supplements = models.PositiveIntegerField(
        verbose_name='Suplementos Restantes'
    )
    
    renewal_enabled = models.BooleanField(
        default=True,
        verbose_name='Renovação Automática'
    )
    
    price_paid = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Valor Pago (R$)'
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
        return f"{self.user.username} - {self.plan.name} ({self.get_status_display()})"
    
    class Meta:
        verbose_name = 'Assinatura'
        verbose_name_plural = 'Assinaturas'
        ordering = ['-created_at'] 