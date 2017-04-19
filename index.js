const WebSocket = require('ws');

const server = new WebSocket.Server({
  port: 10000,
  perMessageDeflate: false
});

console.log('server started');

server.on('connection', function connection(socket) {
  socket.send('welcome')
  console.log(socket.upgradeReq.headers['sec-websocket-key'] + ' connected');


  socket.on('message', function incoming(message) {
    console.log(`${socket.upgradeReq.headers['sec-websocket-key']}: ${message}`);
    server.broadcast(message);
  });
});

server.broadcast = message => {
  server.clients.forEach(client => {
    if(client.readyState === WebSocket.OPEN)
      client.send(message);
  })
};