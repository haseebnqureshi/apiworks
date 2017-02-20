'use strict';

/*
bunch of helpers that go with creating, saving, and managing
various user accounts.
*/

var hash = require('hash.js');

var uuid = require('uuid/v1');

var _ = require('underscore');

var randomatic = require('randomatic');

module.exports = {

	accessTokenHeaderName: process.env.USERS_API_AUTH_HEADER,

	hashPassword: function(password) {
		return hash.sha256().update(password).digest('hex');
	},

	generateHash: function() {
		return uuid();
	},

	newPassword: function() {
		return randomatic('Aa0!', 10);
	},

	omitSensitive: function(keyValues) {

		//as precaution, we omit passwords and accessTokens
		return _.omit(keyValues, 'password', 'accessToken');
	}

};
