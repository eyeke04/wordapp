var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var db = require('./model/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req, res) {
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    //look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }

}));

var routes = require('./routes/index');
var users = require('./routes/users');
var speakers = require('./routes/speakers');
var messages = require('./routes/messages');
var cat = require('./routes/cat');
var clips = require('./routes/clips');
var org = require('./routes/org'); //churches and organisations
var shares = require('./routes/shares');
var plans = require('./routes/plans');
var series = require('./routes/series');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/speakers', speakers);
app.use('/messages', messages);
app.use('/cat', cat);
app.use('/clips', clips);
app.use('/org', org);
app.use('/shares', shares);
app.use('/plans', plans);
app.use('/series', series);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;