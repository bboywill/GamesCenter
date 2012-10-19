this.cassebrik = this.cassebrik || {};

cassebrik.Ball = function(x, y, radius, color, speed, moveX, moveY) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.speed = speed;
	this.moveX = moveX;
	this.moveY = moveY;
};

cassebrik.Ball.prototype = { 
	show : function(ctx) {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	},
	refresh : function(game) {
		var posX = this.x + this.moveX * this.speed;
		var posY = this.y + this.moveY * this.speed;
		var brickWidth = game.wall.brick.space + game.wall.brick.width;
		var brickHeight = game.wall.brick.space + game.wall.brick.height;
		var wallZoneY = brickHeight * game.wall.numberOfLines;
		
		if (posX > game.width || posX <  0) {
			this.moveX = 0 - this.moveX;
		}
		if (posY > game.height) {
			game.execute("lose");
		} else if (posY <  0) {
			this.moveY = 0 - this.moveY;
		} else {
			if ((posY > game.bar.y) && (posX >= game.bar.x) && (posX <= (game.bar.x + game.bar.width))) {
				this.moveY = 0 - this.moveY;
				this.moveX = 2 * (this.x - (game.bar.x + game.bar.width / 2)) / game.bar.width;
			}			
		}
		
		if (posY <= wallZoneY) {
			var lineX = Math.floor(this.x / brickWidth);
			var lineY = Math.floor(this.y / brickHeight) - 1;
			if(lineX < 0) lineX = 0;
			if(lineX >= game.wall.bricksPerLine) lineX = game.wall.bricksPerLine - 1;
			if(lineY < 0) lineY = 0;
			if(lineY >= game.wall.numberOfLines) lineY = game.wall.numberOfLines - 1;
			if (game.wall.bricks[lineY - 1][lineX] == 1) {
				game.wall.bricks[lineY - 1][lineX] = 0;
				this.moveY = 0 - this.moveY;
			}
		}
		
		this.x += this.moveX * this.speed;
		this.y += this.moveY * this.speed;
	}
};