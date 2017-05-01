'use strict';

require('../..')({
	dirname: __dirname,
	dotenv: '/.env',
	folders: {
		db: '/db',
		models: '/models',
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
		},
		options: {
			routeParamPrefix: '-'
		}
	},
});
