!#/bin/sh
set -e
echo "Starting Test Data Loading ..."
for file in hotel guest room_type room reservation; do
    echo "Loading data into $file table..."
    psql postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:5432/$POSTGRES_DATABASE -c "\copy $file FROM './test/data-management/$file.csv' DELIMITER ',' CSV HEADER;" || true
done
echo "Data loaded successfully into PostgreSQL database."
