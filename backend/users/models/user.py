from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Modelo de usuário personalizado para o SuppliFit.
    
    Estende o modelo de usuário padrão do Django para adicionar
    funcionalidades específicas do SuppliFit.
    """
    
    CUSTOMER = 'customer'
    ADMIN = 'admin'
    
    USER_TYPES = [
        (CUSTOMER, 'Cliente'),
        (ADMIN, 'Administrador'),
    ]
    
    user_type = models.CharField(
        max_length=10,
        choices=USER_TYPES,
        default=CUSTOMER,
        verbose_name='Tipo de Usuário'
    )
    
    email = models.EmailField(unique=True, verbose_name='E-mail')
    
    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'


class UserProfile(models.Model):
    """
    Perfil de usuário que armazena informações adicionais.
    
    Cada usuário possui um perfil associado com informações específicas
    para seu tipo de conta.
    """
    
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile',
        verbose_name='Usuário'
    )
    
    phone = models.CharField(
        max_length=15,
        null=True,
        blank=True,
        verbose_name='Telefone'
    )
    
    birth_date = models.DateField(
        null=True,
        blank=True,
        verbose_name='Data de Nascimento'
    )
    
    address = models.TextField(
        null=True,
        blank=True,
        verbose_name='Endereço'
    )
    
    # Campos específicos para clientes
    height = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name='Altura (cm)'
    )
    
    weight = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name='Peso (kg)'
    )
    
    fitness_goal = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        verbose_name='Objetivo Fitness'
    )
    
    # Campos específicos para lojistas
    company_name = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name='Nome da Empresa'
    )
    
    cnpj = models.CharField(
        max_length=18,
        null=True,
        blank=True,
        verbose_name='CNPJ'
    )
    
    store_address = models.TextField(
        null=True,
        blank=True,
        verbose_name='Endereço da Loja'
    )
    
    def __str__(self):
        return f"Perfil de {self.user.username}"
    
    class Meta:
        verbose_name = 'Perfil de Usuário'
        verbose_name_plural = 'Perfis de Usuários' 