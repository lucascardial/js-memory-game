(() => {
    function initializeCards(totalCards) {
        const cards = [];

        for (let i = 1; i <= totalCards; i++) {
            cards.push({
                id: i,
            });
        }

        return cards;
    }

    function drawCards(cards) {
        const gameGrid = document.getElementById('game-grid');


        cards.forEach((card, id) => {
            const fruitId = (id + 1 <= 12 ? id : id - 12) + 1;

            const cardElement = document.createElement('div');

            cardElement.classList.add('card');
            cardElement.setAttribute('x-state-flipped', '1');
            cardElement.setAttribute('id', `card-${id}`)

            cardElement.innerHTML = `
                <div class="card-back"></div>
                <div class="card-front" style="background-image: url('images/fruits/fruits-${fruitId}.jpg')"></div>
            `;

            cardElement.addEventListener('click', flipCard);

            gameGrid.append(cardElement);
        });

        animateCards(cards.length);
    }

    function animateCards(totalCards) {
        const deck = document.getElementById('card-deck');
        const cards = document.querySelectorAll('#game-grid .card');

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

            // Evita virar a carta enquanto ela está sendo distribuída.
            card.style.pointerEvents = 'none';

            animation.finished.then((animate) => {


                card.style.pointerEvents = '';

                if (index == totalCards - 1) {
                    setTimeout(() => {
                        shuffleCards(cards)
                    }, 500);
                }
            });
        });
    }

    function flipCard(event) {
        const card = event.currentTarget;
        const isFlipped = card.getAttribute('x-state-flipped') === '1';

        card.setAttribute(
            'x-state-flipped',
            isFlipped ? '0' : '1',
        );
    }

    const cards = initializeCards(24);

    drawCards(cards);
})();