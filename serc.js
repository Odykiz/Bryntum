const path = require('path');
//const http = require('http');
const express = require('express');
const app = express();
const WebSocket = require('ws');
//const server = http.createServer(app);
//const io = WebSocket(server);
const PORT = 5000 || process.env.port;
let savehelper = 0;

const wsServer = new WebSocket.Server({
    noServer: true
})

app.use(express.static(path.join(__dirname, 'App')));

wsServer.on('connection', function(socket) {
  console.log('Client Verbunden');
  socket.send('Mit Server Verbunden');

  socket.on('disconnect', function() {
    console.log('Client getrennt');
  });

  /*
  socket.on('inputMessage', function(msg) {
    console.log('Vom Client Gesendet: '+ msg);
    wsServer.clients.forEach(function(client){
        client.send("Nachricht gesendet: " + msg);
      })
  })*/

  
    socket.on('message', (msg) => {
        //console.log('Vom Client Gesendet: '+ msg);
        //socket.broadcast.emit('inputMessage', msg);
        
        let message = String(msg);
        
        wsServer.clients.forEach(function each(client){
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });

        if (message === "save") {

            savehelper = 1;
        }
        if (message !== "" && savehelper === 1) {

            fetch('./App/Resource/puffer.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
        }
        /*
        else{
            wsServer.clients.forEach(function(client){
                client.send(String(msg));
                client.
            })
        }*/
    });
});

const server = app.listen(PORT);

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
      wsServer.emit('connection', socket, request);
    });
  });

console.log("Server läuft auf Port: " + PORT);