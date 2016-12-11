var chance = require('chance');
var should = require('should');
var game = require('../game');
describe('when testing game', function () {
	var positiveSetup = {
		fireRange: 50,
		enemies: [
			{distance: 100, speed: 20},
			{distance: 30, speed: 10},
			{distance: 40, speed: 20},
			{distance: 220, speed: 60}
		]
	};
	before(function (done) {
		var self = this;
		game(positiveSetup, function (err, result) {
			self.result = result;
			done();
		});
	});
	it('should win game at 5 turns', function () {
		should.equal(this.result.win, true);
		should.equal(this.result.turns, 5);
	});

});
