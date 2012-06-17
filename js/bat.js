Pong.Bat = function(arena, xPos, element, upKey, downKey, launchKey) {
	this.arena = arena;
	this.x = xPos;
	this.height = 50;
	this.width = 10;
	this.y = (this.arena.height / 2) - (this.height / 2);
	this.vy = 4 / (1000 / 60);
	this.elem = element;
	this.downKey = downKey;
	this.upKey = upKey;
	this.launchKey = launchKey;
};

Pong.Bat.prototype = {
	launch: function() {},
	update: function(dt) {
		this.dy = 0;

		if (Key.isDown(this.launchKey)) {
			this.launch();
		}

		if (Key.isDown(this.downKey)) {
			if (Key.isDown(this.upKey)) {
				return;
			}

			this.dy = this.vy * dt;
			this.y += this.dy;

			if (this.y > this.arena.height - this.height) {
				this.y = this.arena.height - this.height;
			}

			return;
		}
		
		if (Key.isDown(this.upKey)) {
			if (Key.isDown(this.downKey)) {
				return;
			}

			this.dy = this.vy * dt;
			this.y -= this.dy;

			if (this.y < 0) {
				this.y = 0;
			}

			return;
		}
	},
	draw: function() {
		this.elem.x.baseVal.value = this.x;
		this.elem.y.baseVal.value = this.y;
	},
	reset: function() {
		this.y = (arena.height / 2) - (this.height / 2);
	},
	getRect: function() {
		return new Pong.Rect(this.x, this.x + this.width, this.y, this.y + this.height);
	}
};