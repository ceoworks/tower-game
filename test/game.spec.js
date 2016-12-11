var should = require('should');
var game = require('../game');
var setups = require('./setups');

describe('when testing game', function () {
	before(function (done) {
		var self = this;
		game(setups.positive, function (result) {
			self.result = result;
			done();
		});
	});
	it('should win game at 5 turns', function () {
		should.equal(this.result.win, true);
		should.equal(this.result.turns, 5);
	});
	describe('with hard positive setup', function () {
		before(function (done) {
			var self = this;
			game(setups.hardPositive, function (result) {
				self.result = result;
				done();
			});
		});
		it('should win game at 4 turns', function () {
			should.equal(this.result.win, true);
			should.equal(this.result.turns, 4);
		});
	});
	describe('with random setup', function () {
		before(function (done) {
			var self = this;
			game(setups.random, function (result) {
				self.result = result;
				done();
			});
		});
		it('should complete game and return correct format', function () {
			should.exist(this.result.win);
			should.exist(this.result.turns);
		});
	});
	describe.only('with tricky setup', function () {
		before(function (done) {
			var self = this;
			game(setups.tricky, function (result) {
				self.result = result;
				done();
			});
		});
		it('should complete game and return correct format', function () {
			should.equal(this.result.win, true);
			should.equal(this.result.turns, 5);
		});
	});
});
