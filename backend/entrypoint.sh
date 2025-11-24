# Apply database migrations
set -e
echo "Applying database migrations..."
python manage.py migrate --noinput

# Collect static files (optional, if using static files)
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Execute the CMD from the Dockerfile (starts Gunicorn server)
exec "$@"
