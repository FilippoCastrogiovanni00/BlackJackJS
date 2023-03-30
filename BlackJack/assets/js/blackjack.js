"use script";

class Player {
    constructor(cards_holder) {
        this.name = null;
        this.hand = null;
        this.points = 0;
        this.isPlayer = true;
        this.bet = 0;
        this.budget = 100;
        this.cards_holder = document.getElementById(cards_holder);
    }    
}

class Card{
    constructor (number, suit) {
        let representation = {
            hearts: 'c',
            spades: 'p',
            diamonds: 'q',
            clubs: 'f'
        };
        this.number = number;
        if (number == 1) {
            this.value = 11;
            this.name = "asso";
        } else if (number > 1 && number < 11) {
            this.value = number;
            this.name = number.toString();
        } else {
            this.value = 10;
            if (number == 11) {
                this.name = 'j';
            } else if (number == 12) {
                this.name = 'q';
            } else if (number == 13) {
                this.name = 'k';
            }
        }
        this.suit = suit;
        this.representation = representation[suit];
        
    }
}

let playerPoints = 0;
let dealerPoints = 0;

function deal(player){
   let rn = Math.floor(Math.random()*deck.length);
   let dealtCard = deck.at(rn);
   player.hand.push(dealtCard); 
   deck.splice(rn, 1);

   showHand(player);
}

function pointsCount(player){
    let points = 0;
    for(let card of player.hand) {
        points += card.value;
    }
    player.points = points;
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

function show(player, dealer) {
    showHand(player);
    showHand(dealer);
    
}

function game(){
    let deck = new Deck();
    let player = new Player("playerCards");
    deal(player);
    deal(player);
    let dealer = new Player("dealerCards");
    dealer.isPlayer = false;
    dealer.budget = 10000;
    deal(dealer);
    deal(dealer);

    player.points = pointsCount(player);
    let playerScore = document.getElementById("playerSum");
    playerScore.innerHTML = player.points;

    dealer.points = pointsCount(dealer);
    let dealerScore = document.getElementById("dealerSum");
    dealerScore.innerHTML = dealer.points;

    let tasto = document.getElementById("hit");
    tasto.addEventListener("click", evt => {
        evt.preventDefault();
        deal(player);
        pointsCount(player);
    });
    
    if(tieBJ()){
        return "tieBJ";
    }if(playerBJ()){
        return "playerBJ";
    }if(dealerBJ()){
        return "dealerBJ";
    }
}

function showHand(player){
    let c = document.createElement("img");
    c.classList.add("cards");
    c.src = "../assets/img/"+ hand[hand.length -1].representation + hand[hand.length -1].name + ".png";
    player.cards_holder.appendChild(c);
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

game();