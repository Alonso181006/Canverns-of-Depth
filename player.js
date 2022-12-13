
class Player{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dx = 2;
    this.dy = 2;
  }
  display(){
    noStroke();
    fill("red");
    rect(this.x , this.y, cellWidth, cellHeight);
  }
  move(){
    if(keyIsDown(65) ){ //a
      this.x -= this.dx;
    }
    if(keyIsDown(68) ){ //w
      this.x += this.dx;
    }
    if(keyIsDown(87) ){ //w
      this.y -= this.dy;
    }
    if(keyIsDown(83) ){ //s
      this.y += this.dy;
    }
  }
}
  


class Enemy{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  display(){
    noStroke();
    fill("white");
    rect(this.x, this.y, cellWidth, cellHeight);
  }
}