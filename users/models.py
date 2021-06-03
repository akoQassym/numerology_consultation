from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

from .storage import OverwriteStorage
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class AccountManager(BaseUserManager):
    def create_user(self, login, name, surname, email, parent, password=None):
        if not login:
            raise ValueError('User must have a unique login')
        if not email:
            raise ValueError('User must have a unique email address')    
        if not name:
            raise ValueError('User must specify a name')
        if not surname:
            raise ValueError('User must specify a surname')    

        user = self.model(
            login = login,
            name = name,
            surname = surname,
            email = self.normalize_email(email),
            parent = parent
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, login, name, surname, email, parent, password):
        user = self.create_user(
            login = login,
            name = name,
            surname = surname,
            email = self.normalize_email(email),
            parent = parent,
            password = password
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


def user_directory_path(instance, filename):
    return '/'.join(['avatars', str(instance.login), "avatar"]);


class UserModel(AbstractBaseUser):
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    login = models.CharField(max_length=20, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    parent = models.CharField(max_length=20, blank=True, null=True)
    perfect_money_account = models.CharField(max_length=50, blank=True)
    avatar = models.ImageField(upload_to=user_directory_path, storage=OverwriteStorage(), max_length=120, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False) 

    USERNAME_FIELD = 'login'
    REQUIRED_FIELDS = ['name', 'surname', 'email', 'parent'] 

    objects = AccountManager()
    
    def __str__(self): 
        return self.login
    
    def has_perm(self, perm, obj=None): 
        return self.is_admin
        
    def has_module_perms(self, app_label): 
        return True


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)