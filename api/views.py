from api.models import ProductsModel
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.db.models import Count

# from .consultation import *
from users.models import UserModel
from .models import BuyingHistoryModel
from .serializers import GetUserInfoSerializer, ProductsSerializer, BuyingHistorySerializer


@api_view(['GET', ])
@permission_classes((IsAuthenticated, ))
def GetUserInfo(request, login):

    try:
        user = UserModel.objects.get(login=login)
    except:
        return Response({'error': 'Пользователя с таким логином не существует'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GetUserInfoSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def GetProductsView(request):
    serializer_class = ProductsSerializer

    if request.method == 'GET':
        products = ProductsModel.objects.all()
        serializer = serializer_class(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes((IsAuthenticated, IsAdminUser))
def UpdateProductView(request, id):
    serializer_class = ProductsSerializer
    try:
        product = ProductsModel.objects.get(id=id)
    except:
        return Response({'error': 'Продукта с таким id не существует'})

    user = request.user
    try:
        db_user = UserModel.objects.get(login=user.login)
    except:
        return Response({'fatal': 'Такого пользователя не существует'}, status=status.HTTP_404_NOT_FOUND) 

    if db_user.is_admin != True:
        return Response({'fatal': 'У вас нет прав менять эти данные'}, status=status.HTTP_403_FORBIDDEN)


    if request.method == 'PUT':
        serializer = serializer_class(product, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['response'] = 'Обновление произошло успешно'
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def BuyConsultationView(request):
    serializer_class = BuyingHistorySerializer

    user_login = request.data.get('user')
    productId = request.data.get('product')

    name = request.data.get('name')
    passport_name = request.data.get('passport_name')
    surname = request.data.get('surname')
    optional_surname = request.data.get('optional_surname')
    language = request.data.get('language')
    born = request.data.get('born')

    try:
        db_user = UserModel.objects.get(login=user_login)
    except UserModel.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    user = request.user
    if db_user != user:
        return Response({'fatal': 'У вас нет достаточных прав'}, status=status.HTTP_403_FORBIDDEN)

    try:
        product = ProductsModel.objects.get(id=productId)
    except:
        return Response({'error': 'Продукта с таким id не существует'}, status=status.HTTP_404_NOT_FOUND)

    
    if request.method == 'POST':
        consultations_already_bought = BuyingHistoryModel.objects.filter(user=db_user, product=product)
        if len(consultations_already_bought)>0:
            return Response({'error': 'Вы уже приобрели данную консультацию'}, status=status.HTTP_404_NOT_FOUND)
        consultationFile = create_consultation(name, passport_name, surname, optional_surname, language, born)
        print("lol", consultationFile)
        buyConsultation = BuyingHistoryModel(user=user, product=product, consultationFile=consultationFile)
        buyConsultation.save()
        return Response(serializer_class(buyConsultation).data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def GetBoughtProducts(request, login):
    serializer_class = BuyingHistorySerializer
    
    try:
        db_user = UserModel.objects.get(login=login)
    except UserModel.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    user = request.user
    if db_user != user:
        return Response({'fatal': 'У вас нет достаточных прав'}, status=status.HTTP_403_FORBIDDEN)


    if request.method == 'GET':
        products_bought = BuyingHistoryModel.objects.filter(user=db_user)
        if len(products_bought)>0:
            return Response(serializer_class(products_bought, many=True).data, status=status.HTTP_200_OK)
        return Response({}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((IsAuthenticated, IsAdminUser, ))
def BuyingStats(request):
    user = request.user
    try:
        db_user = UserModel.objects.get(login=user.login)
    except:
        return Response({'fatal': 'Такого пользователя не существует'}, status=status.HTTP_404_NOT_FOUND) 

    if db_user.is_admin != True:
        return Response({'fatal': 'У вас нет прав менять эти данные'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'GET':
        stats = BuyingHistoryModel.objects.all().extra({'name': 'date(bought_at)'}).values('name').annotate(bought=Count('id'))
        return Response(stats, status=status.HTTP_200_OK)