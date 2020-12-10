let numMines = 10;

let locations = [];

let checkDups = (arr, obj) => {
    for(let cur in arr) {
        if(arr[cur].x === obj.x && arr[cur].y === obj.y) return true;
    }
    return false;
}

while(locations.length < numMines) {
    let x = Math.floor(Math.random() * numMines);
    let y = Math.floor(Math.random() * numMines);
    let obj = {x: x, y: y};
    if(!checkDups(locations, obj)) locations.push(obj);
}

console.log(locations);