import factory
from factory.django import DjangoModelFactory
from faker import Faker
from .models import PartnerStore
from users.factories import UserFactory

fake = Faker('pt_BR')

class PartnerStoreFactory(DjangoModelFactory):
    class Meta:
        model = PartnerStore

    name = factory.LazyFunction(lambda: fake.company())
    cnpj = factory.LazyFunction(lambda: ''.join([str(fake.random_digit()) for _ in range(14)]))
    owner = factory.SubFactory(UserFactory)
    address = factory.LazyFunction(lambda: fake.address().replace('\n', ', '))
    phone = factory.LazyFunction(lambda: fake.phone_number())
    email = factory.LazyFunction(lambda: fake.company_email())
    status = factory.Iterator(['active', 'inactive', 'pending', 'suspended'])
    description = factory.LazyFunction(lambda: fake.paragraph(nb_sentences=3)) 