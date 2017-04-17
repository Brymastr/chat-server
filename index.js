const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  console.log('request received');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', message => {
    console.log(message);
  });
});

http.listen(9000, () => {
  console.log('http server started');
});