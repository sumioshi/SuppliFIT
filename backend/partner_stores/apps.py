from django.apps import AppConfig


class PartnerStoresConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'partner_stores'
    verbose_name = 'Lojas Parceiras'

    def ready(self):
        import partner_stores.signals  # noqa 