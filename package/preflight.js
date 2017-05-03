'use strict';

module.exports = function(settings, express, app, log) {

	if (process.env.CORS_PREFLIGHT_ENABLED !== false) {

		log('gray', '      Enabling preflight responses...');

		app.use(function(req, res, next) {

			if (req.method.toLowerCase() === 'options') {
		
				log('gray', 'Allowing preflight response of 200...');

				return res.status(200).send();
		
			}

			next();

		});

	}

	else {

		log('gray', '      Disabling preflight responses...');

	}

	return app;

};
