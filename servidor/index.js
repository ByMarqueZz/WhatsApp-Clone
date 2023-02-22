const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var users = 0;
var usuariosConectados = [];
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    users++;
    console.log('a user connected, hay ' + users + ' usuarios conectados');
    socket.on('disconnect', (socket) => {
        users--;
        console.log('a user disconnected, hay ' + users + ' usuarios conectados');
    });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});