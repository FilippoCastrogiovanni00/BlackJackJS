"use script";

let main = document.getElementById("main");
main.style.display = "none";

let message = document.createElement("h3");
main.after(message); 

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
    if(player.points > 21) {
        main.style.display = "none";
        message.style.display = "block";
        message.textContent = player.name+" busted with " +player.points;
        return true;
    }
    return false;
}

function playerWin(dealerPoints, playerPoints){
    if(playerPoints > dealerPoints){
        return "Win!";
    }if(playerPoints === dealerPoints){
        return "Tie...";
    }
    return "Loss!";
}

/* function show(player, dealer) {
    showHand(player);
    showHand(dealer);
    showScore(player);
    showScore(dealer);
} */

function showScore(player) {
    pointsCount(player);
    player.player_score.innerHTML = player.points;
}

function game(){
    let gameover = false;
    main.style.display = "block";
    message.style.display = "none";
    let deck = new Deck();
    let player = new Player("playerCards", "playerSum");
    let dealer = new Player("dealerCards", "dealerSum");
    dealer.name = "Dealer";
    dealer.isPlayer = false;
    dealer.budget = 10000;

    do {
        deal(player, deck);
        deal(player, deck);
        deal(dealer, deck);
        deal(dealer, deck);
    
        showScore(player);
        showScore(dealer);
    
        let hitButton = document.getElementById("hit");
        hitButton.addEventListener("click", evt => {
            evt.preventDefault();
            deal(player, deck);
            pointsCount(player);
    
            showScore(player);
        })

        if (busted(player)) return;
        if (busted(dealer)) return;
        
    } while (player.budget > 0 && dealer.budget > 0 && !gameover);
    
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
    c.src = "../assets/img/"+ player.hand[player.hand.length -1].representation + player.hand[player.hand.length -1].name + ".png";
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

let start = document.getElementById("start");
start.addEventListener("click", game);