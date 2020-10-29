// code away!
require('dotenv').config();
const server = require('./server.js');
const PORT = process.env.PORT || 5245;

server.listen(PORT, () => {
    console.log('server is listening on port ' + PORT)
})