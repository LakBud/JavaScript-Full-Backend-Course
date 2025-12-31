import http from "http";

// http://localhost:3000

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Home page");
  } else if (url === "/projects") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Project page!");
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("404 not found");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is now listening to port ${port}`);
});
