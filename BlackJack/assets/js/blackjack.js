"use script";

let main = document.getElementById("main");
main.style.display = "none";

let message = document.createElement("h3");
main.after(message); 

let continueBtn = document.createElement("button");
continueBtn.textContent = "Continue";
message.after(continueBtn);
continueBtn.style.display = "none";

let hitBtn = document.getElementById("hit");

let standBtn = document.getElementById("stand");

let themeBtn = document.getElementById("theme");

function Player(cards_holder, player_score) {
    this.name = "Ciccio";
    this.hand = [];
    this.points = 0;
    this.isPlayer = true;
    this.bet = 0;
    this.budget = 100;
    this.cards_holder = document.getElementById(cards_holder);
    this.player_score = document.getElementById(player_score);
}

function Card(number, suit) {
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

function Game(player) {
    this.player = player;
    this.dealer = new Player("dealerCards", "dealerSum");
    this.dealer.name = "Dealer";
    this.dealer.isPlayer = false;
    this.dealer.budget = 10000;
    this.pot = 0;
}

Game.prototype.freshStart = function() {
    this.init();
}

Game.prototype.init = function() {
    main.style.display = "block";
    message.style.display = "none";
    let deck = new Deck();
    // pot
    this.pot = 0;
    // bet
    let bet = +prompt("Inserisci la tua puntata", 0);
    this.pot = bet;
    this.player.budget -= bet;
    // resetta la mano
    this.player.hand = [];
    this.dealer.hand = [];
    //this.player.cards_holder.style.
    
    deal(this.player, deck);
    deal(this.player, deck);
    deal(this.dealer, deck);
    deal(this.dealer, deck);

    showScore(this.player);
    // showBudget(this.player);
    showScore(this.dealer);

    if (this.player.points === 21) {
        this.endRound(this.player, this.pot);
    }

    if (this.dealer.points === 21) {
        this.endRound(this.dealer);
    }

    busted(this.player);
    busted(this.dealer);
    
    hitBtn.addEventListener("click", evt => {
        evt.preventDefault();
        deal(this.player, deck);
        pointsCount(this.player);
        showScore(this.player);
        busted(this.player); //this.endRound(this.dealer);
    })

    standBtn.addEventListener("click", event => {
        event.preventDefault();
        deal(this.dealer, deck);
        pointsCount(this.dealer);
        showScore(this.dealer);
        busted(this.dealer);
    })

    continueBtn.addEventListener("click", event => {
        event.preventDefault();
        console.log(this);
        game.init();
    })
}

function deal(player, deck){
   let rn = Math.floor(Math.random() * deck.cards.length);
   let dealtCard = deck.cards.at(rn);
   player.hand.push(dealtCard); 
   deck.cards.splice(rn, 1);

   showHand(player);
}

function pointsCount(player){
    let points = 0;
    for(let card of player.hand) {
        points += card.value;
    }
    player.points = points;
}

function busted(player){
    console.log(player.points);
    if(player.points > 21) {
        main.style.display = "none";
        message.style.display = "block";
        message.textContent = player.name+" busted with " +player.points;
        continueBtn.style.display = "block";
        return true;
    }
    return false;
}

function showScore(player) {
    pointsCount(player);
    player.player_score.innerHTML = player.points;
}

Game.prototype.endRound = function() {
    if (!this.player.isPlayer) {
        main.style.display = "none";
        message.style.display = "block";
        message.innerText = "Hai perso!"; 
        setTimeout(this.init(), 5000);
    }

    if (this.player.isPlayer) {
        this.player.budget += this.pot * 2;
        main.style.display = "none";
        message.style.display = "block";
        message.innerText = "Hai vinto!"; 
        setTimeout(this.init(), 5000);
    }
}

function showHand(player){
    let c = document.createElement("img");
    c.classList.add("cards");
    c.src = "../assets/img/"+ player.hand[player.hand.length -1].representation + player.hand[player.hand.length -1].name + ".png";
    player.cards_holder.appendChild(c);
}

let player = new Player("playerCards", "playerSum");
let start = document.getElementById("start");
let game;

start.addEventListener("click", event => {
    event.preventDefault();
    game = new Game(player);
    game.init();
});

themeBtn.addEventListener("click", evt => {
    evt.preventDefault();
    let style = document.getElementById("style");
    console.log(style);
    console.log(style.href);
    console.log(("" + style.href).includes("/assets/css/blackjack.css"));
    if(("" + style.href).includes("/assets/css/blackjack.css")){
        style.href = "./assets/css/blackjackDark.css";
    } else {
        style.href = "./assets/css/blackjack.css"
    }
})