this.cassebrik = this.cassebrik || {};

cassebrik.Bar = function(x, y, width, height, move, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.move = move;
};

cassebrik.Bar.prototype = { 
	show : function(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	},
	leftMove : function() {
		this.x -= this.move;
		if ((this.x - this.move) < 0) {
			this.x = 0;
			return false;
		}
		return true;
	},
	rightMove : function(game) {
		this.x += this.move;
		if ((this.x + this.move + this.width) > game.width) {
			this.x = game.width - this.width;
			return false;
		}
		return true;
	}
};