// Constantes du jeu
var NBR_LIGNES = 5;
var NBR_BRIQUES_PAR_LIGNE = 8;
var BRIQUE_WIDTH = 48;
var BRIQUE_HEIGHT = 15;
var ESPACE_BRIQUE = 2;

// Variables
var tabBriques;
var context;

window.addEventListener("load", function() {
	var elem = document.getElementById("game");
	if (!elem || !elem.getContext) {
		return;
	}
	context = elem.getContext("2d");
	if (!context) {
		return;
	}

	creerBriques(context, NBR_LIGNES, NBR_BRIQUES_PAR_LIGNE, BRIQUE_WIDTH, BRIQUE_HEIGHT, ESPACE_BRIQUE);
}, false);

// Fonction permettant de créer les briques du jeu
function creerBriques(ctx, nbrLignes, nbrParLigne, largeur, hauteur, espace) {

	// Tableau virtuel: On initialise les lignes de briques
	tabBriques = new Array(nbrLignes);

	for (var i = 0; i < nbrLignes; i++) {

		// Tableau virtuel: On initialise les briques de la ligne
		tabBriques[i] = new Array(nbrParLigne);

		// Affichage: On attribue une couleur aux briques de la ligne
		ctx.fillStyle = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";

		for (var j = 0; j < nbrParLigne; j++) {

			// Affichage: On affiche une nouvelle brique
			ctx.fillRect((j * (largeur + espace)), (i * (hauteur + espace)), largeur, hauteur);

			// Tableau virtuel: On attribue à la case actuelle la valeur 1 = Une
			// brique existe encore
			tabBriques[i][j] = 1;

		}
	}

	// Nos briques sont initialisées.
	return 1;
}