'use strict';
var assert = require('chai').assert; //http://chaijs.com/api/assert/
var Prorate = require('../index');

describe('Spec - features', function () {

	it('has expected base methods', function () {
		assert.typeOf(Prorate.signup, 'function');
		assert.typeOf(Prorate.change, 'function');
		assert.typeOf(Prorate.cancel, 'function');
	});

	it('computes percentage of month', function () {

		var expected = 0.5206991191379626;
		var date = new Date('December 17, 1995 03:24:00');
		var percent = Prorate.monthPercentage(date);

		assert.equal(percent, expected);
	});

	it('computes signup (charge)', function () {

		//var expected = 0.5206991191379626;
		var price = 100.00;
		var percent = 0.75;
		var expected = 25.00;
		var amount = Prorate.signup(percent, price);

		assert.equal(amount, expected);
	});

	it('computes upgrade (charge)', function () {

		var price1 = 50.00;
		var price2 = 100.00;
		var percent = 0.75;
		var expected = 37.5;
		var amount = Prorate.change(percent, price1, price2);

		assert.equal(amount, expected);
	});

	it('computes downgrade (refund)', function () {

		var price1 = 100.00;
		var price2 = 50.00;
		var percent = 0.75;
		var expected = -37.5;
		var amount = Prorate.change(percent, price1, price2);

		assert.equal(amount, expected);
	});

	it('computes cancel (refund)', function () {

		var price = 100.00;
		var percent = 0.75;
		var expected = -25.00;
		var amount = Prorate.cancel(percent, price);

		assert.equal(amount, expected);
	});

});
