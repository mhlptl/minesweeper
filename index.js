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
 * @param {*} e event
 */
let handleContextMenu = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('flagged')) e.target.classList.remove('flagged');
    else {
        if(document.getElementsByClassName('flagged').length === game.numMines) return;
        e.target.classList.toggle('flagged');
        if(checkWin()) {
            onWin();
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
    if(checkDups(game.locations, obj)) {
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
        if(checkSpot(game.locations, obj) === 0) {
            let neighbors = getNeighbors(game.locations, obj);
            neighbors.forEach((val) => {
                let item = document.getElementById(`item-${val}`);
                item.classList.add('safe');
                clearListener(item);
            });
        }
        else {
            target.innerText = checkSpot(game.locations, obj);
            target.classList.add('safe');
        }
        clearListener(e.currentTarget);
    }
    if(checkWin()) {
        onWin();
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


/**
 * when a player wins clear all listeners and pause timer
 */
let onWin = () => {
    let res = document.createElement('h1');
    res.id = 'won';
    res.className = 'result';
    res.textContent = 'Great Job!';
    document.getElementById('container').appendChild(res);
    document.getElementById('board').classList.add('opacity');
    clearInterval(interval);
    clearListeners();
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
    document.getElementById('num-flagged').innerText =  (`Flags Remaining: ${game.numMines - document.querySelectorAll('.flagged').length}`);
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
 * resets game
 */
let resetClick = () => {
    let {row, col} = size(game.numMines);
    game.startGame(row, col, game.numMines);
}


/**
 * clears screen
 */
let clearAll = () => {
    if(document.getElementsByClassName('result').length > 0) document.getElementById('container').removeChild(document.getElementsByClassName('result')[0]);
    document.getElementById('board').classList.remove('opacity');
    document.getElementById('time-elapsed').innerText = 'Time Elapsed: 00:00:00';

    removeClassName(document.querySelectorAll('.flagged'), 'flagged');
    removeClassName(document.querySelectorAll('.mine'), 'mine');
    removeClassName(document.querySelectorAll('.safe'), 'safe');

    let text = document.getElementsByClassName('item-text')
    for(let i = 0; i < text.length; i++) {
        text[i].innerText = '\xA0';
    }
    
    changeFlagged();
    clearInterval(interval);
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
        game.startGame(10, 10, 10);
    }
    else if(target.id === 'medium') {
        game.startGame(16, 16, 40);
    }
    else {
        game.startGame(16, 30, 99);
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