var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var tweetRouter = require('./routes/tweet');
var stockRouter = require('./routes/stock');

var db = require('./config/db');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/tweet', tweetRouter);
app.use('/api/stock', stockRouter);

module.exports = app;