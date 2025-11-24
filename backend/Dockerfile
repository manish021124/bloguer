# Pull the official Python base image from the Docker Hub
FROM python:3.12

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /backend

# Install system dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  libpq-dev \
  && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY requirements.txt /backend/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project files into the container
COPY . /backend/

# Copy entrypoint script
COPY entrypoint.sh /backend/entrypoint.sh
RUN chmod +x /backend/entrypoint.sh

# Expose port 8000
EXPOSE 8000

# Use entrypoint script to run migrations before starting the server
ENTRYPOINT ["/backend/entrypoint.sh"]

# Run the application
CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8000"]