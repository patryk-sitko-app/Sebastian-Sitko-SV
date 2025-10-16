import React from "react";
import http from "http";
import path from "path";
import fs from "fs";
import ReactDomServer from "react-dom/server";
import App from "./app.js";
import { URL } from "url";

const __dirname = import.meta.url.substring(
  import.meta.url.indexOf("://") + 3,
  import.meta.url.length - 8
);

const server = http.createServer(function (req, res) {
  console.log(req.url);
  switch (req.url) {
    case "/":
      const toHydrateDOM = ReactDomServer.renderToString(
        App() //React.createElement("div", null, "react")
        // { bootstrapScripts: ["/main.js"] }
      );
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(toHydrateDOM);
      break;
    case "/img/favicon.ico":
      const FAVICON = path.join(__dirname, "img", "favicon.ico");
      res.writeHead(200, { "Content-Type": "image/x-icon" });
      const readSteamFAVICON = fs.createReadStream(FAVICON);
      readSteamFAVICON.on("data", (data) => {
        res.end(data);
      });
      break;
    default:
      res.end("Hello World!");
  }
});

const hostname = "localhost";
const port = 8080;
server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
