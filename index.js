import React from "react";
import http from "http";
import path from "path";
import fs from "fs";
import ReactDomServer from "react-dom/server";
import App from "./app.js";

const __dirname = import.meta.url.substring(
  import.meta.url.indexOf("://") + 3,
  import.meta.url.length - "/index.js".length
);

const server = http.createServer(function (req, res) {
  console.log(req.url);
  switch (req.url) {
    default:
      const toHydrateDOM = ReactDomServer.renderToString(App());
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(toHydrateDOM);
      break;
    case "/img/favicon.ico":
      const FAVICON = path.join(__dirname, "img", "sebastian logo.jpg");
      // ensure file exists before streaming
      fs.stat(FAVICON, (err, stats) => {
        if (err || !stats.isFile()) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          return res.end("Not found");
        }

        // set correct content-type and length
        res.writeHead(200, {
          "Content-Type": "image/jpeg",
          "Content-Length": stats.size,
        });

        const readStreamFAVICON = fs.createReadStream(FAVICON);
        readStreamFAVICON.on("error", (streamErr) => {
          console.error(streamErr);
          if (!res.headersSent) {
            res.writeHead(500, { "Content-Type": "text/plain" });
          }
          res.end("Server error");
        });

        // pipe the file stream to the response (handles backpressure and ends response)
        readStreamFAVICON.pipe(res);
      });
  }
});

const hostname = "localhost";
const port = 8080;
server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
