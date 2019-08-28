/**
 * Module dependencies
 */
const express = require('express'); // Web server
const path = require('path'); // System path generating
const createError = require('http-errors'); // HTTP error pages

let app = express();

/**
 * View engine
 */
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

/**
 * Robots.txt
 * Allow robots access to all pages
 */
app.use('/robots.txt', function (req, res, next) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow:");
});

/**
 * Routing
 */

let indexRouter = require('../routes/index');
app.use('/', indexRouter);

/**
 * Error handling
 */
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;