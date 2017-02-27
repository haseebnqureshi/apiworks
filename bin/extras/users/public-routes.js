
var account = require(__dirname + '/account.js');

module.exports = function(model, app, express, models) {

	/*
	User Registration
	*/

	app.post('/register/user', function(req, res, next) {
		var status;
		var err = null;
		var data = {};

		//check whether we have an email and username
		var email = req.body.email || null;
		var username = req.body.username || null;

		//now pulling out user info
		var userByEmail = model.findWhere({ email });
		var userByUsername = model.findWhere({ username });

		//if we've found any user, we tell the client to try again
		if (userByUsername || userByEmail) {	
			status = 400;

			data = null;
			var errUsername = 'Whoops, that username is taken. Try another.';
			var errEmail = 'Whoops, that email\'s already registered.';

			if (userByUsername) { err = errUsername; }
			if (userByEmail) { err = errEmail; }

			return res.status(status).send({ status, err, data });
		}

		//generating our new password and saving our email
		var password = account.newPassword();
		req.body.email = req.body.email;
		req.body.password = account.hashPassword(password);

		//also generating our access token and save to user object
		req.body.accessToken = account.generateHash();

		//setting our email verified to false
		req.body.emailVerified = false;

		//creating our new user object
		model.create(req.body);
		status = 200;

		//sending an email on registration
		if (models.emails) {
			var user = req.body;
			models.emails.send({
				to: user.email,
				template: 'confirmEmail',
				data: { user }
			});
		}

		return res.status(status).send({ status, err, data });

	});


	/*
	User Login
	*/

	app.post('/login/user', function(req, res, next) {
		var status;
		var err = null;
		var data = {};

		//check whether we have an email and username
		var email = req.body.email || null;
		var username = req.body.username || null;

		//get our password from req
		var password = account.hashPassword(req.body.password);

		//now pulling out user info
		var userByEmail = model.findWhere({ email, password });
		var userByUsername = model.findWhere({ username, password });

		//handle a failed user lookup
		if (!userByUsername && !userByEmail) { 
			status = 404;
			err = 'Couldn\'t find that user.';
			data = null;
			return res.status(status).send({ status, err, data });
		}

		//select our user's id
		var id;
		if (userByUsername) { id = userByUsername.id; }
		if (userByEmail) { id = userByEmail.id; }

		//now generate our access token and save to user object
		var accessToken = account.generateHash();
		model.updateWhere({ id, password }, { accessToken });

		//finally send back our access token
		var headerName = account.accessTokenHeaderName;
		var instructions = `For any user requests, please include header ${headerName} with value ${accessToken}`;
		
		status = 200;
		err = null;
		data = { accessToken, headerName, instructions };
		return res.status(status).send({ status, err, data });

	});


	/*
	User Forgot Password
	*/

	app.post('/forgot/user', function(req, res, next) {
		var status;
		var err = null;
		var data = {};

		//check whether we have an email and username
		var email = req.body.email || null;
		var username = req.body.username || null;

		//now pulling out user info
		var userByEmail = model.findWhere({ email });
		var userByUsername = model.findWhere({ username });

		//handle a failed user lookup
		if (!userByUsername && !userByEmail) {
			status = 404;
			err = 'Couldn\'t find that user.';
			data = null;
			return res.status(status).send({ status, err, data });
		}

		/*
		Right now, we just generate a new password and return that 
		back in our payload. But we'll eventually send an optional 
		link via email, allowing the correct user to indeed trigger 
		the password reset.
		*/

		var password = account.newPassword();
		var updates = {};
		updates.password = account.hashPassword(password);

		//select our user's id
		var id;
		if (userByUsername) { id = userByUsername.id; }
		if (userByEmail) { id = userByEmail.id; }

		//making our update
		model.updateWhere({ id }, updates);
		status = 200;
		data = { password };

		//getting our most recent user
		var user = model.findWhere({ id });

		//sending an email with new password
		if (models.emails) {
			user.password = password;
			models.emails.send({
				to: user.email,
				template: 'userForgotPassword',
				data: { user }
			});
		}	

		return res.status(status).send({ status, err, data });

	});


	return app;

};
