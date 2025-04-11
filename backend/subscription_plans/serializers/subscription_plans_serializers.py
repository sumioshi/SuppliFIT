from rest_framework import serializers
from subscription_plans.models import SubscriptionPlan, Subscription
from users.serializers import UserSerializer


class SubscriptionPlanSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo SubscriptionPlan.
    
    Serializa e deserializa objetos SubscriptionPlan para JSON.
    """
    
    class Meta:
        model = SubscriptionPlan
        fields = [
            'id', 'name', 'plan_type', 'description', 'price',
            'supplements_per_month', 'features', 'is_active',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class SubscriptionSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo Subscription.
    
    Serializa e deserializa objetos Subscription para JSON,
    incluindo informações do usuário e do plano.
    """
    
    user_details = UserSerializer(source='user', read_only=True)
    plan_details = SubscriptionPlanSerializer(source='plan', read_only=True)
    
    class Meta:
        model = Subscription
        fields = [
            'id', 'user', 'plan', 'status', 'start_date',
            'end_date', 'remaining_supplements', 'renewal_enabled',
            'price_paid', 'created_at', 'updated_at',
            'user_details', 'plan_details'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def create(self, validated_data):
        """
        Cria uma nova assinatura e define o número de suplementos
        restantes de acordo com o plano.
        
        Args:
            validated_data: Dados validados.
            
        Returns:
            Subscription: Nova assinatura criada.
        """
        plan = validated_data.get('plan')
        
        # Definir suplementos restantes de acordo com o plano
        if 'remaining_supplements' not in validated_data:
            validated_data['remaining_supplements'] = plan.supplements_per_month
            
        # Definir valor pago com base no plano
        if 'price_paid' not in validated_data:
            validated_data['price_paid'] = plan.price
            
        return super().create(validated_data)
    
    def validate(self, attrs):
        """
        Valida os dados da assinatura.
        
        Args:
            attrs: Atributos a serem validados.
            
        Returns:
            dict: Atributos validados.
            
        Raises:
            ValidationError: Se houver erro de validação.
        """
        # Verificar se a data de término é posterior à data de início
        if attrs.get('end_date') and attrs.get('start_date'):
            if attrs['end_date'] <= attrs['start_date']:
                raise serializers.ValidationError({
                    'end_date': 'A data de término deve ser posterior à data de início.'
                })
                
        return attrs 