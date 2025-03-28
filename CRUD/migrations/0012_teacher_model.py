# Generated by Django 5.0.13 on 2025-03-11 07:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("CRUD", "0011_delete_teacher_model"),
    ]

    operations = [
        migrations.CreateModel(
            name="teacher_model",
            fields=[
                ("id", models.IntegerField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=254)),
                ("subject", models.CharField(blank=True, max_length=100, null=True)),
                (
                    "created_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="CRUD.auth_model",
                    ),
                ),
            ],
        ),
    ]
