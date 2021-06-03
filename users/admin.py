from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import UserModel

class UserAdmin(UserAdmin):
    list_display = ('id', 'login', 'name', 'surname', 'email', 'parent', 'password', 'perfect_money_account', 'avatar', 'created_at', 'last_login', 'is_admin','is_staff')
    search_fields = ('email','login',)
    readonly_fields = ('created_at', 'last_login')

    ordering = ('login', )
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(UserModel, UserAdmin)
