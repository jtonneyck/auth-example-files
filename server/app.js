const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const mongoose = require('mongoose');
const cors = require('cors');

mongoose
  .connect('mongodb://localhost:27017/auth-example', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('connected!');
  })
  .catch(err => {
    console.log(err);
  });

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

/*
  Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional 
  HTTP headers to tell browsers to give a web application running 
  at one origin, access to selected resources from a different origin. 
  A web application executes a cross-origin HTTP request when it requests a 
  resource that has a different origin (domain, protocol, or port) from its own.
  In this case the different resource will be our react app.
*/
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const authRouter = require('./routes/authRoutes');
app.use('/api/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // sedm the error
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
