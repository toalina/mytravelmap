var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var errorHandle = require(__dirname + '/../lib/error_handle');
var httpBasic = require(__dirname + '/../lib/http_basic');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var eventEmitter = require('events').EventEmitter;
var ee = new eventEmitter();

var usersRouter = module.exports = exports = express.Router();

/* ======================== SIGN UP ======================== */
usersRouter.get('/', function(req, res) {
  res.send('hello world');
});

usersRouter.post('/signup', jsonParser, function(req,res){
  var newUser = new User();
  newUser.basic.username = req.body.username;
  newUser.username = req.body.username;
  console.log('got to first event generatehash');
  ee.emit('generateHash', newUser, req, res);
});

ee.on('generateHash', function(newUser, req, res){
  newUser.generateHash(req.body.password, function(err, hash){
    if(err){
      return errorHandle(err, res);
    }
    console.log('got to second event save')
    ee.emit('save', newUser, req, res);
  });
});

ee.on('save', function(newUser, req, res){
  newUser.save(function(err, data){
    if(err){
      return errorHandle(err, res);
    }
    ee.emit('generateToken', newUser, req, res);
  });
});

ee.on('generateToken', function(newUser, req, res){
  newUser.generateToken(function(err, token) {
    if (err){
      return handleError(err, res);
    }
    res.json({token: token});
  });
});

/* ======================== SIGN IN ======================== */
var user;

usersRouter.get('/signin', httpBasic, function(req, res){
  User.findOne({'basic.username': req.auth.username}, function(err, user){
    if(err) return errorHandle(err, res);
    if(!user){
      console.log('could not authenticate: ' + req.auth.username);
      return res.status(401).json({msg: 'could not authenticate'});
    }
    console.log('got here');
   ee.emit('compareHash', req, res, user); 
  });
});

ee.on('compareHash', function(req, res, user){
  user.compareHash(req.auth.password, function(err, hashRes){
    if(!hashRes){
      console.log('could not authenticate: ' + req.auth.username);
      return res.status(401).json({msg: 'could not authenticate'});
    }
    ee.emit('generateToken2', req, res, user);
  });
});

ee.on('generateToken2', function(req, res, user){
  user.generateToken(function(err, token){
    if(err){
      return errorHandle(err, res);
    }
    res.json({token: token});
  });
});

/* ================ GET USER NAME ====================== */
usersRouter.get('/username', jsonParser, eatAuth, function(req, res) {
  res.json({username: req.user.username});
});








