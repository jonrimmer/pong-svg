Pong = function() {

}

Pong.Arena = function(width, height) {
	this.width = width;
	this.height = height;
}

Pong.prototype = {
	initialise: function() {
		this.svg = document.getElementById('game');

		this.arena = new Pong.Arena(700, 500);
		this.scoreboard = new Pong.Scoreboard(this.svg);
		this.leftBat = new Pong.Bat(this.arena, 10, document.getElementById('bat1'), Key.W, Key.S, Key.D),
	    this.rightBat = new Pong.Bat(this.arena, 680, document.getElementById('bat2'), Key.UP, Key.DOWN, Key.LEFT);

		this.ball = new Pong.Ball(document.getElementById('ball'), this.arena, this.scoreboard, this.leftBat, this.rightBat)
		this.ball.following = this.leftBat;

		Pong.Sounds.add('BatHit', document.getElementById('batHit'));

		this.startTimer();
	},
	startTimer: function() {
		var tOld = Date.now();
		var self = this;

		window.requestAnimationFrame(function tick(tNew) {
			window.requestAnimationFrame(tick);

			var delta = tNew - tOld;
			tOld = tNew;

			self.update(delta);
		})
	},
	update: function(delta) {
		this.leftBat.update(delta);
		this.rightBat.update(delta);
		this.ball.update(delta);
		
		var handle = this.svg.suspendRedraw(5000);

		this.ball.draw();
		this.leftBat.draw();
		this.rightBat.draw();

		this.svg.unsuspendRedraw(handle);
		this.svg.forceRedraw();
	}
}