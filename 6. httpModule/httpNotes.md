# Node.js `http` Module — Notes

These notes focus on the parts of the `http` module that are commonly used in professional Node.js applications.

---

## Importing the Module

### ES Modules (recommended)

```js
import http from "http";
```

### CommonJS

```js
const http = require("http");
```

The `http` module is built into Node.js and does not require any external dependencies.

---

## Creating an HTTP Server

```js
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("OK");
});
```

- `http.createServer()` creates a new HTTP server.
- The callback runs **for every incoming request**.
- `req` represents the incoming request.
- `res` is used to build and send the response.

---

## Starting the Server

```js
server.listen(3000);
```

```js
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

- `listen()` starts the server.
- The callback runs once the server is ready to accept connections.

---

## Request Object (`req`)

### Commonly Used Properties

```js
req.method;
req.url;
req.headers;
```

- `req.method` → HTTP method (`GET`, `POST`, etc.)
- `req.url` → URL path and query string
- `req.headers` → Request headers as an object

These properties are used for routing, authentication, and parsing client data.

---

## Parsing URLs and Query Parameters

```js
import { URL } from "url";

const url = new URL(req.url, `http://${req.headers.host}`);
const pathname = url.pathname;
const query = url.searchParams;
```

- The `URL` class provides safe and reliable URL parsing.
- `pathname` is used for routing.
- `searchParams` is used to access query parameters.

```js
query.get("id");
```

---

## Handling Request Body (POST / PUT)

```js
let body = "";

req.on("data", (chunk) => {
  body += chunk;
});

req.on("end", () => {
  const data = JSON.parse(body);
  res.end("Received");
});
```

- Request bodies are received as a stream.
- `data` events emit chunks of data.
- `end` fires when the full body has been received.
- Commonly used for JSON payloads in APIs.

---

## Response Object (`res`)

### Setting Status Codes and Headers

```js
res.statusCode = 201;
res.setHeader("Content-Type", "application/json");
```

- Status codes describe the result of the request.
- Headers provide metadata about the response.

---

### Sending a Response

```js
res.end("Done");
```

- `res.end()` sends the response and closes the connection.
- Must always be called.

---

### Sending JSON Responses

```js
res.setHeader("Content-Type", "application/json");
res.end(JSON.stringify({ success: true }));
```

- JSON must be stringified before sending.
- Correct `Content-Type` is required for clients.

---

## Manual Routing

```js
if (req.method === "GET" && req.url === "/") {
  res.end("Home");
} else if (req.method === "POST" && req.url === "/api") {
  res.end("API");
} else {
  res.statusCode = 404;
  res.end("Not Found");
}
```

- Routing is done by checking the request method and URL.
- This pattern is the foundation of frameworks like Express.

---

## Error Handling

```js
res.statusCode = 500;
res.end("Internal Server Error");
```

- Errors should return appropriate HTTP status codes.
- Never expose sensitive error details to clients.

---

## Closing the Server

```js
server.close();
```

- Stops the server from accepting new connections.
- Existing connections are allowed to finish.

---

## Common Production Headers

```js
res.setHeader("Content-Type", "application/json");
res.setHeader("Cache-Control", "no-store");
```

- `Content-Type` defines the response format.
- `Cache-Control` controls caching behavior.

---

## Common Status Codes

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```

These are the most frequently used status codes in production APIs.

---

## Best Practices

- Always call `res.end()`
- Set headers before sending data
- Parse URLs using the `URL` class
- Keep request handlers non-blocking
- Validate and sanitize incoming data

---

## Summary

- Core HTTP server functionality in Node.js
- Request and response lifecycle
- Manual routing and JSON APIs
- Foundation for backend frameworks

---
