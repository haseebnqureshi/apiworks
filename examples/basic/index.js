'use strict';

require('../..')(__dirname, {
	folders: {
		db: 'db',
		models: 'models',
		routes: 'routes',
		static: 'static',
		routeParamPrefix: '-'
	},
	files: {
		get: '__get.js',
		post: '__post.js',
		put: '__put.js',
		delete: '__delete.js',
		middleware: '_middleware.js',
		render: 'render.pug'
	}
});
