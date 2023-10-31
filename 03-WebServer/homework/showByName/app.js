var fs = require("fs");
var http = require("http");

// Escribí acá tu servidor

http
  .createServer((req, res) => {
    fs.readFile(`./images${req.url}_doge.jpg`, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-type": "text/plain" });
        return res.end("Img not Found\n");
      } else {
        res.writeHead(200, { "Content-type": "image/jpg" });
        return res.end(data);
      }
    });
  })
  .listen(1337, "localhost");
