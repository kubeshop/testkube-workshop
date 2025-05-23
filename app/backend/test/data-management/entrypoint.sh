!#/bin/sh
set -e
echo "Checking if PostgreSQL is up..."
MAX_RETRIES=20  # Set the maximum number of retries
RETRY_COUNT=0
until pg_isready -h $POSTGRES_HOST -p 5432 -U $POSTGRES_USER; do
    if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
        echo "PostgreSQL is not ready after $MAX_RETRIES attempts. Exiting..."
        exit 1
    fi
    echo "PostgreSQL is not ready yet. Waiting..."
    RETRY_COUNT=$((RETRY_COUNT + 1))
    sleep 1
done
echo "PostgreSQL is up and running."
echo "Loading data into PostgreSQL database..."
for file in hotel guest room_type room reservation; do
    echo "Loading data into $file table..."
    psql postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:5432/$POSTGRES_DATABASE -c "\copy $file FROM '/data/$file.csv' DELIMITER ',' CSV HEADER;" || true
done
echo "Data loaded successfully into PostgreSQL database."
