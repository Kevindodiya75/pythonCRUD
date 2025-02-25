from django.apps import AppConfig

class CRUDConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'CRUD'

    def ready(self):
        # Import the model so it gets registered with the migration system
        import CRUD.data.models.student_model 
