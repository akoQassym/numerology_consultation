from api import serializers
from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from .models import UserModel
from .serializers import RegistrationSerializer, UpdateUserInfoSerializer, UpdateAvatarSerializer, ChangePasswordSerializer
from rest_framework.authtoken.models import Token


@api_view(['POST'])
def registration_view(request):
    serializer = RegistrationSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        user = serializer.save()
        data['response'] = 'Новый пользователь был зарегистрирован успешно'
        data['login'] = user.login
        data['name'] = user.name
        data['surname'] = user.surname
        data['email'] = user.email
        data['parent'] = user.parent
        token = Token.objects.get(user=user).key
        data['token'] = token
        return Response(data, status=status.HTTP_201_CREATED)
    return Response({'error': 'Ошибочные данные'}, status=status.HTTP_400_BAD_REQUEST)

def check_credentials(fetchToken, dbToken):
    if dbToken == fetchToken:
        return True


@api_view(['POST'])
def check_credentials_view(request):
    login = request.data.get('login')
    user = UserModel.objects.get(login=login)
    token = request.data.get('token')
    db_token = Token.objects.filter(user=user.id)[0]
    tokens_similar = check_credentials(token, str(db_token))
    if tokens_similar:
        return Response(status=status.HTTP_200_OK)
    return Response({'error': 'Пользователя с такими реквизитами для входа не существует'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
def update_user_info(request):

    user_login = request.data.get('login')
    new_login = request.data.get('new_login')
    email = request.data.get('email')

    try:
        db_user = UserModel.objects.get(login=user_login)
    except UserModel.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    user = request.user
    if db_user != user:
        return Response({'fatal': 'У вас нет прав менять эти данные'}, status=status.HTTP_403_FORBIDDEN) 

    
    login_queryset = UserModel.objects.filter(login=new_login)
    if login_queryset.exists() and user_login != new_login:
        return Response({'error': 'Пользователь с таким логином уже существует'}, status=status.HTTP_400_BAD_REQUEST)

    email_queryset = UserModel.objects.filter(email=email)
    if email_queryset.exists() and email_queryset[0].login != user_login:
        return Response({'error': 'Пользователь с таким email-ом уже существует'}, status=status.HTTP_400_BAD_REQUEST)


    if request.method == 'PUT':
        serializer = UpdateUserInfoSerializer(db_user, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['response'] = 'Обновление произошло успешно'
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def update_avatar(request):
    serializer_class = UpdateAvatarSerializer
    user = request.user
    
    try:
        db_user = UserModel.objects.get(login=user.login)
    except UserModel.DoesNotExist:
        return Response({'error': 'Ошибочные реквизиты для входа (invalid credentials)'}, status=status.HTTP_404_NOT_FOUND)


    if request.method == 'POST':
        serializer = serializer_class(db_user, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['response'] = 'Новое профильное изображение было установлено успешно'
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
def update_password(request):
    serializer_class = ChangePasswordSerializer
    user = request.user

    try:
        db_user = UserModel.objects.get(login=user.login)
    except UserModel.DoesNotExist:
        return Response({'error': 'Ошибочные реквизиты для входа (invalid credentials)'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        serializer = serializer_class(data=request.data)
        if serializer.is_valid():
            old_password = serializer.data.get('old_password')
            new_password = serializer.data.get('new_password')
            new_password_confirmation = serializer.data.get('new_password_confirmation')

            if new_password != new_password_confirmation:
                return Response({'error': 'Пароли не совпадают'}, status=status.HTTP_400_BAD_REQUEST)

            if not db_user.check_password(old_password):
                return Response({'error': 'Некорректный старый пароль'}, status=status.HTTP_400_BAD_REQUEST)

            db_user.set_password(new_password)
            db_user.save()
            return Response({'message': 'Новый пароль был задан успешно'}, status=status.HTTP_200_OK)