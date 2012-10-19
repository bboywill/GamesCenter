this.cassebrik = this.cassebrik || {};

cassebrik.Wall = function(numberOfLines, bricksPerLine, width, height, space, colors) {
	this.numberOfLines = numberOfLines;
	this.bricksPerLine = bricksPerLine;
	this.brick = new Object();
	this.brick.width = width;
	this.brick.height = height;
	this.brick.space = space;
	this.colors = colors;
	this.bricks = new Array(numberOfLines);
	this.empty = true;
};

cassebrik.Wall.prototype = {
	reset : function() {
		for (var i = 0; i < this.numberOfLines; i++) {
			this.bricks[i] = new Array(this.bricksPerLine);
			for (var j = 0; j < this.bricksPerLine; j++) {
				this.bricks[i][j] = 1;
			}
		}
		this.empty = false;
	},
	show : function(ctx) {
		var width = this.brick.width;
		var height = this.brick.height;
		var space = this.brick.space;
		for (var i = 0; i < this.numberOfLines; i++) {
			ctx.fillStyle = this.colors[i];
			for (var j = 0; j < this.bricksPerLine; j++) {
				if(this.bricks[i][j] == 1) {
					ctx.fillRect((j * (width + space)), (i * (height + space)), width, height);
				}
			}
		}
	}
};