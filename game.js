var _ = require('lodash');

function nextTurn(done) {
	var self = this;
	this.turns++;
	this.enemies = _.sortBy(this.enemies, [sortByLowestTurnsToTower, 'distance']);
	this.impossible = this.isImpossible && this.isImpossible(this.enemies[0], this.enemies[1]);
	if (tryKillEnemy.call(this) !== true) {
		console.log('Turn %d: Pass, targets are out of range', this.turns);
	}
	if (this.enemies.length === 0) {
		console.log('You win in %d turns', this.turns);
		return done({win: true, turns: this.turns});
	} else {
		var min = 1;
		this.enemies = this.enemies.map(function (enemy) {
			enemy.distance -= enemy.speed;
			min = Math.min(min, enemy.distance);
			return enemy;
		});
		if (min <= 0) {
			console.log('You loose at %d turn', this.turns);
			return done({win: false, turns: this.turns, impossible: this.impossible});
		}
	}
}
function tryKillEnemy(index) {
	index = index || 0;
	if (this.enemies[index].distance <= this.fireRange) {
		this.killedEnemy = this.enemies.splice(index, 1).shift();
		console.log('Turn %d: Kill %s at %d', this.turns, 'Bot', this.killedEnemy.distance);
		return true;
	} else if (++index < this.enemies.length) {
		return tryKillEnemy.call(this, index);
	}
	return false;
}
function sortByLowestTurnsToTower(enemy) {
	return enemy.distance / enemy.speed;
}
function isImpossible(first, second) {
	return first && second && (first.distance - first.speed) <= 0 && (second.distance - second.speed) <= 0;
}

module.exports = function game(setup, done) {
	console.log('Firing range is %dm', setup.fireRange);
	var step = 1;
	var originalEnemies = JSON.parse(JSON.stringify(setup.enemies));
	setup.turns = 0;

	var interval = setInterval(nextTurn.bind(setup, function checkResult(result) {
		clearInterval(interval);
		if (result.win === true) {
			return done(result);
		}
		if (result.impossible === true) {
			result.message = 'Impossible to win the game, because 2+ enemies came to tower simultaneously';
			return done(result);
		}
		setup.isImpossible = isImpossible;
		setup.fireRange += 1;
		setup.turns = 0;
		setup.enemies = originalEnemies;
		return game(setup, done);
	}), step);
};


