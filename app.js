const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const wLogger = require('./src/util/logger');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv').config()
const session = require('express-session');


const indexRouter = require('./src/routes/index');
const authRouter = require('./src/routes/auth.routes');
const moviesRouter = require('./src/routes/movies.routes');
const aboutRouter = require('./src/routes/about.routes');

const app = express();

app.use(session({
    secret: 'Agony',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/movies', moviesRouter);
app.use('/about', aboutRouter);
// app.use('/movies/:id', moviesRouter);
// app.use('/movies/create', moviesRouter);
// app.use('login')

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  wLogger.debug(`404 - Not Found - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  wLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
