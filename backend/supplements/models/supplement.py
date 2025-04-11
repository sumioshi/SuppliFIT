from django.db import models
from django.utils.translation import gettext_lazy as _


class SupplementCategory(models.Model):
    """Categoria de suplementos (Proteína, Pré-treino, BCAA, etc)"""
    name = models.CharField(_("Nome"), max_length=100)
    description = models.TextField(_("Descrição"), blank=True)
    created_at = models.DateTimeField(_("Criado em"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Atualizado em"), auto_now=True)

    class Meta:
        verbose_name = _("Categoria de Suplemento")
        verbose_name_plural = _("Categorias de Suplementos")
        ordering = ["name"]

    def __str__(self):
        return self.name


class Supplement(models.Model):
    """Modelo de suplementos disponíveis no sistema"""
    
    class SupplementType(models.TextChoices):
        PROTEIN = "protein", _("Proteína")
        PRE_WORKOUT = "pre_workout", _("Pré-treino")
        BCAA = "bcaa", _("BCAA")
        CREATINE = "creatine", _("Creatina")
        VITAMINS = "vitamins", _("Vitaminas")
        OTHER = "other", _("Outro")
    
    name = models.CharField(_("Nome"), max_length=200)
    description = models.TextField(_("Descrição"))
    brand = models.CharField(_("Marca"), max_length=100)
    price = models.DecimalField(_("Preço"), max_digits=10, decimal_places=2)
    available = models.BooleanField(_("Disponível"), default=True)
    image = models.ImageField(_("Imagem"), upload_to="supplements/", blank=True, null=True)
    category = models.ForeignKey(
        SupplementCategory, 
        on_delete=models.CASCADE, 
        related_name="supplements",
        verbose_name=_("Categoria")
    )
    type = models.CharField(
        _("Tipo"),
        max_length=20,
        choices=SupplementType.choices,
        default=SupplementType.OTHER
    )
    serving_size = models.CharField(_("Tamanho da porção"), max_length=50, blank=True)
    ingredients = models.TextField(_("Ingredientes"), blank=True)
    benefits = models.TextField(_("Benefícios"), blank=True)
    usage_instructions = models.TextField(_("Instruções de uso"), blank=True)
    created_at = models.DateTimeField(_("Criado em"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Atualizado em"), auto_now=True)
    
    class Meta:
        verbose_name = _("Suplemento")
        verbose_name_plural = _("Suplementos")
        ordering = ["name"]
    
    def __str__(self):
        return f"{self.name} - {self.brand}"