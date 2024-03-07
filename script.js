const cellElements = document.querySelectorAll('[grid-cell]');
const winnerText = document.querySelector('[winner-text]');
const winnerElement = document.getElementById('winner-box');
const startElement = document.getElementById('start-box');
const startTextElement = document.querySelector('[start-text]');
const restartElement = document.getElementById('restart');

let circleTurn;
const CLASSLIST = {
    circle: 'circle',
    cross: 'cross'
};
const conditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const handleClick = (e) => {
    // place mark
    const cell = e.target;
    const currentClass = circleTurn ? CLASSLIST.circle: CLASSLIST.cross;
    changeClass(cell, currentClass);
    // check win
    if(checkForWin(currentClass)) {
        winnerText.innerText = `${circleTurn ? 'Cross': 'Circle'} Won!`;
        winnerElement.classList.add('show');
        startElement.classList.add('hide')
    } else if(checkDraw()) {
        winnerText.innerText = `Match Draw!`;
        winnerElement.classList.add('show');
        startElement.classList.add('hide')
    }
};

const changeClass = (cell, className) => {
    if(!cell.classList.value.includes(CLASSLIST.circle) && !cell.classList.value.includes(CLASSLIST.cross)) {
        circleTurn = !circleTurn;
        cell.classList.add(className);
        startTextElement.innerText = `${circleTurn ? "Circle's": "Cross's"} Turn!`;
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
    winnerElement.classList.remove('show');
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
    startElement.classList.remove('hide')
    restartElement.addEventListener('click', handleReStart);
}
startGame();