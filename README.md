# elecctro-challenge

## How to execute the application's backend

A `.env` file needs to be configured with database settings and settings regarding the use of Hapi's authentication. The file should have the following format:
```
DB_HOST=******
DB_PORT=******
DB_USER=******
DB_NAME=******
DB_PASSWORD=******
HAPI_JWT_KEYS=******
TOKEN_EXPIRE_TIME=******
```

To execute the server, run the following command in the *Server* folder:

`> npm run server`

## How to execute the application's frontend

A `.env` file needs to be configured with the URL of the backend. The file should have the following format:
```
VITE_API_ENDPOINT=********
```

To execute the server, run the following command in the *todo-list* folder:

`> npm run dev`