from rest_framework import serializers
from .models import UserModel
from rest_framework.authtoken.models import Token

class RegistrationSerializer(serializers.ModelSerializer):
    
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = UserModel
        fields = ['login', 'name', 'surname', 'email', 'parent', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = UserModel(
            login = self.validated_data['login'],
            name = self.validated_data['name'],
            surname = self.validated_data['surname'],
            email = self.validated_data['email'],
            parent = self.validated_data['parent'],
        )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        user.set_password(password)
        user.save()
        return user


class UpdateAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['avatar', ]


class UpdateUserInfoSerializer(serializers.ModelSerializer):
    new_login = serializers.CharField(style={'input_type': 'text'}, write_only=True)

    class Meta:
        model = UserModel
        fields = ['login', 'new_login', 'name', 'surname', 'email', ]

class ChangePasswordSerializer(serializers.Serializer):
    model = UserModel
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    new_password_confirmation = serializers.CharField(required=True)