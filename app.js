var connect = require('connect');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var io = require('socket.io');
var routes = require('./routes/index');


var app = express();
// app.use(cookieParser);

var numberofTimes = 0;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var cookieParser = cookieParser('1234567890QWERTY') ;
var sessionStore = new connect.middleware.session.MemoryStore();

  app.use(cookieParser);
  app.use(connect.session({ store: sessionStore }));

// app.use(cookieParser());
// app.use(cookieParser());
// console.log('session ' + connect.session);
// var sessionstore  = new connect.session.MemoryStore();
// app.use(connect.session({secret: '1234567890QWERTY', store: sessionstore }));
app.sessionstore = sessionStore;
app.cookieNew = cookieParser;
// console.log('session ' + connect.session);
// app.use(connect.session({secret: '1234567890QWERTY'}));
app.use(express.static(path.join(__dirname, 'public')));

// app.setSession();

app.use('/', routes);
// app.use('/entry', routes);




/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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