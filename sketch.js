// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let lines;
let levelTwoLines;
let levelThreeLines;
let tiles;
let tilesWide, tilesHigh;
let tileWidth, tileHeight;
let bg;
let sTile, sDifTile, sCrack, sBrownSpot;
let tR, tL, tM, bR, bL, bM, wR, wL, wM, sR, sL;
let dTR, dTL, dTM, dR, dL, dM;
let doors, door, door2;
let d;
let state = 1;
let room = "start";

let player, player_right, player_left, player_up, player_down;
let crab, crab_idle;
let health = 20;
let maxHealth = 20;
let spears = 550;
let shots, shot, shotImage;
let speed = 2;
let rotation = 0;
let button = [];
let t = 0;
let b;
let buttonsPressed = 0;



function preload() {
  //load positions for level
  lines = loadStrings("start.text");
  levelTwoLines = loadStrings("bottom.text");
  levelThreeLines = loadStrings("top.text");



  //load images for tiles
  bg = loadImage("gameSprites/blackBg.jpg");
  sTile = loadImage("gameSprites/floorTileSprites/tile000.png");
  sDifTile= loadImage("gameSprites/floorTileSprites/tile001.png");
  sCrack = loadImage("gameSprites/floorTileSprites/tile002.png");
  sBrownSpot = loadImage("gameSprites/floorTileSprites/tile004.png");
  //load walls

  tR = loadImage("gameSprites/wallSprites/topRight.png");
  tL = loadImage("gameSprites/wallSprites/topLeft.png");
  tM = loadImage("gameSprites/wallSprites/topMiddle.png");
  bR = loadImage("gameSprites/wallSprites/bottomRight.png");
  bL = loadImage("gameSprites/wallSprites/bottomLeft.png");
  bM = loadImage("gameSprites/wallSprites/bottomMiddle.png");
  wR = loadImage("gameSprites/wallSprites/wallRight.png");
  wL = loadImage("gameSprites/wallSprites/wallLeft.png");
  wM = loadImage("gameSprites/wallSprites/wallMiddle.png");
  sR = loadImage("gameSprites/wallSprites/right.png");
  sL = loadImage("gameSprites/wallSprites/left.png");


  //load doors
  dTR = loadImage("gameSprites/wallSprites/doors/doorTR.png");
  dTL = loadImage("gameSprites/wallSprites/doors/doorTL.png");
  dTM = loadImage("gameSprites/wallSprites/doors/doorTM.png");
  dR = loadImage("gameSprites/wallSprites/doors/doorR.png");
  dL = loadImage("gameSprites/wallSprites/doors/doorL.png");
  dM = loadImage("gameSprites/wallSprites/doors/doorM.png");

  //button
  button = [loadImage("gameSprites/tile000.png"), loadImage("gameSprites/tile001.png")]

  //player
  player_right = loadAnimation(
    "gameSprites/humanSprites/humanWalk/WBR.png",
    { frameSize: [32, 32], frames: 4 });
  player_left = loadAnimation(
    "gameSprites/humanSprites/humanWalk/WBL.png",
    { frameSize: [32, 32], frames: 4 });

  player_down = loadAnimation(
    "gameSprites/humanSprites/humanWalk/WBL.png",
    { frameSize: [32, 32], frames: 4 });

  player_up = loadAnimation(
    "gameSprites/humanSprites/humanWalk/WTR.png",
    { frameSize: [32, 32], frames: 4 });
  crab_idle = loadAnimation(
    "gameSprites/Crab Enemy Camacebra Games/Idle/Crab1.png",
    "gameSprites/Crab Enemy Camacebra Games/Idle/Crab2.png",
    "gameSprites/Crab Enemy Camacebra Games/Idle/Crab3.png",
    "gameSprites/Crab Enemy Camacebra Games/Idle/Crab4.png",
    "gameSprites/Crab Enemy Camacebra Games/Idle/Crab5.png"
  );
  shotImage = loadImage("gameSprites/humanSprites/humanAttack/fireball.png");

  
}

function setup() {
  let cnv = createCanvas(1024, 576);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);

  noSmooth();
  b = new Button (button[t], 100, 100, 50, 50);
  crab = new Sprite(width/2, height/2, 32, 32 );
  crab.addAni("idle", crab_idle);
  crab.friction = 2;
  player = new Sprite(width/2,400, 32, 32);
  player.addAni("right", player_right);
  player.addAni("left", player_left);
  player.addAni("up", player_up);
  player.addAni("down", player_down);
  doors = new Group();
  door = new Sprite(515, 525, 32, 32);
  door2 = new Sprite(510, 45, 40, 40);
  noSmooth();

  crab.moveTowards(0.1,player.position.x, player.position.y, 0.001);
  shots = new Group();
  shot = new Sprite(-50, -50);

  shot.remove;
  
  
  tilesHigh = lines.length;
  tilesWide = lines[0].length;

  tileWidth = width / tilesWide;
  tileHeight = height / tilesHigh;

  tiles = createEmpty2dArray(tilesWide, tilesHigh);

  //put values into 2d array of characters
  putInArray();
  //Alonso

}

function putInArray() {
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      let tileType = lines[y][x];
      tiles[y][x] = tileType;
    }
  }
}



function draw() {
  if (state === 1) {
    display();
  } 

  if (state === 2) {
    lines = levelTwoLines;
    putInArray();
    display();
  

  }
  if(state === 3){
    background(0);
    player.remove();
    crab.remove();
    door.remove();
  }
  if(state ===4){
    lines = levelThreeLines;
    putInArray();
    display();
  }


  playerMovement();
  player.friction = 4;
  player.rotation = 0;
  crab.friction = 4;
  crab.moveTowards(player.position.x, player.position.y, 0.005);
  crab.rotation = 0;
  door.static = true;
  checkCollision();
  updateHealth(player.position.x, player.position.y, health, maxHealth);

  b.display();
}

function display() {
  //display background
  image(bg, 0, 0, width, height);
  //check tiles
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      showTile(tiles[y][x], x, y);
    }
  }

}

function showTile(location, x, y) {
  //tiles
  if (location === ".") {
    image(sTile, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  // else if (location === ",") {
  //   image(sDifTile, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  // }
  // else if (location === "+") {
  //   image(sCrack, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  // }
  // else if (location === "*") {
  //   image(sBrownSpot, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  // }

  // walls

  // top of walls
  else if (location === "R") {
    image(tR, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }
  else if (location === "L") {
    image(tL, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }
  else if (location === "M") {
    image(tM, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }

  // bottom of walls
  else if (location === "l") {
    image(bL, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }
  else if (location === "r") {
    image(bR, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }
  else if (location === "m") {
    image(bM, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }
  // brick part
  else if (location === "]") {
    image(wR, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }
  else if (location === "[") {
    image(wL, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }
  else if (location === "#") {
    image(wM, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  // sides
  }
  else if (location === ")") {
    image(sR, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }
  else if (location === "(") {
    image(sL, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }
  //doors
  else if (location === "t") {
    image(dTR, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }
  else if (location === "w") {
    image(dTL, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }
  else if (location === "e") {
    image(dTM, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }
  else if (location === "f") {
    image(dR, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }
  else if (location === "s") {
    image(dL, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }
  else if (location === "d") {
    image(dM, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  
  }
}

function createEmpty2dArray(cols, rows) {
  let randomGrid = [];
  for (let y = 0; y < rows; y++) {
    randomGrid.push([]);
    for (let x = 0; x < cols; x++) {
      randomGrid[y].push(0);
    }
  }
  return randomGrid;
}


  


class Button { 
  constructor(image, x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  display() {
    image(this.image, this.x, this.y, this.width, this.height);
  }
}




function playerMovement(){
  if (kb.pressing("left") && player.x > 45) {
    player.ani = "left";
    player.ani.scale = 2.5;
    player.vel.x = -2;
    rotation = 180;
  }
  else if (kb.pressing("right")&& player.x < 985) {
    player.ani = "right";
    player.ani.scale = 2.5;
    player.vel.x = 2;
    rotation = 90;
  }
  else if (kb.pressing("up") && player.y > 65) {
    player.ani = "up";
    player.ani.scale = 2.5;
    player.vel.y = -2;
    rotation = 0;
  }
  else if (kb.pressing("down") && player.y < 505) {
    player.ani = "down";
    player.ani.scale = 2.5;
    player.vel.y = 2;
    rotation = 360;
  }
  else {
    player.ani.scale = 2.5;
    player.vel.x = 0;
    player.vel.y =0;
  }
}

function updateHealth(x,y, health, maxHealth){
  stroke(0);
  strokeWeight(4);
  noFill();
  rect(x -10, y-15, 20, 1.5);
  noStroke();
  fill(255,0,0);
  rect(x -10 ,y -15,map(health, 0, maxHealth, 0, 20), 1.5);
  
}

function checkCollision(){
  player.overlap(crab, loseHealth);
  shot.overlap(crab, eliminate);
  player.overlap(door, touchingDoor);
  player.overlap(door2, touchingDoor2);
}

function touchingDoor(){
  state = 2;
}
function touchingDoor2(){
  state = 4;
}

function levelChange() {
  if (state = 1) {
    state = 4;
  }
  if (state === 2) {
    state = 1;
  }
}


function loseHealth(){
  health -= 10;
  if(health <= 0){
    state = 3;
  }
}
function eliminate(){
  crab.remove();
}

function keyReleased(){
  if(spears <= 0){
    spears = 0;
    return;
  }
  else{
    if(keyCode === 32){
      spears -= 1;
      shot = new Sprite(player.position.x, player.position.y);
      shot.addImage("idle", shotImage);
      shot.scale = 0.01;
      shots.add(shot);
    }
  }
}


