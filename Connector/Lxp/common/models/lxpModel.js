// Specific STEP Connector API
let userPrompts = require("../../userPrompts");
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
//var sleep = require('sleep');

const default_user = userPrompts.user;
const default_password = userPrompts.password;
const default_server = userPrompts.server;
const default_database = userPrompts.database;

var received = false;

var connection;
// Create connection to database
var config = 
   {
     userName: default_user, 
     password: default_password, 
     server: default_server, 
     options: 
        {
           database: default_database,
           encrypt: false
        }
   }

module.exports = function(lxpModel) {

function getData(request, callback){
    try {
        var pool = new sql.ConnectionPool(config);
      pool.connect().then(result => {
        console.log(pool)
        var aResult = pool.request().query(request);
        var res = Promise.resolve(aResult);
        res.then(function(data){callback(data.recordset)});
      });
    }
    catch (err){
        callback(err);
    }
}

lxpModel.setConfigurationsData = function (newUser, newPassword, newServer, newDatabase, callback)
{
  var res;
  if (newUser != "" && newPassword == "")
    {console.dir("You must share a passeword to change the user login information");
  res = "You must share a passeword to change the user login information";}
  else
  {
    if (newUser != "" && newPassword != "")
      {config.userName = newUser,
        config.passeword = newPassword}
    if (newServer != "")
      {config.server = newServer}
    if (newDatabase != "")
      {config.database = newDatabase}
    console.dir(config);
    res = connectionToDatabase("", function(err, data){if (err) {var result = err}else{var result = data}return result;});
    callback(config, res);
  }
}

lxpModel.setDefaultConfig = function(callback)
{
  config =
  {
   userName: default_user, 
   password: default_password, 
   server: default_server, 
   options: 
      {
         database: default_database,
         encrypt: false
      }
  }
  var res = 'configuration set to default';
  callback(null, res);
}

lxpModel.executeQuery = function(query, callback)
{
  getData(query, function(res){
    callback(res);
  });
   
}


lxpModel.remoteMethod('setConfigurationsData',{ 
  isStatic: true,
  accepts: [
        { 
              arg: 'newUser',
              type: 'string',
              description: 'new login',
              required: false,
              'http': {source: 'body'}
            },
            { 
              arg: 'newPassword',
              type: 'string',
              description: 'new password',
              required: false,
              'http': {source: 'body'}
            },
            { 
              arg: 'newServer',
              type: 'string',
              description: 'new Server',
              required: false,
              'http': {source: 'body'}
            },
            { 
              arg: 'newDatabase',
              type: 'string',
              description: 'new Database',
              required: false,
              'http': {source: 'body'}
            }
      ],
  returns: {arg: 'data', type: 'string'},
  http: { verb: 'post', path: '/setConfigurationsData' },
  description: 'get Data' }

);
lxpModel.remoteMethod('setDefaultConfig',{ 
  isStatic: true,
  accepts: [],
  returns: {arg: 'data', type: 'string'},
  http: { verb: 'post', path: '/setDefaultConfig' },
  description: 'set default configuration parameter' }

);
lxpModel.remoteMethod('executeQuerry',{ 
  isStatic: true,
  accepts: [
        { 
              arg: 'query',
              type: 'string',
              description: 'sql request',
              required: true,
              'http': {source: 'query'}
            }
          ],
  returns: {arg: 'data', type: 'string'},
  http: { verb: 'get', path: '/executeQuerry' },
  description: 'execute a sql querry' }
);

}



