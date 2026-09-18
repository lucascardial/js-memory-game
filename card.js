

const shuffleDelay = 300
const maxShuffles = 12;

function flipCard(event) {

    const cardElement = event.target.closest('.card');

    const flippedState = cardElement.getAttribute('x-state-flipped');

    cardElement.setAttribute('x-state-flipped', flippedState === "1" ? "0" : "1");
}

function flipCards() {

    setTimeout(function () {
        esconderCartas()
    }, shuffleDelay * (maxShuffles - 2))
}

function shuffleCards(cards) {
    for (let i = 1; i <= maxShuffles; i++) {
        setTimeout(function () {
            cards.forEach(function (cardElement) {
                cardElement.style.order = Math.floor(Math.random() * 100)
            })
        }, shuffleDelay * i)
    }
}

function getCards() {
    return document.querySelectorAll('.card')
}

function esconderCartas() {
    getCards().forEach(function (cardElement) {
        cardElement.setAttribute('x-state-flipped', "0");
    })
}

function exibirCartas() {
    const cards = getCards();

    cards.forEach(function (cardElement, i) {
        cardElement.setAttribute('x-state-flipped', "1");

        if (i === cards.length - 1) {
            setTimeout(() => {
                shuffleCards(cards)
            }, 500);
        }
    })
}