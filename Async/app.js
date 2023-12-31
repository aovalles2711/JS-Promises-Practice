//PART 1
let favNumber = 10;
let baseURL = 'http://numbersapi.com/';

// 1.
async function part1() {
  let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
  console.log(data);
}
part1();

// 2.
const favNumbers = [1, 2, 3];
async function part2() {
  let data = await $.getJSON($`{baseURL}/${favNumbers}?json`);
  console.log(data);
}
part2();

// 3.
async function part3() {
  let facts = await Promise.all(
  array.from({length: 4}, () => {
    $.getJSON(`${baseURL}/${favNumber}?json`))
  );
  facts.forEach(data => {
    $('body').append(`<p>${data.text}<p>`);
});
}
part3();

// PART 2
$(function() {
  let baseURL = "https://deckofcardsapi.com/api/deck";

// 1.
async function part1()
{
    let data = await $.getJSON(`${baseURL}/new/draw/`);
    let {value, suit} = data.cards[0];
    console.log(`${value} of ${suit.toLowerCase()}`);
}

// 2.
async function part2() {

    let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
    let deckID = firstCardData.deck_id;
    let secondCardData = await $.getJSON(`${baseURL}/${deckID}/draw/`);
    [firstCardData, secondCardData].forEach(card => {
        let {suit, value} = card.cards[0];
        console.log(`${value()} of ${suit.toLowerCase()}`);
    });
}

// 3.
async function setup() {
    let $btn = $('button');
    let $cardArea = $('#card-area');
    
    let deckData = await
    $.getJSON(`${baseURL}/new/shuffle/`);
    $btn.show().on('click', async function() {
    let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
    
    let cardSrc = cardData.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    $cardArea.append(
        $('<img>', {
            src: cardSrc,
            css: {
                transform:
                `translate(${randomX}px, ${randomY}px)
                rotate(${angle}deg)`
            }
        })
    );
    if (cardData.remaining === 0)
    $btn.remove();
    });
}
setup();
});
