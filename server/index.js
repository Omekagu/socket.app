const express = require('express');
const app = express();
const http = require('http');
const Server = require('socket.io');
const cors = require('cors');

app.use(cors());
const server = http.createServer(app);
const io = Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`user connected: ${socket.id}`);
  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data);
  });
});

server.listen(3001, () => {
  console.log('server is running');
});
