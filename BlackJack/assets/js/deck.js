function Deck() {
    this.suits = ['hearts','spades','diamonds','clubs'];
    this.cards = [];
    for (let i = 1; i < 14; i++) {
        for (let s of suits) {
            let card = new Card(i, s);
            this.cards.push(card);
        }
    }
}
