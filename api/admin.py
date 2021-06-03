from django.contrib import admin
from .models import ProductsModel, BuyingHistoryModel

class ProductsAdmin(admin.ModelAdmin):
    list_display = ('id', 'productName', 'productDescription', 'price')
    search_fields = ('productName', )

    ordering = ('productName', )
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

class BuyingHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'product', 'bought_at', 'consultationFile')
    search_fields = ('user', )

    ordering = ('bought_at', )
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(ProductsModel, ProductsAdmin)
admin.site.register(BuyingHistoryModel, BuyingHistoryAdmin)