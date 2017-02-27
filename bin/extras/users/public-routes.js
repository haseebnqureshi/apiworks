
var account = require(__dirname + '/account.js');

module.exports = function(model, app, express, models) {

	//there may be multiple spots where we trigger a re-confirm email situation
	var pleaseConfirmEmail = function(user) {

		//for security, we want to generate a new access token
		var accessToken = account.generateHash();

		//and save it to our user
		model.updateWhere({ id: user.id }, { accessToken });

		//update our user with our new access token
		user.accessToken = accessToken;

		//send our confirmation email
		if (models.emails) {
			models.emails.send({
				to: user.email,
				template: 'confirmEmail',
				data: { user }
			});
		}

		//and return out
		var status = 200;
		var err = null;
		var message = 'Hold on! We need you to first confirm your email address. Please check your email.';
		var data = account.omitSensitive(user);
		return { status, err, message, data };
	};


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

		//saving our email
		req.body.email = req.body.email;

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

	app.get('/confirm/user/:access_token', function(req, res, next) {
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

			//creating new password
			var password = account.newPassword();
			var hashedPassword = account.hashPassword(password);

			//making updates to our user
			var updates = { emailVerified: true, password: hashedPassword };
			model.updateWhere({ id:user.id }, updates);

			//setting our data object for our appropriate responses
			data = account.omitSensitive(user);
			data.password = password;

			/*
			We send an email to our user, confirming the validation
			and sending a temp password.
			*/

			if (models.emails) {
				models.emails.send({
					to: user.email,
					template: 'emailConfirmed',
					data: { user: data }
				});
			}

			//returning our new password and confirmation
			status = 200;
			err = null;
			message = `Thank you! We have now confirmed that email address! Your temporary password is "${password}". Please use this password to log in. Thank you.`;
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

		/*
		Now pulling out user info - we don't use our password
		in case our user needs to verify his email account. For 
		clarity, no password is generated until an email address
		has been verified.
		*/

		var userByEmail = model.findWhere({ email });
		var userByUsername = model.findWhere({ username });

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
			var payload = pleaseConfirmEmail(user);
			return res.status(200).send(payload);
		}

		//othwerwise, we ENSURE that our password matches with what's on file
		var password = account.hashPassword(req.body.password);
		var userWithPassword = model.findWhere({ id: user.id, password });

		//handling a failed password match
		if (!userWithPassword) {
			status = 400;
			err = 'Sorry! That is not the correct password.';
			message = null;
			data = null;
			return res.status(status).send({ status, err, message, data });
		}

		/*
		Finally, we have verified our user is our user. Let's
		regenerate our user token for a fresh accessToken.
		*/

		var user = userWithPassword;
		var accessToken = account.generateHash();

		//let's save our user's new access token
		model.updateWhere({ id: user.id }, { accessToken });

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
		var message = null;
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
			var payload = pleaseConfirmEmail(user);
			return res.status(200).send(payload);
		}

		//at this point, we send an email with a password reset link
		if (models.emails) {
			models.emails.send({
				to: user.email,
				template: 'passwordReset',
				data: { user }
			});
		}	

		//and let's set our payload for a successful return back
		status = 200;
		err = null;
		message = 'A password reset link has been sent to your email on file. Hope that helps!';
		data = null;
		return res.status(status).send({ status, err, message, data });

	});


	/*
	User Reset Password
	*/

	app.get('/reset/user/:access_token', function(req, res, next) {
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

		//otherwise, we regenerate our password 
		var password = account.newPassword();
		var updates = {};
		updates.password = account.hashPassword(password);

		//we update our user with our new password
		model.updateWhere({ id: user.id }, updates);

		//we email our user, notifying them that their password has been changed
		if (models.emails) {
			models.emails.send({
				to: user.email,
				template: 'changedPassword',
				data: { user }
			});
		}

		//and we return our new password
		status = 200;
		err = null;
		message = `Your password has been reset to "${password}". Please use this password to log back in. Thank you.`;
		data = account.omitSensitive(user);
		data.password = password;
		return res.status(status).send({ status, err, message, data });

	});

	return app;

};
