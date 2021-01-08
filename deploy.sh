#!/bin/sh
set -e # Stop script from running if there are any errors

IMAGE="jmutsers/invoice-client"                             # Docker image
CONTAINER="angular-invoice-client"                             # Docker container name
GIT_VERSION=$(git describe --always --abbrev --tags --long) # Git hash and tags
PORTS="4201:4200"                                           # Docker ports that the image will be run on
DOCKER_USERNAME="jmutsers"
DOCKER_PASSWORD="Muismat123"

# Build and tag image
docker build -t ${IMAGE}:${GIT_VERSION} .
docker tag ${IMAGE}:${GIT_VERSION} ${IMAGE}:latest

# Log in to Docker Hub and push
echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
docker push ${IMAGE}:${GIT_VERSION}

# Stop, run, and clean
result=$(docker ps -q -f name=${CONTAINER})
if [[ -n "$result" ]]; then
    # cleanup
    docker stop ${CONTAINER}
    docker rm ${CONTAINER}
fi

docker container run --network mysql --name=${CONTAINER} --restart unless-stopped -d -p ${PORTS} ${IMAGE}:${GIT_VERSION}
docker system prune -a -f
