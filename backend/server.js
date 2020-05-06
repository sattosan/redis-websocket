require('dotenv').config();
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var redis = require("socket.io-redis");

io.adapter(redis({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }));

io.on("connection", function (socket) {
  socket.on("message", function (msg) {
    io.emit("message", msg);
  });
});

http.listen(3000, function () {
  console.log("listening on *:" + 3000);
});
