# Generated by Django 3.2.9 on 2021-12-20 16:13

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
            name='Income',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('money', models.DecimalField(decimal_places=0, max_digits=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('datetime', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Outcome',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('datetime', models.DateField()),
                ('state', models.IntegerField(default=1)),
                ('money', models.DecimalField(decimal_places=0, max_digits=10)),
                ('alarm', models.BooleanField()),
                ('receipt', models.ImageField(null=True, upload_to='outcome/')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Outcomecomment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('outcome', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='books.outcome')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
