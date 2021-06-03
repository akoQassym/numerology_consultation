from django.db.models import fields
from rest_framework import serializers

from .models import ProductsModel, BuyingHistoryModel
from users.models import UserModel


class GetUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['login', 'name', 'surname', 'email', 'parent', 'perfect_money_account', 'avatar']


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductsModel
        fields = ['id', 'productName', 'productDescription', 'price']
        

class BuyingHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyingHistoryModel
        fields = ['user', 'product', 'consultationFile']