let numMines = 10;

let locations = [];

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
    if(x+1 < 10 && y+1 < 10) {
        val += checkDups(arr, {x: x+1, y: y+1}) ? 1 : 0;
    }
    if(x+1 < 10 && y-1 >= 0) {
        val += checkDups(arr, {x: x+1, y: y-1}) ? 1 : 0;
    }
    if(x-1 >= 0 && y+1 < 10) {
        val += checkDups(arr, {x: x-1, y: y+1}) ? 1 : 0;
    }
    if(x-1 >= 0 && y-1 >= 0) {
        val += checkDups(arr, {x: x-1, y: y-1}) ? 1 : 0;
    }
    if(x+1 < 10) {
        val += checkDups(arr, {x: x+1, y: y}) ? 1 : 0;
    }
    if(x-1 >= 0) {
        val += checkDups(arr, {x: x-1, y: y}) ? 1 : 0;
    }
    if(y+1 < 10) {
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
    if(x+1 >= 10 || y+1 >= 10 || x-1 < 0 || y-1 < 0 || visited.includes(str)) return;

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

while(locations.length < numMines) {
    let x = Math.floor(Math.random() * numMines);
    let y = Math.floor(Math.random() * numMines);
    let obj = {x: x, y: y};
    if(!checkDups(locations, obj)) locations.push(obj);
}

console.log(locations);