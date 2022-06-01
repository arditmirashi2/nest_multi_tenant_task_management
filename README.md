## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Formatting the code

```bash
$ npm run pretty
```

## Accessing the Swagger documentation

The swagger documentation can be accessed in the base path "/api" of the application.


## Run with Docker

1. Build your image container with the following command:

```bash
# give your docker image a name
docker build -t <your username>/nest-api .
```
2. Start the newly created nest and postgres containers with the following command:

```bash
docker-compose up
# or detached
docker-compose up -d
```

