const characters = [
    "harry", "hermione", "ron", "dumbledore", "snape", "voldemort", "draco", "luna"
];

const phrases = [
    "La felicidad se puede hallar incluso en los más oscuros momentos, si somos capaces de usar bien la luz. - Albus Dumbledore",
    "No es bueno dejarse arrastrar por los sueños y olvidarse de vivir. - Albus Dumbledore",
    "La varita elige al mago, señor Potter. - Ollivander",
    "Las consecuencias de nuestros actos son siempre tan complicadas, tan diversas, que predecir el futuro es realmente muy difícil. - Albus Dumbledore",
    "No necesitamos magia para transformar nuestro mundo; llevamos todo el poder que necesitamos dentro de nosotros mismos. - Albus Dumbledore"
];

const gameBoard = document.getElementById("game-board");
const popup = document.getElementById("popup");
const heartsContainer = document.getElementById("hearts");
const closeButton = document.getElementById("close-button");
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const playerNameInput = document.getElementById("player-name");
const houseEmblemSelect = document.getElementById("house-emblem");
const congratsMessage = document.getElementById("congrats-message");

let cardArray = [...characters, ...characters];
cardArray.sort(() => 0.5 - Math.random());

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

startButton.addEventListener("click", startGame);

function startGame() {
    const playerName = playerNameInput.value;
    const houseEmblem = houseEmblemSelect.value;

    if (playerName === "") {
        alert("Por favor, ingresa tu nombre.");
        return;
    }

    startScreen.style.display = "none";
    gameBoard.style.display = "grid";
    generateBoard();

    alert(`¡Bienvenido/a ${playerName} de ${houseEmblem}!`);
}

function generateBoard() {
    cardArray.forEach(character => createCard(character));
}

function createCard(character) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">?</div>
            <div class="card-back" style="background-image: url('images/${character}.jpg');"></div>
        </div>
    `;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        disableCards();
        return;
    }
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    matchedPairs++;

    if (matchedPairs === characters.length) {
        setTimeout(() => {
            showPopup();
        }, 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function showPopup() {
    const playerName = playerNameInput.value;
    const houseEmblem = houseEmblemSelect.value;
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    const message = `¡Felicidades ${playerName} de ${houseEmblem}! Has completado el juego con 3500 puntos. "${randomPhrase}"`;

    congratsMessage.textContent = message;
    popup.classList.add("show");
    generateHearts();
}

function generateHearts() {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        heart.style.animationDuration = `${2 + Math.random() * 2}s`;
        heartsContainer.appendChild(heart);
    }
}

closeButton.addEventListener("click", () => {
    popup.classList.remove("show");
});
