from django.db import models


class auth_model(models.Model):
    email = models.EmailField(unique=False)
    username = models.CharField(max_length=100, null=True, blank=True)
    password = models.CharField(max_length=255)
    userrole = models.CharField(max_length=50)

    def __str__(self):
        return self.email

    class Meta:
        app_label = "CRUD"
