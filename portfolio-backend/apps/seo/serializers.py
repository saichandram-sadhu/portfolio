from rest_framework import serializers
from .models import SEOSettings


class SEOSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SEOSettings
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

