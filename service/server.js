const express = require('express')
const appExpress = express()
// const { resolve } = require('path')
const app = require('./app')
const database = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')

try {
  appExpress.use(cors())
  appExpress.use(bodyParser.urlencoded({ extended: false }))
  appExpress.use(bodyParser.json())
  // appExpress.use(express.static(resolve(__dirname, '..', 'client', 'dist')))
  appExpress.use(app)
  // appExpress.get('*', (req, res) => res.sendFile(resolve(__dirname, '..', 'client', 'dist', 'index.html')))
} catch (err) {
  console.log(err)
}

database.connect().then(function () {
  appExpress.listen(8088, function () {
    console.log('Service listening on port 8088!')
  })
}).catch(err => {
  console.log('Not possible connect ' + err)
})
