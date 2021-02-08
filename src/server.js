const path = require("path");
const express = require("express");
const nunjucks = require("nunjucks");
// const methodOverride = require("method-override");
const routes = require(path.resolve(__dirname, "routes", "routes"));

const server = express();
// habilitando o body request de qualquer tipo
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.resolve(__dirname, "../public")));
//sobrescrita de metodo http
// server.use(methodOverride("_method"));
server.use(routes);

server.set("view engine", "njk");

nunjucks.configure(path.resolve(__dirname, "app", "views"), {
  express: server,
  autoescape: false,
  noCache: true,
});

server.listen(5555, () => console.log("Server is running on the port 5555"));
