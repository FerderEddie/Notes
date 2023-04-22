// default requires
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")

// router requires
var usersRouter = require('./routes/usersRouter');
var notesRouter = require('./routes/notesRouter');


var app = express();

// default app uses
app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app routers use
app.use('/users', usersRouter);
app.use('/notes' ,notesRouter);


module.exports = app;
