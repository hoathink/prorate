'use strict';

var Big = require('big.js');
var Assert = require('assert');
var isNumber = require('lodash.isnumber');
var isDate = require('lodash.isdate');
var isUndefined = require('lodash.isundefined');

// ***** Floating Point Math *****
// http://mikemcl.github.io/big.js/
Big.DP = 20; //http://mikemcl.github.io/big.js/#dp
Big.RM = 1; //http://mikemcl.github.io/big.js/#rm

exports.amount = function(percentOfTime, planPrice){

	var amount, str;

	//validate
	Assert.ok(isNumber(percentOfTime), 'param `percentOfTime` must be a number.');
	Assert.ok(percentOfTime >= 0, 'param `percentOfTime` must between 0 and 1.');
	Assert.ok(percentOfTime <= 1, 'param `percentOfTime` must between 0 and 1.');

	Assert.ok(isNumber(planPrice), 'param `planPrice` must be a number.');
	Assert.ok(planPrice >= 0, 'param `planPrice` must be zero or greater.');

	//calculate
	amount = new Big(1);
	amount = amount.sub(percentOfTime);
	amount = amount.times(planPrice);

	str = amount.toFixed(2);

	return 1 * str;
};

exports.change = function(percentOfTime, currentPlanPrice, newPlanPrice){

	var credit, debit, prorated, str;

	//validate
	Assert.ok(isNumber(percentOfTime), 'param `percentOfTime` must be a number.');
	Assert.ok(percentOfTime >= 0, 'param `percentOfTime` must between 0 and 1.');
	Assert.ok(percentOfTime <= 1, 'param `percentOfTime` must between 0 and 1.');

	Assert.ok(isNumber(currentPlanPrice), 'param `currentPlanPrice` must be a number.');
	Assert.ok(currentPlanPrice >= 0, 'param `currentPlanPrice` must be zero or greater.');

	Assert.ok(isNumber(newPlanPrice), 'param `newPlanPrice` must be a number.');
	Assert.ok(newPlanPrice >= 0, 'param `newPlanPrice` must be zero or greater.');

	//setup
	credit = new Big(currentPlanPrice);
	debit = new Big(newPlanPrice);

	//calculate
	credit = credit.times(percentOfTime);
	debit = debit.times(percentOfTime);
	prorated = debit.sub(credit);
	str = prorated.toFixed(2);

	return 1 * str;
};

exports.monthPercentage = function(now){

	//validate
	Assert.ok(isDate(now) || isUndefined(now), 'param `now` must be a date or undefined.');

	now = (now)? now : new Date();
	var year = now.getFullYear();
	var month = now.getMonth();
	var date1 = new Date(year, month, 1, 0, 0 ,0);
	var date2 = new Date(year, month + 1, 0, 23, 59, 59);
	var percent = exports._percent(now, date1, date2);

	return percent;
};

exports._percent = function(now, date1, date2){
	var tsNow = now.getTime();
	var ts1 = date1.getTime();
	var ts2 = date2.getTime();

	//calculate
	var pct = new Big(tsNow - ts1);
	pct = pct.div(ts2 - ts1);
	return pct * 1; //convert from Big Number to primitive JS number
};
