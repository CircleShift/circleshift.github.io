// Deck class represents multiple cards.
// Can be arranged in multiple ways.
function Deck (options = {}){
    this.cards = [];
    
    // View mode
    //  infdraw - infinite draw. always appears as if there are multiple cards
    //  stack - stack mode
    //  strip
    //      horizontal
    //          left (strip-hl)
    //          right (strip-hr)
    //      vertical
    //          top (strip-vt)
    //          bottom (strip-vb)
    this.mode = options.mode;

    // Select mode
    //  above
    //  below
    //  around
    //  one
    //  all
    this.smode = options.smode;
    
    // Select count (-1 = all available)
    //  above - controls number of cards above clicked are selected
    //  below - controls number of cards below clicked are selected
    //  around
    //      number - number above and below selected
    //      array - [first number: number above selected] [second number: number below selected]
    //  one - no effect
    //  all - no effect
    this.sct = options.sct;
    
    // Position
    //  array of where the deck is centered
    this.x = options.pos[0];
    this.y = options.pos[1];
    
    this.e = document.createElement("deck");
}

Deck.prototype = {
    // Add a card to the front of the deck
    appendCard: function(card) {
        this.cards.push(card);
        this.e.appendChild(card.e);
    },

    // Add a card to the back of the deck
    prependCard: function(card) {
        this.cards.unshift(card);
        this.e.prepend(card.e);
    },

    // Add a card at the index specified
    addCardAt: function(card, index) {
        if(index < 0 || index > this.cards.length)
            return
        
        if(index == 0) {
            this.prependCard(card);
        } else if (index == this.cards.length) {
            this.appendCard(card);
        } else {
            let temp = this.cards.slice(0, index);
            temp[temp.length - 1].e.after(card.e);
            temp.push(card);
            this.cards.unshift(...temp);
        }
    },

    // Swap the cards at the specified indexes
    swapCard: function(index1, index2) {
        if(index1 < 0 || index1 >= this.cards.length || index2 < 0 || index2 >= this.cards.length)
            return
        
        var temp = this.cards[index1]
        this.cards[index1] = this.cards[index2];
        this.cards[index2] = temp;

        this.cards[index1 - 1].e.after(this.cards[index1]);
        this.cards[index2 - 1].e.after(this.cards[index2]);
    },

    // Remove the card at the front of the deck (index length - 1), returns the card removed (if any)
    removeFront: function() {
        return this.removeCard(this.cards.length - 1);
    },

    // Remove the card at the back of the deck (index 0), returns the card removed (if any)
    removeBack: function() {
        return this.removeCard(0);
    },

    // Remove a card from the deck, returning the card element
    removeCard: function(index) {

        if(index < 0 || index >= this.cards.length)
            return

        this.e.removeChild(this.cards[index].e);
        return this.cards.splice(index, 1)[0];
    }
};