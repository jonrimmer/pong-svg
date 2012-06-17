Pong.Rect = function(left, right, top, bottom) {
	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;
}

Pong.Rect.prototype = {
	intersect: function(r) {
		return !(
			this.left > r.right ||
			this.right < r.left ||
			this.top > r.bottom ||
			this.bottom < r.top
		); 
	}
};