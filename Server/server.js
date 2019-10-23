var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
const dotenv = require('dotenv');
dotenv.config();

require('./app/routes/vapp5.routes.js')(app);


const port = process.env.PORT;
const url = process.env.API_URL;
// Create a Server
var server = app.listen(port, function () {

  console.log("App listening at http://%s:%s", url, port)

})

