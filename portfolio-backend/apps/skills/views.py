from rest_framework import generics, permissions
from .models import Skill
from .serializers import SkillSerializer


class SkillList(generics.ListCreateAPIView):
    queryset = Skill.objects.all().order_by('-percent')
    serializer_class = SkillSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class SkillDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    lookup_field = 'id'
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

