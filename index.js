'use strict';

var Big = require('big.js');

// ***** Floating Point Math *****
// http://mikemcl.github.io/big.js/
Big.DP = 2; //http://mikemcl.github.io/big.js/#dp
Big.RM = 1; //http://mikemcl.github.io/big.js/#rm

exports.computeBad = function(percentOfTime, currentPlanPrice, newPlanPrice){

	var credit, debit, prorated;

	credit = percentOfTime * currentPlanPrice;
	debit = percentOfTime * newPlanPrice;
	prorated = debit - credit;

	return prorated;
};

exports.computeGood = function(percentOfTime, currentPlanPrice, newPlanPrice){

	var credit, debit, prorated;

	credit = new Big(currentPlanPrice);
	debit = new Big(newPlanPrice);

	//calculate
	credit = credit.times(percentOfTime);
	debit = debit.times(percentOfTime);
	prorated = debit.sub(credit);

	return prorated * 1; //convert from Big Number to primitive JS number
};

exports.test = function(){
	var p = 0.5;
	var p1 = 1.00;
	var p2 = 2.00;
	var prorated = exports.computeGood(p, p1, p2);
	console.log('prorated', prorated);
};