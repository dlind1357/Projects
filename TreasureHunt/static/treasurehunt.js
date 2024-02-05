var game = [];
var rows = 10;
var columns = 15;
var difficulty = 0;
var treasureCount = 0;
var minesCount = 0;
var minesLocation = [];
var treasureLocation = [];
var movesMade = 0;
var markerclicked = false;
var gameOver = false;


window.onload = function() {
    //when the page loads, immediately check difficulty and then start game
    checkdiff();
    startGame();
}


function checkdiff() {
    //check what the header says.
    let diff = document.querySelector("h1");
    //if header id says warmup, then difficulty is easy
    if (diff.id == "warmup") {
        treasureCount = 5;
        minesCount = treasureCount * 2;
        difficulty = 1;
    }
    //if header id does not say warmup, then difficulty is harder
    else {
        treasureCount = 8;
        minesCount = treasureCount * 3;
        difficulty = 2;
    }
}



function startGame() {
    //update the number of treasures
    document.getElementById("treasure-left").innerText = treasureCount;
    //add event listener to marker button
    document.getElementById("marker").addEventListener("click", setMarker);
    //set mine and treasure locations
    setMinesTreasure();

    //fill game board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //create <div></div>
            let tile = document.createElement("div");
            //add coordinates to id
            tile.id = r.toString() + "," + c.toString();

            //add event listener to tiles
            tile.addEventListener("click", clickTile)

            document.getElementById("game").append(tile);
            //push tile onto row
            row.push(tile);
        }
        //push row onto gameboard
        game.push(row);
    }
    //print gameboard
    console.log(game);
}


function setMarker() {
    //if marker button is clicked, change backgund color of button
    if (markerclicked) {
        markerclicked = false;
        document.getElementById("marker").style.backgroundColor = "lightgray";
    } else {
        markerclicked = true;
        document.getElementById("marker").style.backgroundColor = "darkgray";
    }
}


function clickTile() {
    //can't click is game ended or if tile is already clicked
    //this refers to the tile that was clicked
    if (gameOver || this.classList.contains("tile-passed")) {
        return;
    }

    //this refers to the tile that was clicked
    let tile = this;

    //sets ? marker
    if (markerclicked) {
        if (tile.innerText == "") { // inner text empty = hasnt been clicked yet
            tile.innerText = "?";
        } else if (tile.innerText == "?") {
            tile.innerText = "";
        }
        return;
    }

    //if mine was clicked, reveal everything and game over
    if (minesLocation.includes(tile.id)) {
        gameOver = true;
        reveal();
        return;
    }

    //split string according to , character to get coordinates
    let coords = tile.id.split(",");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);
}


function reveal() {
    //reveal all location of landmines and treasure
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = game[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "X";
                tile.style.backgroundColor = "red";
            }
            if (treasureLocation.includes(tile.id)) {
                tile.innerText = "💎";
                tile.style.backgroundColor = "cyan";
            }
        }
    }
}



function checkMine(r, c) {
    //check surrounding tiles for mines

    //if out of game bounds, do nothing
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (game[r][c].classList.contains("tile-passed")) {
        return; //if already clicked the tile, do nothing
    }
    // if not clicked already, mark it as passed
    game[r][c].classList.add("tile-passed")
    //keep track of number of tiles clicked/revealed
    movesMade += 1;
    document.getElementById("moves-made").innerText = movesMade;

    //if tile is treasure, change background color to cyan
    if (treasureLocation.includes(r.toString() + "," + c.toString())) {
        let tile = game[r][c];
        tile.style.backgroundColor = "cyan";
        treasureCount--;
        document.getElementById("treasure-left").innerText = treasureCount;
    }

    //count how mines surround the tile
    let minesFound = 0;

    minesFound += checkTile(r - 1, c - 1); //topleft
    minesFound += checkTile(r - 1, c); //top
    minesFound += checkTile(r - 1, c + 1); //topright
    minesFound += checkTile(r + 1, c - 1); //bottomleft
    minesFound += checkTile(r + 1, c); //bottom
    minesFound += checkTile(r + 1, c + 1); //bottomright
    minesFound += checkTile(r, c - 1); //left
    minesFound += checkTile(r, c + 1); //right

    //tell number of landmines found to user in the appropriate color according to the css
    if (minesFound > 0) {
        game[r][c].innerText = minesFound;
        game[r][c].classList.add("color" + minesFound.toString());
    }

    //if found all the treasure, user win game and game ends
    if (treasureCount == 0) {
        document.getElementById("treasure-left").innerText = "Cleared!!";
        reveal();
        gameOver = true;

        //if not a warmup, add win to user stats
        if (difficulty == 2) {
            document.getElementById("myForm").submit();
        }
    }

}


function checkTile(r, c) {
    //check if given tile is a landmine

    //if out of bounds
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }

    //if is mine
    if (minesLocation.includes(r.toString() + "," + c.toString())) {
        return 1;
    }

    return 0;
}


function setMinesTreasure() {
    //randomly scatter the landmines and treasure

    let minesLeft = minesCount;
    while (minesLeft > 0) {
        //math.random returns # between 0-1, math.floor truncates to make it an integer
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "," + c.toString();

        //to avoid repeat coordinates
        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }

    //same logic as above
    let treasureLeft = treasureCount;
    while (treasureLeft > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "," + c.toString();

        if (!treasureLocation.includes(id) && !minesLocation.includes(id)) {
            treasureLocation.push(id);
            treasureLeft -= 1;
        }
    }
}
