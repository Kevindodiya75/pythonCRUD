# CRUD/db_signals.py
from django.db.backends.signals import connection_created
from django.dispatch import receiver


@receiver(connection_created)
def set_search_path(sender, connection, **kwargs):
    with connection.cursor() as cursor:
        cursor.execute("SET search_path TO public;")
