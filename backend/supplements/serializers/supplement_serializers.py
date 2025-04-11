from rest_framework import serializers
from supplements.models import Supplement, SupplementCategory


class SupplementCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SupplementCategory
        fields = ['id', 'name', 'description', 'created_at', 'updated_at']


class SupplementSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Supplement
        fields = [
            'id', 'name', 'description', 'brand', 'price', 'available',
            'image', 'category', 'category_name', 'type', 'serving_size',
            'ingredients', 'benefits', 'usage_instructions',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']