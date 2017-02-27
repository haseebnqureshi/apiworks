
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
	User Confirm Email
	*/

	app.get('/register/confirm/user/:access_token', function(req, res, next) {
		var status;
		var err = null;
		var data = {};
		var message = null;

		//attempting to find user by access token provided
		var accessToken = req.params.access_token;
		var user = model.findWhere({ accessToken });

		//if we couldn't find our user, we send back an unconfirmed message
		if (!user) {
			status = 404;
			data = null;
			err = 'Sorry, could not confirm any user with that link!';
			message = null;
			return res.status(status).send({ status, err, message, data });
		}

		//otherwise, check to see if we've already confirmed our user
		else if (user.emailVerified === true) {
			status = 200;
			data = account.omitSensitive(user);
			err = null;
			message = 'We have already confirmed that email address!';
			return res.status(status).send({ status, err, message, data });
		}

		//or, more typically, we've now confirmed and we update our user
		else {
			model.updateWhere({ id:user.id }, { emailVerified: true });
			status = 200;
			data = account.omitSensitive(user);
			err = null;
			message = 'Thank you! We have now confirmed that email address!';
			return res.status(status).send({ status, err, message, data });
		}

	});


	/*
	User Login
	*/

	app.post('/login/user', function(req, res, next) {
		var status;
		var err = null;
		var message = null;
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
			err = 'Sorry! Could not find that user.';
			message = null;
			data = null;
			return res.status(status).send({ status, err, message, data });
		}

		//getting our definitive user object
		var user = null;
		if (userByUsername) { user = userByUsername; }
		if (userByEmail) { user = userByEmail; }

		//checking to see whether the user's email has been confirmed
		if (!user.emailVerified) {

			//send our confirmation email
			if (models.emails) {
				models.emails.send({
					to: user.email,
					template: 'confirmEmail',
					data: { user }
				});
			}

			//and return out
			status = 200;
			err = null;
			message = 'Hold on! We need you to first confirm your email address. Please check your email.';
			data = account.omitSensitive(user);
			return res.status(200).send({ status, err, message, data });
		}

		//otherwise, if our email has been verified, we regenerate our access token
		var accessToken = account.generateHash();

		//and save our user's new access token
		model.updateWhere({ id: user.id, password }, { accessToken });

		//now we finally send back our access token with some instructions
		var headerName = account.accessTokenHeaderName;
		status = 200;
		err = null;
		message = `For any user requests, please include header ${headerName} with value ${accessToken}`;
		data = { accessToken, headerName, message };
		return res.status(status).send({ status, err, message, data });

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
