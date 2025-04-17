from django.contrib import admin
from .models import PartnerStore

@admin.register(PartnerStore)
class PartnerStoreAdmin(admin.ModelAdmin):
    list_display = ['name', 'cnpj', 'owner', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'cnpj', 'owner__email']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = [
        ('Informações Básicas', {
            'fields': ['name', 'cnpj', 'owner', 'status']
        }),
        ('Contato', {
            'fields': ['address', 'phone', 'email']
        }),
        ('Detalhes', {
            'fields': ['description', 'created_at', 'updated_at']
        }),
    ] 