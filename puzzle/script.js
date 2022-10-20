let sizeCell = 100;
let sizeBoard = 4;

const numbersGame = [];
for (let i = 1; i < sizeBoard * sizeBoard; i++) {
    numbersGame.push(i);
}
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


// Create elements
const wrap = document.createElement('div');
wrap.className = 'wrap';
document.body.append(wrap);

// Buttons
const wrapBtn = document.createElement('div');
wrapBtn.className = 'wrap-btn';
wrap.append(wrapBtn);

const btnStart = document.createElement('button');
btnStart.innerHTML = 'Shuffle and start'
btnStart.className = 'btn btn-start';
wrapBtn.append(btnStart);

const btnResult = document.createElement('button');
btnResult.innerHTML = 'Results'
btnResult.className = 'btn';
wrapBtn.append(btnResult);

//Time / moves
const wrapInfo = document.createElement('div');
wrapInfo.className = 'wrap-info';
wrap.append(wrapInfo);

const txtMoves = document.createElement('div');
txtMoves.textContent = 'Moves:'
wrapInfo.append(txtMoves);


// Game board
const gameBoard = document.createElement('div');
gameBoard.className = 'game-board';
gameBoard.style.width = `${sizeCell * sizeBoard}px`;
gameBoard.style.height = `${sizeCell * sizeBoard}px`;
wrap.append(gameBoard);


// Create cells

const empty = {
    value: 0,
    bottom: 0,
    right: 0
}

const arrCells = [];


function moveCell(index) {
    const cell = arrCells[index - 1];

    // moving only neighborhood cells

    let diffRight = Math.abs(cell.right - empty.right);
    let diffBottom = Math.abs(cell.bottom - empty.bottom);

    if (diffRight + diffBottom > 1) {
        return;
    }

    let valueEmptyBottom = empty.bottom;
    let valueEmptyRight = empty.right;

    cell.elem.style.bottom = `${empty.bottom * sizeCell}px`;
    cell.elem.style.right = `${empty.right * sizeCell}px`;

    empty.right = cell.right;
    empty.bottom = cell.bottom;

    cell.right = valueEmptyRight;
    cell.bottom = valueEmptyBottom;

    const win = arrCells.every(elem => {
        return elem.value === 16 - (elem.bottom * sizeBoard + elem.right);
    })

    if(win) {
        console.log('win');
    }
}


for (let i = 1; i < sizeBoard * sizeBoard; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.style.width = `${sizeCell}px`
    cell.style.height = `${sizeCell}px`

    cell.innerHTML = sizeBoard * sizeBoard - i;

    const right = i % sizeBoard;
    const bottom = (i - right) / sizeBoard;

    arrCells.push( {
        value: sizeBoard * sizeBoard - i,
        bottom: bottom,
        right: right,
        elem: cell
    })

    cell.style.right =`${right * sizeCell}px`;
    cell.style.bottom =`${bottom * sizeCell}px`;

    gameBoard.append(cell);

    cell.addEventListener('click', function() {
        moveCell(i)
    })
}

// Start

btnStart.addEventListener('click', function() {
    const cells = document.querySelectorAll('.cell');
    const arrCells = Array.from(cells);
    const numbersInBoard = shuffle(numbersGame);
    for(let i = 0; i < arrCells.length; i++) {
        arrCells[i].innerHTML = numbersInBoard[i];
    }
});



