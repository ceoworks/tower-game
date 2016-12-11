var chance = new require('chance')();
var chanceOpts = {min: 0, max: 500};

module.exports.positive = {
	fireRange: 50,
	enemies: [
		{distance: 100, speed: 20},
		{distance: 30, speed: 10},
		{distance: 40, speed: 20},
		{distance: 50, speed: 50},
		{distance: 220, speed: 60}
	]
};
module.exports.negative = {
	fireRange: 50,
	enemies: [
		{distance: 100, speed: 50},
		{distance: 30, speed: 10},
		{distance: 40, speed: 20},
		{distance: 220, speed: 60}
	]
};
module.exports.random = {
	fireRange: chance.integer(chanceOpts),
	enemies: [
		{distance: chance.integer(chanceOpts), speed: chance.integer(chanceOpts)},
		{distance: chance.integer(chanceOpts), speed: chance.integer(chanceOpts)},
		{distance: chance.integer(chanceOpts), speed: chance.integer(chanceOpts)},
		{distance: chance.integer(chanceOpts), speed: chance.integer(chanceOpts)}
	]
};
