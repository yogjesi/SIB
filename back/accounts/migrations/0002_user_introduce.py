# Generated by Django 3.2.9 on 2021-12-27 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='introduce',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]