'use strict';

// config
process.env.API_PORT = 3000;

// deps
var express = require('express');
var app = express();
var setup = require(__dirname + '/setup');
var items = require(__dirname + '/items');

// models
var models = {
	items: items.model()
};

// middleware
app = setup.middlewares(app, express);
app = items.middlewares(app, express);

// routes
app = items.routes(app, express);

// start server
app.listen(process.env.API_PORT, function() {
	console.log(`API running on port ${process.env.API_PORT}`);
});
