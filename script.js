const questions = [
    { letter: "A", question: "Es el primer nombre del autor de la serie.", answer: "J.K." },
    { letter: "B", question: "Hermana de Bellatrix Lestrange.", answer: "Narcissa" },
    { letter: "C", question: "Especie de Criatura Mágica que le gusta el oro.", answer: "Duendecillo" },
    { letter: "D", question: "Animal que representa a Hufflepuff.", answer: "Tejón" },
    { letter: "E", question: "Casa de la escuela de magia Hogwarts fundada por Rowena Ravenclaw.", answer: "Ravenclaw" },
    { letter: "F", question: "Amigo fiel de Harry Potter, conocido por su pelo rojo.", answer: "Ron" },
    { letter: "G", question: "Deporte más popular del mundo mágico.", answer: "Quidditch" },
    { letter: "H", question: "Nombre del colegio donde Harry Potter estudia magia.", answer: "Hogwarts" },
    { letter: "I", question: "Nombre del banco mágico en el Callejón Diagon.", answer: "Gringotts" },
    { letter: "J", question: "El símbolo de los Horrocruxes.", answer: "Medallón" },
    { letter: "K", question: "Apellido del mago tenebroso más poderoso de todos los tiempos.", answer: "Voldemort" },
    { letter: "L", question: "Nombre de la amiga de Harry Potter que es muy inteligente.", answer: "Hermione" },
    { letter: "M", question: "Nombre del mapa que muestra toda Hogwarts y sus ocupantes.", answer: "Merodeador" },
    { letter: "N", question: "Criatura mágica que se alimenta de los sueños de las personas.", answer: "Boggart" },
    { letter: "O", question: "Especie de búho mascota de Harry Potter.", answer: "Hedwig" },
    { letter: "P", question: "El nombre de pila del primer Ministro de Magia que aparece en la serie.", answer: "Cornelius" },
    { letter: "Q", question: "Nombre del deporte que se juega en el aire sobre escobas voladoras.", answer: "Quidditch" },
    { letter: "R", question: "Casa de la escuela de magia Hogwarts fundada por Godric Gryffindor.", answer: "Gryffindor" },
    { letter: "S", question: "Criatura mágica gigante con muchos ojos.", answer: "Aragog" },
    { letter: "T", question: "El Patronus de Harry Potter.", answer: "Ciervo" },
    { letter: "U", question: "Profesor de Defensa Contra las Artes Oscuras en el segundo año de Harry.", answer: "Lockhart" },
    { letter: "V", question: "Nombre del tren que lleva a los estudiantes a Hogwarts.", answer: "Expreso de Hogwarts" },
    { letter: "W", question: "La maldición asesina.", answer: "Avada Kedavra" },
    { letter: "X", question: "Xenophilius, padre de Luna Lovegood, es editor de esta revista.", answer: "El Quisquilloso" },
    { letter: "Y", question: "Piedra mágica que crea el Elixir de la Vida.", answer: "Filosofal" },
    { letter: "Z", question: "Nombre del encantamiento para abrir cerraduras.", answer: "Alohomora" },
    // Más preguntas pueden ser añadidas aquí
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let selectedQuestions = shuffleArray(questions).slice(0, 5);
let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

document.addEventListener("DOMContentLoaded", () => {
    const circle = document.getElementById("circle");
    const questionElement = document.getElementById("question");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit-answer");
    const correctAnswersElement = document.getElementById("correct-answers");
    const wrongAnswersElement = document.getElementById("wrong-answers");
    const resultContainer = document.getElementById("result-container");
    const accuracyElement = document.getElementById("accuracy");
    const correctList = document.getElementById("correct-list");
    const wrongList = document.getElementById("wrong-list");

    function createCircle() {
        selectedQuestions.forEach((q, index) => {
            const letterElement = document.createElement("div");
            letterElement.classList.add("letter");
            letterElement.textContent = q.letter;
            letterElement.dataset.index = index;
            circle.appendChild(letterElement);
        });
    }

    function showQuestion(index) {
        const question = selectedQuestions[index];
        questionElement.textContent = question.question;
    }

    function endGame() {
        const totalQuestions = selectedQuestions.length;
        const accuracy = (correctAnswers / totalQuestions) * 100;

        accuracyElement.textContent = accuracy.toFixed(2);

        selectedQuestions.forEach((q, index) => {
            const listItem = document.createElement("li");
            if (q.correct) {
                listItem.textContent = `${q.letter}: ${q.question} - ${q.answer}`;
                correctList.appendChild(listItem);
            } else {
                listItem.textContent = `${q.letter}: ${q.question} - Tu respuesta: ${q.userAnswer || 'Ninguna'} (Correcta: ${q.answer})`;
                wrongList.appendChild(listItem);
            }
        });

        resultContainer.style.display = "block"; // Aquí se muestra el contenedor de resultados
    }

    submitButton.addEventListener("click", () => {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = selectedQuestions[currentQuestionIndex].answer.toLowerCase();
        const letterElement = document.querySelector(`.letter[data-index='${currentQuestionIndex}']`);

        if (userAnswer === correctAnswer) {
            correctAnswers++;
            correctAnswersElement.textContent = correctAnswers;
            letterElement.classList.add("correct");
            selectedQuestions[currentQuestionIndex].correct = true;
        } else {
            wrongAnswers++;
            wrongAnswersElement.textContent = wrongAnswers;
            letterElement.classList.add("wrong");
            selectedQuestions[currentQuestionIndex].correct = false;
            selectedQuestions[currentQuestionIndex].userAnswer = userAnswer;
        }

        answerInput.value = '';
        currentQuestionIndex++;

        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            endGame();
        }
    });

    createCircle();
    showQuestion(currentQuestionIndex);
});
