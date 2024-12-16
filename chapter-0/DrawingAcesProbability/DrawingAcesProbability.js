// DrawingAcesProbability.js

let reshufflingDraws = '';
let reshufflingProb = 0;
let nonReshufflingDraws = '';
let nonReshufflingProb = 0;

function createDeck() {
  let deck = [];
  let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push(rank + ' of ' + suit);
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(random(i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function drawCard(deck) {
  let cardIndex = Math.floor(random(deck.length));
  return deck.splice(cardIndex, 1)[0];
}

function setup() {
  createCanvas(400, 400);
  let deck = createDeck();

  // Reshuffling Case:
  shuffleDeck(deck);
  let firstDraw = drawCard(deck);
  let secondDraw = drawCard(deck);
  reshufflingDraws = `Reshuffling Draws: ${firstDraw}, ${secondDraw}`;
  reshufflingProb = (4 / 52) * (4 / 52);

  // Without Reshuffling Case:
  let nonReshuffledDeck = createDeck();
  let firstDrawNoReshuffle = drawCard(nonReshuffledDeck);
  let secondDrawNoReshuffle = drawCard(nonReshuffledDeck);
  nonReshufflingDraws = `Without Reshuffling Draws: ${firstDrawNoReshuffle}, ${secondDrawNoReshuffle}`;
  nonReshufflingProb = (4 / 52) * (3 / 51);
}

function draw() {
  background(220);
  textSize(16);
  textAlign(LEFT, TOP);
  fill(0);

  // Display dynamic text on canvas
  text(reshufflingDraws, 20, 20);
  text(`Probability with reshuffling: ${reshufflingProb.toFixed(4)}`, 20, 50);

  text(nonReshufflingDraws, 20, 100);
  text(`Probability without reshuffling: ${nonReshufflingProb.toFixed(4)}`, 20, 130);
}
