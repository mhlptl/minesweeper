let numMines = 10;

let locations = [];

/**
 * checks if the array of locations contains the given location
 * returns whether the given location was found in the array
 * 
 * @param {Array} arr array of locations
 * @param {Object} obj location of object
 */
let checkDups = (arr, obj) => {
    for(let cur in arr) {
        if(arr[cur].x === obj.x && arr[cur].y === obj.y) return true;
    }
    return false;
}

let checkSpot = (arr, obj) => {
    let x = obj.x;
    let y = obj.y;
    let val = 0;
    let {row, col} = size(numMines);
    if(x+1 < row && y+1 < col) {
        val += checkDups(arr, {x: x+1, y: y+1}) ? 1 : 0;
    }
    if(x+1 < row && y-1 >= 0) {
        val += checkDups(arr, {x: x+1, y: y-1}) ? 1 : 0;
    }
    if(x-1 >= 0 && y+1 < col) {
        val += checkDups(arr, {x: x-1, y: y+1}) ? 1 : 0;
    }
    if(x-1 >= 0 && y-1 >= 0) {
        val += checkDups(arr, {x: x-1, y: y-1}) ? 1 : 0;
    }
    if(x+1 < row) {
        val += checkDups(arr, {x: x+1, y: y}) ? 1 : 0;
    }
    if(x-1 >= 0) {
        val += checkDups(arr, {x: x-1, y: y}) ? 1 : 0;
    }
    if(y+1 < col) {
        val += checkDups(arr, {x: x, y: y+1}) ? 1 : 0;
    }
    if(y-1 >= 0) {
        val += checkDups(arr, {x: x, y: y-1}) ? 1 : 0;
    }
    return val;
}

let visited = [];

let getNeighbors = (arr, obj, neighbors = []) => {
    let x = obj.x;
    let y = obj.y;
    let str = `${obj.x}x${obj.y}`;
    let {row, col} = size(numMines);
    if(x >= row || y >= col || x < 0 || y < 0 || visited.includes(str)) return;

    visited.push(str);

    if(checkSpot(arr, obj) === 0) {
        neighbors.push(str);
        getNeighbors(arr, {x: x+1, y: y+1}, neighbors);
        getNeighbors(arr, {x: x+1, y: y-1}, neighbors);
        getNeighbors(arr, {x: x-1, y: y+1}, neighbors);
        getNeighbors(arr, {x: x-1, y: y-1}, neighbors);
        getNeighbors(arr, {x: x+1, y: y}, neighbors);
        getNeighbors(arr, {x: x-1, y: y}, neighbors);
        getNeighbors(arr, {x: x, y: y+1}, neighbors);
        getNeighbors(arr, {x: x, y: y-1}, neighbors);
    }
}

/**
 * compares the flagged locations to the locations of the mines
 * only checks if the number of flagged locations equals the number of mines
 * returns whether the game has been won
 */
let checkWin = () => {
    let flags = document.getElementsByClassName('flagged');
    if(flags.length < numMines) return false;
    for(let i = 0; i < flags.length; i++) {
        let obj = parseLocation(flags[i].id);
        if(!checkDups(locations, obj)) return false;
    }
    return true;
}

/**
 * parses the location string into a location object
 * 
 * @param {String} str location string
 */
let parseLocation = (str) => {
    let loc = str.substring(5);
    let coords = loc.split('x');
    return {x: Number(coords[0]), y: Number(coords[1])};
}

/**
 * creates mines at random spots on the board
 * stores location object in array
 */
let createMines = () => {
    locations = [];
    let {row, col} = size(numMines);
    while(locations.length < numMines) {
        let x = Math.floor(Math.random() * row);
        let y = Math.floor(Math.random() * col);
        let obj = {x: x, y: y};
        if(!checkDups(locations, obj)) locations.push(obj);
    }
}

/**
 * returns board size corresponding to different number of mines
 * 
 * @param {Number} numMines number of mines in level
 */
let size = (numMines) => {
    if(numMines === 10) return {row: 10, col: 10};
    if(numMines === 40) return {row: 16, col: 16};
    if(numMines === 99) return {row: 16, col: 30};
}

createMines();