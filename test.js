let human_sprites;
let human_animation;


function preload(){
  human_animation = loadAnimation(
    "gameSprites/humanSprites/humanWalk/tile000.png",
    "gameSprites/humanSprites/humanWalk/tile001.png",
    "gameSprites/humanSprites/humanWalk/tile002.png",
    "gameSprites/humanSprites/humanWalk/tile003.png");
}
function setup(){
  createCanvas(windowWidth, windowHeight);

}

function draw(){
  clear();
  animation(human_animation , 400, 400);
}


