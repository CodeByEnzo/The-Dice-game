let currentP1 = document.querySelector('.current1')
let currentP2 = document.querySelector('.current2')
let globalScoreP1 = document.querySelector('.globalScore1')
let globalScoreP2 = document.querySelector('.globalScore2')

//on créé la fonction
function rollDice() {
    //récupère le numéro du dé
    let numberOfDice = document.getElementsByClassName('newDice').length;

    for (var diceNumb = 0; diceNumb <= numberOfDice; diceNumb++) {

        let numb = Math.floor(Math.random() * 6) + 1;
        const elements = document.querySelector('img#dice' + diceNumb).setAttribute("src", "./images/dice" + numb + ".png")

 
    }   
}
console.log(rollDice())