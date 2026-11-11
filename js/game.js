const TOTAL_PAIRS = 10;
const HIDE_DELAY_MS = 800;

const gameBoard = document.getElementById('game-board');
const pairsFoundElement = document.getElementById('pairs-found');
const totalPairsElement = document.getElementById('total-pairs');
const gameOverDialog = document.getElementById('gameover-dialog');

let pairsFound = 0;
let openedCards = 0;
let firstCard = null;

function shuffle(items) {
    return items.sort(() => Math.random() - 0.5);
}

function revealCard(card) {
    card.setAttribute('x-state-flipped', '1');
}

function hideCard(card) {
    card.setAttribute('x-state-flipped', '0');
}

function cardsHaveSameFruit(firstCard, secondCard) {
    return firstCard.dataset.fruit === secondCard.dataset.fruit;
}

function renderScore() {
    pairsFoundElement.innerText = pairsFound;
}

function verifyGameOver() {
    if (pairsFound === TOTAL_PAIRS) {
        gameOverDialog.showModal();
    }
}

function handleCardClick(event) {
    const card = event.currentTarget;

    // Ignora cliques que não devem contar como carta aberta: já há duas
    // cartas viradas, a carta já foi resolvida ou é a mesma da primeira.
    if (openedCards > 1 || card.classList.contains('card-resolved') || card === firstCard) {
        return;
    }

    openedCards++;
    revealCard(card);

    if (firstCard === null) {
        firstCard = card;
        return;
    }

    if (cardsHaveSameFruit(firstCard, card)) {
        pairsFound++;
        renderScore();
        verifyGameOver();
        card.classList.add('card-resolved');
        firstCard.classList.add('card-resolved');
        firstCard = null;
        openedCards = 0;
    } else {
        setTimeout(() => {
            hideCard(firstCard);
            hideCard(card);
            firstCard = null;
            openedCards = 0;
        }, HIDE_DELAY_MS);
    }
}

function createCard(fruit) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.fruit = fruit.value;
    hideCard(card);

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.style.backgroundImage = `url("${fruit.resource_url}")`;

    card.append(cardBack, cardFront);
    card.addEventListener('click', handleCardClick);

    return card;
}

function startGame() {
    const gameFruits = fruits.slice(0, TOTAL_PAIRS);

    shuffle([...gameFruits, ...gameFruits]).forEach((fruit) => {
        gameBoard.append(createCard(fruit));
    });

    totalPairsElement.innerText = TOTAL_PAIRS;
    renderScore();
}

startGame();
