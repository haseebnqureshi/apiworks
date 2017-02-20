'use strict';

// config
process.env.API_PORT = 3000;

// deps
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {

	// allow cors
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// routes
app.get('/', function(req, res, next) {
	var message = 'Welcome!';
	res.status(200).send({ message });
});

// start server
app.listen(process.env.API_PORT, function() {
	console.log(`API running on port ${process.env.API_PORT}`);
});
