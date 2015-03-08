Pong.Ball = function(elem, arena, scoreboard, leftBat, rightBat) {
	this.x = leftBat.x + leftBat.width + 10;
	this.y = 245;
	this.width = 10;
	this.height = 10;
	this.vx = 2 / (1000 / 60),
	this.vy = 2 / (1000 / 60),
	this.elem = elem;
	this.moving = true;
	this.following = null;
	this.arena = arena;
	this.leftBat = leftBat;
	this.rightBat = rightBat;
	this.scoreboard = scoreboard;

	var self = this;

	this.leftBat.launch = function() {
		if (self.following) {
			self.vy = self.leftBat.dy;
			self.vx = 2 / (1000 / 60);
			self.following = null;
		}
	};

	this.rightBat.launch = function() {
		if (self.following) {
			self.vy = self.rightBat.dy;
			self.vx = (2 / (1000 / 60)) * -1;
			self.following = null;
		}
	};
}


Pong.Ball.prototype = {
	update: function(dt) {
		if (this.following) {
			this.y = this.following.y + (this.following.height / 2) - (this.height / 2);
			return;
		}

		if (this.moving) {
			this.oldX = this.x;
			this.oldY = this.y;

			var dx = this.vx * dt,
			    dy = this.vy * dt;

			this.move(dx, dy);
		}
	},
	move: function(dx, dy) {
		var bat = dx< 0 ? this.leftBat : this.rightBat;

		var rBat = bat.getRect(),
		    rBall = this.getRect(),
		    rNew = new Pong.Rect(this.x + dx, this.x + dx + this.width, this.y + dy, this.y + dy + this.height);

		if (rBat.intersect(rNew)) {
			if (rBall.bottom < rBat.top || rBall.top > rBat.bottom) {
				this.vy *= -1;
			}
			else {
				var p = ((bat.y + (bat.height / 2)) - (this.y + (this.height / 2))) / (bat.height / 2) * 0.2;

				this.vy -= p;
			}

			this.vx *= -1.1;
			Pong.Sounds.play('BatHit');

			return;
		}

		if (rNew.bottom > this.arena.height || rNew.top < 0) {
			this.vy *= -1;
			return;
		}

		if (rNew.right < 0) {
			this.scoreboard.p2.increment();
			this.following = this.leftBat;
			this.x = this.leftBat.x + this.leftBat.width + 10;
			return;
		}

		if (rNew.left > this.arena.width) {
			this.scoreboard.p1.increment();
			this.following = this.rightBat;
			this.x = this.rightBat.x - (10 + this.width);
			return;
		}

		this.x += dx;
		this.y += dy;
	},
	draw: function() {
		this.elem.x.baseVal.value = this.x;
		this.elem.y.baseVal.value = this.y;
	},
	stop: function() {
		this.moving = false;
	},
	start: function() {
		this.moving = true;
	},
	getRect: function() {
		return new Pong.Rect(this.x, this.x + this.width, this.y, this.y + this.height);
	},
	reset: function() {
		this.x = 30;
		this.y = (this.arena.height / 2) - (this.height / 2)
	}
}