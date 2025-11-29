from django.urls import path
from .views import SkillList, SkillDetail

urlpatterns = [
    path('', SkillList.as_view(), name='skill-list'),
    path('<str:pk>/', SkillDetail.as_view(), name='skill-detail'),
]

