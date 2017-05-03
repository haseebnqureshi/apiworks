'use strict';

/*
The following variables are expected in your .env file:
EXPRESS_PORT=8080
DB_DIALECT=nosql

The following variables might be expected:
PG_HOST=
PG_USER=
PG_PASSWORD=
PG_PORT=
PG_DATABASE=
HTTPS_ENABLED=
HTTPS_FORCED_URL=
HTTPS_SSL_KEY_FILEPATH=
HTTPS_SSL_CERT_FILEPATH=
*/

var settings = {
	dirname: __dirname,
	dotenv: '/.env',
	folders: {
		db: '/db',
		lib: '/lib',
		routes: '/routes',
		static: '/static'
	},
	routes: {
		files: {
			get: '/__get.js',
			post: '/__post.js',
			put: '/__put.js',
			delete: '/__delete.js',
			middleware: '/_middleware.js',
			render: '/render.pug'
		}
	}
};

require('apiworks')(settings);
