from django.db import models
from django.core.validators import MinLengthValidator
from users.models import User

class PartnerStore(models.Model):
    STORE_STATUS_CHOICES = [
        ('pending', 'Pendente'),
        ('approved', 'Aprovada'),
        ('rejected', 'Rejeitada'),
        ('suspended', 'Suspensa'),
    ]
    
    STORE_TYPE_CHOICES = [
        ('regular', 'Regular'),
        ('premium', 'Premium'),
        ('enterprise', 'Enterprise'),
    ]

    name = models.CharField(
        max_length=200,
        validators=[MinLengthValidator(3)],
        verbose_name='Nome da Loja'
    )
    cnpj = models.CharField(
        max_length=18,
        unique=True,
        validators=[MinLengthValidator(18)],
        verbose_name='CNPJ'
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='stores',
        verbose_name='Proprietário'
    )
    address = models.TextField(
        verbose_name='Endereço'
    )
    phone = models.CharField(
        max_length=20,
        verbose_name='Telefone'
    )
    email = models.EmailField(
        verbose_name='E-mail'
    )
    status = models.CharField(
        max_length=20,
        choices=STORE_STATUS_CHOICES,
        default='pending',
        verbose_name='Status'
    )
    description = models.TextField(
        blank=True,
        verbose_name='Descrição'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Data de Criação'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Última Atualização'
    )
    
    # Novos campos para suportar os padrões de design
    store_type = models.CharField(
        max_length=20,
        choices=STORE_TYPE_CHOICES,
        default='regular',
        verbose_name='Tipo de Loja'
    )
    commission_rate = models.DecimalField(
        max_digits=5,
        decimal_places=4,
        default=0.05,
        verbose_name='Taxa de Comissão'
    )  # 5% padrão
    featured = models.BooleanField(
        default=False,
        verbose_name='Destaque'
    )
    priority_support = models.BooleanField(
        default=False,
        verbose_name='Suporte Prioritário'
    )

    class Meta:
        verbose_name = 'Loja Parceira'
        verbose_name_plural = 'Lojas Parceiras'
        ordering = ['-created_at']

    def __str__(self):
        return self.name 