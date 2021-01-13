const app = require('./backend/app');
const debug = require('debug')("node-angular");
const http = require('http');

const normalisePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)){
    return val;
  }

  if (port >= 0){
    return port;
  }
  return false;
}

//For errors which might occour
const onError = error => {
  if (error.syscall !== "listen"){
    throw error;
  }

  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  switch(error.code){
    case "EACCES":
      console.error(bind + "requires elavated privilages");
      proccess.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + "is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//Listening to incoming requests
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr: "port" + port;
  debug("Listening on" + bind);
};

//Setting up the port
const port = normalisePort(process.env.PORT || "3000");
app.set('port', port);

const server = http.createServer(app);
//Listeners to show if something went wrong or smoothly when starting server.
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

// var io = socket(server);

// io.on('connection', (socket) => {

//     console.log(`New connection ${socket.id}`)
//     socket.on('chat', function(data){
//         io.sockets.emit('chat', data);
//     });

//     socket.on('typing', function(data){
//         io.sockets.emit('typing', data);

//     });

// });
