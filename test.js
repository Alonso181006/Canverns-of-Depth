let player, player_right, player_left, player_up, player_down;
let speed = 20;


function preload(){
  human_right = loadAnimation(
    "gameSprites/humanSprites/humanWalk/WBL.png",
    { frameSize: [32, 32], frames: 4 });


  // human_right = loadAnimation(
  //   "gameSprites/humanSprites/humanWalk/tile000.png",
  //   "gameSprites/humanSprites/humanWalk/tile001.png",
  //   "gameSprites/humanSprites/humanWalk/tile002.png",
  //   "gameSprites/humanSprites/humanWalk/tile003.png");

  // human_right = loadAnimation(
  //   "gameSprites/humanSprites/humanWalk/tile000.png",
  //   "gameSprites/humanSprites/humanWalk/tile001.png",
  //   "gameSprites/humanSprites/humanWalk/tile002.png",
  //   "gameSprites/humanSprites/humanWalk/tile003.png");

  // human_up = loadAnimation(
  //   "gameSprites/humanSprites/humanWalk/tile000.png",
  //   "gameSprites/humanSprites/humanWalk/tile001.png",
  //   "gameSprites/humanSprites/humanWalk/tile002.png",
  //   "gameSprites/humanSprites/humanWalk/tile003.png");
}
function setup(){
  createCanvas(windowWidth, windowHeight);
  player = new human_Sprite(400,400, 400);
  player.addAni("idle", "gameSprites/humanSprites/humanWalk/WBL.png",{ frameSize: [32, 32], frames: 4 });

}

function draw(){
  clear();
  if (kb.pressing("left")) {
    player.ani = "fly";
    player.vel.x = -2;
    player.mirror.x = true;
  }
  else if (kb.pressing("right")) {
    player.ani = "fly";
    player.vel.x = 2;
    player.mirror.x = false;
  }
  else {
    player.ani = "idle";
    player.vel.x = 0;
  }

}

// function keyPressed(){
//   human_Sprite.animation.stop();
//   if(kb.pressing("up")){
//     human_Sprite.position.y -= speed;
//     human_Sprite.changeAnimation("up"); 
//     human_Sprite.animation.play();
//   }
//   if(kb.pressing("up")){
//     human_Sprite.position.y -= speed;
//     human_Sprite.changeAnimation("up"); 
//     human_Sprite.animation.play();
//   }
//   if(kb.pressing("up")){
//     human_Sprite.position.y -= speed;
//     human_Sprite.changeAnimation("up"); 
//     human_Sprite.animation.play();
//   }
//   if(kb.pressing("up")){
//     human_Sprite.position.y -= speed;
//     human_Sprite.changeAnimation("up"); 
//     human_Sprite.animation.play();
//   }

// }


