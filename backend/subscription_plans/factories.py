import factory
from factory.faker import Faker
from datetime import date, timedelta
from django.utils import timezone

from subscription_plans.models import SubscriptionPlan, Subscription
from users.factories import UserFactory


class SubscriptionPlanFactory(factory.django.DjangoModelFactory):
    """
    Factory para criação de instâncias de SubscriptionPlan para testes.
    """
    
    class Meta:
        model = SubscriptionPlan
    
    name = factory.Sequence(lambda n: f'Plano {n}')
    plan_type = SubscriptionPlan.BASIC
    description = factory.Faker('paragraph', nb_sentences=3, locale='pt_BR')
    price = factory.LazyFunction(lambda: round(factory.random.randint(5000, 15000) / 100, 2))
    supplements_per_month = factory.LazyFunction(lambda: factory.random.randint(3, 10))
    features = factory.LazyFunction(lambda: [
        'Acesso a suplementos premium',
        'Entrega em casa',
        'Consulta com nutricionista'
    ])
    is_active = True


class BasicPlanFactory(SubscriptionPlanFactory):
    """
    Factory para criação de planos básicos.
    """
    
    name = 'Plano Básico'
    plan_type = SubscriptionPlan.BASIC
    price = 49.90
    supplements_per_month = 3
    features = [
        'Acesso a suplementos básicos',
        'Retirada em loja parceira',
    ]


class ProPlanFactory(SubscriptionPlanFactory):
    """
    Factory para criação de planos Pro.
    """
    
    name = 'Plano Pro'
    plan_type = SubscriptionPlan.PRO
    price = 99.90
    supplements_per_month = 5
    features = [
        'Acesso a todos os suplementos',
        'Retirada em loja parceira',
        'Consulta mensal com nutricionista',
    ]


class ElitePlanFactory(SubscriptionPlanFactory):
    """
    Factory para criação de planos Elite.
    """
    
    name = 'Plano Elite'
    plan_type = SubscriptionPlan.ELITE
    price = 149.90
    supplements_per_month = 10
    features = [
        'Acesso a todos os suplementos premium',
        'Entrega em casa',
        'Consulta semanal com nutricionista',
        'Acompanhamento de treino personalizado',
    ]


class SubscriptionFactory(factory.django.DjangoModelFactory):
    """
    Factory para criação de instâncias de Subscription para testes.
    """
    
    class Meta:
        model = Subscription
    
    user = factory.SubFactory(UserFactory)
    plan = factory.SubFactory(SubscriptionPlanFactory)
    status = Subscription.ACTIVE
    start_date = factory.LazyFunction(lambda: date.today())
    end_date = factory.LazyFunction(lambda: date.today() + timedelta(days=30))
    remaining_supplements = factory.SelfAttribute('plan.supplements_per_month')
    renewal_enabled = True
    price_paid = factory.SelfAttribute('plan.price')
    created_at = factory.LazyFunction(timezone.now)
    updated_at = factory.LazyFunction(timezone.now) 