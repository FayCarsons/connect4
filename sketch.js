const canvasSize = 400
const gridSize = 8
const sqr = canvasSize/gridSize
let img

let lowY  = 0

let vbool = false
let hbool = false
let dlbool = false
let drbool = false
let turn = false
let game = false

var board = Array(gridSize).fill().map(() => Array(gridSize).fill(0)) 

var x = 0
var y = 0

function preload() {
  img = loadImage('transSmiley.png')
  img2 = loadImage('transButterfly.png')
} 

function setup() {
  createCanvas(canvasSize, canvasSize)
  frameRate(10)
  noLoop()
  redraw()
}

function draw() {
  for (let y = 0; y < gridSize; y++){
    for (let x = 0; x < gridSize; x++){
      fill((x+y)%2==0 ? 0 : 255)
      rect(x*sqr, y*sqr, sqr, sqr)
      if (board[x][y] == 1) 
      {image(img2,x*sqr,y*sqr,sqr,sqr)}
      if (board[x][y] == 2) 
      {image(img,x*sqr,y*sqr,sqr,sqr)}    
    }
  }
}

function mouseClicked(){
  place(int(mouseX/sqr))
}

function place(gridIndexX) {  
  if (!turn && !game) {
    board[gridIndexX][lowestSpace(gridIndexX)] = 1
  }
  
  if (turn && !game) {
    board[gridIndexX][lowestSpace(gridIndexX)] = 2
  }

  turn = ! turn

  if (turn) {
    place(int(random()*gridSize))
  }
    
  if (!game) {redraw()}

  verticalCheck()
  horizontalCheck()
  downRight()
  downLeft()

  if (game && !turn) {setTimeout(()=>alert("player 1 wins!",100))}
  if (game && turn) {setTimeout(()=>alert("player 2 wins!",100))}
}

function lowestSpace(gridIndexX) {
  lowY = 0
  for (y = gridSize - 1; y != 0; y--) {
    if (board[gridIndexX][y] == 0){
      lowY = y
      break  
    }
  }
  return lowY 
}

function verticalCheck(){
  for (let x = 0; x < gridSize; x++){
    for (let y = 0; y < gridSize; y++){
      vbool = true
      
      for (let z = 0; z < 4; z++) {
        let player = turn ? 1 : 2
        vbool = vbool && (board[x][y+z] == player)
      }
      if (vbool) {game = true}
    } 
  } 
}

function horizontalCheck(){
  for (let x = 0; x < (gridSize-3); x++){
    for (let y = 0; y < gridSize; y++){
      hbool = true
      
      for (let z = 0; z < 4; z++) {
        let player = turn ? 2 : 1
        hbool = hbool && (board[x+z][y] == player)    
      }
      if (hbool) {game = true}
    } 
  }  
}

function downRight() {
  for (let x = 0; x < (gridSize-3); x++){
    for (let y = 0; y < (gridSize-3); y++){
      drbool = true

      for (let z = 0; z < 4; z++) {
        let player = turn ? 2 : 1
        drbool = drbool && (board[x+z][y+z] == player)    
      }
      if (drbool) {game = true}
    } 
  }  
}

function downLeft() {
  for (let x = 3; x < gridSize; x++){
    for (let y = 0; y < (gridSize-3); y++){
      dlbool = true

      for (let z = 0; z < 4; z++) {
        let player = turn ? 2 : 1
        dlbool = dlbool && (board[x-z][y+z] == player)   
      }
      if (dlbool) {game = true}
    } 
  }  
}
