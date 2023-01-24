// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//variables
let lines;
let levelOneLines, levelTwoLines, levelThreeLines, levelFourLines, levelFiveLines;
let tiles;
let tilesWide, tilesHigh;
let tileWidth, tileHeight;
let bg;
let sTile, sDifTile, sCrack, sBrownSpot;
let tR, tL, tM, bR, bL, bM, wR, wL, wM, sR, sL;
let dTR, dTL, dTM, dR, dL, dM;
let doors, door, door2, door3, door4;
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
let buttons = [ { x: 511, y: 444}, { x:108, y: 295}, { x: 919, y: 292} ];
let buttonstate;
let t = 0;
let doOnce = 0;
let buttonImageUp, buttonImageDown;
let buttonsPressed = 0;
let buttonImage = "up";
let playerX = 100, playerY = 400;
let crabs = 0;
let lastTimeSwitched = -100;
let damagePerSecond = 100;
let playerFacing = "left";
let demon, demonIdle, demonRun, demons = 0;
let immortal = true;
let states = [2, 5,6];
let counter;



function preload() {
  //load positions for level
  lines = loadStrings("start.text");
  levelOneLines = loadStrings("start.text");
  levelTwoLines = loadStrings("bottom.text");
  levelThreeLines = loadStrings("top.text");
  levelFourLines = loadStrings("left.text");
  levelFiveLines= loadStrings("right.text");

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


  //load door frame
  dTR = loadImage("gameSprites/wallSprites/doors/doorTR.png");
  dTL = loadImage("gameSprites/wallSprites/doors/doorTL.png");
  dTM = loadImage("gameSprites/wallSprites/doors/doorTM.png");
  dR = loadImage("gameSprites/wallSprites/doors/doorR.png");
  dL = loadImage("gameSprites/wallSprites/doors/doorL.png");
  dM = loadImage("gameSprites/wallSprites/doors/doorM.png");

  //load doors
  openDoor = loadImage("gameSprites/openDoor.png");
  closedDoor = loadImage("gameSprites/closedDoor.png");

  //button
  buttonImageUp = loadAnimation("gameSprites/tile000.png", "gameSprites/tile000.png");
  buttonImageDown= loadAnimation("gameSprites/tile000.png", "gameSprites/tile000.png");


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
  //enemies
  crab_idle = loadAnimation(
    "gameSprites/Crab Enemy Camacebra Games/Idle/Crab1.png",
    "gameSprites/Crab Enemy Camacebra Games/Idle/Crab2.png",
    "gameSprites/Crab Enemy Camacebra Games/Idle/Crab3.png",
    "gameSprites/Crab Enemy Camacebra Games/Idle/Crab4.png",
    "gameSprites/Crab Enemy Camacebra Games/Idle/Crab5.png"
  );
  demonIdle = loadAnimation(
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/01_demon_idle/demon_idle_1.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/01_demon_idle/demon_idle_2.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/01_demon_idle/demon_idle_3.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/01_demon_idle/demon_idle_4.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/01_demon_idle/demon_idle_5.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/01_demon_idle/demon_idle_6.png"
  );
  demonRun = loadAnimation(
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/02_demon_walk/demon_walk_1.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/02_demon_walk/demon_walk_2.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/02_demon_walk/demon_walk_3.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/02_demon_walk/demon_walk_4.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/02_demon_walk/demon_walk_5.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/02_demon_walk/demon_walk_6.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/02_demon_walk/demon_walk_7.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/02_demon_walk/demon_walk_8.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/02_demon_walk/demon_walk_9.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/02_demon_walk/demon_walk_10.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/02_demon_walk/demon_walk_11.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/02_demon_walk/demon_walk_12.png"
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
  button = new Group();
  button.scale = 0.2;
  button.addAni("down", buttonImageDown);
  button.addAni("idle", buttonImageUp );


  crab = new Group();
  crab.addAni("idle", crab_idle);
  crab.rotation = 0;





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
  door3 = new Sprite(20, 288, 32, 32);
  door4 = new Sprite(1005, 288, 32, 32);
  door.visible =false;
  door2. visible =false;
  door3.visible =false;
  door4.visible =false;
  
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
    button.remove();
    lines = levelOneLines; 
    putInArray();
    display();
    //create enemies and delete enemies
  }

  if (state === 1.5) {
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
    if (mouse.presses('right')) {
      new button.Sprite(511, 444);
      button.pressed = false;
      new crab.Sprite(width/2, height/2);
      new crab.Sprite(width/2 + 100, height/2);
      crab.friction = 4;
      crab.moveTowards(player.position.x, player.position.y, 0.01);
      counter = 1;
      for( let i = 0; i < crab.length; i++){
        crab[i].hit = false;
      }
      display();
    }


    else if (counter === 0){
      display();
    }
    for( let i = 0; i < crab.length; i++){
      crab[i].moveTowards(player.position.x, player.position.y, 0.01);
    }
    lines = levelTwoLines;
    checkCollision();
    putInArray();
    display();

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
    if (demons === 0) {
      demon = new Sprite(width/2, height/2 - 50, 0, 0);
      demon.addAni("idle", demonIdle);
      demon.addAni("walk", demonRun);
      demon.ani = "idle";
      demons++
    }
    demon.friction = 0;
    demon.moveTowards(player.position.x, player.position.y, 0.005);
    demon.rotation = 0;
    demonWalk();
  }

  if(state === 5){
    if (mouse.presses('right')) {
      new button.Sprite(108, 295);
      button.pressed = false;
    }
    lines = levelFourLines;
    putInArray();
    display();
    crab.remove();
    if(crabs === 1){
      crabs--;
    }
  }

  if(state === 6){
    if (mouse.presses('right')) {
      new button.Sprite(919, 292);
      button.pressed = false;
    }
    lines = levelFiveLines;
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
  door3.static = true;
  door4.static = true;
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
  
  else if (location === "d" && state === 2 && counter === 1) {
    image(closedDoor, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "d") {
    image(openDoor, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "D" && state === 1 && buttonsPressed === 3) {
    image(openDoor, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "D") {
    image(closedDoor, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
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
    player.move(10, "left", 3);
    playerFacing = "left";
  }
  else if (kb.pressing("right")&& player.x < 985) {
    player.ani = "right";
    player.ani.scale = 2.5;
    player.move(10, "right", 3);
    playerFacing = "right";
  }
  else if (kb.pressing("up") && player.y > 65) {
    player.ani = "up";
    player.ani.scale = 2.5;
    player.move(10, "up", 3);
    playerFacing = "up";
  }
  else if (kb.pressing("down") && player.y < 505) {
    player.ani = "down";
    player.ani.scale = 2.5;
    player.move(10, "down", 3);
    playerFacing = "down";
  }
  else {
    player.ani.scale = 2.5;
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

  shot.overlap(crab, isHit);
  shot.overlap(crab, eliminate);
  shot.overlap(door, eliminateShot);
  shot.overlap(door2, eliminateShot);
  shot.overlap(door3, eliminateShot);
  shot.overlap(door4, eliminateShot);
  player.overlap(door, touchingDoor);
  player.overlap(door2, touchingDoor2);
  player.overlap(door3, touchingDoor3);
  player.overlap(door4, touchingDoor4);
  player.overlap(button, buttonIsPressed);
  // player.overlap(demon, demonCheck)
}

function isHit(){
  for (let i = 0; i< crab.length; i++){
    if(shot.overlapping(crab[i])){
      crab[i].hit = true;
    }
  }
}

//Remove dead enemy
function eliminate(){
  for(let i = 0; i< crab.length; i++){
    if(crab[i].hit === true){
      crab.remove();
      counter --;
    }
  }

}


function demonCheck() {
  
}

function demonWalk() {
  if (player.position.x <= demon.position.x) {
    demon.ani = "walk";
  }
  else {
    demon.any = "idle";
  }
}

//Alonso
function buttonIsPressed(){
  if(button.pressed === false ){
    buttonsPressed ++;
  }
  button.pressed = true;
}

function buttonOpen() {
  if(buttonsPressed === 3){
    display();
  }
}

//Top Door Teleport
function touchingDoor(){

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
  if (buttonsPressed === 3) {
    if (state === 1) {
      state = 4;
      player.position.y = 475;
    }
  }
  if (counter === 0) {
    if (state === 2) {
      state = 1;
      player.position.y = 475;
    }
  }
    
  
}

function touchingDoor3(){
  if (state === 1) {
    state = 5;
    player.position.x = 950;
  }
  if (state === 6) {
    state = 1;
    player.position.x = 950;
  }
}

function touchingDoor4(){
  if (state === 1) {
    state = 6;
    player.position.x = 75;
  }
  if (state === 5) {
    state = 1;
    player.position.x = 75;
  }
  
}

//Damage Player
function loseHealth(){
  if (immortal === false) {
    health -= 5;
    if(health <= 0){
      state = 3;
    }
  }
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

