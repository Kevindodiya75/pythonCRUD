from django.db import models
from CRUD.data.models.course_model import course_model
from CRUD.data.models.auth_model import auth_model


class student_model(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=False)
    course = models.ForeignKey(
        course_model, on_delete=models.SET_NULL, null=True, blank=True
    )
    created_by = models.ForeignKey(auth_model, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        app_label = "CRUD"
