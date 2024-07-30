document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("spin-button").addEventListener("click", spin);

const colorPoints = {
    red: 1000,
    green: 2000,
    purple: 3000,
    black: 4000,
    blue: 5000,
    brown: 6000,
    pink: 7000,
    white: 8000,
    gray: 9000
};

const colors = Object.keys(colorPoints);
const sections = colors.length;
const segmentAngle = 360 / sections;

function startGame() {
    const playerName = document.getElementById("player-name").value;
    const houseEmblem = document.getElementById("house-emblem").value;

    if (playerName === "") {
        alert("Por favor, ingresa tu nombre.");
        return;
    }

    if (localStorage.getItem(playerName)) {
        alert("Ya has girado la ruleta.");
        return;
    }

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("ruleta-container").style.display = "flex";
}

function spin() {
    const spinButton = document.getElementById("spin-button");
    const playerName = document.getElementById("player-name").value;

    spinButton.disabled = true;
    const ruleta = document.getElementById("ruleta");
    const randomDegree = Math.floor(Math.random() * 360) + 3600; // Gira al menos 10 vueltas completas

    ruleta.style.transition = "transform 4s ease-out";
    ruleta.style.transform = `rotate(${randomDegree}deg)`;

    ruleta.addEventListener("transitionend", () => {
        const resultMessage = document.getElementById("result-message");
        const houseEmblem = document.getElementById("house-emblem").value;
        
        // Calcula el ángulo en el que se detuvo la rueda
        const finalDegree = randomDegree % 360;
        // Calcula el índice de la sección basada en el ángulo final
        const sectionIndex = Math.floor((360 - finalDegree) / segmentAngle);
        const resultColor = colors[sectionIndex];
        const resultPoints = colorPoints[resultColor];

        resultMessage.textContent = `¡Felicidades! Has ganado ${resultPoints} puntos, ${playerName} de ${houseEmblem}. El color es ${resultColor}.`;
        resultMessage.style.display = "block";

        localStorage.setItem(playerName, true);
    }, { once: true });
}
