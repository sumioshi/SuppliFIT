from django.db import transaction
from users.models import User, UserProfile


class UserService:
    """
    Classe de serviço para operações relacionadas a usuários.
    
    Contém a lógica de negócio para operações com usuários.
    """
    
    @staticmethod
    @transaction.atomic
    def create_user(user_data, profile_data=None):
        """
        Cria um novo usuário com seu perfil.
        
        Args:
            user_data (dict): Dados do usuário.
            profile_data (dict, opcional): Dados do perfil do usuário.
            
        Returns:
            User: Novo usuário criado.
        """
        password = user_data.pop('password', None)
        user = User(**user_data)
        
        if password:
            user.set_password(password)
            
        user.save()
        
        # Criar perfil
        if profile_data:
            UserProfile.objects.create(user=user, **profile_data)
        else:
            UserProfile.objects.create(user=user)
            
        return user
    
    @staticmethod
    @transaction.atomic
    def update_user(user, user_data, profile_data=None):
        """
        Atualiza um usuário existente e seu perfil.
        
        Args:
            user (User): Usuário a ser atualizado.
            user_data (dict): Novos dados do usuário.
            profile_data (dict, opcional): Novos dados do perfil.
            
        Returns:
            User: Usuário atualizado.
        """
        # Atualizar dados do usuário
        password = user_data.pop('password', None)
        
        for attr, value in user_data.items():
            setattr(user, attr, value)
            
        if password:
            user.set_password(password)
            
        user.save()
        
        # Atualizar dados do perfil
        if profile_data and hasattr(user, 'profile'):
            for attr, value in profile_data.items():
                setattr(user.profile, attr, value)
            user.profile.save()
            
        return user
    
    @staticmethod
    def get_users_by_type(user_type):
        """
        Retorna usuários filtrados por tipo.
        
        Args:
            user_type (str): Tipo de usuário a ser filtrado.
            
        Returns:
            QuerySet: QuerySet de usuários do tipo especificado.
        """
        return User.objects.filter(user_type=user_type)
    
    @staticmethod
    def get_active_customers():
        """
        Retorna todos os clientes ativos.
        
        Returns:
            QuerySet: QuerySet de clientes ativos.
        """
        return User.objects.filter(
            user_type=User.CUSTOMER,
            is_active=True
        )
    
    @staticmethod
    def get_active_partners():
        """
        Retorna todos os lojistas parceiros ativos.
        
        Returns:
            QuerySet: QuerySet de lojistas ativos.
        """
        return User.objects.filter(
            user_type=User.PARTNER,
            is_active=True
        ) 