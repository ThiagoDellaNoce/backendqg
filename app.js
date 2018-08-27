var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
const config = require('./config/db');

var userRoutes = require('./routes/userRoutes');
var projectRoutes = require('./routes/projectRoutes');
var comandaRoutes = require('./routes/comandaRoutes');
var registrosRoutes = require('./routes/registrosRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var whitelist = ['http://localhost:4200', 'https://frontendqg.herokuapp.com', 'http://frontendqg.herokuapp.com', 'http://www.qgsmokeclub.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/comanda', comandaRoutes);
app.use('/registro', registrosRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// configure mongoDB - database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/qgsmoke").then(
    () => {console.log('Banco de dados conectado com sucesso!') },
    err => { console.log('Não foi possivel conectar com o banco, erro: '+ err)}
);

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
