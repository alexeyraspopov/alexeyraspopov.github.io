/* global describe, it, expect */
'use strict';
var slugify = require('./index');

describe('slugify', function(){
	it('should convert spaces to dash', function(){
		var actual = slugify('hello world'),
			expected = 'hello-world';

		expect(actual).toBe(expected);
	});

	it('should convert more than one space to dash', function(){
		var actual = slugify('hello world    again'),
			expected = 'hello-world-again';

		expect(actual).toBe(expected);
	});

	it('should trim string', function(){
		var actual = slugify(' hello world     '),
			expected = 'hello-world';

		expect(actual).toBe(expected);
	});

	it('should convert to lower case', function(){
		var actual = slugify('Hello World'),
			expected = 'hello-world';

		expect(actual).toBe(expected);
	});

	it('should convert camelcase (by option)', function(){
		var actual = slugify('helloWorldCamelCase', { camelCase: true }),
			expected = 'hello-world-camel-case';

		expect(actual).toBe(expected);
	});

	it('should remove signs', function(){
		var actual = slugify('hello, world. this is demo string!', { remove: './\\()\"\'-:,.;<>~!@#$%^&*|+=[]{}`~?' }),
			expected = 'hello-world-this-is-demo-string';

		expect(actual).toBe(expected);
	});
});
