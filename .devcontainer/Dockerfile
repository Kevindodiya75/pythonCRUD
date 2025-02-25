# Use an official Python runtime as a parent image.
FROM python:3.10-slim

# Prevent Python from writing .pyc files and buffer outputs.
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory inside the container.
WORKDIR /app

# Install system dependencies (including PostgreSQL client for waiting on the DB).
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file and install Python dependencies.
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the Django project code into the container.
COPY . /app/

# Expose port 8000 to be accessible outside the container.
EXPOSE 8000

# Wait for PostgreSQL to be available, then run migrations and start the Django server.
CMD ["sh", "-c", "until pg_isready -h ${DATABASE_HOST} -p 5432; do echo 'Waiting for Postgres...'; sleep 2; done && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
