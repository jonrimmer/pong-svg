var Key = function() {
	var _pressed = {};
	var result = {
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		W: 87,
		S: 83,
		D: 68,

		isDown: function(keyCode) {
			return _pressed[keyCode];
		},

		onKeydown: function(e) {
			_pressed[e.keyCode] = true;
			e.preventDefault();
		},

		onKeyup: function(e) {
			delete _pressed[e.keyCode];
			e.preventDefault();
		}
	}

	result.isDown = result.isDown.bind(result);
	result.onKeydown = result.onKeydown.bind(result);
	result.onKeyup = result.onKeyup.bind(result);

	window.addEventListener('keydown', result.onKeydown);
	window.addEventListener('keyup', result.onKeyup);

	return result;
}();