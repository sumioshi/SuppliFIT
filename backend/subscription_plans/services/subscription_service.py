from datetime import date, timedelta
from django.db import transaction
from subscription_plans.models import Subscription


class SubscriptionService:
    """
    Classe de serviço para operações relacionadas a assinaturas.
    
    Contém a lógica de negócio para operações com assinaturas.
    """
    
    @staticmethod
    @transaction.atomic
    def cancel_subscription(subscription):
        """
        Cancela uma assinatura.
        
        Args:
            subscription (Subscription): Assinatura a ser cancelada.
            
        Returns:
            Subscription: Assinatura cancelada.
        """
        subscription.status = Subscription.CANCELLED
        subscription.renewal_enabled = False
        subscription.save()
        
        return subscription
    
    @staticmethod
    @transaction.atomic
    def renew_subscription(subscription):
        """
        Renova uma assinatura criando uma nova.
        
        Args:
            subscription (Subscription): Assinatura a ser renovada.
            
        Returns:
            Subscription: Nova assinatura criada.
        """
        # Verificar se a assinatura pode ser renovada
        if not subscription.renewal_enabled:
            raise ValueError("Esta assinatura não está habilitada para renovação automática.")
        
        # Definir datas para a nova assinatura
        start_date = max(subscription.end_date, date.today())
        end_date = start_date + timedelta(days=30)
        
        # Criar nova assinatura
        new_subscription = Subscription.objects.create(
            user=subscription.user,
            plan=subscription.plan,
            status=Subscription.ACTIVE,
            start_date=start_date,
            end_date=end_date,
            remaining_supplements=subscription.plan.supplements_per_month,
            renewal_enabled=True,
            price_paid=subscription.plan.price
        )
        
        return new_subscription
    
    @staticmethod
    def get_active_subscriptions():
        """
        Retorna todas as assinaturas ativas.
        
        Returns:
            QuerySet: QuerySet de assinaturas ativas.
        """
        return Subscription.objects.filter(status=Subscription.ACTIVE)
    
    @staticmethod
    def get_user_active_subscription(user):
        """
        Retorna a assinatura ativa do usuário, se existir.
        
        Args:
            user: Usuário para verificar assinatura.
            
        Returns:
            Subscription: Assinatura ativa do usuário ou None.
        """
        try:
            return Subscription.objects.filter(
                user=user,
                status=Subscription.ACTIVE,
                end_date__gte=date.today()
            ).latest('created_at')
        except Subscription.DoesNotExist:
            return None
    
    @staticmethod
    def use_supplement(subscription):
        """
        Utiliza um suplemento da assinatura.
        
        Args:
            subscription (Subscription): Assinatura a ser atualizada.
            
        Returns:
            Subscription: Assinatura atualizada.
            
        Raises:
            ValueError: Se não houver suplementos disponíveis.
        """
        if subscription.remaining_supplements <= 0:
            raise ValueError("Não há suplementos disponíveis na assinatura.")
            
        subscription.remaining_supplements -= 1
        subscription.save()
        
        return subscription
    
    @staticmethod
    def check_subscriptions_to_expire():
        """
        Verifica assinaturas prestes a expirar e notifica usuários.
        
        Marca como expiradas assinaturas cuja data de término já passou.
        """
        # Marcar como expiradas
        Subscription.objects.filter(
            status=Subscription.ACTIVE,
            end_date__lt=date.today()
        ).update(status=Subscription.EXPIRED)
        
        # Identificar assinaturas prestes a expirar (7 dias)
        soon_to_expire = Subscription.objects.filter(
            status=Subscription.ACTIVE,
            end_date__lte=date.today() + timedelta(days=7),
            end_date__gt=date.today()
        )
        
        # Aqui seria implementada a notificação aos usuários
        return soon_to_expire 