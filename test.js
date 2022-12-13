//Variables
const COLS = 20;
const ROWS = 20;
let player;
let enemy;
let playerX = 0;
let playerY = 0;
let enemyX = 4;
let enemyY = 4;
let cellWidth, cellHeight;
let grid = new Array(COLS);
let start;
let end;
let path = [];
let current;
let temp;
let openSet = [];
let closedSet = [];


function setup(){
  createCanvas(windowWidth, windowHeight);
  // Grid cell size
  cellWidth = width/COLS;
  cellHeight = height/ROWS;

  // Making a 2D array
  for (let i = 0; i < COLS; i++) {
    grid[i] = new Array(ROWS);
  }

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  // All the neighbours
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      grid[i][j].addNeighbours(grid);
    }
  }

  player = new Player(playerX, playerY);
  enemy = new Enemy(cellWidth *enemyX,cellHeight * enemyY);
  end = grid[ Math.round(player.x/cellWidth)][Math.round(player.y/cellHeight)];
  start = grid[Math.round(enemy.x/cellWidth)][Math.round(enemy.y/cellHeight)];
  start.obstacle = false;
  end.obstacle = false;

}


class Cell {
  constructor(i, j){
    // Location
    this.i = i;
    this.j = j;
  
    // f, g, h values for A*
    this.f = 0;
    this.g = 0;
    this.h = 0;
  
    // Neighbours
    this.neighbours = [];
  
    // Where did I come from?
    this.previous = undefined;
  
    // Am I a wall?
  }
  
  // Display me
  display() {
 
    fill("green");
    noStroke();
    rect(this.i * cellWidth, this.j * cellHeight, cellWidth, cellHeight);
  
  }

  
  // Figure out who my neighbours are
  addNeighbours(grid) {
    let i = this.i;
    let j = this.j;
    if (i < COLS - 1) {
      this.neighbours.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbours.push(grid[i - 1][j]);
    }
    if (j < ROWS - 1) {
      this.neighbours.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbours.push(grid[i][j - 1]);
    }
    if (i > 0 && j > 0) {
      this.neighbours.push(grid[i - 1][j - 1]);
    }
    if (i < COLS - 1 && j > 0) {
      this.neighbours.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < ROWS - 1) {
      this.neighbours.push(grid[i - 1][j + 1]);
    }
    if (i < COLS - 1 && j < ROWS - 1) {
      this.neighbours.push(grid[i + 1][j + 1]);
    }
  }
}



function draw() {
  background("blue");
  player.move();
  end = grid[ Math.round(player.x/cellWidth)][Math.round(player.y/cellHeight)];
  start = grid[Math.round(enemy.x/cellWidth)][Math.round(enemy.y/cellHeight)];
  openSet.push(start);
  pathfinding();
  player.display();
  enemy.display();
}

function keyPressed(){

}


function heuristic(position0, position1) {
  let d = dist(position1.i, position1.j, position0.i, position0.j);
  return d;
}

// Function to delete element from the array
function removeFromArray(array, element) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] === element) {
      array.splice(i, 1);
    }
  }
}

function pathfinding(){
  // Am I still searching?
  if (openSet.length > 0) {

    // Best next option
    let openIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[openIndex].f) {
        openIndex = i;
      }
    }
    current = openSet[openIndex];

    // Did I finish?
    if (current === end) {
      loop();
    }

    // Best option moves from openSet to closedSet
    removeFromArray(openSet, current);
    closedSet.push(current);

    // Check all the neighbours
    let neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];

      // Is the next Cell valid?
      if (!closedSet.includes(neighbour) && !neighbour.obstacle) {
        let tentative_gScore = current.g + heuristic(neighbour, current);

        // Is this a better path than before?
        let newPath = false;
        if (openSet.includes(neighbour)) {
          if (tentative_gScore < neighbour.g) {
            neighbour.g = tentative_gScore;
            newPath = true;
          }
        } 
        else {
          neighbour.g = tentative_gScore;
          newPath = true;
          openSet.push(neighbour);
        }

        // Yes, it's a better path
        if (newPath) {
          neighbour.h = heuristic(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = current;
        }
      }

    }
  // No solution
  } 
  else {
    loop();
    return;
  }

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      grid[i][j].display();
    }
  }

  // Find the path by working backwards
  path = [];
  temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  // Drawing path as a line
  noFill();
  stroke(0);
  strokeWeight(cellWidth/ 2);
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].i * cellWidth + cellWidth/ 2, path[i].j * cellHeight+ cellHeight/ 2);
  }
  endShape();

}

