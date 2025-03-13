#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    # Set the settings module for your Django project.
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "CRUD.settings")

    from django.core.management import execute_from_command_line

    # Redirect to the Django test command
    sys.argv = [sys.argv[0], "test"]
    execute_from_command_line(sys.argv)
