const canvasSize = 400
const gridSize = 8
const sqr = canvasSize/gridSize
let img;
function preload() {
  img = loadImage('transSmiley.png');
  img2 = loadImage('transButterfly.png');
} 

var board = Array(gridSize).fill().map(() => Array(gridSize).fill(0)) 

var x = 0
var y = 0

var turn = false
var game = false

function setup() {
  createCanvas(canvasSize, canvasSize);
  background(0);
  frameRate();  
}

function draw() {
  for (let y = 0; y < gridSize; y++){
    for (let x = 0; x < gridSize; x++){
      fill((x+y)%2==0 ? 0 : 255);
      rect(x*sqr, y*sqr, sqr, sqr);
      if (board[x][y] == 1) 
      {image(img2,x*sqr,y*sqr,sqr,sqr)};
      if (board[x][y] == 2) 
      {image(img,x*sqr,y*sqr,sqr,sqr)};      
    }
  }
}

function mouseClicked(){
  place(int(mouseX/sqr), int(mouseY/sqr));
}

function place(gridIndexX,gridIndexY){
  var lowY = 0
  for (y = gridSize - 1; y != 0; y = y - 1) {
    if (board[gridIndexX][y] == 0){
      lowY = y;
      break;
    } 
  }
  if (!turn && !game) {board[gridIndexX][lowY] = 1};
  if (turn && !game) {board[gridIndexX][lowY] = 2};

  verticalCheck();
  horizontalCheck();
  downRight();
  downLeft();

  turn = ! turn;
}

function verticalCheck(){
  for (let x = 0; x < gridSize; x++){
    for (let y = 0; y < gridSize; y++){
      let vbool = true;
      
      for (let z = 0; z < 4; z++) {
        let player = turn ? 2 : 1;
        vbool = vbool && (board[x][y+z] == player);
      }
      if (vbool) {game = true; gameWon()}
    } 
  } 
}

function horizontalCheck(){

  for (let x = 0; x < (gridSize-3); x++){
    for (let y = 0; y < gridSize; y++){
      let hbool = true;
      
      for (let z = 0; z < 4; z++) {
        let player = turn ? 2 : 1;
        hbool = hbool && (board[x+z][y] == player);      
      }
      if (hbool) {game = true; gameWon()}
    } 
  }  
}

function downRight() {
  for (let x = 0; x < (gridSize-3); x++){
    for (let y = 0; y < (gridSize-3); y++){
      let drbool = true;

      for (let z = 0; z < 4; z++) {
        let player = turn ? 2 : 1;
        drbool = drbool && (board[x+z][y+z] == player);      
      }
      if (drbool) {game = true; gameWon()}
    } 
  }  
}

function downLeft() {
  for (let x = 3; x < gridSize; x++){
    for (let y = 0; y < (gridSize-3); y++){
      let dlbool = true;

      for (let z = 0; z < 4; z++) {
        let player = turn ? 2 : 1;
        dlbool = dlbool && (board[x-z][y+z] == player);      
      }
      if (dlbool) {game = true; gameWon()}
    } 
  }  
}

function gameWon() {
  if (game && !turn) {alert("player 1 wins!")}
  if (game && turn) {alert("player 2 wins!")}
}
