const levels = {
    "Networking": [
        { question: "What does DHCP stand for?", options: ["Dynamic Host Configuration Protocol", "Dynamic Host Control Protocol"], answer: "Dynamic Host Configuration Protocol" },
        { question: "What is the purpose of a router?", options: ["Connect different networks", "Store user data"], answer: "Connect different networks" }
    ],
    "Security": [
        { question: "What does VPN stand for?", options: ["Virtual Private Network", "Variable Public Network"], answer: "Virtual Private Network" },
        { question: "What is a firewall?", options: ["A software that protects your network", "A type of virus"], answer: "A software that protects your network" }
    ],
    "Programming": [
        { question: "What does HTML stand for?", options: ["Hypertext Markup Language", "Hyperlink and Text Markup Language"], answer: "Hypertext Markup Language" },
        { question: "Which language is primarily used for web development?", options: ["JavaScript", "C++"], answer: "JavaScript" }
    ]
};

let currentLevel = 0;
let currentQuestionIndex = 0;
let score = 0;

const startButton = document.getElementById('start-button');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < levels[Object.keys(levels)[currentLevel]].length) {
        showQuestion();
    } else {
        currentLevel++;
        currentQuestionIndex = 0;
        if (currentLevel < Object.keys(levels).length) {
            showQuestion();
        } else {
            endGame();
        }
    }
});

restartButton.addEventListener('click', restartGame);

function startGame() {
    currentLevel = 0;
    score = 0;
    startButton.classList.add('hidden');
    scoreContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const levelName = Object.keys(levels)[currentLevel];
    const questionData = levels[levelName][currentQuestionIndex];
    questionElement.textContent = questionData.question;
    optionsElement.innerHTML = '';

    questionData.options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => selectOption(option, questionData.answer));
        optionsElement.appendChild(button);
    });

    nextButton.classList.add('hidden');
}

function selectOption(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score++;
    }
    nextButton.classList.remove('hidden');
    optionsElement.querySelectorAll('button').forEach((button) => {
        button.disabled = true;
    });
}

function endGame() {
    questionContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreElement.textContent = score;
}

function restartGame() {
    score = 0;
    currentLevel = 0;
    currentQuestionIndex = 0;
    questionContainer.classList.add('hidden');
    scoreContainer.classList.add('hidden');
    startButton.classList.remove('hidden');
}
}
