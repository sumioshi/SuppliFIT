from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from users.models import User, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo UserProfile.
    
    Serializa e deserializa objetos UserProfile para JSON.
    """
    
    class Meta:
        model = UserProfile
        fields = [
            'id', 'phone', 'birth_date', 'address', 
            'height', 'weight', 'fitness_goal',
            'company_name', 'cnpj', 'store_address'
        ]


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo User.
    
    Serializa e deserializa objetos User para JSON, incluindo
    o perfil aninhado.
    """
    
    profile = UserProfileSerializer(required=False)
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password]
    )
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'password', 'user_type', 'profile'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        """
        Cria um novo usuário com perfil associado.
        
        Args:
            validated_data: Dados validados do usuário e perfil.
            
        Returns:
            User: Novo usuário criado.
        """
        profile_data = validated_data.pop('profile', None)
        password = validated_data.pop('password')
        
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        
        if profile_data:
            UserProfile.objects.create(user=user, **profile_data)
        else:
            UserProfile.objects.create(user=user)
            
        return user
    
    def update(self, instance, validated_data):
        """
        Atualiza um usuário existente e seu perfil.
        
        Args:
            instance: Instância do usuário a ser atualizada.
            validated_data: Dados validados do usuário e perfil.
            
        Returns:
            User: Usuário atualizado.
        """
        profile_data = validated_data.pop('profile', None)
        
        # Atualizar perfil
        if profile_data and hasattr(instance, 'profile'):
            for attr, value in profile_data.items():
                setattr(instance.profile, attr, value)
            instance.profile.save()
        
        # Atualizar senha se fornecida
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
            
        # Atualizar outros campos
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance 