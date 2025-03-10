#!/bin/sh
# Change to the React app directory, install dependencies, and start it in the background
cd CRUD/presentation/react_app || exit 1
npm install
npm run start &

# Return to the workspace root and start the Django server
cd - || exit 1
python manage.py runserver
