#!/usr/bin/env node
var slugify = require('./index'),
	clify = require('clify'),
	multiline = require('multiline');

clify(slugify, {
	version: require('./package').version,
	help: multiline.stripIndent(function(){/*
		Usage:
		  $ slugify <string>

		Example:
		  $ slugify 'Hello world'
		  hello-world
	*/})
}, function(args){
	return [args[2]];
});
