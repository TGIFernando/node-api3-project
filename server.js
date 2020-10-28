const express = require('express');

const server = express();
const userRouter = require('./users/userRouter');


//custom middleware

function logger(req, res, next) {
  console.log('request method: ', req.method);
  console.log('request url: ', req.url);
  console.log('time: ', new Date().toString());
  next();
}

server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter);



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


module.exports = server;
