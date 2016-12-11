var chance = require('chance');
var _ = require('lodash');

module.exports = (function game(setup) {
	var turns = 0;
	var completed = false;
	var fireRange = setup.fireRange;
	var enemies = setup.enemies;
	var killed;
	while (completed === false) {
		turns++;
		enemies = _.orderBy(enemies, ['distance', 'speed'], ['asc', 'desc']);
		if (enemies[0].distance <= fireRange) {
			killed = enemies.shift();
			// log killed enemy info
			console.log('Killed:', killed);
		}
		if (enemies.length === 0) {
			return completed = true;
		} else {
			var min = 1;
			enemies = enemies.map(function (enemy) {
				enemy.distance -= enemy.speed;
				min = Math.min(min, enemy.distance);
				return enemy;
			});
			console.log('Enemies:', enemies);
			if (min <= 0) {
				// lose
				console.log('Loose:', enemies);
				return completed = true;
			}
		}
	}
})({fireRange: 50, enemies: [{distance: 100, speed: 20}, {distance: 30, speed: 10}, {distance: 40, speed: 20}, {distance: 220, speed: 60}]});


