//PART 1
let baseURL = 'http://numbersapi.com/';

// 1.
$.getJSON($`{baseURL}/${favNumber}?json`).then(data => {
  console.log(data);
});

// 2.
let favNumbers = [1, 2, 3];
$.getJSON($`{baseURL}/${favNumbers}?json`).then(data => {
  console.log(data);
});

// 3.
Promise.all(
  array.from({length: 4}, () => {
    return $.getJSON(`${baseURL}/${favNumber}?json`);
  })
).then(numberfacts => {
  numberfacts.forEach(data => $("body").append(`<p>${data.text}<p>`));
});

// PART 2
$(function() {
  let baseURL = "https://deckofcardsapi.com/api/deck";

// 1.
$.getJSON($`{baseURL}/new/draw/`).then(data => {
  let {value, suit} = data.cards[0];
  console.log(`${value} of ${suit.toLowerCase()}`);
});

// 2.
let firstCard = null;
$.getJSON(`${baseURL}/new/draw/`).then(data => {
  firstCard = data.card[0];
  let deckID = data.deck_id;
  return $.getJSON(`${baseURL}/${deckID}/draw/`);
})

.then(data => {
  let secondCard = data.cards[0];
  [firstCard, secondCard].forEach(function(card) {
    console.log(
      `${card.value} of ${card.suit.toLowerCase()}`
    );
  });
});

// 3.
let deckId = null;
let $btn = $('button');
let $cardArea = $('#card-area');

$.getJSON(`${baseURL}/new/shuffle/`).then(data => {
  deckId = data.deck_id;
  $btn.show();
});

$btn.on('click', function() {
  $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
    let cardSrc = data.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    $cardArea.append(
      $('<img>', {
        src: cardSrc,
        css: {
          transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        }
      })
    );
    if (data.remaining === 0) $btn.remove();
  });
});
});
