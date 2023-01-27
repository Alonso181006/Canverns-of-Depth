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
let state = 0;
let player, player_right, player_left, player_up, player_down;
let player_down_attack, player_left_attack, player_right_attack, player_up_attack;
let crab, crab_idle;
let health = 50;
let demonHealth = 100;
let maxDemonHealth = 100;
let maxHealth = 50;
let spears = 550;
let fireballs, fireball, fireballImage;
let speed = 2;
let rotation = 0;
let button;
let buttonss = [ { x: 511, y: 444}, { x:108, y: 295}, { x: 919, y: 292} ];
let buttonstate;
let t = 0;
let doOnce = 0;
let buttonImageUp, buttonImageDown;
let buttonsPressed = 0;
let buttonImage = "up";
let lastTimeSwitched = -100;
let damagePerSecond = 100;
let playerFacing = "left";
let demon, demonIdle, demonRun, demonDamage, demons = 0;
let immortal = false;
let counter = 0;
let startImage, resetImage;
let song, bossMusic;
let openDoor;
let closedDoor;
let crab_attack;
let orc, orc_idle_left,orc_idle_right, orc_attack_left, orc_attack_right;
let previousState;
let chomper, chomper_right, chomper_left;
let potion, potionImage;
let hole, black;



function preload() {
  //load positions for level
  lines = loadStrings("start.text");
  levelOneLines = loadStrings("start.text");
  levelTwoLines = loadStrings("bottom.text");
  levelThreeLines = loadStrings("top.text");
  levelFourLines = loadStrings("left.text");
  levelFiveLines= loadStrings("right.text");

  //load background music
  song = loadSound("gameSFX/seriousMusic.mp3");
  bossMusic = loadSound("gameSFX/why-do-i-hear-boss-music.mp3")
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

  //load button
  buttonImageUp = loadImage("gameSprites/tile000.png" );
  buttonImageDown= loadImage("gameSprites/tile001.png");

  hole = loadImage("gameSprites/wallSprites/hole/hole.png");
  black = loadImage("gameSprites/wallSprites/hole/void.png");

  //load player
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

  player_right_attack = loadAnimation(
    "gameSprites/humanSprites/humanAttack/ABR.png",
    { frameSize: [32, 32], frames: 4 });

  player_left_attack = loadAnimation(
    "gameSprites/humanSprites/humanAttack/ABL.png",
    { frameSize: [32, 32], frames: 4 });
  
  player_down_attack = loadAnimation(
    "gameSprites/humanSprites/humanAttack/ABL.png",
    { frameSize: [32, 32], frames: 4 });
  
  player_up_attack = loadAnimation(
    "gameSprites/humanSprites/humanAttack/ATR.png",
    { frameSize: [32, 32], frames: 4 });

  //load enemies
  crab_idle = loadAnimation(
    "gameSprites/Crab Enemy Camacebra Games/Idle/Crab1.png",
    "gameSprites/Crab Enemy Camacebra Games/Idle/Crab2.png",
    "gameSprites/Crab Enemy Camacebra Games/Idle/Crab3.png",
    "gameSprites/Crab Enemy Camacebra Games/Idle/Crab4.png",
    "gameSprites/Crab Enemy Camacebra Games/Idle/Crab5.png"
  );
  
  crab_attack = loadAnimation(
    "gameSprites/Crab Enemy Camacebra Games/Attack/Crab_Attack1.png",
    "gameSprites/Crab Enemy Camacebra Games/Attack/Crab_Attack2.png",
    "gameSprites/Crab Enemy Camacebra Games/Attack/Crab_Attack3.png",
    "gameSprites/Crab Enemy Camacebra Games/Attack/Crab_Attack4.png"
  );

  orc_idle_left = loadAnimation(
    "gameSprites/orcSprites/orcWalk/OBL.png",
    { frameSize: [32, 32], frames: 4 });

  orc_idle_right = loadAnimation(
    "gameSprites/orcSprites/orcWalk/OBR.png",
    { frameSize: [32, 32], frames: 4 });

  orc_attack_left = loadAnimation(
    "gameSprites/orcSprites/orcAttack/OABL.png",
    { frameSize: [32, 32], frames: 4 });

  orc_attack_right = loadAnimation(
    "gameSprites/orcSprites/orcAttack/OABR.png",
    { frameSize: [32, 32], frames: 4 });

  chomper_left = loadAnimation(
    "gameSprites/leftChomp.png",
    { frameSize: [32, 32], frames: 8 });
  
  chomper_right = loadAnimation(
    "gameSprites/rightChomp.png",
    { frameSize: [32, 32], frames: 8 });

  demonIdle = loadAnimation(
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/01_demon_idle/demon_idle_1.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/01_demon_idle/demon_idle_2.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/01_demon_idle/demon_idle_3.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/01_demon_idle/demon_idle_4.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/01_demon_idle/demon_idle_5.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/01_demon_idle/demon_idle_6.png"
  );
  demonRun = loadAnimation(
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonWalk/demon_walk_1.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonWalk/demon_walk_2.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonWalk/demon_walk_3.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonWalk/demon_walk_4.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonWalk/demon_walk_5.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonWalk/demon_walk_6.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonWalk/demon_walk_7.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonWalk/demon_walk_8.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonWalk/demon_walk_9.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonWalk/demon_walk_10.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonWalk/demon_walk_11.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonWalk/demon_walk_12.png"
  );

  demonDamage = loadAnimation(
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonCleave/demon_cleave_1.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonCleave/demon_cleave_2.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonCleave/demon_cleave_3.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonCleave/demon_cleave_4.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonCleave/demon_cleave_5.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonCleave/demon_cleave_6.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonCleave/demon_cleave_7.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonCleave/demon_cleave_8.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonCleave/demon_cleave_9.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonCleave/demon_cleave_10.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonCleave/demon_cleave_11.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonCleave/demon_cleave_12.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonCleave/demon_cleave_13.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonCleave/demon_cleave_14.png",
    "gameSprites/boss_demon_slime_FREE_v1.0/individual sprites/newDemonCleave/demon_cleave_15.png"
  );

  //fireball Images
  fireballImage = loadImage("gameSprites/humanSprites/humanAttack/fireball.png");

  // Health Potion
  potionImage = loadImage("gameSprites/healthBottle.png");

  //Start and Reset Screen
  startImage = loadImage("gameSFX/startScreen.gif");
  resetImage = loadImage("gameSFX/resetScreen.jpg");
  
}

function setup() {
  //Center the canvas
  let cnv = createCanvas(1024, 576);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
  noSmooth();

  //Create button Group()
  button = new Group();
  button.scale = 0.2;
  button.addImage("idle", buttonImageUp );

  //Create potion Group()
  potion = new Group();
  potion.addImage("idle", potionImage);

  //Create crab Group()
  crab = new Group();
  crab.addAni("idle", crab_idle);
  crab.rotation = 0;

  //Create orc Group()
  orc = new Group();
  orc.addAni("idle_right", orc_idle_right);
  orc.addAni("idle_left", orc_idle_left);
  orc.scale = 2.0;
  orc.rotation = 0;

  //Create chomper Group()
  chomper = new Group();
  chomper.addAni("idle_left", chomper_left);
  chomper.addAni("idle_right", chomper_right);
  chomper.rotation = 0;


  //Create Boss
  demon = new Sprite(width/2, height/2 - 50, 50, 50);
  demon.alive = true;
  demon.remove();


  //create player && add animation
  player = new Sprite(width/ 2, 400, 32, 32);
  player.addAni("a_right", player_right_attack);
  player.addAni("a_left", player_left_attack);
  player.addAni("a_up", player_up_attack);
  player.addAni("a_down", player_down_attack);
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
  fireballs = new Group();
  fireball = new Sprite(-50, -50);
  fireball.remove;
  
  //Create 2d Array
  tilesHigh = lines.length;
  tilesWide = lines[0].length;
  tileWidth = width / tilesWide;
  tileHeight = height / tilesHigh;
  tiles = createEmpty2dArray(tilesWide, tilesHigh);
  putInArray();

}

//Put values into 2d array of characters
function putInArray() {
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      let tileType = lines[y][x];
      tiles[y][x] = tileType;
    }
  }
}



function draw() {
  //Start Screen
  if (state === 0){
    demon.alive = true;
    bossMusic.stop();
    song.stop();
    image(startImage, 0, 0, width, height);
    player.visible =  false;
    buttonsPressed = 0;
    if(keyCode === 13){
      state = 1;
      song.play();
      player.visible = true;
    }
  }
  //HomeBase
  if (state === 1) {
    button.remove();
    counter = 0;
    lines = levelOneLines; 
    putInArray();
    display();
  }

  //bottom room
  if (state === 2) {
    //create content 
    for( let i = 0; i < crab.length; i++){
      crab[i].hit = false;
    }
    if(counter !== 0){
      display()
    }
    if (counter === 0){
      display();
    }

    //Constantly update Player.x and Player.y
    for( let i = 0; i < crab.length; i++){
      crab[i].moveTowards(player.position.x, player.position.y, 0.01);
      if(crab[i].x >= player.x -25 && crab[i].x <= player.x +25){
        if(crab[i].y >= player.y -25 && crab[i].y <= player.y +25){
          crab[i].addAni("attack", crab_attack);
        }
        else{
          crab[i].ani = "idle";
        }
      }
    }

    //Load Background
    lines = levelTwoLines;
    checkCollision();
    putInArray();
    display();

  }

  //End room
  if(state === 3){
    demon.alive = true;
    bossMusic.stop();
    song.stop();
    background(0);
    player.visible = false;
    crab.remove();
    button.remove();
    orc.remove();
    chomper.remove();
    fireballs.remove();
    demon.remove();
    image(resetImage, 0, 0, width, height);
    buttonsPressed = 0;
    if(kb.pressing("r")){
      state = 1;
      player.visible = true;
      player.x = width/2;
      player.y = height/2;
      health = 20;
      song.play();
    }
    else if (counter === 0){
      display();
    }
  }

  //top room
  if(state === 4){
    song.stop();
    lines = levelThreeLines;
    putInArray();
    display();
    crab.remove();

    demon.addAni("idle", demonIdle);
    demon.addAni("walk", demonRun);
    demon.addAni("cleave", demonDamage);
    demon.ani = "idle";
    demon.friction = 4;
    demon.moveTowards(player.position.x, player.position.y, 0.01);
    demon.rotation = 0;
    updateDemonHealth(demonHealth, maxDemonHealth);
    if (player.overlapping(demon)) {
      demonCleave();
    }
    else {
      demonWalk();
    }
  }

  //Left Room
  if(state === 5){
    //display content 
      display();

    //Constantly update Player.x and Player.y
    for( let i = 0; i < orc.length; i++){
      orc[i].moveTowards(player.position.x, player.position.y, 0.01);
      if (orc[i].x >= player.x){
        if(orc[i].x >= player.x -35 && orc[i].x <= player.x +35){
          if(orc[i].y >= player.y -35 && orc[i].y <= player.y +35){
            orc[i].addAni("attack_left", orc_attack_left);
          }
          else{
            orc[i].ani = "idle_left";
          }
        }
      }
      if (orc[i].x <= player.x){
        if(orc[i].x >= player.x -35 && orc[i].x <= player.x +35){
          if(orc[i].y >= player.y -35 && orc[i].y <= player.y +35){
            orc[i].addAni("attack_right", orc_attack_right);
          }
          else{
            orc[i].ani = "idle_right";
          }
        }
      }
    }

    //Load Background
    lines = levelFourLines;
    checkCollision();
    putInArray();
    display();
  }

  // Right Room
  if(state === 6){
    // display content
    display();

    //Constantly update Player.x and Player.y
    for( let i = 0; i < chomper.length; i++){
      chomper[i].moveTowards(player.position.x, player.position.y, 0.01);
      if (chomper[i].x >= player.x){
        chomper[i].addAni("attack_left", chomper_left);
      }
      if (chomper[i].x <= player.x){
        chomper[i].addAni("attack_right", chomper_right);
      }
    }


    //Create Background
    lines = levelFiveLines;
    putInArray();
    display();
  }

  if(previousState !== state){
    fireballs.remove();
  }
  previousState = state;
  //Player Movement
  playerMovement();
  player.friction = 0;
  player.rotation = 0;

  //Immovable Objects
  door.static = true;
  door2.static = true;
  door3.static = true;
  door4.static = true;
  button.static = true;



  //Collision
  checkCollision();
  if(state !== 0 && state !==3){
    updateHealth(player.position.x, player.position.y, health, maxHealth);
  }
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
  }

  // sides
  else if (location === ")") {
    image(sR, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "(") {
    image(sL, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }

  //Blocks
  else if (location === "C") {
    image(wM, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
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
  else if (location === "d" && counter  > 0) {
    image(closedDoor, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  //for boss room
  else if (location === "d" && state === 4) {
    image(closedDoor, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "d") {
    image(openDoor, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }

  else if (location === "D" && state === 1 && buttonsPressed === 3) {
    image(openDoor, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "D" && state === 4 && demon.alive === false) {
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

//Change player animation direction with WASD
function playerMovement(){
  if (kb.pressing("left") && player.x > 45) {
    player.ani = "left";
    player.ani.scale = 2.5;
    player.move(4, "left", 10);
    playerFacing = "left";
  }
  else if (kb.pressing("right") && player.x < 985) {
    player.ani = "right";
    player.ani.scale = 2.5;
    player.move(4, "right", 10);
    playerFacing = "right";
  }
  else if (kb.pressing("up") && player.y > 65) {
    player.ani = "up";
    player.ani.scale = 2.5;
    player.move(4, "up", 10);
    playerFacing = "up";
  }
  else if (kb.pressing("down") && player.y < 505) {
    player.ani = "down";
    player.ani.scale = 2.5;
    player.move(4, "down", 10);
    playerFacing = "down";
  }
  else if ( playerFacing === "left" && kb.pressing("e") && player.x > 45) {
    player.ani = "a_left";
    player.ani.scale = 2.5;
    player.move(4, "left", 10);
    playerFacing = "left";
  }
  else if ( playerFacing === "right" && kb.pressing("e") && player.x < 985) {
    player.ani = "a_right";
    player.ani.scale = 2.5;
    player.move(4, "right", 10);
    playerFacing = "right";
  }
  else if ( playerFacing === "up" && kb.pressing("e") && player.y > 65) {
    player.ani = "a_up";
    player.ani.scale = 2.5;
    player.move(4, "up", 10);
    playerFacing = "up";
  }
  else if (playerFacing === "down" && kb.pressing("e") && player.y < 505) {
    player.ani = "a_down";
    player.ani.scale = 2.5;
    player.move(4, "down", 10);
    playerFacing = "down";
  }
  else {
    if(playerFacing === "left" || playerFacing === "down"){
      player.ani = "left";
    }
    else if(playerFacing === "right" || playerFacing === "up"){
      player.ani = "right";
    }
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

function updateDemonHealth(demonHealth, maxDemonHealth){
  stroke(0);
  strokeWeight(4);
  noFill();
  rect(width/2 -250, 15, 500, 15);
  noStroke();
  fill(255,0,0);
  rect(width/2 -250, 15,map(demonHealth, 0, maxDemonHealth, 0, 500), 15);
  
}


//Collision
function checkCollision(){
  //Do damage per second to player 
  if(player.overlapping(crab) > lastTimeSwitched + damagePerSecond){
    loseHealth();
    lastTimeSwitched = player.overlapping(crab);
  }
  
  if(player.overlapping(orc) > lastTimeSwitched + damagePerSecond){
    loseHealth();
    lastTimeSwitched = player.overlapping(orc);
  }

  if(player.overlapping(chomper) > lastTimeSwitched + damagePerSecond){
    loseHealth();
    lastTimeSwitched = player.overlapping(chomper);
  }

  if(player.overlapping(demon) > lastTimeSwitched + damagePerSecond){
    loseHealthToDemon();
    lastTimeSwitched = player.overlapping(demon);
  }



  player.overlap(demon, loseHealthToDemon);
  player.overlap(crab, loseHealth);
  fireball.overlap(crab, isCrabHit);
  player.overlap(orc, loseHealth);
  fireball.overlap(orc, isOrcHit);
  player.overlap(chomper, loseHealth);
  fireball.overlap(chomper, isChomperHit);
  fireball.overlap(demon, demonIsHit);
  fireball.overlap(door, eliminateFireball);
  fireball.overlap(door2, eliminateFireball);
  fireball.overlap(door3, eliminateFireball);
  fireball.overlap(door4, eliminateFireball);
  fireball.overlap(button, eliminateFireball);
  allSprites.overlap(potion, makeTransparent);
  player.overlap(door, touchingDoor);
  player.overlap(door2, touchingDoor2);
  player.overlap(door3, touchingDoor3);
  player.overlap(door4, touchingDoor4);
  player.overlap(button, buttonIsPressed);
  player.overlap(demon, demonCleave);
  player.overlap(potion, addHealth);
  player.overlap(crab, isCrabStruck);
  player.overlap(orc, isOrcStrcuk);
  player.overlap(chomper, isChomperStruck);

}

// Checking which Sprite in the group is hit
function isCrabHit(){
  for (let i = 0; i< crab.length; i++){
    if(fireball.overlapping(crab[i])){
      if( maxHealth > health && random(100)> 50){
        new potion.Sprite(crab[i].x, crab[i].y);
      }
      crab[i].remove();
      counter --;
    }
  }
}

function isOrcHit(){
  for (let i = 0; i< orc.length; i++){
    if(fireball.overlapping(orc[i])){
      if( maxHealth > health && random(100)> 50){
        new potion.Sprite(orc[i].x, orc[i].y);
      }
      orc[i].remove();
      counter --;
    }
  }
}

function isChomperHit(){
  for (let i = 0; i< chomper.length; i++){
    if(fireball.overlapping(chomper[i])){
      if( maxHealth > health && random(100)> 50){
        new potion.Sprite(chomper[i].x, chomper[i].y);
      }
      chomper[i].remove();
      counter --;
    }
  }
}

function isCrabStruck(){
  for (let i = 0; i< crab.length; i++){
    if(player.overlapping(crab[i]) && (player.ani.name === "a_right" || player.ani.name === "a_left" || player.ani.name === "a_up" || player.ani.name === "a_down")){
      if( maxHealth > health && random(100)> 50){
        new potion.Sprite(crab[i].x, crab[i].y);
      }
      crab[i].remove();
      counter --;
    }
    else{
      health -= 5;
      if(health <= 0){
        state = 3;
      }
    }
  }
}

function isOrcStrcuk(){
  for (let i = 0; i< orc.length; i++){
    if(player.overlapping(orc[i]) && (player.ani.name === "a_right" || player.ani.name === "a_left" || player.ani.name === "a_up" || player.ani.name === "a_down")){
      if( maxHealth > health && random(100)> 50){
        new potion.Sprite(orc[i].x, orc[i].y);
      }
      orc[i].remove();
      counter --;
    }
    else{
      health -= 5;
      if(health <= 0){
        state = 3;
      }
    }
  }
}

function isChomperStruck(){
  for (let i = 0; i< chomper.length; i++){
    if(player.overlapping(chomper[i]) && (player.ani.name === "a_right" || player.ani.name === "a_left" || player.ani.name === "a_up" || player.ani.name === "a_down")){
      if( maxHealth > health && random(100)> 50){
        new potion.Sprite(chomper[i].x, chomper[i].y);
      }
      chomper[i].remove();
      counter --;
    }
    else{
      health -= 5;
      if(health <= 0){
        state = 3;
      }
    }
  }
}


//damage to demon
function demonIsHit() {
  demonHealth -= 10;
  if(demonHealth === 0){
    demon.remove();
    demon.alive = false;
    counter--;
    display();
  }
}

//demon faces player when walking
function demonWalk() {
  if (player.x > demon.x) {
    demon.mirror.x = true;
  }
  else if (player.x <= demon.x) {
    demon.mirror.x = false;
  }
  demon.ani = "walk";
}

//damage to player and rotates
function demonCleave() {
  if (player.x > demon.x) {
    demon.mirror.x = false;
  }
  else if (player.x <= demon.x) {
    demon.mirror.x = true;
  }
  demon.ani = "cleave";
}

//Count when Button is Pressed
function buttonIsPressed(){
  if(button.pressed === false ){
    buttonsPressed ++;
  }
  button.pressed = true;

}

// When three buttons pressed open boss door
function buttonOpen() {
  if(buttonsPressed === 3){
    display();
  }
}

//Top Door Teleport
function touchingDoor(){
  if (state === 1) {
    state = 2;
    new button.Sprite(511, 444);
    new crab.Sprite(random(100, 700), random(60, 450));
    new crab.Sprite(random(100, 700), random(60, 450));
    new crab.Sprite(random(100, 700), random(60, 450));
    new crab.Sprite(random(100, 700), random(60, 450));
    button.pressed = false;
    crab.friction = 0;
    crab.moveTowards(player.position.x, player.position.y, 0.01);
    counter += 4;
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
  if (state === 4 && demon.alive === false) {
    state = 0;
  }
  if (state === 4 && demon.alive === true) {
    bossMusic.loop();
    demon = new Sprite(width/2, height/2 - 50, 288, 160);
    counter++;
  }
    
}

//Left Door Teleport
function touchingDoor3(){
  if (state === 1) {
    state = 5;
    new button.Sprite(108, 295);
    button.pressed = false;
    new orc.Sprite(random(100, 700), random(60, 450));
    new orc.Sprite(random(100, 700), random(60, 450));
    new orc.Sprite(random(100, 700), random(60, 450));
    orc.friction = 0;
    orc.moveTowards(player.position.x, player.position.y, 0.01);
    counter += 3;
    for( let i = 0; i < orc.length; i++){
      orc[i].hit = false;
    }
    player.position.x = 950;
  }
  if (counter === 0) {
    if (state === 6) {
      state = 1;
      player.position.x = 950;
    }
  }
}

//Right Door Teleport
function touchingDoor4(){
  if (state === 1) {
    state = 6;
    new button.Sprite(919, 292);
    button.pressed = false;
    new chomper.Sprite(random(100, 700), random(60, 450));
    new chomper.Sprite(random(100, 700), random(60, 450));
    new chomper.Sprite(random(100, 700), random(60, 450));
    chomper.friction = 0;
    chomper.moveTowards(player.position.x, player.position.y, 0.01);
    counter += 3;
    for( let i = 0; i < chomper.length; i++){
      chomper[i].hit = false;
    }
    player.position.x = 75;
  }
  if (counter === 0) {
    if (state === 5) {
      state = 1;
      player.position.x = 75;
    }
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

function loseHealthToDemon(){
  if (immortal === false) {
    health -= 10;
    if(health <= 0){
      state = 3;
    }
  }
}

function addHealth(){
  if (immortal === false) {
    for(let i = 0; i < potion.length; i ++){
      if(player.overlapping(potion[i])){
        potion.collider = "static";
        health += 5;
        potion[i].remove();
      }
    }
  }
}

function makeTransparent(){
  if(potion.overlap(fireball)){
    potion.collider = "none";
  }
  else{
    potion.collider = "static";
  }
}

//Delete fireball
function eliminateFireball(){
  fireball.remove();
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
    if(counter !== 0){
      if(keyCode === 32 && playerFacing  === "left"){
        spears -= 1;
        fireball = new Sprite(player.position.x-1, player.position.y);
        fireball.addImage("idle", fireballImage);

        fireballs.add(fireball);
      }
      else if(keyCode === 32 && playerFacing  === "right"){
        spears -= 1;
        fireball = new Sprite(player.position.x +1, player.position.y );
        fireball.addImage("idle", fireballImage);

        fireballs.add(fireball);
      }
      else if(keyCode === 32 && playerFacing  === "up"){
        spears -= 1;
        fireball = new Sprite(player.position.x, player.position.y -1);
        fireball.addImage("idle", fireballImage);

        fireballs.add(fireball);
      }
      else if(keyCode === 32 && playerFacing  === "down"){
        spears -= 1;
        fireball = new Sprite(player.position.x +1, player.position.y +1);
        fireball.addImage("idle", fireballImage);

        fireballs.add(fireball);
      }
    }
  }
}


