#! /usr/bin/env node

var _ = require('underscore');

var chalk = require('chalk');

var inquirer = require('inquirer');

var path = require('path');

var fs = require('fs');

var actions = require(__dirname + '/actions.js');

var package = require(path.resolve(__dirname, '../package.json'));

console.log(
	`\n` + chalk.gray(`  ===========================================`)
	+ `\n` + chalk.gray(`  `) + chalk.yellow.bold(`API Works`)
	+ `\n` + chalk.gray(`  `) + chalk.cyan.bold(package.description)
	+ `\n` + chalk.gray(`  `) + chalk.gray(package.repository.url)
	+ `\n` + chalk.gray(`  `) + chalk.gray(`Version ${package.version}`)
	+ `\n`
	+ `\n` + chalk.white(`  Crafted by HQ, 2017`)
	+ `\n` + chalk.white(`  Made in Knoxville, Tennessee`)
	+ `\n` + chalk.gray(`  twitter.com/_hq`)
	+ `\n` + chalk.gray(`  github.com/haseebnqureshi`)
	+ `\n` + chalk.gray(`  ===========================================`)
	+ `\n`
	+ `\n` + chalk.yellow.bold(`  Let's get started!`)
	+ `\n` + chalk.cyan.bold(`  Answer the prompts to get going in seconds.`)
	+ `\n`
);

var questions = [
	{ 
		name: "base",
		type: "list",
		message: chalk.yellow("Which base do you want to start with?"),
		choices: _.filter(fs.readdirSync(__dirname + '/bases'), function(filename) {
			return !filename.match(/^\./);
		}),
		filter: function(value) {
			return value.toLowerCase();
		}
	}
];

inquirer.prompt(questions).then((answers) => {

	console.log(
		  `\n` + chalk.gray(`| `)
		+ `\n` + chalk.gray(`| `) + chalk.yellow.bold(`Okay...`)
		+ `\n` + chalk.gray(`| `) + chalk.gray.bold(`Working on your new API...`)
		+ `\n` + chalk.gray(`| `)
	);

	actions.copyDir(`${__dirname}/bases/${answers.base}/*`, process.env.PWD);
	actions.npmInstall(process.env.PWD);

	console.log(
		  `\n` + chalk.gray(`| `)
		+ `\n` + chalk.gray(`| `) + chalk.green.bold(`Success!`)
		+ `\n` + chalk.gray(`| `) + chalk.green.bold(`npm start to get going!`)
		+ `\n` + chalk.gray(`| `) + chalk.gray.bold(`Thank you for using API Works!`)
		+ `\n` + chalk.gray(`| `)
		+ `\n`
	);

});