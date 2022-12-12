
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