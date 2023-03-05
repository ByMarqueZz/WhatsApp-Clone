const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('server/public'));

var users = [];
var colors = ['red', 'blue', 'green', 'orange', 'purple', 'pink', 'brown', 'lavender', 'lightblue', 'skyblue', 'peachpuff', 'mintcream', 'coral', 'lemonchiffon', 'pink', 'beige', 'ivory', 'lawngreen', 'pink', 'orange', 'blanchedalmond', 'plum', 'turquoise', 'olivedrab', 'gold', 'salmon', 'powderblue', 'rosybrown', 'khaki', 'palegreen', 'tan', 'pink', 'lightgoldenrodyellow', 'palegreen', 'paleturquoise', 'sandybrown', 'mintcream', 'pink', 'papayawhip', 'peachpuff', 'peru', 'lightpink', 'mediumaquamarine', 'lightcyan', 'burlywood', 'wheat', 'palevioletred', 'thistle', 'cornsilk', 'blanchedalmond', 'bisque', 'moccasin', 'mistyrose', 'lavenderblush', 'seashell'];

io.on('connection', (socket) => {

  socket.on('userLogin', (user) => {
    users.push({user: user.user, color: colors[Math.floor(Math.random() * colors.length)], image: user.image});
    io.emit('userLogged', users);
    io.emit('userConnected', user.user)
  });

  socket.on('userDisconnected', (user) => {
    users = users.filter(x => x.user !== user);
    io.emit('userLogged', users);
    io.emit('userDisconnected', user);
  });
  socket.on('chat message', (json) => {
    io.emit('chat message', {json: json, color: users.find(x => x.user === json.user).color});
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});