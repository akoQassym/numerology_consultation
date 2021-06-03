from django.db import models
from users.models import UserModel


class ProductsModel(models.Model):
    productName = models.CharField(max_length=50)
    productDescription = models.TextField(blank=True)
    price = models.FloatField()


def file_directory_path(instance, filename):
    return '/'.join(['consultationPdfs', str(instance.user.login), str(instance.product.ProductName), "consultation"]);


class BuyingHistoryModel(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    product = models.ForeignKey(ProductsModel, on_delete=models.CASCADE)
    bought_at = models.DateTimeField(auto_now_add=True)
    consultationFile = models.FileField(upload_to=file_directory_path, max_length=120, blank=True, null=True)