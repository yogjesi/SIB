# Generated by Django 3.2.9 on 2021-12-17 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0003_board_hits'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]