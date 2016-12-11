var _ = require('lodash');

function nextTurn(done) {
	console.log('THIS:', this);
	this.turns++;
	this.enemies = _.orderBy(this.enemies, ['distance', 'speed'], ['asc', 'desc']);
	if (this.enemies[0].distance <= this.fireRange) {
		console.log('Killed:', this.enemies.shift());
	}
	if (this.enemies.length === 0) {
		console.log('Won at turn ', this.turns);
		return done(null, {win: true, turns: this.turns});
	} else {
		var min = 1;
		this.enemies = this.enemies.map(function (enemy) {
			enemy.distance -= enemy.speed;
			min = Math.min(min, enemy.distance);
			return enemy;
		});
		if (min <= 0) {
			console.log('Loose:', this.enemies);
			return done(null, {win: false, turns: this.turns});
		}
	}
}

module.exports = function game(setup, done) {
	setup.turns = 0;
	var step = 1;
	setInterval(nextTurn.bind(setup, done), step);
};


