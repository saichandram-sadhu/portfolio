from rest_framework import generics, permissions
from .models import BlogPost
from .serializers import BlogPostSerializer


class BlogPostList(generics.ListCreateAPIView):
    queryset = BlogPost.objects.filter(status='published').order_by('-date')
    serializer_class = BlogPostSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class BlogPostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

