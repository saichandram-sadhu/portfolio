from django.urls import path
from .views import TestimonialList, TestimonialDetail

urlpatterns = [
    path('', TestimonialList.as_view(), name='testimonial-list'),
    path('<str:pk>/', TestimonialDetail.as_view(), name='testimonial-detail'),
]

