import factory
from factory.faker import Faker
from django.contrib.auth.hashers import make_password
from users.models import User, UserProfile


class UserFactory(factory.django.DjangoModelFactory):
    """
    Factory para criação de instâncias de User para testes.
    """
    
    class Meta:
        model = User
    
    username = factory.Sequence(lambda n: f'usuario{n}')
    email = factory.LazyAttribute(lambda obj: f'{obj.username}@example.com')
    password = factory.LazyFunction(lambda: make_password('senha123'))
    first_name = Faker('first_name', locale='pt_BR')
    last_name = Faker('last_name', locale='pt_BR')
    user_type = User.CUSTOMER
    is_active = True
    
    @factory.post_generation
    def profile(self, create, extracted, **kwargs):
        """
        Cria um perfil para o usuário após a criação do mesmo.
        """
        if not create:
            return
            
        UserProfileFactory(user=self, **kwargs)


class UserProfileFactory(factory.django.DjangoModelFactory):
    """
    Factory para criação de instâncias de UserProfile para testes.
    """
    
    class Meta:
        model = UserProfile
    
    user = factory.SubFactory(UserFactory, profile=None)
    phone = Faker('phone_number', locale='pt_BR')
    birth_date = Faker('date_of_birth', minimum_age=18, maximum_age=70)
    address = Faker('address', locale='pt_BR')
    
    # Campos específicos para clientes
    height = factory.LazyFunction(lambda: round(factory.random.randint(150, 200), 2))
    weight = factory.LazyFunction(lambda: round(factory.random.randint(50, 120), 2))
    fitness_goal = factory.Faker('random_element', elements=[
        'Ganho de massa muscular',
        'Perda de peso',
        'Definição muscular',
        'Melhora de desempenho',
        'Saúde geral'
    ])

