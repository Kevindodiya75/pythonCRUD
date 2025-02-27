from django.db import models

class course_model(models.Model):
    coursename = models.CharField(max_length=100)

    def __str__(self):
        return self.coursename

    class Meta:
        app_label = 'CRUD'
