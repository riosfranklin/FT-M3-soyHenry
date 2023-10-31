var http = require("http");
var fs = require("fs");

var beatles = [
  {
    name: "John Lennon",
    birthdate: "09/10/1940",
    profilePic:
      "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg",
  },
  {
    name: "Paul McCartney",
    birthdate: "18/06/1942",
    profilePic:
      "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg",
  },
  {
    name: "George Harrison",
    birthdate: "25/02/1946",
    profilePic:
      "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg",
  },
  {
    name: "Richard Starkey",
    birthdate: "07/08/1940",
    profilePic:
      "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg",
  },
];

http
  .createServer((req, res) => {
    if (req.url === "/api" || req.url === "/api/") {
      res.writeHead(200, { "Content-type": "application/json" });
      return res.end(JSON.stringify(beatles));
    }
    let beatle = req.url.split("/").pop().replace("%20", " ");
    let findBeatle = beatles.filter((b) => b.name === beatle)[0];
    console.log(findBeatle);
    if (req.url.includes("/api") && findBeatle) {
      if (findBeatle) {
        res.writeHead(200, { "Content-type": "application/json" });
        return res.end(JSON.stringify(findBeatle));
      }
      res.writeHead(404, { "Content-type": "text/plain" });
      return res.end("Beatle not found");
    }

    /************************************************************************/

    if (req.url === "/") {
      fs.readFile("./index.html", "utf-8", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-type": "text/plain" });
          return res.end("HTML not found");
        } else {
          res.writeHead(200, { "Content-type": "text/html" });
          return res.end(data);
        }
      });
    }
    if (req.url.length > 1) {
      if (findBeatle) {
        fs.readFile("./beatle.html", "utf-8", (err, data) => {
          if (err) {
            res.writeHead(404, { "Content-type": "text/plain" });
            return res.end("HTML not found");
          }
          data = data.replace("{name}", findBeatle.name);
          data = data.replace("{full_name}", findBeatle.name);
          data = data.replace("{birthdate}", findBeatle.birthdate);
          data = data.replace("{profilePic}", findBeatle.profilePic);
          res.writeHead(200, { "Content-type": "text/html" });
          return res.end(data);
        });
      } else {
        res.writeHead(404, { "Content-type": "text/plain" });
        return res.end("HTML not found");
      }
    }
  })
  .listen(1337, "localhost");
