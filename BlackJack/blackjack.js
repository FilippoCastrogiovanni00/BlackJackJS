"use script";
const suits = ['c','q','f','p'];

class Card{
    constructor (value, suit, rapresentation) {
        this.value = value;
        this.suit = suit;
        this.rapresentation = rapresentation;
    }
}

function fillSuit(suit) {
    let suitArray = [];
    for (let i = 2; i <= 10; i++) {
        //let card = new Card();
        suitArray.push(new Card(i, suit, i));
    }

    suitArray.push(new Card(10, suit, 'j'));
    suitArray.push(new Card(10, suit, 'q'));
    suitArray.push(new Card(10, suit, 'k'));
    suitArray.push(new Card(11, suit, 'asso'));

    return suitArray;
}

let cuori = fillSuit(suits[0]);
let quadri = fillSuit(suits[1]);
let fiori = fillSuit(suits[2]);
let picche = fillSuit(suits[3]);

const deck = [];
const playerHand = [];
const dealerHand = [];

let playerPoints = 0;
let dealerPoints = 0;

deck.push(...cuori, ...quadri, ...fiori, ...picche);

function deal(hand){
   let rn = Math.floor(Math.random()*deck.length);
   let dealtCard = deck.at(rn);
   hand.push(dealtCard); 
   deck.splice(rn, 1);   
}

function pointsCount(hand){
    let points = 0;
    for(let card of hand) {
        points += card.points;
        // da visualizzare
    }
    return points;
}

function busted(points){
    if(points > 21){
        console.log("you lost")
        return true;
    }
}

function playerWin(dealerPoints, playerPoints){
    if(playerPoints > dealerPoints){
        return "Win!";
    }if(playerPoints === dealerPoints){
        return "Tie...";
    }
    return "Loss!";
}

function game(){
    deal(playerHand);
    deal(playerHand);
    deal(dealerHand);
    deal(dealerHand);
    playerPoints = pointsCount(playerHand, playerPoints);
    dealerPoints = pointsCount(dealerHand, dealerPoints);
    if(tieBJ()){
        return "tieBJ";
    }if(playerBJ()){
        return "playerBJ";
    }if(dealerBJ()){
        return "dealerBJ";
    }
}

let tasto = document.getElementById("hit");
tasto.addEventListener("click", evt => {
    evt.preventDefault();
    console.log(playerHand);
    deal(playerHand);
    showHand(playerHand);
    console.log(playerHand);
});

function showHand(hand){
    let playerCards = document.getElementById("playerCards");
    
        let c = document.createElement("img");
        c.classList.add("cards");
        c.src = "./img/"+ hand[hand.length -1].suit + hand[hand.length -1].rapresentation + ".png";
        playerCards.appendChild(c);
    
}

function playerBJ(){
    if(playerPoints == 21 && dealerPoints < playerPoints){
        return true;
    }
}
function dealerBJ(){
    return dealerPoints == 21 && playerPoints < dealerPoints;   
}
function tieBJ(){
    return playerPoints== 21 && dealerPoints==playerPoints;        
}