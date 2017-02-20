#! /usr/bin/env node

var _ = require('underscore');

var chalk = require('chalk');

var inquirer = require('inquirer');

var actions = require(__dirname + '/bin/actions.js');

console.log(
	  `\n` + chalk.gray(`| `) + chalk.yellow.bold(`API WORKS`)
	+ `\n` + chalk.gray(`| `) + chalk.cyan.bold(`REPL for powerfully easy RESTful API's`)
	+ `\n` + chalk.gray(`| `) + chalk.gray(`Version 0.1.0`)
	+ `\n` + chalk.gray(`| `)
	+ `\n` + chalk.gray(`| `) + chalk.white(`crafted by hq (2017)`)
	+ `\n` + chalk.gray(`| `) + chalk.gray(`twitter.com/_hq, github.com/haseebnqureshi`)
	+ `\n` + chalk.gray(`| `) + chalk.gray(`made in knoxville, tennessee`)
	+ `\n` + chalk.gray(`| `)
	+ `\n` + chalk.gray(`| `) + `Let's get started!`
	+ `\n` + chalk.gray(`| `) + chalk.gray(`Answer the prompts and in seconds, you'll be up and running.`)
	+ `\n`
);

var questions = [
	{ 
		name: "base",
		type: "list",
		message: chalk.yellow("What API base do you want to start with?"),
		choices: [ 'default' ],
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

	actions.copyDir(`cp -r ${__dirname}/bases/${answers.base} ${process.env.PWD}`);

	console.log(
		  `\n` + chalk.gray(`| `)
		+ `\n` + chalk.gray(`| `) + chalk.green.bold(`Success! Scaffolded your new API!`)
		+ `\n` + chalk.gray(`| `) + chalk.gray.bold(`Thank you for using API WORKS!`)
		+ `\n` + chalk.gray(`| `)
		+ `\n`
	);

});