# Next.js, Nest.js, and MongoDB Docker Deployment Nutrition app

This repository contains a Next.js application, a Nest.js server, and a MongoDB database, all of which can be deployed using Docker.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Nest.js](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/).

## How to Use


- `OneByOne.sh`: This script accepts a command-line argument to either start or stop the containers. To start the containers, run `./OneByOne.sh start`. To stop the containers, run `./OneByOne.sh stop`. If want to use the docker-compose use `./OneByOne.sh compose` and `./OneByOne.sh decompose` instead.


Before running these scripts, make sure to give them execute permissions with `chmod +x OneByOne.sh`
