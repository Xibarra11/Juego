const words = ["javascript", "cultura", "tecnologia", "ahorcado", "programacion"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let correctLetters = [];
let wrongLetters = [];
let maxAttempts = 6;
let errors = 0;

const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const letterInput = document.getElementById('letter-input');
const playAgainButton = document.getElementById('play-again');
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

// Dibujar la horca inicial
function drawBase() {
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ff6f61';

    // Base
    ctx.beginPath();
    ctx.moveTo(10, 280);
    ctx.lineTo(190, 280);
    ctx.stroke();

    // Poste vertical
    ctx.beginPath();
    ctx.moveTo(50, 280);
    ctx.lineTo(50, 20);
    ctx.stroke();

    // Poste horizontal
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.lineTo(150, 20);
    ctx.stroke();

    // Cuerda
    ctx.beginPath();
    ctx.moveTo(150, 20);
    ctx.lineTo(150, 50);
    ctx.stroke();
}

// Dibujar el ahorcado paso a paso
function drawHangman(errors) {
    switch (errors) {
        case 1: // Cabeza
            ctx.beginPath();
            ctx.arc(150, 70, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 2: // Cuerpo
            ctx.beginPath();
            ctx.moveTo(150, 90);
            ctx.lineTo(150, 170);
            ctx.stroke();
            break;
        case 3: // Brazo izquierdo
            ctx.beginPath();
            ctx.moveTo(150, 100);
            ctx.lineTo(120, 130);
            ctx.stroke();
            break;
        case 4: // Brazo derecho
            ctx.beginPath();
            ctx.moveTo(150, 100);
            ctx.lineTo(180, 130);
            ctx.stroke();
            break;
        case 5: // Pierna izquierda
            ctx.beginPath();
            ctx.moveTo(150, 170);
            ctx.lineTo(120, 210);
            ctx.stroke();
            break;
        case 6: // Pierna derecha
            ctx.beginPath();
            ctx.moveTo(150, 170);
            ctx.lineTo(180, 210);
            ctx.stroke();
            break;
    }
}

function displayWord() {
    wordElement.innerHTML = selectedWord
        .split('')
        .map(letter => (correctLetters.includes(letter) ? letter : '_'))
        .join(' ');
}

function updateWrongLetters() {
    wrongLettersElement.innerHTML = `Letras incorrectas: ${wrongLetters.join(', ')}`;
}

function checkGameStatus() {
    if (!wordElement.textContent.includes('_')) {
        alert('¡Felicidades! Ganaste.');
        resetGame();
    }

    if (errors >= maxAttempts) {
        alert(`Perdiste. La palabra era: ${selectedWord}`);
        resetGame();
    }
}

function resetGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    correctLetters = [];
    wrongLetters = [];
    errors = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBase();
    displayWord();
    updateWrongLetters();
}

letterInput.addEventListener('input', () => {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = '';

    if (letter.match(/^[a-z]$/) && !correctLetters.includes(letter) && !wrongLetters.includes(letter)) {
        if (selectedWord.includes(letter)) {
            correctLetters.push(letter);
        } else {
            wrongLetters.push(letter);
            errors++;
            drawHangman(errors);
        }
        displayWord();
        updateWrongLetters();
        checkGameStatus();
    }
});

playAgainButton.addEventListener('click', resetGame);

drawBase();
displayWord();
updateWrongLetters();