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
  constructor(x,y, dx, dy){
    this.x = x;
    this.y = y;
    this.dx = 1;
    this.dy = 1;
  }
  display(){
    fill("red");
    rect(this.x * cellWidth, this.y * cellHeight, cellWidth, cellHeight);
  }
  move(){
    if(keyIsDown(87) ){ //w
      this.y -= this.dy;
    }
    if(keyIsDown(83) ){ //s
      this.y += this.dy;
    }
    if(keyIsDown(65) ){ //a
      this.x -= this.dx;
    }
    if(keyIsDown(68) ){ //w
      this.x += this.dx;
    }
  }
}

function draw(){
  background(255);
  player.display();
}

function keyPressed(){
  player.display();
  player.move();
}