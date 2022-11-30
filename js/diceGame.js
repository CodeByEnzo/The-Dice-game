// FR
// Règles:
// Le jeu comprend 2 joueurs sur un seul et même écran.
// Chaque joueur possède un score temporaire(ROUND) et un score global(GLOBAL).
// À chaque tour, le joueur a son ROUND initialisé à 0 et peut lancer un dé autant de fois qu'il le souhaite. Le
// résultat d’un lancer est ajouté au ROUND.
// Lors de son tour, le joueur peut décider à tout moment de:
// - Cliquer sur l’option “Hold”, qui permet d’envoyer les points du ROUND vers le GLOBAL.Ce sera alors le
// tour de l’autre joueur.
// - Lancer le dé.S’il obtient un 1, son score ROUND est perdu et c’est la fin de son tour.
// Le premier joueur qui atteint les 100 points sur global gagne le jeu.
// Bon jeu !

//ENG
// RULES :
// The game has 2 players with only one screen.
// Each players has a current counter and a global counter.
// At each rounds, the player has his current score initialize at 0 and can drop the dice as much as he want to.
// The result of a drop is added to the current score.
// While his turn, the player can decide at anytime to;
// -Click on the option HOLD, that while send the points of the current score to the global score and,
// Then it will be the turn of the next player.
// -Drop the dice. If he get a 1, his current score is lost and it's the end of his turn.
// First player who reach 100 points on his global score win the game.
// Have fun !


let currentP1 = document.querySelector('.current1');
let currentP2 = document.querySelector('.current2');
let globalScoreP1 = document.querySelector('.globalScore1');
let globalScoreP2 = document.querySelector('.globalScore2');
let holdBtn = document.querySelector('.holdBtn');
let rollBtn = document.querySelector('.rollBtn');
let info = document.querySelector('.info')
const redPoint = document.getElementsByClassName('notifPoint');
const p1 = document.querySelector('.p1');
const p2 = document.querySelector('.p2');
const newGame = document.querySelector('.btnNewGame');
const closeRules = document.querySelector('.closeRules');
const rules = document.querySelector('.rules');

// initialisation des variables
let total = 0;
let globalP1 = 0;
let globalP2 = 0;
let activePlayer = true;

// Pour fermer la page des régles au click
closeRules.addEventListener('click', () => {
    rules.style.opacity = '0';
    rules.style.visibility = 'hidden';
});

// Lorsque le bouton ROLL est cliqué la partie se lance
rollBtn.addEventListener('click', () => {
    if (activePlayer) {
        rollDice();
    } else {
        rollDice2();
    }
});

// Lorsque l'on click sur NEW GAME, les variables sont réinitialisées et une nouvelle partie peut commencer
newGame.addEventListener('click', () => {
    resetGame();
});

// Lorsque le bouton HOLD est cliqué, le score CURRENT s'inscris dans le score GLOBAL du joueur qui a joué
// Défini aussi les messages à affiché selon le contexte du jeu en cour
holdBtn.addEventListener('click', () => {
    if (activePlayer) {
        if (total == 0) {
            info.innerHTML = 'Please, play before holding.';
            return;
        }
        globalP1 += total;
        globalScoreP1.innerHTML = globalP1;
        resetCurrent();
        currentPlayer();
        if (globalP1 > 99) {
            info.innerHTML = 'Player 1 win the game !';
            alert('Congrats ! Player 2 won the game with ' + globalP1 + " points !");
            resetGame();
        }
    } else {
        if (total == 0) {
            info.innerHTML = 'Please, play before holding';
            return;
        }
        globalP2 += total;
        globalScoreP2.innerHTML = globalP2;
        resetCurrent();
        currentPlayer();
        if (globalP2 > 99) {
            info.innerHTML = 'Player 2 win the game !';
            alert('Congrats ! Player 2 won the game with ' + globalP2 + " points !");
            resetGame();
        }
    }

});

// lorsque l'on roule le dé
function rollDice() {
    //Gennère un nombre aléatoire entre 1 et 6
    const firstRandomNum = Math.floor(Math.random() * 6) + 1;
    // retourne le numéro de l'image du dé selon le nombre trouvé par la variable firstRandomNum
    const firstDiceImage = 'images/dice' + firstRandomNum + '.png';
    // paramétre l'image avec la variable firstDiceImage
    document.querySelectorAll('img')[0].setAttribute('src', firstDiceImage);
    //Si le numéro aléatoire est différent de 1
    if (firstRandomNum !== 1) {
        // injecte le message dans le HTML avec le numéro du dé obtenue
        info.innerHTML = "It's a " + firstRandomNum;
        //total prend la valeur de p1score(0) + le numéro aléatoire
        total += firstRandomNum;
        //injection dans le score CURRENT du HTML
        currentP1.innerHTML = total;
        //si le num aléatoire est égal à 1
    } if (firstRandomNum === 1) {
        // on l'affiche dans le html
        info.innerHTML = 'Perdu, vous passez votre tour';
        // Fonction booleene qui determine un joueur actif ou non, voir plus bas dans le code
        currentPlayer();
        // Remet le compteur current à zero pour pouvoir poursuivre la parie
        resetCurrent();
    }
};

// Même fonction que rollDice() mais pour le joueur 2
function rollDice2() {
    const firstRandomNum = Math.floor(Math.random() * 6) + 1;
    const firstDiceImage = 'images/dice' + firstRandomNum + '.png';
    document.querySelectorAll('img')[0].setAttribute('src', firstDiceImage);

    if (firstRandomNum !== 1) {
        info.innerHTML = 'Vous avez fait : ' + firstRandomNum;
        total += firstRandomNum;
        currentP2.innerHTML = total;
    } if (firstRandomNum === 1) {
        info.innerHTML = 'Perdu, vous passez votre tour';
        currentPlayer();
        resetCurrent();
    }
};

// Défini le tour du joueur avec un booléen mais aussi de manière dynamique et graphique pour les utlisateurs
function currentPlayer() {
    if (activePlayer) {
        activePlayer = false;
        redPoint[1].classList.add('redPoint');
        redPoint[0].classList.remove('redPoint');
        p2.classList.add('text-danger');
        p1.classList.remove('text-danger');
    } else {
        activePlayer = true;
        redPoint[0].classList.add('redPoint');
        redPoint[1].classList.remove('redPoint');
        p1.classList.add('text-danger');
        p2.classList.remove('text-danger');

    }
};
// Réinitialise le score current pour laisser le joueur suivant jouer
function resetCurrent() {
    total = 0;
    currentP1.innerHTML = 0;
    currentP2.innerHTML = 0;
};

// Réinitialise totalement le jeu pour une éventuelle nouvelle partie
function resetGame() {
    resetCurrent()
    globalP1 = 0;
    globalP2 = 0;
    globalScoreP1.innerHTML = 0;
    globalScoreP2.innerHTML = 0;
    info.innerHTML = "&nbsp;";
};
