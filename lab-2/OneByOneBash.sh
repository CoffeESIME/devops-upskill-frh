#!/bin/bash

start_containers() {
    docker run -d --name mongo -p 27017:27017 -v $(pwd)/data:/data/nutria mongo
    
    cd nutriserver
    docker build -t nest-server .
    docker run -d --name nest-server -p 4100:4100 --link mongo nest-server
    
    cd ../nutriapp
    docker build -t next-app .
    docker run -d --name next-app -p 8080:3000 --link nest-server next-app
}

stop_containers() {
    docker stop next-app
    docker rm next-app
    
    docker stop nest-server
    docker rm nest-server
    
    docker stop mongo
    docker rm mongo
}

compose_cotainers() {
    docker compose up -d
}
# Check the command-line argument
if [ "$1" = "start" ]; then
    start_containers
    elif [ "$1" = "stop" ]; then
    stop_containers
    elif [ "$1" = "compose" ]; then
    compose_cotainers
else
    echo "Invalid argument. Please use 'start', 'stop' or 'compose'."
fi
