from django.urls import path
from .views import ProjectList, ProjectDetail

urlpatterns = [
    path('', ProjectList.as_view(), name='project-list'),
    path('<str:pk>/', ProjectDetail.as_view(), name='project-detail'),
]

