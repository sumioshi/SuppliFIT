from django.test import TestCase
from django.core.exceptions import ValidationError
from ..models import PartnerStore
from ..factories import PartnerStoreFactory
from users.factories import UserFactory


class PartnerStoreModelTests(TestCase):
    """Testes para o modelo PartnerStore."""
    
    def setUp(self):
        self.user = UserFactory()
        self.store = PartnerStoreFactory(owner=self.user)
    
    def test_store_creation(self):
        """Teste de criação de uma loja parceira."""
        self.assertIsNotNone(self.store.id)
        self.assertEqual(self.store.owner, self.user)
        self.assertIn(self.store.status, dict(PartnerStore.STORE_STATUS_CHOICES))
    
    def test_cnpj_validation(self):
        """Teste de validação do CNPJ."""
        # CNPJ muito curto
        with self.assertRaises(ValidationError):
            store = PartnerStoreFactory(cnpj='12345')
            store.full_clean()
        
        # CNPJ com caracteres não numéricos
        with self.assertRaises(ValidationError):
            store = PartnerStoreFactory(cnpj='1234567890123a')
            store.full_clean() 