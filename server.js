import express from 'express'
import Hyper from 'hyper-api'
import socketIO from 'socket.io'
import http from 'http'

var app = express()
let server = http.Server(app)
let io = socketIO(server)

let api = new Hyper()

app.use(express.static('build'))

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/containers/json', (req, res) => {
  api.get('/containers/json').then(c => res.send(c)).catch(e => console.log(e))
})

server.listen(9000, () => {
  console.log('Listening on port 9000')
})
