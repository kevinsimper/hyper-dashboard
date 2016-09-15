import express from 'express'
import Hyper from 'hyper-api'

let api = new Hyper()
var app = express()

app.use(express.static('build'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/containers/json', (req, res) => {
  api.get('/containers/json').then(c => res.send(c))
})

app.listen(9000, () => {
  console.log('Listening on port 9000')
})
