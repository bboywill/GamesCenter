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
};

cassebrik.Wall.prototype = {
	reset : function() {
		for (var i = 0; i < this.numberOfLines; i++) {
			this.bricks[i] = new Array(this.bricksPerLine);
			for (var j = 0; j < this.bricksPerLine; j++) {
				this.bricks[i][j] = 1;
			}
		}
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

cassebrik.Bar = function(x, y, width, height, move, color) {
	this.x = x;
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
	},
	rightMove : function() {
		this.x += this.move;
	}
};

cassebrik.Game = function(ctx, wall, bar, width, height, interval) {
	this.context = ctx;
	this.wall = wall;
	this.bar = bar;
	this.width = width;
	this.height = height;
	this.interval = interval;
	this.timer = null;
};

cassebrik.Game.prototype = {
	launch : function() {
		this.wall.reset();
		var game = this;
		this.timer = setInterval(function() {
			game.refresh();
		}, this.interval);
	},
	refresh : function() {
		this.context.save();
		this.context.setTransform(1, 0, 0, 1, 0, 0);
		this.context.clearRect(0, 0, game.width, game.height);
		this.context.restore();
		this.wall.show(this.context);
		this.bar.show(this.context);
	},
	end : function() {
		if(this.timer != null) {
			clearInterval(this.timer);
		}
	},
	execute : function(action) {
		if(!(typeof this.actions[action] === 'undefined')) {
			this.actions[action]();
		}
	},
	actions : {
		"left_movement": function() {
			if ((this.bar.x - this.bar.move) >= 0) {
				this.bar.leftMove();
				return true;
			}
			return false;
		},
		"right_movement": function() {
			if ((this.bar.x + this.bar.move + this.bar.width) <= this.width) {
				this.bar.rightMove();
				return true;
			}
			return false;
		},
		"konami_code": function() {
			alert("konami code executed");
		}
	}
};