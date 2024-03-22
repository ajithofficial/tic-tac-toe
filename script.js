const cellElements = document.querySelectorAll('[grid-cell]');
const winnerText = document.querySelector('[winner-text]');
const winnerElement = document.getElementById('winner-box');
const startElement = document.getElementById('start-box');
const startTextElement = document.querySelector('[start-text]');
const restartElement = document.getElementById('restart');
const aboutMeElement = document.getElementById('about-me');

const xSound = new Audio('./assets/audio/x_sound.mp3');
const oSound = new Audio('./assets/audio/o_sound.mp3');
const welcomeSound = new Audio('./assets/audio/welcome.mp3');
const wonSound = new Audio('./assets/audio/won.mp3');
const drawSound = new Audio('./assets/audio/draw.mp3');

let circleTurn;
const CLASSLIST = {
    circle: 'circle',
    cross: 'cross',
    show: 'show',
    hide: 'hide'
};
const conditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const triggerWelcomeSound = () => {
    welcomeSound.play();
    welcomeSound.muted = false;
    setTimeout(()=> {
        welcomeSound.pause();
        welcomeSound.currentTime = 0;
        welcomeSound.remove();
        // voice assistant
        const utterThis = new SpeechSynthesisUtterance(`Welcome to the Game!`);
        const synth = window.speechSynthesis;
        synth.speak(utterThis);
    }, 2000);
}

window.onload = triggerWelcomeSound;

const handleClick = (e) => {
    // place mark
    const cell = e.target;
    const currentClass = circleTurn ? CLASSLIST.circle: CLASSLIST.cross;
    changeClass(cell, currentClass);
    // check win
    if(checkForWin(currentClass)) {
        const utterThis = new SpeechSynthesisUtterance(`Player ${circleTurn ? 'X': 'O'} Won!`);
        const synth = window.speechSynthesis;
        synth.speak(utterThis);
        setTimeout(() => {
            wonSound.play();
            winnerText.innerText = `${circleTurn ? 'X': 'O'} Won!`;
            winnerElement.classList.add(CLASSLIST.show);
            startElement.classList.add(CLASSLIST.hide)
        }, 1000);
    } else if(checkDraw()) {
        drawSound.play();
        winnerText.innerText = `Match Draw!`;
        winnerElement.classList.add(CLASSLIST.show);
        startElement.classList.add(CLASSLIST.hide)
    }
};

const changeSound = (circleTurn) => {
    if(circleTurn) {
        oSound.play();
    } else {
        xSound.play();
    }
}

const changeClass = (cell, className) => {
    if(!cell.classList.value.includes(CLASSLIST.circle) && !cell.classList.value.includes(CLASSLIST.cross)) {
        circleTurn = !circleTurn;
        cell.classList.add(className);
        startTextElement.innerText = `${circleTurn ? "O's": "X's"} Turn!`;
        // change sound
        changeSound(circleTurn);
    }
}

const checkForWin = (currentClass) => {
    return conditions.some(condition => {
        return condition.every(index => {
            if(cellElements[index]) {
                return cellElements[index].classList.contains(currentClass)
            }
        });
    })
}
const checkDraw = () => {
    return [...cellElements].every((cell) => (cell.classList.contains(CLASSLIST.circle) || cell.classList.contains(CLASSLIST.cross)));
}

const handleReStart = () => {
    winnerElement.classList.remove(CLASSLIST.show);
    triggerWelcomeSound();
    startGame();
}


const startGame = () => {
    circleTurn = true;
    cellElements.forEach((cell) => {
        cell.classList.remove(CLASSLIST.circle);
        cell.classList.remove(CLASSLIST.cross);
        cell.addEventListener('click', handleClick, { once: true });
    });
    startTextElement.innerText = `Let's Play`;
    startElement.classList.remove(CLASSLIST.hide)
    restartElement.addEventListener('click', handleReStart);
    // About me
    aboutMeElement.addEventListener('click', () => {
        window.open('https://www.linkedin.com/in/iamajithak/', '_blank');
    });
}
startGame();