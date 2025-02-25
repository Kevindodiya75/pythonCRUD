from django.db import models

class student_model(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'CRUD'

