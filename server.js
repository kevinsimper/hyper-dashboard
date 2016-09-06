import aws4 from 'hyper-aws4'
import fetch from 'node-fetch'
import express from 'express'

const signOption = {
  method: 'GET',
  credential: {
    accessKey: process.env.HYPER_ACCESS,
    secretKey: process.env.HYPER_SECRET
  }
}



let url = 'https://us-west-1.hyper.sh/containers/json'
const headers = aws4.sign(Object.assign({}, {url}, signOption))
let containers = fetch(url, {method: signOption.method, headers}).then((res) => {
    return res.json()
}).then((c) => console.log(c))

var app = express()

app.get('/', (req, res) => {
  res.send('Frontpage')
})

app.listen(9000, () => {
  console.log('Listening on port 9000')
})
