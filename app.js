var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session'); //如果要使用session，需要单独包含这个模块
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var RedisStore = require('connect-redis')(session);
//var models = require("./models/model")

var index = require('./routes/index');
var users = require('./routes/users');
var categorys = require('./routes/categorys');
var subscribeItems = require('./routes/subscribeItems');
var app = express();

// 设置 Session
app.use(session({
    store: new RedisStore({
        host: "localhost",
        port: 6379,
        db: "0"
    }),
    key: 'sid',
    resave:true,
    saveUninitialized:true,
    secret: 'keyboard cat'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(models);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/categorys',categorys);
app.use('/subscribeItems',subscribeItems);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
