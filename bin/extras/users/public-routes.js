
var account = require(__dirname + '/account.js');

module.exports = function(model, app, express, models) {

	/*
	User Registration
	*/

	app.post('/register/user', function(req, res, next) {
		var status;
		var err = null;
		var data = {};

		//setting our primary key to emails, so emails will be unique
		var id = req.body.id = req.body.email;

		//making sure we don't already have that email
		var user = model.findWhere({ id });

		//email wasn't unique, so we tell the client to try again
		if (user) {	
			status = 400;
			err = 'Whoops, that email is taken. Try another.';
			data = null;
			return res.status(status).send({ status, err, data });
		}

		//generating our new password and saving our email
		var password = account.newPassword();
		req.body.email = req.body.email;
		req.body.password = account.hashPassword(password);

		//creating our new user object
		model.create(req.body);
		status = 200;
		data = password;
		return res.status(status).send({ status, err, data });

	});


	/*
	User Login
	*/

	app.post('/login/user', function(req, res, next) {
		var status;
		var err = null;
		var data = {};

		//get our where parameters from req
		var id = req.body.email;
		var password = account.hashPassword(req.body.password);

		//find our user object by email and password
		var user = model.findWhere({ id, password });

		//handle a failed user lookup
		if (!user) { 
			status = 404;
			err = 'Couldn\'t find that user.';
			data = null;
			return res.status(status).send({ status, err, data });
		}

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

		//get our where parameters from req
		var id = req.body.email;

		//find our user object by email 
		var user = model.findWhere({ id });

		//handle a failed user lookup
		if (!user) {
			status = 404;
			err = 'Couldn\'t find that user.';
			data = null;
			return res.status(status).send({ status, err, data });
		}

		/*
		right now, we just generate a new password and return that back in our payload.
		but we'll eventually send an optional link via email, allowing the correct user
		to indeed trigger the password reset.
		*/

		var password = account.newPassword();
		var updates = {};
		updates.password = account.hashPassword(password);

		//making our update
		model.updateWhere({ id }, updates);
		status = 200;
		data = { password };

		console.log(data);		

		return res.status(status).send({ status, err, data });

	});


	return app;

};
