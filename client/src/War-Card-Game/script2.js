import Deck from "./deck.js";

const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const pass = document.querySelector(".pass");
const selectNumber = document.querySelector(".select-number");
const selectSuit = document.querySelector(".select-suit");
const updates = document.querySelector(".updates");
const currentInputCard = document.querySelector(".current-card");
const submitBtn = document.querySelector(".submit-btn");
const spread = document.querySelector(".bunch-of-cards");
let playerDeck;

function createCards() {
  const deck = new Deck();
  deck.shuffle();
  console.log(deck.cards);
  const deckMidpoint = Math.ceil(deck.numberOfCards / 4);
  // playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
  // playerDeck.shuffle()
  let currentCard;
  for (let i = 0; i < 13; i++) {
    currentCard = deck.cards[i].getHTML();
    currentCard.classList.add(`card${i + 1}`);
    currentCard.addEventListener("click", (e) => {
      console.log("clicked", e.target.dataset.value);
      let otherSelected = document.querySelectorAll(".card");
      otherSelected.forEach((element) => {
        element.classList.remove("selected");
      });
      e.target.classList.toggle("selected");
      currentInputCard.dataset.value = e.target.dataset.value;
      currentInputCard.innerText = e.target.innerText;
      console.log(e.target.classList[1]);
      currentInputCard.classList.remove("red", "black");
      currentInputCard.classList.add(e.target.classList[1]);
    });
    spread.appendChild(currentCard);
  }

  submitBtn.addEventListener("click", () => {
    let allCards = document.querySelectorAll(".card");
    for (let card of allCards) {
      if (card.classList.contains("selected")) {
        card.remove();
        currentInputCard.dataset.value = "";
        currentInputCard.innerText = "";
        let element = document.createElement("P");
        element.innerHTML = `Player: ${selectNumber.value} ${selectSuit.value}`;
        updates.appendChild(element);
      }
    }
  });

  pass.addEventListener("click", () => {
    let element = document.createElement("P");
    element.innerHTML = `Player: pass`;
    updates.appendChild(element);
  });
}

createCards();
