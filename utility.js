class Game {

    locations = [];
    numMines = [];
    
    constructor() {
        difficultyListener();
    }

    startGame(row, col, numMines) {
        createBoard(row, col);
        this.numMines = numMines;
        this.locations = createMines();
        clearAll();
        createListeners();
        timeElapsed();
    }
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
 * returns board size corresponding to different number of mines
 * 
 * @param {Number} numMines number of mines in level
 */
let size = (numMines) => {
    if(numMines === 10) return {row: 10, col: 10};
    if(numMines === 40) return {row: 16, col: 16};
    if(numMines === 99) return {row: 16, col: 30};
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