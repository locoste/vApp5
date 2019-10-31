var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
const dotenv = require('dotenv');
var faye = require('faye')
dotenv.config();
var http = require('http')

require('./app/routes/vapp5.routes.js')(app);

global.bayeux = new faye.NodeAdapter({
  mount: '/cps'
});

const port = process.env.PORT;
const url = process.env.API_URL;
// Create a Server
var server = http.createServer(app);
bayeux.attach(server);

server.listen(port);
console.log('server listen to '+url+':'+port)

