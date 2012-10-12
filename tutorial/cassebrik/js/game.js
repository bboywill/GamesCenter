(function($) {
	$(document).ready(function() {
		var elem = $("#game").each(function() {
			// Initialisation du contexte 2D
			var context = this.getContext("2d");
			if (!context) {
				return;
			}
			
			// Initialisation du mur
			var numberOfLines = 5;
			var brickPerLine = 10;
			var brickWidth = 78;
			var brickHeight = 30;
			var brickSpace = 2;
			var wall = createWall(context, numberOfLines, brickPerLine, brickWidth, brickHeight, brickSpace);
			
			// Initialisation de la barre
			var barWidth = 160;
			var barHeight = 20;
			var barX = (this.width / 2) - (barWidth / 2);
			var barY = (this.height - barHeight);
			var barColor = "#333333";
			var bar = createBar(context, barX, barY, barWidth, barHeight, barColor);
		});
	});
})(jQuery);

function createWall(ctx, numberOfLines, bricksPerLine, width, height, space) {
	var wall = new Object()
	wall.bricks = new Array(numberOfLines);
	for (var i = 0; i < numberOfLines; i++) {
		wall[i] = new Array(bricksPerLine);
		ctx.fillStyle = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
		for (var j = 0; j < bricksPerLine; j++) {
			ctx.fillRect((j * (width + space)), (i * (height + space)), width, height);
			wall[i][j] = 1;
		}
	}
	wall.numberOfLines = numberOfLines;
	wall.bricksPerLine = bricksPerLine;
	wall.brick = new Object();
	wall.brick.width = width;
	wall.brick.height = height;
	wall.brick.space = space;
	return wall;
}

function createBar(ctx, x, y, width, height, color) {
	var bar = new Object();
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
	bar.x = x;
	bar.y = y;
	bar.width = width;
	bar.height = height;
	bar.color = color;
}