const uuid = require('uuid/v4')
var session = require('express-session');
var cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var con;
var http = require('http');
var https = require('https');

const odbc_url = process.env.ODBC_URL; 
const odbc_port = process.env.ODBC_PORT;

/*if (con == undefined){
  con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dhuebwsa',
    database: 'vapp2'
  });
}*/

	passport.use(new LocalStrategy(
		{ usernameField: 'email' },
		(email, password, done) => {
		var query = 'SELECT * FROM users;'	
		odbcConnector(query, function(result){
			for (var i = 0; i < result.length; i++){
				if(result[i].login==email && result[i].password==password){
					var user = '{"id":' + result[i].user_id + ',"email":"' + result[i].email + '", "login":"' + result[i].login + '", "password":"' + result[i].password + '", "role":"'+result[i].role+'"}';
					console.log('user: '+user);
					return done(null, JSON.parse(user));
				}
			}
		});
		  console.log('Local strategy returned true')
		}
	));

	// tell passport how to serialize the user
	passport.serializeUser((user, done) => {
    try{
		done(null, user.id);
    } catch(err){
      console.log(err)
    }
	});

	passport.deserializeUser((id, done) => {
    try{
		var query = 'SELECT * FROM users WHERE user_id = ' + id;
		odbcConnector(query, function(result){
			if (result[0].user_id === id){
				var user='{"id":'+result[0].user_id+', "login":"'+result[0].login+'","password":"'+result[0].password+'","customer":'+result[0].customer+',"role":"'+result[0].role+'"}'
				var user =  JSON.parse(user);
			} else {
				var user = false;
			}
			done(null, user);
		})
  } catch (err){
    console.log(err)
  }
	});

    exports.redirecting = function(req, res) {
      console.log('go to welcome page')
    	res.redirect('/Vapp5/Accueil.html');
    }

    exports.loginUser = function(req, res, next){
      try{
    	console.log('Inside POST /login callback') // 1
    	passport.authenticate('local', (err, user, info) => {
	    /*console.log('Inside passport.authenticate() callback'); //2
	    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`) // 3*/
	    console.log(`req.user: ${JSON.stringify(req.user)}`) // 4
	    req.logIn(user, (err) => {
	      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`) //7
	      console.log(`req.user: ${JSON.stringify(req.user)}`) // 8
	      //console.log('expires: ' + req.session.cookie.expires)
	      //console.log('req.session:' + JSON.stringify(req.session))
	      if(err) {console.log('err on login');return next(err);}
	      req.session.save(() => {
          console.log('save');
          res.status(200).send('Login with sucess');
        })
        
	    })
	  })(req, res, next);
  } catch (err){
    res.send(err);
  }
    }

    exports.logoutUser = function(req, res) {
      try{
    	console.log('logout')
    	/*req.session.cookie.expires = new Date(Date.now());
    	req.user = undefined;
    	req.session.passport = {}*/
    	req.logOut();
    	/*req.session.destroy();*/
    	req.session.save(() => {console.log('save');})
    	res.redirect('/');
    } catch (err){
      res.send(err)
    }
    }

    exports.authrequired = function(req, res, next){
      try{
	    /*console.log('Inside GET /authrequired callback')*/
	    /*
	    console.log(req.session.passport)
	    console.log(req.session.cookie._expires.toString())*/
	    if(req.isAuthenticated()){
	      return next();
	    }
	    console.log('redirect to login.html');
    	res.redirect('/login.html')
    } catch(err){
      res.send(err)
    }
    }

function odbcConnector(request, callback){
  try {
    const id = {
      host : odbc_url,
      path: '/odbcvApp5/v1/api/odbcModels/requestdb?request='+escape(request),
      port: odbc_port,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'rejectUnauthorized':false
      }
    };  

    const idCallback = function(response) {
      let str = '';
      response.on('data', function(chunk) {
        str += chunk;
      });

      response.on('end', function(){
        var result = JSON.parse(str)
        callback(result.request);
      })
    }

    const idReq = https.request(id, idCallback);
    idReq.end();
  } catch(e){
    console.log(e)
  }
}


