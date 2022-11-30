// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let loadingLevel;
let lines;
let tiles;
let tilesWide, tilesHigh;
let tileWidth, tileHeight;
let shell, block;


function preload() {
  //load positions for level
  loadingLevel = "0.text";
  lines = loadStrings(loadingLevel);

  //load images for tiles
  shell = loadImage("tile000.png");
  block = loadImage("blockO.png");
  //load background
}

function setup() {

  createCanvas(windowWidth,windowHeight);

  tilesHigh = lines.length;
  tilesWide = lines[0].length;

  tileWidth = width / tilesWide;
  tileHeight = height / tilesHigh;

  tiles = createEmpty2dArray(tilesWide, tilesHigh);

  //put values into 2d array of characters
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      let tileType = lines[y][x];
      tiles[y][x] = tileType;
    }
  }
}


function draw() {
  display();
}

function display() {
  //display background
  background(220);
  //check tiles
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      showTile(tiles[y][x], x, y);
    }
  }
}

function showTile(location, x, y) {
  if (location === ".") {
    image(block, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "/") {
    image(shell, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
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