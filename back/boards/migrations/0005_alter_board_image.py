# Generated by Django 3.2.9 on 2021-12-17 18:46

import boards.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0004_alter_board_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=boards.models.boards_image_path),
        ),
    ]