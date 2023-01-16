// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let loadingLevel, loadingLevel2;
let lines, lines2;
let tiles, tiles2;
let tilesWide, tilesHigh;
let tileWidth, tileHeight;
let bg;
let sTile, sDifTile, sCrack, sBrownSpot;
let tR, tL, tM, bR, bL, bM, wR, wL, wM, sR, sL;
let dTR, dTL, dTM, dR, dL, dM;
let player, playerImg, playerY = 576/2, playerX = 1024/2;
let door;
let d;
let state = 1;

function preload() {
  //load positions for level
  loadingLevel = "1.text";
  lines = loadStrings(loadingLevel);

  loadingLevel2 = "2.text";
  lines = loadStrings(loadingLevel2);

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

  //player
  playerImg = loadImage("gameSprites/Crab Enemy Camacebra Games/Idle/Crab1.png");
}

function setup() {
  let cnv = createCanvas(1024, 576);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);

  noSmooth();
  
  player = new Player(playerImg, playerX, playerY);
  door = new Door(497, 510);
  tilesHigh = lines.length;
  tilesWide = lines[0].length;

  tileWidth = width / tilesWide;
  tileHeight = height / tilesHigh;

  tiles = createEmpty2dArray(tilesWide, tilesHigh);

  //put values into 2d array of characters

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

    display();
    
  }

  player.move();
  player.display();
  door.display();
  //distance
  d = dist(player.x, player.y, door.x, door.y);
  levelChange();
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


  


class Player { 
  constructor(image, x, y){
    this.x = x;
    this.y = y;
    this.image = image;
    this.dx = 5;
    this.dy = 5;
  }

  move(){
    
    if(kb.pressing('left') && this.x > 25){ //a
      this.x -= this.dx;
    }
    if(kb.pressing('right')&& this.x < 965 ){ //d
      this.x += this.dx;
    }
    if(kb.pressing('up') && this.y>60){ //w
      this.y -= this.dy;
    }
    if(kb.pressing('down') && this.y <490){ //s
      this.y += this.dy;
    }
  }

  display() {
    image(this.image, this.x, this.y, tileWidth, tileHeight);
  }
}

class Door {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  display(){
    fill("red");
    rect(this.x, this.y, 32);
  }

}

function levelChange() {
  if (d < 20) {
    state = 2;
  }
}
