(function($) {
	$(document).ready(function() {
		var elem = $("#game").each(function() {
			// Initialisation du contexte 2D
			var context = this.getContext("2d");
			if (!context) {
				return;
			}
			
			// Initialisation du mur
			var numberOfLines = 4;
			var brickPerLine = 10;
			var brickWidth = 78;
			var brickHeight = 30;
			var brickSpace = 2;
			var brickColors = ["#503A22", "#88502F", "#A17048", "#D9C38A", "#F7DDAC"];
			var wall = createWall(context, numberOfLines, brickPerLine, brickWidth, brickHeight, brickSpace, brickColors);
			
			// Initialisation de la barre
			var barWidth = 160;
			var barHeight = 20;
			var barX = (this.width / 2) - (barWidth / 2);
			var barY = (this.height - barHeight);
			var barMove = 15;
			var barColor = "#333333";
			var bar = createBar(context, barX, barY, barWidth, barHeight, barMove, barColor);
			
			// Initialisation du moteur
			var interval = 10;
			var game = createMotor(context, wall, bar, this.width, this.height, interval);
			game.launch();
			
			// Gestion des évènements
			window.document.onkeydown = function(e) {
				if (e.keyCode == 39) {
					// Flêche de droite
					if ((bar.x + bar.move + bar.width) <= game.width) {
						bar.x += bar.move;
					}
				} else if (e.keyCode == 37) {
					// Flêche de gauche
					if ((bar.x - bar.move) >= 0) {
						bar.x -= bar.move;
					}
				}
			};
		});
	});
})(jQuery);

function createWall(ctx, numberOfLines, bricksPerLine, width, height, space, colors) {
	var wall = new Object()
	wall.numberOfLines = numberOfLines;
	wall.bricksPerLine = bricksPerLine;
	wall.brick = new Object();
	wall.brick.width = width;
	wall.brick.height = height;
	wall.brick.space = space;
	wall.colors = colors;
	wall.bricks = new Array(numberOfLines);
	wall.reset = function() {
		for (var i = 0; i < wall.numberOfLines; i++) {
			wall.bricks[i] = new Array(wall.bricksPerLine);
			for (var j = 0; j < wall.bricksPerLine; j++) {
				wall.bricks[i][j] = 1;
			}
		}
	};
	wall.show = function(ctx) {
		var width = wall.brick.width;
		var height = wall.brick.height;
		var space = wall.brick.space;
		for (var i = 0; i < wall.numberOfLines; i++) {
			ctx.fillStyle = wall.colors[i];
			for (var j = 0; j < wall.bricksPerLine; j++) {
				if(wall.bricks[i][j] == 1) {
					ctx.fillRect((j * (width + space)), (i * (height + space)), width, height);
				}
			}
		}
	};
	return wall;
}

function createBar(ctx, x, y, width, height, move, color) {
	var bar = new Object();
	bar.x = x;
	bar.y = y;
	bar.width = width;
	bar.height = height;
	bar.color = color;
	bar.move = move;
	bar.show = function(ctx) {
		ctx.fillStyle = bar.color;
		ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
	};
	return bar;
}

function createMotor(ctx, wall, bar, width, height, interval) {
	var game = new Object();
	game.context = ctx;
	game.wall = wall;
	game.bar = bar;
	game.width = width;
	game.height = height;
	game.interval = interval;
	game.timer = null;
	game.launch = function() {
		wall.reset();
		game.timer = setInterval(game.refresh, game.interval);
	}
	game.refresh = function() {
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, game.width, game.height);
		ctx.restore();
		game.wall.show(game.context);
		game.bar.show(game.context);
	};
	game.end = function() {
		if(game.timer != null) {
			clearInterval(game.timer);
		}
	};
	return game;
}