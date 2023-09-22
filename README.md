# prime-airlline-flight

## How to start

```code
npm i
npm run dev
```

## Endpoints

```JSON
{
  "swagger": "2.0",
  "info": {
    "title": "My API",
    "description": "Description",
    "version": "1.0.0"
  },
  "host": "localhost:3000",
  "basePath": "/",
  "schemes": [
    "http"
  ],
  "paths": {
    "/flights": {
      "get": {
        "description": "",
        "parameters": [
          {
            "name": "currency",
            "in": "query",
            "type": "string"
          },
          {
            "name": "date",
            "in": "query",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          }
        }
      }
    },
    "/flights/currencies": {
      "get": {
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    }
  }
}
```