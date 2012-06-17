Pong.Score = function(svg, x, y) {
	this.score = 0;
	this.elem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	this.elem.setAttribute('x', x);
	this.elem.setAttribute('y', y);
	this.elem.textContent = this.score;
	svg.appendChild(this.elem);
};

Pong.Score.prototype = {
	increment: function() {
		this.score++;
		this.elem.textContent = this.score;
	},
	reset: function() {
		this.score = 0;
		this.elem.textContent = this.score;
	}
};

Pong.Scoreboard = function(svg) {
	this.p1 = new Pong.Score(svg, 310, 30);
	this.p2 = new Pong.Score(svg, 370, 30);
}

Pong.Scoreboard.prototype = {
	reset: function() {
		this.p1.reset();
		this.p2.reset();
	}
};

