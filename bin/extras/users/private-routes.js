
var account = require(__dirname + '/account.js');

module.exports = function(model, app, express, models) {

	var router = express.Router();


	/*
	Ensures Authenticated Requests
	*/

	router.use(function(req, res, next) {

		var status;
		var err = null;
		var data = {};

		//safely load our access token from headers
		var accessToken = req.headers[ account.accessTokenHeaderName.toLowerCase() ];

		//but return a forbidden if we can't find any valid access token header
		if (!accessToken) {
			status = 401;
			err = 'Could not find valid access token header on request';
			data = null;
			return res.status(status).send({ status, err, data });
		}

		//once we find an access token, we still have to authenticate it against our model
		var user = model.findWhere({ accessToken });

		//if we still couldn't come up with a user, let's throw 404
		if (!user) {
			status = 404;
			err = 'Could not find any users with that access token.';
			data = null;
			return res.status(status).send({ status, err, data });
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
			var data = account.omitSensitive(req.user);
			res.status(status).send({ status, err, data });
		})


		/*
		Update Auth'd User Information
		*/

		.put(function(req, res, next) {

			//getting query from our auth'd user
			var where = { id: req.user.id };

			//making our update
			model.updateWhere(where, req.body);
			var status = 200;
			var err = null;
			var data = {};
			return res.status(status).send({ status, err, data });

		});


	app.use('/user', router);


	return app;

};
