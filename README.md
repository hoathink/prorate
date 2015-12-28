# prorate

Compute billing subscription upgrades, downgrades and prorated amounts. Uses Big.js to ensure accuracy of calculations.

## Installation

```bash
npm install prorate --save
```

## Usage

When starting a subscription use the `amount` method to comute the amount to bill the user.

```javascript
var prorate = require('prorate');
var percent = prorate.monthPercentage(); //between 0 and 1
var planPrice = 1.00;
var amount = prorate.amount(percent, planPrie);
```

The usage for a subscription plan upgrade or downgrade is handled by the `change` method.

```javascript
var prorate = require('prorate');
var percent = prorate.monthPercentage(); //between 0 and 1
var planPrice1 = 1.00;
var planPrice2 = 2.00;
var amount = prorate.change(percent, planPrice1, planPrice2);
```

There is a convience method `monthPercentage` to aid in calculating the percentage of time.

```javascript
var prorate = require('prorate');

// using current time
var percentNow = prorate.monthPercentage();

// using a date
var date = new Date('December 17, 1995 03:24:00');
var percentDate = prorate.monthPercentage(date);

```

## Code Quality
```bash
npm install -g eslint
eslint .
```

## People

The current maintainer is [Dan Hollenbeck](https://github.com/dhollenbeck).

## LICENSE

MIT