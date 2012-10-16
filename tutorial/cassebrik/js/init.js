(function($) {
	$(document).ready(function() {
		var elem = $("#game").each(function() {
			// Initialisation des bibliothèques externes
			if (!createjs.SoundJS.checkPlugin(true)) {
				$.bh.msg("Impossible de charger la bibliothèque de gestion du son.", "error");
				return;
			}
			
			// Initialisation du contexte 2D
			var context = this.getContext("2d");
			if (!context) {
				$.bh.msg("Erreur lors de la récupération du contexte graphique.", "error");
				return;
			}
			
			// Initialisation du mur
			var numberOfLines = 4;
			var brickPerLine = 10;
			var brickWidth = 78;
			var brickHeight = 30;
			var brickSpace = 2;
			var brickColors = ["#503A22", "#88502F", "#A17048", "#D9C38A", "#F7DDAC"];
			var wall = new cassebrik.Wall(numberOfLines, brickPerLine, brickWidth, brickHeight, brickSpace, brickColors);
			
			// Initialisation de la barre
			var barWidth = 160;
			var barHeight = 20;
			var barX = (this.width / 2) - (barWidth / 2);
			var barY = (this.height - barHeight);
			var barMove = 15;
			var barColor = "#333333";
			var bar = new cassebrik.Bar(barX, barY, barWidth, barHeight, barMove, barColor);
			
			// Initialisation du moteur
			var interval = 10;
			var game = new cassebrik.Game(context, wall, bar, this.width, this.height, interval);
			game.launch();
			
			// Gestion des évènements
			keypress.combo("left", function() {
				game.execute("left_movement");
			});
			keypress.combo("right", function() {
				game.execute("right_movement");
			});
			keypress.sequence_combo("up up down down left right left right b a", function() {
				game.execute("konami_code");
			}, true);
		});
	});
})(jQuery);