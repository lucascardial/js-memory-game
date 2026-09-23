function animarDistribuicaoCartas(cards) {
    return new Promise(resolve => {
        const deck = document.getElementById('card-deck');

        const deckPosition = deck.getBoundingClientRect();

        cards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect();


            const deltaX =
                deckPosition.left +
                deckPosition.width / 2 -
                (cardPosition.left + cardPosition.width / 2);

            const deltaY =
                deckPosition.top +
                deckPosition.height / 2 -
                (cardPosition.top + cardPosition.height / 2);

            const animation = card.animate(
                [
                    {
                        transform: `translate(${deltaX}px, ${deltaY}px)`,
                        opacity: 0,
                    },
                    {
                        transform: 'translate(0, 0)',
                        opacity: 1,
                    },
                ],
                {
                    duration: 1000,
                    delay: index * 100,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    fill: 'backwards',
                },
            );


            if (index == cards.length - 1) {
                animation.finished.then(() => {
                    resolve(cards);
                });
            }
        });
    })
}

function embaralharCartas(cards) {
    return new Promise(resolve => {
        for (let i = 1; i <= maxShuffles; i++) {
            setTimeout(function () {
                cards.forEach(function (cardElement) {
                    cardElement.style.order = Math.floor(Math.random() * 100)
                    cardElement.classList.add('shaking')
                })
                if (i == 9) {
                    esconderTodasAsCartas(cards)
                }
                if (maxShuffles == i) {
                    cards.forEach(function (cardElement) {
                        cardElement.style.order = Math.floor(Math.random() * 100)
                        cardElement.classList.remove('shaking')
                    })
                    resolve(cards)
                }

            }, shuffleDelay * i)
        }
    })

}

function esconderCarta(card) {
    card.setAttribute('x-state-flipped', '0')
}

function revelarCarta(card) {
    card.setAttribute('x-state-flipped', '1')
}

function esconderTodasAsCartas(cards) {
    cards.forEach(function (cardElement) {
        esconderCarta(cardElement)
    })
}