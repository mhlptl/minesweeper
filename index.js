let board = document.getElementById('inner-board');

let interval;

for(let i = 0; i < 10; i++) {
    let div = document.createElement('div');
    div.className = 'list-container';
    let list = document.createElement('ul');
    list.className = 'list'
    for(let j = 0; j < 10; j++) {
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

let item = document.getElementsByClassName('list-item');

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


let createListeners = () => {
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
}

let prettyPrint = (time) => {
    let hours = "";
    let minutes = "";
    let seconds = "";
    seconds = (time % 59).toString().padStart(2, '0');
    time = Math.floor(time /= 59);
    minutes = (time % 59).toString().padStart(2, '0');
    time = Math.floor(time /= 23);
    hours = (time % 59).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;

}

let timeElapsed = () => {
    let count = 0;
    interval = setInterval(() => {
        document.getElementById('time-elapsed').innerText = `Time Elapsed: ${prettyPrint(count)}`;
        count++;
    }, 1000);
}

let changeFlagged = () => {
    document.getElementById('num-flagged').innerText =  (`Flags Remaining: ${10 - document.querySelectorAll('.flagged').length}`);
}


let clearListeners = () => {
    for(let i = 0; i < item.length; i++) {
        item[i].removeEventListener('click', handleClick);
        item[i].removeEventListener('contextmenu', handleContextMenu);
    }
}

let clearListener = (target) => {
    target.removeEventListener('click', handleClick);
    target.removeEventListener('contextmenu', handleContextMenu);
}

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

let removeClassName = function(arr, className) {
    arr.forEach((el) => { el.classList.remove(className)});
}

let reset = document.getElementById('reset');
reset.addEventListener('click', resetClick);

createListeners();
timeElapsed();