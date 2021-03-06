# Generated by Django 3.1.5 on 2021-06-03 04:29

import api.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductsModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('productName', models.CharField(max_length=50)),
                ('productDescription', models.TextField(blank=True)),
                ('price', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='BuyingHistoryModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bought_at', models.DateTimeField(auto_now_add=True)),
                ('consultationFile', models.FileField(blank=True, max_length=120, null=True, upload_to=api.models.file_directory_path)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.productsmodel')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
