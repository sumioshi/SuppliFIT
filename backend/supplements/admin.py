from django.contrib import admin
from supplements.models import Supplement, SupplementCategory


@admin.register(SupplementCategory)
class SupplementCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    list_filter = ('created_at',)


@admin.register(Supplement)
class SupplementAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'category', 'type', 'price', 'available')
    list_filter = ('available', 'category', 'type', 'brand')
    search_fields = ('name', 'description', 'brand', 'ingredients')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('name', 'description', 'brand', 'price', 'available', 'image')
        }),
        ('Categorização', {
            'fields': ('category', 'type')
        }),
        ('Detalhes do Produto', {
            'fields': ('serving_size', 'ingredients', 'benefits', 'usage_instructions')
        }),
        ('Metadados', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )