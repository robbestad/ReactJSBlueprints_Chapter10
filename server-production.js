const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || "0.0.0.0";
const path = require("path");
const compression = require("compression");
const http = require("http");
const errorHandler = require('express-error-handler');

app.use(compression());

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", req.path));
});

server = http.createServer(app);

app.use(function (err, req, res, next) {
  console.log(err);
  next(err);
});

app.use(errorHandler({server: server}));

app.listen(port, host, function () {
  console.log('Server started at http://' + host + ':' + port);
});
