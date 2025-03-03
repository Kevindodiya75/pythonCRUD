from django.db import models
from CRUD.data.models.auth_model import auth_model  # Make sure this is your user model

class teacher_model(models.Model):
    # You can mimic the student model’s primary key approach
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    subject = models.CharField(max_length=100, blank=True, null=True)
    created_by = models.ForeignKey(auth_model, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'CRUD'
