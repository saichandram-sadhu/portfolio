from rest_framework import generics, permissions
from .models import SEOSettings
from .serializers import SEOSettingsSerializer


class SEOSettingsView(generics.RetrieveUpdateAPIView):
    queryset = SEOSettings.objects.all()
    serializer_class = SEOSettingsSerializer
    lookup_field = 'id'
    lookup_value = 'seo'

    def get_object(self):
        obj, created = SEOSettings.objects.get_or_create(id='seo')
        return obj
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

