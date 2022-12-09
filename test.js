//Variables
const COLS = 5;
const ROWS = 5;
let player;
let enemy;
let playerX = 0;
let playerY = 0;
let cellWidth, cellHeight;
let grid = new Array(COLS);
let start;
let end;

function setup(){
  createCanvas(windowWidth, windowHeight);
  // Grid cell size
  cellWidth = width/COLS;
  cellHeight = height/ROWS;

  // Making a 2D array
  for (let i = 0; i < COLS; i++) {
    grid[i] = new Array(ROWS);
  }
  player = new Player(playerX, playerY);
  enemy = new Enemy(cellWidth,cellHeight);
}

class Player{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dx = 1;
    this.dy = 1;
  }
  display(){
    fill("red");
    rect(this.x , this.y, cellWidth, cellHeight);
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
    return [Math.round(this.x/cellWidth), Math.round(this.y/cellHeight)];
  }
}

class Enemy{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  display(){
    fill("green");
    rect(this.x, this.y, cellWidth, cellHeight);
  }
}

function draw(){
  background(255);
  player.display();
  enemy.display();
  player.move();
  start = player.move();
  end = [Math.round(enemy.x/cellWidth), Math.round(enemy.y/cellHeight)];
}

function keyPressed(){

}
