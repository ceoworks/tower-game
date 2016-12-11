var should = require('should');
var game = require('../game');
var setups = require('./setups');

describe('when testing game', function () {
	before(function (done) {
		var self = this;
		this.interval = game(setups.positive, function (err, result) {
			self.result = result;
			clearInterval(self.interval);
			done();
		});
	});
	it('should win game at 5 turns', function () {
		should.equal(this.result.win, true);
		should.equal(this.result.turns, 5);
	});
	describe('with negative suite', function () {
		before(function (done) {
			var self = this;
			this.interval = game(setups.negative, function (err, result) {
				self.result = result;
				clearInterval(self.interval);
				done();
			});
		});
		it('should loose game at 3 turns', function () {
			should.equal(this.result.win, false);
			should.equal(this.result.turns, 2);
		});
	});
	describe('with random setup', function () {
		before(function (done) {
			var self = this;
			this.interval = game(setups.random, function (err, result) {
				self.result = result;
				clearInterval(self.interval);
				done();
			});
		});
		it('should complete game and return correct format', function () {
			should.exist(this.result.win);
			should.exist(this.result.turns);
		});
	});
});
