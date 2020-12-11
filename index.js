let board = document.getElementById('inner-board');

let interval;

/**
 * creates an mxn board using html lists
 * 
 * @param {Number} row number of rows
 * @param {Number} col number of columns
 */
let createBoard = (row, col) => {
    removeAllChildNodes(document.getElementById('inner-board'));
    for(let i = 0; i < row; i++) {
        let div = document.createElement('div');
        div.className = 'list-container';
        let list = document.createElement('ul');
        list.className = 'list'
        for(let j = 0; j < col; j++) {
            let listItem = document.createElement('li');
            listItem.className = 'list-item';
            let text = document.createElement('p');
            text.innerText = '\xA0';
            text.id = `text-${i}x${j}`;
            text.className = 'item-text';
            listItem.appendChild(text);
            listItem.id = `item-${i}x${j}`
            list.appendChild(listItem);
        }
        div.appendChild(list);
        board.appendChild(div);
    }
}


/**
 * handle right click on board
 * toggles flags
 * 
 * @param * e event
 */
let handleContextMenu = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('flagged')) e.target.classList.remove('flagged');
    else {
        if(document.getElementsByClassName('flagged').length === numMines) return;
        e.target.classList.toggle('flagged');
        if(checkWin()) {
            onWin();
            clearListeners();
        }
    }
    changeFlagged();
}


/**
 * handle left click on board
 * 
 * @param {*} e event
 */
let handleClick = (e) => {
    e.preventDefault();
    target = e.target;
    if(target.classList.contains('flagged')) return;
    let obj = parseLocation(target.id);
    if(checkDups(locations, obj)) {
        target.classList.add('mine');
        clearInterval(interval);
        clearListeners();
        let res = document.createElement('h1');
        res.id = 'lost';
        res.className = 'result';
        res.textContent = 'Better Luck Next Time';
        document.getElementById('container').appendChild(res);
        document.getElementById('board').classList.add('opacity');
    }
    else {
        if(checkSpot(locations, obj) === 0) {
            let neighbors = [];
            visited = [];
            getNeighbors(locations, obj, neighbors);
            neighbors.forEach((val) => {
                document.getElementById(`item-${val}`).classList.add('safe');
            });
        }
        else {
            target.innerText = checkSpot(locations, obj);
            target.classList.add('safe');
        }
        clearListener(e.currentTarget);
    }
    if(checkWin()) {
        onWin();
        clearListeners();
    }
}

/**
 * creates listeners for all the board positions
 */
let createListeners = () => {
    let item = document.getElementsByClassName('list-item');
    for(let i = 0; i < item.length; i++) {
        item[i].addEventListener('contextmenu', handleContextMenu);
        item[i].addEventListener('click', handleClick);
    }
}

let onWin = () => {
    let res = document.createElement('h1');
    res.id = 'won';
    res.className = 'result';
    res.textContent = 'Great Job!';
    document.getElementById('container').appendChild(res);
    document.getElementById('board').classList.add('opacity');
    clearInterval(interval);
}


/**
 * converts time from seconds to hh:mm:ss
 * 
 * @param {Number} time time elapsed
 */
let prettyPrint = (time) => {
    let hours = "";
    let minutes = "";
    let seconds = "";
    seconds = (time % 59).toString().padStart(2, '0');
    time = Math.floor(time /= 59);
    minutes = (time % 59).toString().padStart(2, '0');
    time = Math.floor(time /= 23);
    hours = (time % 23).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;

}


/**
 * displays the time elapsed
 * changes every second
 */
let timeElapsed = () => {
    let count = 0;
    interval = setInterval(() => {
        document.getElementById('time-elapsed').innerText = `Time Elapsed: ${prettyPrint(count)}`;
        count++;
    }, 1000);
}


/**
 * change the number of flagged areas
 */
let changeFlagged = () => {
    document.getElementById('num-flagged').innerText =  (`Flags Remaining: ${numMines - document.querySelectorAll('.flagged').length}`);
}


/**
 * clears all listeners from all the board positions
 */
let clearListeners = () => {
    let item = document.getElementsByClassName('list-item');
    for(let i = 0; i < item.length; i++) {
        item[i].removeEventListener('click', handleClick);
        item[i].removeEventListener('contextmenu', handleContextMenu);
    }
}

/**
 * clears all listeners attached to target element
 * 
 * @param {*} target html element
 */
let clearListener = (target) => {
    target.removeEventListener('click', handleClick);
    target.removeEventListener('contextmenu', handleContextMenu);
}

/**
 * resets game board
 * resets time
 * creates new game
 */
let resetClick = () => {
    if(document.getElementsByClassName('result').length > 0) document.getElementById('container').removeChild(document.getElementsByClassName('result')[0]);
    document.getElementById('board').classList.remove('opacity');
    
    removeClassName(document.querySelectorAll('.flagged'), 'flagged');
    removeClassName(document.querySelectorAll('.mine'), 'mine');
    removeClassName(document.querySelectorAll('.safe'), 'safe');
    let text = document.getElementsByClassName('item-text')
    for(let i = 0; i < text.length; i++) {
        text[i].innerText = '\xA0';
    }
    changeFlagged();
    clearInterval(interval);
    timeElapsed();
    createMines();
    createListeners();
}


/**
 * adds event listener to difficulty buttons
 */
let difficultyListener = () => {
    let difficulties = document.getElementsByClassName('difficulty');
    for(let i = 0; i < difficulties.length; i++) {
        difficulties[i].addEventListener('click', changeDifficulty);
    }
}


/**
 * changes the difficulty level
 * 
 * @param {*} e event 
 */
let changeDifficulty = (e) => {
    e.preventDefault();
    let target = e.target;
    if(target.id === 'easy') {
        numMines = 10;
        createBoard(10, 10);
        resetClick();
    }
    else if(target.id === 'medium') {
        numMines = 40;
        createBoard(16, 16);
        resetClick();
        // 16x16
    }
    else {
        numMines = 99;
        createBoard(16, 30);
        resetClick();
        // 16x30
    }
}


/**
 * removes all children nodes from HTML node
 * 
 * @param {*} parent HTML Node
 */
let removeAllChildNodes = (parent) => {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


/**
 * removes class from the elements in the array
 * 
 * @param {*} arr array of html elements
 * @param {String} className name of class
 */
let removeClassName = function(arr, className) {
    arr.forEach((el) => { el.classList.remove(className)});
}

let reset = document.getElementById('reset');
reset.addEventListener('click', resetClick);

createBoard(10, 10);
createListeners();
timeElapsed();
difficultyListener();