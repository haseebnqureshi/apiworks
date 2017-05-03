'use strict';

var https = require('https');

var fs = require('fs');

module.exports = function(app, express, log) {

	var port = process.env.EXPRESS_PORT || 3000;
	
	var startNormally = function() {
		
		log('yellow', 'Attempting to load application over http...');

		return app.listen(port, function() {

			log('green', '...Loaded application over port ' + port + '!');

		});
	
	};

	if (process.env.HTTPS_ENABLED !== 'yes') { return startNormally(); }

	log('yellow', 'Attempting to load application over https...');

	try {

		var key = fs.readFileSync(process.env.HTTPS_SSL_KEY_FILEPATH || '');

		var cert = fs.readFileSync(process.env.HTTPS_SSL_CERT_FILEPATH || '');

		//run our https server
		https.createServer({ key: key, cert: cert }, app).listen(port, function() {

			log('green', '...Loaded application over https!');

		});

		//see if we want to redirect any port 80 requests over to 443...
		if (process.env.HTTPS_FORCED_URL) {

			log('yellow', 'Starting redirect microservice on port 80...');

			var redirect = express();

			redirect.get('*', function(req, res) {

				return res.redirect(process.env.HTTPS_FORCED_URL);

				log('green', '...Loaded redirect microservice!');

			});

			redirect.listen(80);

		}

	}

	catch(err) {

		log('red', '...' + err.toString());

		//for whatever reason if our ssl server tanks, start normally...
		return startNormally();

	}

};
