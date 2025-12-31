import http from "http";

const server = http.createServer((req, res) => {
  console.log(req, "req");
  // Sets the HTTP status code to 200 and sends response headers with Content-Type set to plain text
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Hello node.js from http module");
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is now listening to port ${port}`);
});
