'use strict';
var assert = require('chai').assert; //http://chaijs.com/api/assert/
var Prorate = require('../index');

describe('Spec - features', function () {

	it('has expected base methods', function () {
		assert.typeOf(Prorate.amount, 'function');
		assert.typeOf(Prorate.change, 'function');
		//assert.typeOf(Prorate.final, 'function');
	});

	it('it computes percentage of month', function () {

		var expected = 0.5206991191379626;
		var date = new Date('December 17, 1995 03:24:00');
		var percentage = Prorate.monthPercentage(date);

		assert.equal(percentage, expected);
	});

	it('it computes percentage of month', function () {

		var expected = 0.5206991191379626;
		var date = new Date('December 17, 1995 03:24:00');
		var percentage = Prorate.monthPercentage(date);

		assert.equal(percentage, expected);
	});
});
