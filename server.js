const express = require('express');
const userRouter = require('./users/userRouter')
const cors = require('cors')
const server = express();

server.use(cors())
server.use(logger)

server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const date = new Date()
  console.log(req.method, req.url, date, '\n')
  next()
}

module.exports = server
