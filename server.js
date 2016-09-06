import aws4 from 'hyper-aws4'
import fetch from 'node-fetch'

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
