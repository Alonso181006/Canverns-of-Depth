let player, player_right, player_left, player_up, player_down;
let crab, crab_idle;



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

  crab.attractionPoint(0.1, player.position.x, player.position.y);

}

function draw(){
  playerMovement();
  player.rotation  = 0;
  player.friction = 4;
  crab.friction = 4;
  crab.attractionPoint(0.1, player.position.x, player.position.y);
  crab.rotation = 0;


}

function playerMovement(){
  clear();
  if (kb.pressing("left")) {
    player.ani = "left";
    player.ani.scale = 2.5;
    player.vel.x = -2;
  }
  else if (kb.pressing("right")) {
    player.ani = "right";
    player.ani.scale = 2.5;
    player.vel.x = 2;
  }
  else if (kb.pressing("up")) {
    player.ani = "up";
    player.ani.scale = 2.5;
    player.vel.y = -2;
  }
  else if (kb.pressing("down")) {
    player.ani = "down";
    player.ani.scale = 2.5;
    player.vel.y = 2;
  }
  else {
    player.ani.scale = 2.5;
    player.vel.x = 0;
    player.vel.y =0;
  }
}


