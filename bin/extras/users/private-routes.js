
var account = require(__dirname + '/account.js');

module.exports = function(model, app, express, models) {

	var router = express.Router();


	/*
	Ensures Authenticated Requests
	*/

	router.use(function(req, res, next) {

		var status;
		var err = null;
		var message = null;
		var data = {};

		//safely load our access token from headers
		var accessToken = req.headers[ account.accessTokenHeaderName.toLowerCase() ];

		//but return a forbidden if we can't find any valid access token header
		if (!accessToken) {
			status = 401;
			err = 'Could not find valid access token header on request';
			message = null;
			data = null;
			return res.status(status).send({ status, err, message, data });
		}

		//once we find an access token, we still have to authenticate it against our model
		var user = model.findWhere({ accessToken });

		//if we still couldn't come up with a user, let's throw 404
		if (!user) {
			status = 404;
			err = 'Could not find any users with that access token.';
			message = null;
			data = null;
			return res.status(status).send({ status, err, message, data });
		}

		//finally, we've decided to allow further requests. we save our user and keep the req going
		req.user = user;
		next();	

	});

	router.route('/')

		/*
		Get Auth'd User Information
		*/

		.get(function(req, res, next) {

			//at this point, we merely return our auth'd user info
			var status = 200;
			var err = null;
			var message = null;
			var data = account.omitSensitive(req.user);
			res.status(status).send({ status, err, message, data });
		})


		/*
		Update Auth'd User Information
		*/

		.put(function(req, res, next) {
			var status = 200;
			var err = null;
			var message = 'Saved your information.';
			var data = {};

			//checking to see if we have password in our payload
			if (req.body.password) {

				//if so, let's hash our password and set it to body
				req.body.password = account.hashPassword(req.body.password);

				//alert our user
				message += ' Also, your password was changed.';

				//since we're changing our password, we trigger an email
				if (models.emails) {
					models.emails.send({
						to: req.user.email,
						template: 'changedPassword',
						data: { user: req.user }
					});
				}
			}

			//making our update
			model.updateWhere({ id: req.user.id }, req.body);

			//returning our response
			return res.status(status).send({ status, err, message, data });

		});

	router.route('/logout')
		.get(function(req, res, next) {
			var status = 200;
			var err = null;
			var message = 'You are now logged out.';
			var data = {};

			//we change our access token
			var accessToken = account.generateHash();

			//save our user with the new access token
			model.updateWhere({ id: req.user.id }, { accessToken });

			//returning our response
			return res.status(status).send({ status, err, message, data });

		});


	app.use('/user', router);


	return app;

};
