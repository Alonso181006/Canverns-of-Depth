//Variables
const COLS = 5;
const ROWS = 5;
let player;
let playerX = 0;
let playerY = 0;
let cellWidth, cellHeight;
let grid = new Array(COLS);

function setup(){
  createCanvas(windowWidth, windowHeight);
  // Grid cell size
  cellWidth = width/COLS;
  cellHeight = height/ROWS;

  player = new Player(playerX, playerY);
}

class Player{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dx = cellWidth;
    this.dy = cellHeight;
  }
  display(){
    fill("red");
    rect(this.x * cellWidth, this.y * cellHeight, cellWidth, cellHeight);
  }
  move(){

  }
}

function draw(){
  background(255);
  player.display();
}

function keyPressed(){
  if(keyIsDown(65))
}