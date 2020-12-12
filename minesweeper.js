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


/**
 * checks if location object's neighbors are in the array of locations
 * 
 * @param {Array} arr array of locations
 * @param {Object} obj location object
 */
let checkSpot = (arr, obj) => {
    let x = obj.x;
    let y = obj.y;
    let val = 0;
    let {row, col} = size(game.numMines);
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


/**
 * uses dfs to get neighbors of the location object
 * 
 * @param {Array} arr array of locations
 * @param {Object} obj location object
 */
let getNeighbors = (arr, obj) => {
    let visited = [];
    let neighbors = [];
    return getNeighborsHelper(arr, obj, neighbors, visited);
}


/**
 * recursively visits the neighbors of the current location and stores
 * them inside the neighbors array if they have the value of zero
 * 
 * @param {Array} arr location array
 * @param {Object} obj location object
 * @param {Array} neighbors array of neighbors
 * @param {Array} visited visited nodes
 */
let getNeighborsHelper = (arr, obj, neighbors = [], visited = []) => {
    let x = obj.x;
    let y = obj.y;
    let str = `${obj.x}x${obj.y}`;
    let {row, col} = size(game.numMines);
    if(x >= row || y >= col || x < 0 || y < 0 || visited.includes(str)) return;

    visited.push(str);

    if(checkSpot(arr, obj) === 0) {
        neighbors.push(str);
        getNeighborsHelper(arr, {x: x+1, y: y+1}, neighbors, visited);
        getNeighborsHelper(arr, {x: x+1, y: y-1}, neighbors, visited);
        getNeighborsHelper(arr, {x: x-1, y: y+1}, neighbors, visited);
        getNeighborsHelper(arr, {x: x-1, y: y-1}, neighbors, visited);
        getNeighborsHelper(arr, {x: x+1, y: y}, neighbors, visited);
        getNeighborsHelper(arr, {x: x-1, y: y}, neighbors, visited);
        getNeighborsHelper(arr, {x: x, y: y+1}, neighbors, visited);
        getNeighborsHelper(arr, {x: x, y: y-1}, neighbors, visited);
        return neighbors;
    }
}


/**
 * compares the flagged locations to the locations of the mines
 * only checks if the number of flagged locations equals the number of mines
 * returns whether the game has been won
 */
let checkWin = () => {
    let flags = document.getElementsByClassName('flagged');
    if(flags.length < game.numMines) return false;
    for(let i = 0; i < flags.length; i++) {
        let obj = parseLocation(flags[i].id);
        if(!checkDups(game.locations, obj)) return false;
    }
    return true;
}


/**
 * creates mines at random spots on the board
 * stores location object in array
 */
let createMines = () => {
    let locations = [];
    let {row, col} = size(game.numMines);
    while(locations.length < game.numMines) {
        let x = Math.floor(Math.random() * row);
        let y = Math.floor(Math.random() * col);
        let obj = {x: x, y: y};
        if(!checkDups(locations, obj)) locations.push(obj);
    }
    return locations;
}

let game = new Game();
game.startGame(10, 10, 10);