from django.contrib import admin
from django.urls import path

from .views import GetUserInfo, GetProductsView, UpdateProductView, BuyConsultationView, GetBoughtProducts, BuyingStats

urlpatterns = [
    path('user-info/<str:login>', GetUserInfo, name="user info"),
    path('products', GetProductsView, name="products"),
    path('update-product/<int:id>', UpdateProductView, name="update product"),
    path('buy-check/<str:login>', GetBoughtProducts, name="check bought consultations"),
    path('admin-stats', BuyingStats, name="stats")
]