import express from 'express'
import Hyper from 'hyper-api'
import socketIO from 'socket.io'
import http from 'http'

var app = express()
let server = http.Server(app)
let io = socketIO(server)

let api = new Hyper()

app.use(express.static('build'))

let activeRequest = null
io.on('connection', function (socket) {
  socket.on('startlogs', function (data) {
    startLogs(socket, data.container)
  })
  socket.on('stoplogs', () => {
    activeRequest.abort()
  })
  socket.on('disconnect', () => {
    if(activeRequest) {
      activeRequest.abort()
    }
  })
})

function startLogs(socket, containerId) {
  let fetchOptions = api.sign('POST', `/containers/${containerId}/attach?logs=1&stream=0&stdout=1`)
  var request = require('request')
  let through2 = require('through2')
  activeRequest = request.post({
    url: fetchOptions.fullUrl,
    headers: fetchOptions.headers
  })
  activeRequest.pipe(through2((chunk, enc, callback) => {
    let logLine = chunk.slice(8, chunk.length).toString()
    console.log('log emitted', logLine)
    socket.emit('logs', logLine)
    callback(null, chunk.slice(8, chunk.length))
  }))
}

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
