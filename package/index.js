'use strict';

var utils = require('./utils');

var log = utils.log;

/* CONFIG */

log('yellow', 'loading config via dotenv...');

require('dotenv').config();

log('green', '...done!');


/* APIWORKS ENGINE */

log('yellow', 'loading apiworks engine...');

var _ = require('underscore');

var express = require('express');

var read = require('fs-readdir-recursive');

var bodyParser = require('body-parser');

var pug = require('pug');

var app = express();

log('green', '...done!');


/* INSTANTIATING API */

log('yellow', 'instantiating application...');

log('green', '...done!');


/* STARTING API */

log('yellow', 'starting application on port ' + (process.env.EXPRESS_PORT || 3000) + '...');

app.listen(process.env.EXPRESS_PORT || 3000, function() {

	log('green', `...done!`);

});

