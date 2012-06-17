Pong.Sounds = {
	_sounds: {},
	add: function(name, elem) {
		this._sounds[name] = elem;
	},
	play: function(name) {
		if (this._sounds[name]) {
			this._sounds[name].play();
		}
	}
}