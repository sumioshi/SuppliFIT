from rest_framework import serializers
from .models import PartnerStore

class PartnerStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerStore
        fields = [
            'id',
            'name',
            'cnpj',
            'owner',
            'address',
            'phone',
            'email',
            'status',
            'description',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def validate_cnpj(self, value):
        if len(value) != 14:
            raise serializers.ValidationError("CNPJ deve conter exatamente 14 dígitos")
        if not value.isdigit():
            raise serializers.ValidationError("CNPJ deve conter apenas números")
        return value 