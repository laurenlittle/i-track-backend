const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// db setup
const mongoDB = 'mongodb://i-track-admin:db-itrack18@ds151078.mlab.com:51078/i-track';
mongoose.connect(mongoDB); // default connection set up

mongoose.Promise = global.Promise; // use global promise library

const db = mongoose.connection; // get default connection
db.on('error', console.error.bind(console, 'MongoDB connection error:')); // Bind connection


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

//Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const usersRouter = require('./routes/users');
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
