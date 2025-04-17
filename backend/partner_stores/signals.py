from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import PartnerStore


@receiver(post_save, sender=PartnerStore)
def handle_store_status_change(sender, instance, created, **kwargs):
    """
    Sinal executado quando uma loja parceira é criada ou atualizada.
    Pode ser usado para notificações ou ações automáticas baseadas em mudança de status.
    """
    if not created and instance.status == 'active':
        # Aqui poderíamos implementar ações quando uma loja é ativada
        # Por exemplo, enviar e-mails, notificações, etc.
        pass
    
    if not created and instance.status == 'suspended':
        # Ações quando uma loja é suspensa
        pass 