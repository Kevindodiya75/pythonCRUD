# Generated by Django 5.1.6 on 2025-03-01 05:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("CRUD", "0006_auth_model_username"),
    ]

    operations = [
        migrations.AlterField(
            model_name="auth_model",
            name="username",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
