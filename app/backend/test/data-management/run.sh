!#/bin/sh
set -e
echo "Starting Test Data Loading ..."
echo "Building Docker image..."
pwd
docker build -t data-management:0.0.1 -f test/data-management/Dockerfile test/data-management/
kind load docker-image data-management:0.0.1
echo "Running Docker container into Kubernetes ..."
# Delete pod if it exists
kubectl delete pod data-management --ignore-not-found -n hotel --wait
# Create a new pod with the same name
kubectl run data-management --image=data-management:0.0.1 \
  --restart=Never --env POSTGRES_HOST=backend-postgres --env POSTGRES_USER=hotel \
  --env POSTGRES_PASSWORD=hotel --env POSTGRES_DATABASE=hotel --wait -n hotel
echo "Docker container has been run successfully."
# Wait for the pod to be in running state
sleep 5
# Follow the logs of the pod
kubectl logs -f data-management -n hotel
# Wait for the pod to finish
sleep 5
# Delete the pod after completion
kubectl delete pod data-management --ignore-not-found -n hotel
echo "Test Data Loading completed."
