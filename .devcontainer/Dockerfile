# FROM dart:stable
# RUN apt-get update && apt-get install -y git wget unzip xz-utils zip libglu1-mesa
# RUN mkdir -p /installs
# RUN wget https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.27.1-stable.tar.xz
# RUN tar -xvf flutter_linux_3.27.1-stable.tar.xz -C /installs
# RUN git config --global --add safe.directory /installs/flutter
# ENV PATH "$PATH:/installs/flutter/bin"


# Use an official Python runtime as a parent image.
FROM python:3.10-slim

# Prevent Python from writing .pyc files and buffer outputs.
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory inside the container.
WORKDIR /app

# Install system dependencies required for building Python packages and PostgreSQL support.
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file and install Python dependencies.
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Copy the Django project code into the container.
COPY . /app/

# Expose port 8000 to be accessible outside the container.
EXPOSE 8000

# Run database migrations and start the Django development server.
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
