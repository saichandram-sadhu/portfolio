from django.urls import path
from .views import ContactMessageList, ContactMessageDetail

urlpatterns = [
    path('', ContactMessageList.as_view(), name='message-list'),
    path('<str:pk>/', ContactMessageDetail.as_view(), name='message-detail'),
]

