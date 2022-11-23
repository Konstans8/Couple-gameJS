class Card {
    _open = false
    _success = false

    constructor(container, number, action) {
        this.card = document.createElement('div');
        this.card.classList.add('card');
        this.card.textContent = number;
        this.number = number;
        this.card.addEventListener('click', () => {
           if(this.open == false && this.success == false) {
                this.open = true;
                action(this);
           }
        });
        container.append(this.card);
    }

    set open(value) {
        this._open = value;
        value ? this.card.classList.add('open') : this.card.classList.remove('open');
    }
    get open() {
        return this._open;
    }
    set success(value) {
        this._success = value;
        value ? this.card.classList.add('success') : this.card.classList.remove('success');
    }
    get success() {
        return this._success;
    }
}

function flip(card) {
    console.log(card);
}




function newGame(container, cardsCount) {
    cardsCount = cardsCount;
    let cardsNumberArray = [];
    let cardsArray = [];
    let firstCard = null;
    let secondCard = null;

    for(let i = 1; i <= cardsCount / 2; i++) {
        cardsNumberArray.push(i);
        cardsNumberArray.push(i);
    }

    cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5);

    for(const cardNumber of cardsNumberArray) {
        cardsArray.push(new Card(container, cardNumber, flip));
    }

    function flip(card) {
        if(firstCard !== null && secondCard !== null) {
            if(firstCard.number != secondCard.number) {
                firstCard.open = false;
                secondCard.open = false;
                firstCard = null;
                secondCard = null;
            }
        }

        if(firstCard == null) {
            firstCard = card;
        } else {
            if (secondCard == null) {
                secondCard = card;
            }
        }

        if(firstCard !== null && secondCard !== null) {
            if(firstCard.number == secondCard.number) {
                firstCard.success = true;
                secondCard.success = true;
                firstCard = null;
                secondCard = null;
            }
        }

            if(document.querySelectorAll('.card.success').length == cardsNumberArray.length) {
                setTimeout(function win() {
                    alert('You win!');
                }, 500);
                
                setTimeout(function clean() {
                    container.innerHTML = '';
                    let cardsNumberArray = [];
                    let cardsArray = [];
                    let firstCard = null;
                    let secondCard = null;

                    newGame(container, cardsCount); 
                }, 1000);

            }
    }
}

newGame(document.getElementById('game'), 10);