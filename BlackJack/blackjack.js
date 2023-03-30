"use script";
const suits = ['c','q','f','p'];

class Card{
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}
let c2 = new Card(2,'c');
let c3 = new Card(3,'c');
let c4 = new Card(4,'c');
let c5 = new Card(5,'c');
let c6 = new Card(6,'c');
let c7 = new Card(7,'c');
let c8 = new Card(8,'c');
let c9 = new Card(9,'c');
let c10= new Card(10,'c');
let cJ = new Card(10,'c');
let cQ = new Card(10,'c');
let cK = new Card(10,'c');
let cA = new Card(11,'c');

let q2 = new Card(2,'q');
let q3 = new Card(3,'q');
let q4 = new Card(4,'q');
let q5 = new Card(5,'q');
let q6 = new Card(6,'q');
let q7 = new Card(7,'q');
let q8 = new Card(8,'q');
let q9 = new Card(9,'q');
let q10 = new Card(10,'q');
let qJ = new Card(10,'q');
let qQ = new Card(10,'q');
let qK = new Card(10,'q');
let qA = new Card(11,'q');

let f2 = new Card(2,'f');
let f3 = new Card(3,'f');
let f4 = new Card(4,'f');
let f5 = new Card(5,'f');
let f6 = new Card(6,'f');
let f7 = new Card(7,'f');
let f8 = new Card(8,'f');
let f9 = new Card(9,'f');
let f10 = new Card(10,'f');
let fJ = new Card(10,'f');
let fQ = new Card(10,'f');
let fK = new Card(10,'f');
let fA = new Card(11,'f');

let p2 = new Card(2,'p');
let p3 = new Card(3,'p');
let p4 = new Card(4,'p');
let p5 = new Card(5,'p');
let p6 = new Card(6,'p');
let p7 = new Card(7,'p');
let p8 = new Card(8,'p');
let p9 = new Card(9,'p');
let p10 = new Card(10,'p');
let pJ = new Card(10,'p');
let pQ = new Card(10,'p');
let pK = new Card(10,'p');
let pA = new Card(11,'p');
//-- Cards - End --

const deck = [];
const playerHand = [];
const dealerHand = [];

let playerPoints = 0;
let dealerPoints = 0;

deck.push(c2,c3,c4,c5,c6,c7,c8,c9,c10,cJ,cQ,cK,cA);
deck.push(q2,q3,q4,q5,q6,q7,q8,q9,q10,qJ,qQ,qK,qA);
deck.push(f2,f3,f4,f5,f6,f7,f8,f9,f10,fJ,fQ,fK,fA);
deck.push(p2,p3,p4,p5,p6,p7,p8,p9,p10,pJ,pQ,pK,pA);


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
        let cValue = hand[hand.length -1].value;
        if(cValue > 10){
            switch(cValue){
                
            }
        }
        c.src = "./img/"+ hand[hand.length -1].suit + hand[hand.length -1].value + ".png";
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