let player, player_right, player_left, player_up, player_down;
let crab, crab_idle;
let health = 20;
let maxHealth = 20;
let spears = 550;
let shots, shot, shotImage;
let speed = 2;
let rotation = 0;



function preload(){
  player_right = loadAnimation(
    "gameSprites/humanSprites/humanWalk/WBR.png",
    { frameSize: [32, 32], frames: 4 });
  player_left = loadAnimation(
    "gameSprites/humanSprites/humanWalk/WBL.png",
    { frameSize: [32, 32], frames: 4 });

  player_up = loadAnimation(
    "gameSprites/humanSprites/humanWalk/WTL.png",
    { frameSize: [32, 32], frames: 4 });

  player_down = loadAnimation(
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
function setup(){
  createCanvas(windowWidth, windowHeight);
  crab = new Sprite(width/2, height/2,32, 32 );
  crab.addAni("idle", crab_idle);
  crab.friction = 2;
  player = new Sprite(400,400, 32, 32);
  player.addAni("right", player_right);
  player.addAni("left", player_left);
  player.addAni("up", player_up);
  player.addAni("down", player_down);

  crab.moveTowards(0.1,player.position.x, player.position.y, 0.001);
  shots = new Group();
  shot = new Sprite(-50, -50);
  shot.remove;
}

function draw(){
  playerMovement();
  player.rotation  = 0;
  player.friction = 4;
  crab.friction = 4;
  crab.moveTowards(player.position.x, player.position.y, 0.005);
  crab.rotation = 0;
  checkCollision();
  updateHealth(player.position.x, player.position.y, health, maxHealth);


}

function playerMovement(){
  clear();
  if (kb.pressing("left")) {
    player.ani = "left";
    player.ani.scale = 2.5;
    player.vel.x = -2;
    rotation = 180;
  }
  else if (kb.pressing("right")) {
    player.ani = "right";
    player.ani.scale = 2.5;
    player.vel.x = 2;
    rotation = 90;
  }
  else if (kb.pressing("up")) {
    player.ani = "up";
    player.ani.scale = 2.5;
    player.vel.y = -2;
    rotation = 0;
  }
  else if (kb.pressing("down")) {
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
  player.overlap(crab, morePotion);
  shot.overlap(crab, eliminate);
}

function morePotion(){
  health -= 10;
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



