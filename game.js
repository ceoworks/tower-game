function nextTurn(done) {
	var self = this;
	this.turns++;
	this.enemies = this.enemies.sort(function (a, b) {
		return (a.distance - a.speed) - (b.distance - b.speed);
	});
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
	return setInterval(nextTurn.bind(setup, done), step);
};


