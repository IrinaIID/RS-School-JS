let sizeCell;
const screenWidth = document.body.clientWidth;
if (screenWidth < 450) {
    sizeCell = 75;
} else {
   sizeCell = 100;
}

let sizeBoard = 4;

let winGame = false;
let goTimer = false;
let playSound = true;
let num = 0;

// Audio
const sound = new Audio;
sound.src = 'assets/click.mp3';

// Create elements
const wrap = document.createElement('div');
wrap.className = 'wrap';
document.body.append(wrap);

const listResults = document.createElement('div');
listResults.className = 'list-results';
wrap.append(listResults);

let arrResults = [];
function writeResults(time, moves, size) {
    const date = new Date;
    const str = `TIME ${time}, MOVES ${moves}
    ${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}
    ${size}x${size}
    `;
    if (arrResults.length < 10) {
        arrResults.push(str)
    } else {
        arrResults.shift();
        arrResults.push(str)
    }
}

// Buttons
const wrapBtn = document.createElement('div');
wrapBtn.className = 'wrap-btn';
wrap.append(wrapBtn);

const btnSound = document.createElement('button');
btnSound.className = 'btn btn-sound';
wrapBtn.append(btnSound);

btnSound.addEventListener('click', function() {
    btnSound.classList.toggle('btn-sound-off');
    if(playSound === true) {
        sound.volume = 0;
        playSound = false;
    } else {
        sound.volume = 1;
        playSound = true;
    }
})

const btnStart = document.createElement('button');
btnStart.innerHTML = 'Shuffle and start'
btnStart.className = 'btn btn-start';
wrapBtn.append(btnStart);

btnStart.addEventListener('click', function() {
    shuffleBoard(sizeCell, sizeBoard);
});

const btnResult = document.createElement('button');
btnResult.innerHTML = 'Results'
btnResult.className = 'btn';
wrapBtn.append(btnResult);

btnResult.addEventListener('click', function() {
    listResults.classList.toggle('list-results-on');
})

function shuffleBoard(sizeCell, sizeBoard) {
    num = 0;
    const board = document.querySelector('.game-board');
    board.remove();
    createGame(sizeCell, sizeBoard);
}


// Check size
const wrapChecks = document.createElement('div');
wrapChecks.className = 'wrap-check';
wrap.append(wrapChecks);

const textSize = document. createTextNode('Size:');
wrapChecks.append(textSize);

for (let i = 1; i < 7; i++) {
    const inputSize = document.createElement('input');
    inputSize.type = 'radio';
    inputSize.name = 'size';
    inputSize.className = 'input-radio';
    inputSize.id = `${i}`
    inputSize.value = i + 2;

    const labelSize = document.createElement('label')
    labelSize.htmlFor = `${i}`;
    labelSize.className = 'label-radio'
    labelSize.append(document.createTextNode(`${i + 2}x${i + 2}`));

    wrapChecks.append(inputSize);
    wrapChecks.append(labelSize);

    inputSize.addEventListener('click', function() {
        valueTime.innerHTML = '0:00';
        num = 0;

        sizeBoard = inputSize.value;
        const screenWidth = document.body.clientWidth;

        if (screenWidth < 450) {
            sizeBoard > 7 ?
            sizeCell = 37 : sizeBoard > 6 ?
            sizeCell = 42 : sizeBoard > 5 ?
            sizeCell = 50 : sizeBoard > 4 ?
            sizeCell = 60 : sizeBoard > 3 ?
            sizeCell = 75 : sizeCell = 80;
        } else if (screenWidth < 600 && sizeBoard > 4) {sizeCell = 55}
            else  if (screenWidth < 850 && sizeBoard > 5) {sizeCell = 70}
            else {
                if (sizeBoard > 6) {sizeCell = 80} else {
                    sizeCell = 100;
                }
            }

        shuffleBoard(sizeCell, sizeBoard);
    })
}


const allRadios = document.querySelectorAll('.input-radio');
allRadios[1].checked = true;


// Moves / time
const wrapInfo = document.createElement('div');
wrapInfo.className = 'wrap-info';
wrap.append(wrapInfo);

const txtMoves = document.createElement('div');
txtMoves.textContent = 'Moves:'
wrapInfo.append(txtMoves);

const valueMoves = document.createElement('div');
valueMoves.className = 'val-moves'
wrapInfo.append(valueMoves);

const txtTime = document.createElement('div');
txtTime.textContent = 'Time'
wrapInfo.append(txtTime);

const valueTime = document.createElement('div');
valueTime.className = 'val-time'
valueTime.innerHTML = '00:00';
wrapInfo.append(valueTime);


// Game board

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// odd board = 1; even board = 0;
function isSolve(arr) {
    const board = sizeBoard % 2;

    let count = 0;
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            if (arr[i] < arr[j]) {
                count ++;
            }
        }
    }

    if (board === 1 && count % 2 === 0) {return true};
    if (board === 0 && (count + (sizeBoard - 1)) % 2 === 0) {return true}
    return false;
}


function createGame(sizeCell, sizeBoard) {

    const gameBoard = document.createElement('div');
    gameBoard.className = 'game-board';
    gameBoard.style.width = `${sizeCell * sizeBoard}px`;
    gameBoard.style.height = `${sizeCell * sizeBoard}px`;
    wrap.append(gameBoard);

    const winMessage = document.createElement('div');
    winMessage.className = 'win-message';
    gameBoard.append(winMessage);

    let countMoves = 0;
    valueMoves.innerHTML = countMoves;

    function moveCell(index) {

        if (goTimer === false) {
            timer();
            goTimer = true;
        }

        const cell = arrCells[index - 1];

        // moving only neighborhood cells

        let diffRight = Math.abs(cell.right - empty.right);
        let diffBottom = Math.abs(cell.bottom - empty.bottom);

        if (diffRight + diffBottom > 1) {
            return;
        }
        sound.play();
        countMoves += 1;
        valueMoves.innerHTML = countMoves;

        let valueEmptyBottom = empty.bottom;
        let valueEmptyRight = empty.right;

        cell.elem.style.bottom = `${empty.bottom * sizeCell}px`;
        cell.elem.style.right = `${empty.right * sizeCell}px`;

        empty.right = cell.right;
        empty.bottom = cell.bottom;

        cell.right = valueEmptyRight;
        cell.bottom = valueEmptyBottom;

        const win = arrCells.every(elem => {
            return sizeBoard * sizeBoard - elem.elem.innerHTML === elem.bottom * sizeBoard + elem.right;
        })

        if(win) {
            const winBlock = document.querySelector('.win-message');
            winMessage.innerHTML = `YOU WIN!
            moves  ${valueMoves.innerHTML}
            time  ${valueTime.innerHTML}
            `;

            winBlock.classList.add('win-message-on');
            winGame = true;

            writeResults(valueTime.innerHTML, valueMoves.innerHTML, sizeBoard);
            listResults.innerHTML = arrResults;
        }
    }

    const numbersGame = [];
    for (let i = 1; i < sizeBoard * sizeBoard; i++) {
        numbersGame.push(i);
    }

    let numbersGameShuffle = shuffle(numbersGame);
    while(isSolve(numbersGameShuffle) === false) {
        numbersGameShuffle = shuffle(numbersGame);
    }

    // Create cells

    const empty = {
        value: 0,
        bottom: 0,
        right: 0
    }

    const arrCells = [];

    for (let i = 1; i < sizeBoard * sizeBoard; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.width = `${sizeCell}px`
        cell.style.height = `${sizeCell}px`

        const right = i % sizeBoard;
        const bottom = (i - right) / sizeBoard;

        arrCells.push( {
            value: sizeBoard * sizeBoard - i,
            bottom: bottom,
            right: right,
            elem: cell
        })

        cell.innerHTML = numbersGameShuffle[i -1];

        cell.style.right =`${right * sizeCell}px`;
        cell.style.bottom =`${bottom * sizeCell}px`;

        gameBoard.append(cell);

        cell.addEventListener('click', function() {
            moveCell(i);
        })
    }

    const cells = Array.from(document.querySelectorAll('.cell'));
    if (sizeCell <= 70) {
        cells.forEach(e => {
            e.style.fontSize = '16px';
            e.style.border = '2px solid'
        })
    }
}

createGame(sizeCell, sizeBoard);


// Time

function timer() {
    //turn 128 seconds into 2:08
    function getTimeCodeFromNum(num) {
        let seconds = parseInt(num, 10);
        let minutes = parseInt((seconds / 60), 10);
        seconds -= minutes * 60;
        const hours = parseInt(minutes / 60);
        minutes -= hours * 60;

        if (hours === 0) {
            return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
        }
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
        ).padStart(2, 0)}`;
    }

    let timerSet = setInterval( function() {
        if (winGame === true) {
            clearInterval(timerSet);
            winGame = false;
            goTimer = false;
        }
        num +=1;
        let time = getTimeCodeFromNum(num);
        valueTime.innerHTML = time;
    }, 1000);
}


// Localstorege

// function setLocalStorege() {
//         localStorage.setItem('arrResults', arrResults);
//         localStorage.setItem('res', listResults.innerHTML);
//     }

// window.addEventListener('beforeunload', setLocalStorege);

// function getLocalStorege() {
//         if (localStorage.getItem('arrResults')) {
//             arrResults = localStorage.getItem('arrResults');
//         }
//         if (localStorage.getItem('res')) {
//             listResults.innerHTML = localStorage.getItem('res');
//         }
//     }

// window.addEventListener('load', getLocalStorege);


