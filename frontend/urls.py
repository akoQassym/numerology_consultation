from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('p=<slug:parent>', index),
    path('login/', index),
    path('register/', index),
    path('profile/', index),
    path('consultations/', index),
    path('settings/', index),
    path('404/', index),
    path('wrong/', index),
    path('lol/', index),
    path('perfectMoney/', index),
    path('adminPanel/', index),
]