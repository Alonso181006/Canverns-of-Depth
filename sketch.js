// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//variables
let lines;
let levelOneLines;
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
let button;
let t = 0;
let buttonImageUp, buttonImageDown;
let buttonsPressed = 0;
let buttonImage = "up";
let playerX = 100, playerY = 400;
let crabs = 0;
let lastTimeSwitched = -100;
let damagePerSecond = 100;
let playerFacing = "left";



function preload() {
  //load positions for level
  lines = loadStrings("start.text");
  levelOneLines = loadStrings("start.text");
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
  buttonImageUp = loadImage("gameSprites/tile000.png");
  buttonImageDown= loadImage("gameSprites/tile001.png");


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
  //enemy
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
  //center the canvas
  let cnv = createCanvas(1024, 576);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);

  noSmooth();

  //create button
  button = new Sprite(200, 200);
  button.addImage("down", buttonImageDown);
  button.addImage("idle", buttonImageUp );
  button.scale = 0.2;

  //create player && add animation
  player = new Sprite(width/ 2, 400, 32, 32);
  player.addAni("right", player_right);
  player.addAni("left", player_left);
  player.addAni("up", player_up);
  player.addAni("down", player_down);

  //create door hitbox 
  doors = new Group();
  door = new Sprite(515, 525, 32, 32);
  door2 = new Sprite(510, 45, 40, 40);
  door.visible = false;
  door2. visible = false;
  noSmooth();

  //create fireball Group and Sprite to prevent Errorw
  shots = new Group();
  shot = new Sprite(-50, -50);
  shot.remove;
  
  //Dave
  tilesHigh = lines.length;
  tilesWide = lines[0].length;
  tileWidth = width / tilesWide;
  tileHeight = height / tilesHigh;
  tiles = createEmpty2dArray(tilesWide, tilesHigh);

  //put values into 2d array of characters
  putInArray();

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
  //homeBase
  if (state === 1) {
    lines = levelOneLines; 
    putInArray();
    display();
    //create enemies and delete enemies
    if(crabs === 0){
      crab = new Sprite(width/2, height/2, 32, 32 );
      crab.addAni("idle", crab_idle);
      crabs++;
    }
    crab.friction = 4;
    crab.moveTowards(player.position.x, player.position.y, 0.005);
    crab.rotation = 0;
  }

  //bottom room
  if (state === 2) {
    lines = levelTwoLines;
    putInArray();
    display();
    crab.remove();
    if(crabs === 1){
      crabs--;
    }
  }

  //end room
  if(state === 3){
    background(0);
    player.remove();
    crab.remove();
    door.remove();
    button.remove();
  }

  //top room
  if(state === 4){
    lines = levelThreeLines;
    putInArray();
    display();
    crab.remove();
    if(crabs === 1){
      crabs--;
    }
  }

  //Player Movement
  playerMovement();
  player.friction = 4;
  player.rotation = 0;

  //Immovable Objects
  door.static = true;
  door2.static = true;
  button.static = true;

  //Collision
  checkCollision();

  //Health Bar
  updateHealth(player.position.x, player.position.y, health, maxHealth);

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
  else if (location === ",") {
    image(sDifTile, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "+") {
    image(sCrack, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  // else if (location === "*") {
  //   image(sBrownSpot, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  // }

  // Walls

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

//Change player animation, dx, and dy for Arrow Keys
function playerMovement(){
  if (kb.pressing("left") && player.x > 45) {
    player.ani = "left";
    player.ani.scale = 2.5;
    player.vel.x = -2;
    playerFacing = "left";
  }
  else if (kb.pressing("right")&& player.x < 985) {
    player.ani = "right";
    player.ani.scale = 2.5;
    player.vel.x = 2;
    playerFacing = "right";
  }
  else if (kb.pressing("up") && player.y > 65) {
    player.ani = "up";
    player.ani.scale = 2.5;
    player.vel.y = -2;
    playerFacing = "up";
  }
  else if (kb.pressing("down") && player.y < 505) {
    player.ani = "down";
    player.ani.scale = 2.5;
    player.vel.y = 2;
    playerFacing = "down";
  }
  else {
    player.ani.scale = 2.5;
    player.vel.x = 0;
    player.vel.y =0;
  }
}

//Create Health bar 
function updateHealth(x,y, health, maxHealth){
  stroke(0);
  strokeWeight(4);
  noFill();
  rect(x -10, y-15, 20, 1.5);
  noStroke();
  fill(255,0,0);
  rect(x -10 ,y -15,map(health, 0, maxHealth, 0, 20), 1.5);
  
}

//Collision
function checkCollision(){
  if(player.overlapping(crab) > lastTimeSwitched + damagePerSecond){
    loseHealth();
    lastTimeSwitched = player.overlapping(crab);
  }

  shot.overlap(crab, eliminate);
  shot.overlap(door, eliminateShot);
  shot.overlap(door2, eliminateShot);
  player.overlap(door, touchingDoor);
  player.overlap(door2, touchingDoor2);
  player.overlap(button, buttonIsPressed);
  
}

//Alonso
function buttonIsPressed(){
  if(buttonImage !== "down"){
    buttonsPressed ++;
  }
  button.image = "down";
  buttonImage = "down";
}
// function buttonOpen() {
//   if(buttonsPressed ===3){
    
//   }
// }

//Top Door Teleport
function touchingDoor(){
  // state = 2;
  if (state === 1) {
    state = 2;
    player.position.y = 100;
  }
  if (state === 4) {
    state = 1;
    player.position.y = 100;
  }
}

// Bottom Door Teleport
function touchingDoor2(){
  // state = 4;
  if (state === 1) {
    state = 4;
    player.position.y = 475;
  }
  if (state === 2) {
    state = 1;
    player.position.y = 475;
  }
}

//Damage Player
function loseHealth(){
  health -= 5;
  if(health <= 0){
    state = 3;
  }
}

//Remove dead enemy
function eliminate(){
  crab.remove();
}
function eliminateShot(){
  shot.remove();
}

//Create Projectile
function keyReleased(){
  //Has Projectiles
  if(spears <= 0){
    spears = 0;
    return;
  }
  //Space is pressed create projectile based on player orientation
  else{
    if(keyCode === 32 && playerFacing  === "left"){
      spears -= 1;
      shot = new Sprite(player.position.x -1, player.position.y);
      shot.addImage("idle", shotImage);
      shot.vel.x = shotsDirectionsX();
      shot.vel.y = shotsDirectionsY();
      shot.scale = 0.01;
      shots.add(shot);
    }
    else if(keyCode === 32 && playerFacing  !== "left"){
      spears -= 1;
      shot = new Sprite(player.position.x, player.position.y);
      shot.addImage("idle", shotImage);
      shot.vel.x = shotsDirectionsX();
      shot.vel.y = shotsDirectionsY();
      shot.scale = 0.01;
      shots.add(shot);
    }
  }
}

//Calculate playerX direction
function shotsDirectionsX(){
  if(playerFacing === "left"){
    return -2;
  }
  else if(playerFacing === "right"){
    return 2;
  }
  else if(playerFacing === "up"){
    return 0;
  }
  else if(playerFacing === "down"){
    return 0;
  }
}

//Calculate playerY direction
function shotsDirectionsY(){
  if(playerFacing === "up"){
    return -2;
  }
  else if(playerFacing === "down"){
    return 2;
  }
  else if(playerFacing === "left"){
    return 0;
  }
  else if(playerFacing === "right"){
    return 0;
  }
}

