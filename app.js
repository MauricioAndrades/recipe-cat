var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
// var favicon = require('serve-favicon');
require('dotenv').load();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var ingredients = require('./routes/ingredients');
var app = express();

var hbs = exphbs.create({
	// Specify helpers which are only registered on this instance.
	helpers: {
		foo: function() {
			return 'FOO!';
		},
		bar: function() {
			return 'BAR!';
		}
	}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
	defaultLayout: 'handlebars'
}));
app.set('view engine', 'handlebars');
// uncomment after placing your favicon in /public

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function (req, res) {
//     res.render('index');
// });

app.use('/', routes);
// app.use('/users', users);
app.use('/ingredients', ingredients);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	res.send(err);
	// next(err);
});

// error handlers

if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
