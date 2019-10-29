module.exports = function(app) {

    var controller = require('../controller/vapp5.controller.js');
    var contSession = require('../controller/vapp5.session.js');

    var bodyParser = require('body-parser');
    const uuid = require('uuid/v4')
    var session = require('express-session');
    var cookieParser = require('cookie-parser');
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    var MySQLStore = require('express-mysql-session')(session);
    var busboy = require('connect-busboy');

    var fs = require('fs');

    var options = {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE
    };


    var sessionStore = new MySQLStore(options);

    app.all("/*", function(req, res, next){
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With');
      next();
    });

    app.use(bodyParser.urlencoded({limit:'50mb', extended: true }))
    app.use(bodyParser.json({limit:'50mb'}))

    app.use(session({
    genid: (req) => {
      console.log('Inside session middleware genid function')
      console.log(`Request object sessionID from client: ${req.sessionID}`)
      return uuid() // use UUIDs for session IDs
    },
    store: sessionStore,
    secret: 'vfosvappone',
    resave: true,
    rolling:true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000}
  }))

    app.use(passport.initialize());
    app.use(passport.session());

    // redirecting  
    app.get('/'/*, contSession.authrequired*/, contSession.redirecting);

    // Display login page
    app.get('/login.html', controller.displayLoginPage);

    // login
    app.post('/login', contSession.loginUser);

    // log out
    app.post('/logout', contSession.logoutUser);

    // display all login controller
    app.get('/controller/:script', controller.getController);

    // get user company with id
    app.get('/getUserCompany'/*, contSession.authrequired*/, controller.getUserCompany);

    // get user login info
    app.get('/getUserInformation'/*,contSession.authrequired*/,controller.getUserInformation);

    // get company contact
    app.get('/getCompanyInformation'/*,contSession.authrequired*/,controller.getCompanyInformation);

    // save user changes
    /*app.post('/updateUser',contSession.authrequired,controller.updateUser);*/

    // display all login page images
    app.get('/images/:image', controller.displayImages);

    // get favicon.ico
    app.get('/favicon.ico', controller.favicon)

    // display all project page
    app.get('/Vapp5/:page'/*, contSession.authrequired*/, controller.displayPage);

    // get 3D script 
    app.get('/Vapp5/js/:script'/*, contSession.authrequired*/, controller.get3DScript);

    // display all project page
    app.get('/Vapp5/controller/:script'/*, contSession.authrequired*/, controller.getController);

    // display all login controller
    app.get('/controller/:script', controller.getController);

    // display all images
    app.get('/Vapp5/images/:image'/*, contSession.authrequired*/, controller.displayImages);

    // get css files
    app.get('/css/:file', controller.getCssFiles);

    // get all MO
    app.get('/getAllMO'/*, contSession.authrequired*/, controller.getAllMO);

    // start a CPS control on an operation of a Manufacturing Order
    app.post('/startCPSControl'/*, contSession.authrequired*/, controller.startCPSControl);

    // stop CPS control
    app.post('/stopCPSControl'/*, contSession.authrequired*/, controller.stopCPSControl);

    // configure both camera of the CPS
    app.post('/configureCamera'/*, contSession.authrequired*/, controller.configureCamera);

    // configure both cylindre of the CPS
    app.post('/configureCylindre'/*, contSession.authrequired*/, controller.configureCylindre);

    // get every data of product tarking page
    app.get('/getProductionTracking/:mo'/*, contSession.authrequired*/, controller.getProductionTracking);

    // Get issues
    app.get('/getIssues/:mo'/*, contSession.authrequired*/, controller.getIssues);

    // new issue
    app.post('/newIssue/:mo'/*, contSession.authrequired*/, controller.newIssue);

    // get product sequence
    app.get('/getProductSequence/:mo'/*, contSession.authrequired*/, controller.getProductSequence);

    // get watch list from an operation
    app.get('/getWatchList/:ope'/*, contSession.authrequired*/, controller.getWatchList);
}